import {Page, Locator} from '@playwright/test'


export class BasketPage {

    private readonly page: Page
    private readonly basketNotificationPopup: Locator

    constructor(page: Page) {
        this.page = page
        this.basketNotificationPopup = page.locator('.fx-notification__content > div')
    }

    async getBasketNotificationPopupText() {
        return await this.basketNotificationPopup.textContent()
    }

}