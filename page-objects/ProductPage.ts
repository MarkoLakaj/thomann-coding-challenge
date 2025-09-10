import {Page, Locator} from '@playwright/test'
import { Helper } from '../utils/Helper'


export class ProductPage {

    private readonly page: Page
    private readonly productName: Locator
    private readonly addToBasketButton: Locator

    constructor(page: Page) {
        this.page = page
        this.productName = page.locator('.product-title [itemprop="name"]')
        this.addToBasketButton = page.getByRole('button', {name: 'Add to Basket'})
    }

    async getProductName(): Promise<string> {
        const text = await this.productName.textContent()
        return Helper.normalizeWhiteSpace(text)
    }

    async addProductToBasket() {
        await this.addToBasketButton.click()
    }
}