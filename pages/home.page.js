class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input#q');
    this.searchButton = page.locator('a.search-box__button--1oH7');
  }

  async goto() {
    // More generous timeout for slow sites
    await this.page.setDefaultNavigationTimeout(120000);

    // Wait only until DOM is loaded
    await this.page.goto('https://www.daraz.pk/', {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    // Wait for the search box instead of networkidle
    await this.searchInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  async search(query) {
    await this.searchInput.fill(query);

    await Promise.all([
      // Wait for results page's first product image instead of networkidle
      this.page.waitForSelector('img[type="product"]', { timeout: 30000 }),
      this.searchButton.click()
    ]);
  }
}

module.exports = { HomePage };
