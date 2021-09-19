const Puppeteer = require("./config/Puppeteer");

class Crawler extends Puppeteer {
  constructor() {
    super();
  }

  async init() {
    await this.config();
    let url =
      "https://www.binary.com/pt/trading.html?currency=AUD&formname=overunder&duration_units=t&duration_amount=1&expiry_type=duration&amount=10&amount_type=stake&prediction=0&market=synthetic_index&underlying=R_50";

    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    console.log("abriu o site");

    await this.page.waitForSelector('[href="?trade_analysis=tab_last_digit"]', {
      visible: true,
    });
    console.log("esperou seletor");

    await this.page.click('[href="?trade_analysis=tab_last_digit"]');
    console.log("clica estatistica");

    await this.page.waitForTimeout(5000);

    while (true) {
      await this.page.waitForSelector('[id="tick_count"]');
      await this.page.click('[id="tick_count"]');

      await this.page.waitForSelector('[data-value="25"]', { visible: true });
      await this.page.click('[data-value="25"]');
      console.log("clicou em 25");
      await this.timeout(5000);

      await this.page.click('[id="tick_count"]');
      await this.page.waitForSelector('[data-value="50"]', { visible: true });
      await this.page.click('[data-value="50"]');
      console.log("clicou em 50");
      await this.timeout(5000);
    }
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
new Crawler().init();

module.exports = Crawler;
