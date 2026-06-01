import { expect, it } from 'vitest'
import { buildQueryForTest } from '../exams'

it('serialises q', () => {
  expect(buildQueryForTest({ cat: 'vao-10', q: 'ha noi' })).toContain('q=ha+noi')
})
