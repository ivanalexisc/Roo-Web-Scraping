import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

async function detectarLluvia() {
  const browser = await puppeteer.launch({
    executablePath: process.env.EXECUTABLE_PATH,
    headless: false,
    slowMo: 200,
    userDataDir: process.env.USER_DATA_DIR,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(process.env.TARGET_URL);

  await page.evaluate(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('roo168')) { // Verifica la clase específica del div de la lluvia
              const button = node.querySelector('button');
              if (button && !button.disabled) {
                button.click();
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

detectarLluvia();