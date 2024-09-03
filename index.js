import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

async function openWebPage() {
  const browser = await puppeteer.launch({
    executablePath: process.env.EXECUTABLE_PATH,
    headless: false,
    slowMo: 200,
    userDataDir: process.env.USER_DATA_DIR,
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(process.env.TARGET_URL);

  const messageInputSelector = 'div.MuiInputBase-root input.MuiOutlinedInput-input';
  
  // Espera a que el selector esté visible
  await page.waitForSelector(messageInputSelector, { visible: true });
  
  // Desplaza hasta el elemento para asegurarte de que sea visible
  await page.evaluate(selector => {
    document.querySelector(selector).scrollIntoView();
  }, messageInputSelector);
  
  // Enfoca el campo de entrada y escribe el mensaje
  await page.focus(messageInputSelector);
  await page.type(messageInputSelector, 'when bro when');

  // Opcional: Enviar el mensaje presionando Enter (depende de cómo funciona el chat)
  await page.keyboard.press('Enter');

  // Esto sería para cerrar el navegador
  // await browser.close();
}

openWebPage();