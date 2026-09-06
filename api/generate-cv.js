const { OpenAI } = require('openai');
const baseResumeData = require('../resume.json');

function getBaseResumeJson() {
  return JSON.stringify(baseResumeData);
}

const SYSTEM_PROMPT = `Você é um especialista em engenharia de software e recrutamento técnico.
Sua tarefa é personalizar e otimizar um currículo técnico com base na descrição de uma vaga de emprego (Job Description).

Instruções estritas:
1. Mantenha a veracidade de todos os dados do currículo original: nomes de empresas, períodos, métricas reais e conquistas verídicas. NUNCA invente informações, empresas ou métricas falsas.
2. Reordene, enfatize e refine os resumos, pontos de destaque (highlights), conquistas (achievements) e habilidades (skills) para alinhar estrategicamente com os requisitos da vaga informada.
3. Adapte o resumo pessoal ("summary") em "personal" para refletir o alinhamento do candidato com o perfil desejado na vaga.
4. Mantenha e destaque as stacks técnicas mais relevantes para a vaga.
5. Responda ESTRITAMENTE com um objeto JSON válido, sem formatação markdown em volta, seguindo EXATAMENTE o mesmo schema JSON do currículo original.

Esquema JSON obrigatório:
{
  "personal": {
    "name": "string",
    "title": "string",
    "summary": "string",
    "availability": "string",
    "email": "string",
    "github": "string",
    "linkedin": "string",
    "location": "string",
    "languages": [{"name": "string", "level": "string"}]
  },
  "highlights": [{"metric": "string", "tag": "string", "title": "string", "description": "string"}],
  "experience": [{"company": "string", "role": "string", "period": "string", "achievements": ["string"], "stack": ["string"]}],
  "skills": [{"category": "string", "description": "string", "items": ["string"]}],
  "education": {"academic": "string"}
}`;

// Instância global do cliente OpenAI (reutilizada entre invocações quentes da serverless function)
let openaiClient = null;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Chave de API do OpenAI (OPENAI_API_KEY) não configurada no servidor.');
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

module.exports = async function handler(req, res) {
  // Configurar cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Tratar requisição OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificar método HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    // Parse do corpo da requisição
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Corpo da requisição inválido. JSON esperado.' });
      }
    }

    const { jobDescription } = body || {};

    if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
      return res.status(400).json({ error: 'O campo "jobDescription" é obrigatório e não pode estar vazio.' });
    }

    let openai;
    try {
      openai = getOpenAIClient();
    } catch (keyErr) {
      return res.status(500).json({ error: keyErr.message });
    }

    let baseResumeJson;
    try {
      baseResumeJson = getBaseResumeJson();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao carregar o resume.json base.', details: err.message });
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Currículo Base (JSON):\n${baseResumeJson}\n\nJob Description (Vaga):\n${jobDescription.trim()}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: 'Resposta vazia do modelo de IA.' });
    }

    let tailoredResume;
    try {
      tailoredResume = JSON.parse(content);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Falha ao processar o JSON retornado pela IA.', raw: content });
    }

    return res.status(200).json(tailoredResume);

  } catch (error) {
    console.error('Erro na API generate-cv:', error);
    return res.status(500).json({
      error: 'Ocorreu um erro interno ao gerar o currículo com IA.',
      message: error.message
    });
  }
};
