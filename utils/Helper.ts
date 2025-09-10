import { Locator } from '@playwright/test'
import normalizeSpace from 'normalize-space'


export class Helper {

    static normalizeWhiteSpace(str: string | null): string {
        return normalizeSpace(str || '')
    }

    static async selectRandomItemFromTheList(itemLocator: Locator) {
        const count = await itemLocator.count()
        if (count === 0) throw new Error('No item found!')

        const randomIndex = Math.floor(Math.random() * count)
        await itemLocator.nth(randomIndex).waitFor({ state: 'visible' })
        await itemLocator.nth(randomIndex).click()
    }
}