import { TransformObject } from './TransformObject'
import { Validator } from './Validator'

export class TransformArray {
    /**
     * Create a multi-dimensional array from an array based on a certain size.
     */
    public static chunk(arr: any[], size: number): any[] {
        return arr.reduce((arr, item, idx) => {
            return idx % size === 0
                ? [ ...arr, [item]]
                : [ ...arr.slice(0, -1), [ ...arr.slice(-1)[0], item ]]
        }, [])
    }

    /**
     * Returns an array of truthy values based on an array.
     */
    public static compact(arr: any[]): any[] {
        return arr.filter(Boolean)
    }

    /**
     * Performs a deep clean on an array,
     * where it will remove all falsy values from this array and all falsy values from nested objects and arrays.
     */
    public static deepCleanArray(subject: any[]): any[] {
        return subject
            .map(item => {
                if (Validator.isTruthyArray(item)) {
                    return TransformArray.deepCleanArray(item)
                }

                if (Validator.isObject(item)) {
                    return TransformObject.deepCleanObject(item)
                }

                if ((!Array.isArray(item) && item) || typeof item === 'number') {
                    return item
                }
            })
            .filter(item => !!item)
    }

    /**
     * Get a unique array from an array of objects, where you need to pass a key which needs to be unique in each object.
     */
    public static getUniqueArrayByObjectKey<TData>(objects: TData[], key: string): TData[] {
        const uniques = new Set()

        return objects.filter(object => {
            if (!uniques.has(object[key])) {
                uniques.add(object[key])
                return true
            }

            return false
        })
    }
}
