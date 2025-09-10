import normalizeSpace from 'normalize-space'


export class Helper {

    static normalizeWhiteSpace(str: string | null): string {
        return normalizeSpace(str || '')
    }
}