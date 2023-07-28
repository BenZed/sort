import { it, expect, describe } from '@jest/globals'
import { isSortable } from './sortable'

describe('isSortable', () => {
    it('should return true for sortable values', () => {
        expect(isSortable(1)).toBe(true)
        expect(isSortable('hello')).toBe(true)
        expect(isSortable(true)).toBe(true)
    })

    it('should return false for non-sortable values', () => {
        expect(isSortable({})).toBe(false)
        expect(isSortable(null)).toBe(false)
        expect(isSortable(undefined)).toBe(false)
    })
})
