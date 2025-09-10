import { Page, Locator } from "@playwright/test";


export class CookieModal {

    private readonly page: Page
    private readonly acceptCookiesButton: Locator


    constructor(page: Page) {

        this.page = page
        this.acceptCookiesButton = page.locator('.consent-button--primary')
    }

    async acceptCookies() {
         if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click()
        }
    }

}