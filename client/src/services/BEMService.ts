import c from 'classnames'
import { prefixWithAppPrefix } from '../config'
import isPlainObject from 'lodash-es/isPlainObject'
import kebabCase from 'lodash-es/kebabCase'

type BEMBlockValue = string
export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false

interface ClassDictionary {
    [id: string]: boolean | undefined | null
}

interface ClassArray extends Array<ClassValue> { } // tslint:disable-line no-empty-interface

export class BEM<TModifierParams = object> {
    private block: BEMBlockValue
    private getModifiers?: (modifierParams: Partial<TModifierParams>) => ClassDictionary

    constructor(block: BEMBlockValue, getModifiers?: (modifierParams: Partial<TModifierParams>) => ClassDictionary) {
        this.validateBlockName(block)

        this.block = block
        this.getModifiers = getModifiers
    }

    /**
     * Get the composed block class including modifiers
     */
    public getClassName(inheritedClassname?: ClassValue, modifierParams: Partial<TModifierParams> = {}) {
        const prefixedName = this.getPrefixedBlockName()

        const prefixedModifiers = this.getModifiers ? this.getPrefixedModifiers(prefixedName, this.getModifiers(modifierParams)) : {}

        return c(
            prefixedName,
            prefixedModifiers,
            inheritedClassname
        )
    }

    /**
     * Get the composed element class
     */
    public getElement(element: string, getModifiers?: () => ClassDictionary) {
        this.validateElementName(element)

        const prefixedName = this.getPrefixedBlockName()
        const elementName = this.getElementClassName(prefixedName, element)

        const prefixedModifiers = getModifiers ?
            this.getPrefixedModifiers(elementName, getModifiers())
            : {}

        return c(
            elementName,
            prefixedModifiers
        )
    }

    /**
     * Add the project prefix to the given string
     * (e.g. Title -> bw-Title)
     *
     * @param classname
     */
    private getPrefixedBlockName() {
        return prefixWithAppPrefix(this.block)
    }

    /**
     * Get a modifier (e.g. 'bw-Title--is-active')
     *
     * @param name The base name (e.g. 'bw-Title')
     * @param modifier The modifier name (e.g. 'is-active')
     */
    private getModifierClassName(name: string, modifier: string) {
        this.validateModifierName(modifier)

        return `${name}--${modifier}`
    }

    /**
     * Get a modifier (e.g. 'bw-Title__reflection')
     *
     * @param name The base name (e.g. 'bw-Title')
     * @param element The element name (e.g. 'reflection')
     */
    private getElementClassName(name: string, element: string) {
        return `${name}__${element}`
    }

    /**
     * Validate a given block name
     *
     * @param name
     */
    private validateBlockName(name: string) {
        if (name.includes('-') || name.includes('_')) {
            throw new Error(`Invalid element name "${name}": may not contain dash or underscore.`)
        }
    }

    /**
     * Validate a given element name
     *
     * @param name
     */
    private validateElementName(name: string) {
        if (name.includes('_')) {
            throw new Error(`Invalid element name "${name}": may not contain underscores.`)
        }

        this.validateAgainstUppercaseCharacters(name)
    }

    /**
     * Validate a given modifier name
     *
     * @param name
     */
    private validateModifierName(name: string) {
        if (name.includes('_')) {
            throw new Error(`Invalid modifier name "${name}": may not contain underscore.`)
        }

        this.validateAgainstUppercaseCharacters(name)
    }

    /**
     * Validate against uppercase characters
     *
     * @param name
     */
    private validateAgainstUppercaseCharacters(name: string) {
        if (name.match(/[A-Z]/g)) {
            throw new Error(`Invalid element name "${name}": should not include uppercase characters.`)
        }
    }

    /**
     * Prefixes modifiers with the prefix key
     */
    private getPrefixedModifiers(parentName: string, modifierClasses: ClassDictionary) {
        const prefixed = {}

        if (!isPlainObject(prefixed)) {
            throw new Error('The getModifiers must return a plain object')
        }

        for (const key of Object.keys(modifierClasses)) {
            prefixed[this.getModifierClassName(parentName, kebabCase(key))] = modifierClasses[key]
        }

        return prefixed
    }
}
