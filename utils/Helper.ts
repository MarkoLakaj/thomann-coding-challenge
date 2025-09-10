import { Locator } from '@playwright/test'
import normalizeSpace from 'normalize-space'

/**
 * Utility class for reusable helper methods.
 */
export class Helper {

    /**
     * Normalizes whitespace in a string (removes extra spaces, trims).
     * @param str The string to normalize
     * @returns Normalized string
     */
    static normalizeWhiteSpace(str: string | null): string {
        return normalizeSpace(str || '')
    }

    /**
     * Selects a random item from the Locator list.
     * Waits for the element to be visible before clicking.
     * @param itemLocator Locator representing a list of items
     */
    static async selectRandomItemFromTheList(itemLocator: Locator): Promise<void> {
        const count = await itemLocator.count()
        if (count === 0) throw new Error('No item found!')

        const randomIndex = Math.floor(Math.random() * count)
        await itemLocator.nth(randomIndex).waitFor({ state: 'visible' })
        await itemLocator.nth(randomIndex).click()
    }
}