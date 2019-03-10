export class TransformString {
    /**
     * Capitalize a piece of text.
     */
    public static capitalize(text: string): string {
        return `${text[0].toUpperCase()}${text.slice(1)}`
    }

    /**
     * Truncate a piece of a text to a given maximum length, including the replacement dots.
     */
    public static truncate(text: string, maxLength: number): string {
        const dots = '...'
        return (text.length + dots.length) >= maxLength
            ? `${text.substr(0, maxLength - dots.length)}${dots}`
            : text
    }
}
