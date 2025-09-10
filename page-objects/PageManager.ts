import {Page} from '@playwright/test'
import { CookieModal } from "./CookieModal"



export class PageManager {

    private readonly page: Page
    private readonly cookieModal: CookieModal

    constructor(page: Page) {
        this.page = page
        this.cookieModal = new CookieModal(this.page)
    }

    onCookieModal() {
        return this.cookieModal
    }


}

