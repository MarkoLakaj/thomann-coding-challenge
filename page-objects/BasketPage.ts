import { Page, Locator } from '@playwright/test'

/**
 * Page Object representing the Basket page
 */
export class BasketPage {

    private readonly page: Page
    private readonly basketNotificationPopup: Locator

    constructor(page: Page) {
        this.page = page
        // Locator for the basket notification popup that appears after adding a product
        this.basketNotificationPopup = page.locator('.fx-notification__content > div')
    }

    /**
     * Returns the text displayed in the basket notification popup.
     */
    async getBasketNotificationPopupText(): Promise<string | null> {
        return await this.basketNotificationPopup.textContent()
    }
}