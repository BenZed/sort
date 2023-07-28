import { isBigInt, isBoolean, isNumber, isString, isGenericObject } from '@benzed/types'


//// Types ////

export type SortableObjects = { valueOf(): bigint | number | boolean } | { length: number }
export type Sortable = string | bigint | number | boolean | SortableObjects

export type SortableValues<T> = T extends string
    ? { length: number, [index: number]: unknown }
    : T extends object 
        ? { [K in keyof T as T[K] extends Sortable ? K : never]: T[K] } 
        : never


//// These are here instead of `is` to resolve conflicting dependencies ////

export const isSortable = <T extends Sortable>(input: unknown): input is T => {
    if (isGenericObject(input)) {
        input =
            'length' in input && isNumber(input.length)
                ? input.length
                : input.valueOf()
    }

    return (
        isNumber(input) ||
        isString(input) ||
        isBigInt(input) ||
        isBoolean(input)
    )
}

