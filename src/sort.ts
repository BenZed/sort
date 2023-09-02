import { isFunc, isNumber, isString, isSymbol } from '@benzed/types'
import { Sortable, SortableValues } from './sortable'
import { toSubtractable } from './to-subtractable'

/**
 * Sorting method
 */
type Sorter<T = Sortable> = (a: T, b: T) => number

//// Helper ////

/**
 * Compares inputs as values
 */
const byValue: Sorter = <T extends Sortable>(a: T, b: T) =>
    isString(a)
        ? a > b
            ? 1
            : a < b
            ? -1
            : 0
        : toSubtractable(a) - toSubtractable(b)

type ByTransform<T> = (i: T) => Sortable

const byTransform: <T>(transform: ByTransform<T>) => Sorter<T> =
    transform => (a, b) =>
        byValue(transform(a), transform(b))

/**
 * Keys of a given object that have sortable values
 */
type ByKey<T> = keyof SortableValues<T> extends infer K
    ? symbol | string extends K
        ? never
        : K
    : never

const byKey: <T>(key: ByKey<T>) => Sorter<T> = key =>
    byTransform(v => v[key] as Sortable)

type ByTransformOrKey<T> = ByKey<T> | ByTransform<T>
const toSorter = <T>(option: ByTransformOrKey<T>): Sorter<T> => {
    if (isFunc(option)) return byTransform(option)

    if (isString(option) || isNumber(option) || isSymbol(option))
        return byKey(option)

    return byValue as Sorter<T>
}

//// Main Method ////

interface By {
    <T>(): Sorter<T>
    <T>(key: ByKey<T>): Sorter<T>
    <T>(transform: ByTransform<T>): Sorter<T>
    <T>(...options: ByTransformOrKey<T>[]): Sorter<T>
    value: Sorter

    // get descending(): By
    // get ascending(): By
}

const by = (<T>(...options: ByTransformOrKey<T>[]): Sorter<T> => {
    const sorters = options.map(toSorter)

    return (a, b) => {
        for (const sorter of sorters) {
            const result = sorter(a, b)
            if (result !== 0) return result
        }

        return byValue(a as Sortable, b as Sortable)
    }
}) as By

by.value = byValue

//// Exports ////

export default by

export { Sorter, Sortable, by }
