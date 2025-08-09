const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { SearchResultsPage } = require('../pages/searchResults.page');
const { ProductPage } = require('../pages/product.page');

test.setTimeout(120000); // 2 minutes per test

test.describe('Daraz.pk Tests (POM)', () => {
  test('Search, filter, and verify product count > 0', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();
    await home.search('electronics');
    await results.selectBrand('philips');
    await results.setPrice(500, 10000);

    const count = await results.getProductsCount();
    console.log('Product count:', count);
    expect(count).toBeGreaterThan(0);
  });

  test('Open a product and check for free shipping', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();
    await home.search('electronics');
    await results.selectBrand('philips');
    await results.setPrice(500, 5000);

    const productPageHandle = await results.clickFirstProduct();
    const prodPage = new ProductPage(productPageHandle);

    const hasFree = await prodPage.hasFreeShipping();
    console.log('Free shipping available:', hasFree);
    expect(hasFree).toBeTruthy();
  });
});
