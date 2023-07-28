import { isString } from '@benzed/types'

import { Sortable } from './sortable'
import { toSubtractable } from './to-subtractable'

//// Exports ////

export function toComparable<T extends Sortable>(
    sortable: T
): string | number | bigint {
    if (isString(sortable)) return sortable

    return toSubtractable(sortable)
}
