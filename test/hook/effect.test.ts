import { useVideoTimer } from '@mudssky/react-components'
import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, test, vi } from 'vitest'
describe('genAllCasesCombination', () => {
  test('time goes by less than 60', () => {
    let count = 0
    const { result } = renderHook(() =>
      useVideoTimer(() => {
        count = count + 1
      }),
    )

    vi.useFakeTimers()
    vi.advanceTimersByTime(10000)
    expect(count).toBe(1)
    expect(result.current.getTimeCount()).toBe(10000)
  })
})
