import {Page} from '@playwright/test'
import { CookieModal } from "./CookieModal"
import { CableGuyPage } from './CableGuyPage'


export class PageManager {

    private readonly page: Page
    private readonly cookieModal: CookieModal
    private readonly cableGuyPage: CableGuyPage

    constructor(page: Page) {
        this.page = page
        this.cookieModal = new CookieModal(this.page)
        this.cableGuyPage = new CableGuyPage(this.page)
    }

    onCookieModal() {
        return this.cookieModal
    }

    onCableGuyPage() {
        return this.cableGuyPage
    }

}

