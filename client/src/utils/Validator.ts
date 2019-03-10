export class Validator {
    public static isValidDate(text: string): boolean {
        const dateToTest = new Date(text)
        return Boolean(+dateToTest)
    }

    public static isObject(subject: any): boolean {
        return !Array.isArray(subject)
            && typeof subject !== 'function'
            && subject === Object(subject)
    }

    public static isTruthyArray(value: any): boolean {
        return Array.isArray(value) && value.length > 0
    }

    public static isPromise(value: any): boolean {
        return !!value
            && (typeof value === 'object' || typeof value === 'function')
            && typeof value.then === 'function'
    }

    public static isSvgElement(component: string): boolean {
        // tslint:disable-next-line:ter-max-len
        const validSvgElements = [ 'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'foreignObject', 'g', 'hatch', 'hatchpath', 'image', 'line', 'linearGradient', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tspan', 'unknown', 'use', 'view' ]
        return validSvgElements.includes(component)
    }
}
