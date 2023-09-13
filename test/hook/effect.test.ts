import { randomInt } from '@mudssky/jsutils'
import { useVideoTimer } from '@mudssky/react-components'
import { renderHook } from '@testing-library/react-hooks'
import { beforeEach, describe, expect, test, vi } from 'vitest'
describe('useVideoTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test.concurrent(
    'time goes by less than 60',
    async () => {
      let count = 0
      const seconds = randomInt(60)
      const { result } = renderHook(() =>
        useVideoTimer(() => {
          count += 1
        }),
      )
      vi.advanceTimersByTime(seconds * 1000)

      expect(count).toBe(0)
      expect(result.current.getTimeCount()).toBe(seconds)
    },
    {
      repeats: 5,
    },
  )

  test.concurrent(
    'time goes by larger than 60',
    async () => {
      let count = 0
      const seconds = randomInt(60, 500)
      const { result } = renderHook(() =>
        useVideoTimer(() => {
          count += 1
        }),
      )
      vi.advanceTimersByTime(seconds * 1000)

      expect(count).toBe(Math.floor(seconds / 60))
      expect(result.current.getTimeCount()).toBe(seconds % 60)
    },
    {
      repeats: 5,
    },
  )
  test.concurrent(
    'timer unmount',
    async () => {
      let secondsCount = 0
      let count = 0
      const seconds = randomInt(0, 500)
      const { result, unmount } = renderHook(() =>
        useVideoTimer((time) => {
          count += 1
          secondsCount += time
        }),
      )
      vi.advanceTimersByTime(seconds * 1000)
      unmount()
      expect(count).toBe(Math.ceil(seconds / 60))
      expect(result.current.getTimeCount()).toBe(0)
      expect(secondsCount).toBe(seconds)
    },
    {
      repeats: 5,
    },
  )

  test.concurrent(
    'play stop',
    async () => {
      let secondsCount = 0
      let count = 0
      const seconds = randomInt(0, 500)
      const { result, unmount } = renderHook(() =>
        useVideoTimer(
          (time) => {
            count += 1
            secondsCount += time
          },
          {
            checkIsPlaying: () => {
              return false
            },
          },
        ),
      )
      vi.advanceTimersByTime(seconds * 1000)
      unmount()
      expect(count).toBe(0)
      expect(result.current.getTimeCount()).toBe(0)
      expect(secondsCount).toBe(0)
    },
    {
      repeats: 5,
    },
  )
})
