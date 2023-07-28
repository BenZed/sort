import { isBoolean, isObject, isNumber } from '@benzed/types'

import { Sortable } from './sortable'

//// Exports ////

export function toSubtractable<T extends Exclude<Sortable, string>>(
    input: T
): Extract<T, number | bigint> {
    if (isBoolean(input)) return (input ? 1 : 0) as Extract<T, number | bigint>
    //            ^ I know booleans are subtractable, but typescript mad

    if (isObject(input)) {
        return (
            'length' in input && isNumber(input.length)
                ? input.length
                : input.valueOf()
        ) as Extract<T, number | bigint>
    }

    return input as Extract<T, number | bigint>
}
