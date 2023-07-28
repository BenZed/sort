import { test, expect } from '@jest/globals'
import { toComparable } from './to-comparable'

test(toComparable.name, () => {
    expect(toComparable('cake') < toComparable('base')).toBe(false)
    expect(toComparable([0, 1]) < toComparable([0, 1, 2])).toBe(true)
    expect(toComparable([0, 1]) === toComparable([3, 2])).toBe(true)
    expect(toComparable(15) > toComparable(10)).toBe(true)
    expect(toComparable(15n) > toComparable(10n)).toBe(true)
    expect(toComparable(15n) === toComparable(15n)).toBe(true)
})
