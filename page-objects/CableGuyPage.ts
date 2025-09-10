import { Page, Locator } from '@playwright/test'
import { Helper } from '../utils/Helper'

/**
 * Page Object representing the CableGuy page, allowing interaction
 * with cable selections, manufacturers, and listed products.
 */
export class CableGuyPage {

    private readonly page: Page
    private readonly addCableBeginningButton: Locator
    private readonly addCableEndButton: Locator
    private readonly cableTypeList: Locator
    private readonly manufacturerList: Locator
    private readonly foundItemsList: Locator

    constructor(page: Page) {
        this.page = page
        this.addCableBeginningButton = page.locator('.cg-plugButton--left')
        this.addCableEndButton = page.locator('.cg-plugButton--right')
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

    /**
     * Verifies that the number of listed items matches the
     * expected number displayed under the selected manufacturer.
     */
    async verifyItemListMatchesManufacturersNumberOfProducts(): Promise<boolean> {
        const manufacturerProducts = this.page.locator('.cg-brands__item.clicked.active + .cg-brands__item__count')
        const manufacturerProductsValue = parseInt((await manufacturerProducts.textContent()) || '0', 10)
        const numberOfFoundItems = await this.countAllFoundItems()
        return manufacturerProductsValue === numberOfFoundItems
    }

    /**
     * Counts all listed items across pagination.
     */
    async countAllFoundItems(): Promise<number> {
        let totalCount = 0
        let hasNext = true

        while (hasNext) {
            // Count items on current page
            const currentCount = await this.foundItemsList.count()
            totalCount += currentCount

            // Check for "Next" button
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

    /**
     * Selects a random listed item and returns its full product name.
     */
    async selectRandomListedItem(): Promise<string> {
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

    /** Wrapper to select a random cable type from the list. */
    async selectRandomCableType() {
        await Helper.selectRandomItemFromTheList(this.cableTypeList)
        // Temporary wait to allow UI to update after selection
        await this.page.waitForTimeout(2000)
    }

    /** Wrapper to select a random manufacturer from the list. */
    async selectRandomManufacturer() {
        await Helper.selectRandomItemFromTheList(this.manufacturerList)
        // Temporary wait to allow UI to update after selection
        await this.page.waitForTimeout(2000)
    }
}