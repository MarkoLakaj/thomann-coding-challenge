import {Page, Locator, expect} from '@playwright/test'


export class CableGuyPage{

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

    async selectRandomItemFromTheList(itemLocator: Locator) {

        const count = await itemLocator.count()
        if (count === 0) throw new Error('No item found!')

        const randomIndex = Math.floor(Math.random() * count)
        await itemLocator.nth(randomIndex).waitFor({ state: 'visible' })
        await itemLocator.nth(randomIndex).click()
        // Temporary brute-forcing the timeout in order to wait for the list to update, in order to not waste time
        await this.page.waitForTimeout(2000)
    }

    async verifyItemListMatchesManufacturersNumberOfProducts() {
        const manufacturerProducts = this.page.locator('.cg-brands__item.clicked.active + .cg-brands__item__count')
        const manufacturerProductsValue = parseInt((await manufacturerProducts.textContent()) || '0', 10)
        const numberOfFoundItems = await this.foundItemsList.count()
        return manufacturerProductsValue === numberOfFoundItems
    }

    // Wrappers for test readability
    async selectRandomCableType() {
        await this.selectRandomItemFromTheList(this.cableTypeList)
    }

    async selectRandomManufacturer() {
        await this.selectRandomItemFromTheList(this.manufacturerList)
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
        console.log(productName)
        return productName
    }

    

    


}