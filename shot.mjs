import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 850 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.slice(0, 150)));
await page.goto("http://localhost:3000/dashboard", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);
console.log("=== DASHBOARD TEXT ===");
console.log((await page.evaluate(() => document.body.innerText)).slice(0, 500).replace(/\n+/g, " | "));
await page.screenshot({ path: "/home/user/aitzaz-dashboard.png", fullPage: false });
// assistant page
await page.goto("http://localhost:3000/assistant", { waitUntil: "networkidle", timeout: 20000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: "/home/user/aitzaz-assistant.png" });
// agents page
await page.goto("http://localhost:3000/agents", { waitUntil: "networkidle", timeout: 20000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: "/home/user/aitzaz-agents.png" });
console.log("=== ERRORS ===");
console.log(errors.length ? errors.join("\n") : "(none)");
await browser.close();
console.log("done");
