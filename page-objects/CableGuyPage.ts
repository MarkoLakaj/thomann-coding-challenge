import {Page, Locator} from '@playwright/test'
import { Helper } from '../utils/Helper'


export class CableGuyPage {

    private readonly page: Page
    private readonly addCableBeginningButton: Locator
    private readonly addCableEndButton: Locator
    private readonly cableTypeList: Locator
    private readonly manufacturerList: Locator
    private readonly foundItemsList: Locator

    constructor(page: Page) {
        this.page = page
        this.addCableBeginningButton = page.getByRole('button').filter({hasText: 'cable beginning'})
        this.addCableEndButton = page.getByRole('button').filter({hasText: 'cable end'})
        this.cableTypeList = page.locator('.items .cg-plugItem')
        this.manufacturerList = page.locator('.items .cg-brands__item')
        this.foundItemsList = page.locator('.fx-product-list-entry')
    }

    async clickCableBeginningButton() {
        await this.addCableBeginningButton.click()
    }

    async clickCableEndButton() {
        await this.addCableEndButton.click()
    }

    async verifyItemListMatchesManufacturersNumberOfProducts() {
        const manufacturerProducts = this.page.locator('.cg-brands__item.clicked.active + .cg-brands__item__count')
        const manufacturerProductsValue = parseInt((await manufacturerProducts.textContent()) || '0', 10)
        const numberOfFoundItems = await this.countAllFoundItems()
        return manufacturerProductsValue === numberOfFoundItems
    }

    async countAllFoundItems(): Promise<number> {
        let totalCount = 0
        let hasNext = true

        while (hasNext) {
            // Count items on current page
            const currentCount = await this.foundItemsList.count()
            totalCount += currentCount

            // Check if "Next" button exists and is enabled
            const nextButton = this.page.locator('.cg-icons__arrow--right')
            if (await nextButton.isVisible() && await nextButton.isEnabled()) {
                await nextButton.click()
                await this.page.waitForLoadState('networkidle')
            } else {
                hasNext = false
            }
        }

        return totalCount
    }

    async selectRandomListedItem() {

        const count = await this.foundItemsList.count()
        if (count === 0) throw new Error('No item found!')

        const randomIndex = Math.floor(Math.random() * count)
        const randomItemSelected = this.foundItemsList.nth(randomIndex)
        const itemManufacturer = await randomItemSelected.locator('.title__manufacturer').textContent()
        const itemName = await randomItemSelected.locator('.title__name').textContent()
        const productName = `${itemManufacturer}${itemName}`
        await randomItemSelected.click()
        return productName
    }

    // Wrappers for test readability
    async selectRandomCableType() {
        await Helper.selectRandomItemFromTheList(this.cableTypeList)
        // This should be removed ASAP, and replaced with more elegant solution
        // right now it serves as a coding challenge time saver
        await this.page.waitForTimeout(2000)
    }

    async selectRandomManufacturer() {
        await Helper.selectRandomItemFromTheList(this.manufacturerList)
        // This should be removed ASAP, and replaced with more elegant solution
        // right now it serves as a coding challenge time saver
        await this.page.waitForTimeout(2000)
    }

}