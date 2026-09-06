const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

async function renderPdf() {
  const htmlPath = path.resolve(__dirname, '../index.html');
  const outputPath = path.resolve(__dirname, '../curriculo-mauricio-belusso.pdf');

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`index.html not found at ${htmlPath}`);
  }

  console.log(`Launching browser to render PDF from ${htmlPath}...`);

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport size for consistent rendering
    await page.setViewportSize({ width: 1200, height: 1600 });

    // Open local file via cross-platform file URL
    const fileUrl = pathToFileURL(htmlPath).href;
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Wait for Tailwind CDN and document fonts to be fully loaded
    await page.evaluate(() => document.fonts.ready);

    // Generate PDF with print background enabled
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm',
      },
    });

    console.log(`PDF successfully generated at: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

renderPdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
