import { TransformArray } from './TransformArray'
import { Validator } from './Validator'

export class TransformObject {
    /**
     * Performs a deep clean on an object,
     * where it will remove all falsy values from this object and all falsy values from nested objects and arrays.
     */
    public static deepCleanObject(subject: Object) {
        return Object.keys(subject).reduce((newObj, property) => {
            const value = subject[property]

            if (Validator.isTruthyArray(value)) {
                const cleanedArray = TransformArray.deepCleanArray(value)

                if (Validator.isTruthyArray(cleanedArray)) {
                    newObj[property] = cleanedArray
                }
            }

            if (Validator.isObject(value)) {
                const nestedObject = TransformObject.deepCleanObject(value)

                if (Object.keys(nestedObject).length !== 0) {
                    newObj[property] = nestedObject
                }
            }

            if ((!Array.isArray(value) && value) || typeof value === 'number') {
                newObj[property] = value
            }

            return newObj
        }, {})
    }
}
