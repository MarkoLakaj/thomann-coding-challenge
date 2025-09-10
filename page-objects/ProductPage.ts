import { Page, Locator } from '@playwright/test'
import { Helper } from '../utils/Helper'

/**
 * Page Object representing a product page.
 * Allows fetching product details and adding the product to the basket.
 */
export class ProductPage {

    private readonly page: Page
    private readonly productName: Locator
    private readonly addToBasketButton: Locator

    constructor(page: Page) {
        this.page = page
        this.productName = page.locator('.product-title [itemprop="name"]')
        this.addToBasketButton = page.locator('.call-to-action__action')
    }

    /** Returns the normalized product name */
    async getProductName(): Promise<string> {
        const text = await this.productName.textContent()
        return Helper.normalizeWhiteSpace(text)
    }

    /** Clicks the "Add to Basket" button */
    async addProductToBasket(): Promise<void> {
        await this.addToBasketButton.click()
    }
}