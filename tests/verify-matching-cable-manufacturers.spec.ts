import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/PageManager'


test('Verify the matching number of manufacturers for a random cable', async({page}) => {

    const pageManager = new PageManager(page)

    await page.goto('https://www.thomann.de/intl/cableguy.html')
    await pageManager.onCookieModal().acceptCookies()
    await pageManager.onCableGuyPage().clickCableBeginningButton()
    await pageManager.onCableGuyPage().selectRandomCableType()
    await pageManager.onCableGuyPage().clickCableEndButton()
    await pageManager.onCableGuyPage().selectRandomCableType()
    await pageManager.onCableGuyPage().selectRandomManufacturer()
    expect(await pageManager.onCableGuyPage().verifyItemListMatchesManufacturersNumberOfProducts()).toBe(true)

    
})