import { Page, Locator } from "@playwright/test";


export class CookieModal {

    private readonly page: Page
    private readonly acceptCookiesButton: Locator


    constructor(page: Page) {

        this.page = page
        this.acceptCookiesButton = page.getByRole('button').filter({hasText: 'Alright!'})
    }

    async acceptCookies() {
         if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click()
        }
    }

}