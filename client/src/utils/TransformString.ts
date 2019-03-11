export function capitalizeString(text: string): string {
    return `${text[0].toUpperCase()}${text.slice(1)}`
}

export function truncateString(text: string, maxLength: number): string {
    const dots = '...'
    return (text.length + dots.length) >= maxLength
        ? `${text.substr(0, maxLength - dots.length)}${dots}`
        : text
}
