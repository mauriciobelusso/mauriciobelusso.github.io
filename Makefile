# ===============================
#  Makefile — Mauricio Belusso
#  Automação para rodar e manter o site Jekyll
# ===============================

# Caminho base
SITE_URL = https://mauriciobelusso.github.io

# ================================================
# 🔧 Comandos principais
# ================================================

# Instalar dependências Ruby (uma vez)
install:
	@echo "📦 Instalando dependências Ruby..."
	bundle install

# Rodar o servidor local (modo desenvolvimento)
serve:
	@echo "🚀 Servindo site em http://127.0.0.1:4000 ..."
	bundle exec jekyll serve --livereload

# Fazer build estático (gera em ./_site)
build:
	@echo "🏗️ Gerando build estático..."
	bundle exec jekyll build

# Limpar caches e diretórios temporários
clean:
	@echo "🧹 Limpando arquivos temporários..."
	rm -rf _site .jekyll-cache .sass-cache

# Testar build local (simula build do GitHub Pages)
test:
	@echo "🧪 Testando build como GitHub Pages..."
	bundle exec jekyll build --safe --trace

# ================================================
# 🔍 SEO e Deploy
# ================================================

# Mostrar sitemap e URL base
sitemap:
	@echo "🌐 Sitemap: $(SITE_URL)/sitemap.xml"
	@echo "🔗 Base URL: $(SITE_URL)"

# Atualizar gems (atualiza tema e dependências)
update:
	@echo "⬆️ Atualizando dependências Ruby..."
	bundle update

# ================================================
# 🧠 Utilidades
# ================================================

# Mostrar help (padrão)
help:
	@echo ""
	@echo "📘 Comandos disponíveis:"
	@echo "  make install   - Instala dependências Ruby"
	@echo "  make serve     - Roda servidor local (localhost:4000)"
	@echo "  make build     - Gera build estático (_site)"
	@echo "  make clean     - Limpa caches e build"
	@echo "  make test      - Testa build modo seguro (como GitHub Pages)"
	@echo "  make sitemap   - Mostra URL e sitemap"
	@echo "  make update    - Atualiza dependências"
	@echo ""

# Define comando padrão (help)
.DEFAULT_GOAL := help
