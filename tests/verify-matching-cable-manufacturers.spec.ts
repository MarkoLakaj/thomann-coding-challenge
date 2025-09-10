import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/PageManager'

test('Should add the correct cable to the basket after random selection', async ({ page }) => {
    const pageManager = new PageManager(page)

    // Navigate to CableGuy page and handle cookies
    await page.goto('/cableguy.html')
    await pageManager.onCookieModal().acceptCookies()

    // Select random Cable Beginning and End types
    await pageManager.onCableGuyPage().clickCableBeginningButton()
    await pageManager.onCableGuyPage().selectRandomCableType()
    await pageManager.onCableGuyPage().clickCableEndButton()
    await pageManager.onCableGuyPage().selectRandomCableType()

    // Select a random manufacturer and verify product count
    await pageManager.onCableGuyPage().selectRandomManufacturer()
    expect(
        await pageManager.onCableGuyPage().verifyItemListMatchesManufacturersNumberOfProducts()
    ).toBe(true)

    // Select a random product and verify its name on the product page
    const productName = await pageManager.onCableGuyPage().selectRandomListedItem()
    expect(await pageManager.onProductPage().getProductName()).toBe(productName)

    // Add product to basket and verify popup notification
    await pageManager.onProductPage().addProductToBasket()
    const popupText = await pageManager.onBasketPage().getBasketNotificationPopupText()
    expect(popupText).toContain(productName)
})