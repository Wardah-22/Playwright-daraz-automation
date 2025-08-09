class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async hasFreeShipping() {
    const patterns = [
      'text=/Free\\s*Shipping/i',
      'text=/Free\\s*Delivery/i'
    ];

    for (const sel of patterns) {
      if (await this.page.locator(sel).count() > 0) {
        return true;
      }
    }

    // Fallback for any "Free" text
    if (await this.page.locator('text=/\\bFree\\b/i').count() > 0) {
      return true;
    }

    return false;
  }
}

module.exports = { ProductPage };
