import {Page} from '@playwright/test'
import { CookieModal } from "./CookieModal"
import { CableGuyPage } from './CableGuyPage'
import { ProductPage } from './ProductPage'
import { BasketPage } from './BasketPage'


export class PageManager {

    private readonly page: Page
    private readonly cookieModal: CookieModal
    private readonly cableGuyPage: CableGuyPage
    private readonly productPage: ProductPage
    private readonly basketPage: BasketPage

    constructor(page: Page) {
        this.page = page
        this.cookieModal = new CookieModal(this.page)
        this.cableGuyPage = new CableGuyPage(this.page)
        this.productPage = new ProductPage(this.page)
        this.basketPage = new BasketPage(this.page)
    }

    onCookieModal() {
        return this.cookieModal
    }

    onCableGuyPage() {
        return this.cableGuyPage
    }

    onProductPage() {
        return this.productPage
    }

    onBasketPage() {
        return this.basketPage
    }

}

