import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/PageManager'


test('Verify the matching number of manufacturers for a random cable', async({page}) => {

    const pageManager = new PageManager(page)

    await page.goto('/cableguy.html')
    await pageManager.onCookieModal().acceptCookies()
    await pageManager.onCableGuyPage().clickCableBeginningButton()
    await pageManager.onCableGuyPage().selectRandomCableType()
    await pageManager.onCableGuyPage().clickCableEndButton()
    await pageManager.onCableGuyPage().selectRandomCableType()
    await pageManager.onCableGuyPage().selectRandomManufacturer()
    expect(await pageManager.onCableGuyPage().verifyItemListMatchesManufacturersNumberOfProducts()).toBe(true)

    const productName = await pageManager.onCableGuyPage().selectRandomListedItem()
    expect(await pageManager.onProductPage().getProductName()).toBe(productName)

    await pageManager.onProductPage().addProductToBasket()
    const popupText = await pageManager.onBasketPage().getBasketNotificationPopupText()
    expect(popupText).toContain(productName)

})