const { expect } = require('@playwright/test');

class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.productImages = page.locator('img[type="product"]');
  }

  async selectBrand(businessValue) {
    const selector = `input[businessvalue="${businessValue}"]`;
    const checkbox = this.page.locator(selector).first();

    if (await checkbox.count() === 0) {
      throw new Error(`Brand checkbox with businessvalue="${businessValue}" not found`);
    }

    await checkbox.click();
    // Wait for product grid to refresh instead of networkidle
    await this.page.waitForSelector('img[type="product"]', { timeout: 30000 });
  }

  async setPrice(min, max) {
  const minInput = this.page.locator('input[placeholder="Min"]').first();
  const maxInput = this.page.locator('input[placeholder="Max"]').first();

  await minInput.fill(String(min));
  await maxInput.fill(String(max));

  // More specific locator for the apply button
  const applyBtn = this.page.locator(
    'button.ant-btn-primary.ant-btn-icon-only:has(svg[data-icon="caret-right"])'
  ).first();

  await applyBtn.scrollIntoViewIfNeeded();
  await expect(applyBtn).toBeVisible({ timeout: 30000 });
  await expect(applyBtn).toBeEnabled({ timeout: 30000 });

  await applyBtn.click();

  await this.page.waitForSelector('img[type="product"]', { timeout: 30000 });
}


  async applyFreeShippingFilter() {
    const box = this.page.locator('input[businessvalue="Free_Shipping"]').first();

    if (await box.count() === 0) {
      throw new Error('Free Shipping checkbox not found');
    }

    await box.click();
    // Wait for product refresh
    await this.page.waitForSelector('img[type="product"]', { timeout: 30000 });
  }

  async getProductsCount() {
    await this.page.waitForSelector('img[type="product"]', { timeout: 10000 }).catch(() => {});
    return await this.productImages.count();
  }

  async clickFirstProduct() {
    const firstImg = this.productImages.first();
    const context = this.page.context();

    const popupPromise = context.waitForEvent('page').catch(() => null);

    await Promise.all([
      firstImg.click({ button: 'left' }),
      this.page.waitForTimeout(500)
    ]);

    const newPage = await popupPromise;
    if (newPage) {
      await newPage.waitForLoadState('domcontentloaded');
      return newPage;
    }

    // If no new tab opened, stay on current
    await this.page.waitForSelector('h1', { timeout: 30000 });
    return this.page;
  }
}

module.exports = { SearchResultsPage };
