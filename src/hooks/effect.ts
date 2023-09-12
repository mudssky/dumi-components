import { useEffect, useRef } from 'react'

/**
 * 用于统计视频观看时长，saveFn会定期调用把已经观看的时间保存（调用后端接口加时间）。
 * judgeFn 判断当前视频是否在播放，播放停止时不计时
 * @param saveDuration 保存观看时间的间隔
 * @param saveFn 保存播放时间的函数
 * @param checkIsPlaying 判断时评是否在播放，不能是耗时操作，否则会导致时间比较大的误差。
 * @returns
 * @alpha
 */
function useVideoTimer(
  saveFn: (time: number) => void,
  saveDuration: number = 60,
  checkIsPlaying?: () => boolean,
) {
  const timeCountRef = useRef(0)
  function getTimeCount() {
    return timeCountRef.current
  }
  useEffect(() => {
    // 每秒时间加1的定时器，通过judgeFn判断，如果
    const timeCountInterval = setInterval(() => {
      const isPlaying = checkIsPlaying?.() ?? true
      if (isPlaying) {
        timeCountRef.current += 1
      }
    }, 1000)

    /**
     * 定期保存的定时器
     */
    const saveInterval = setInterval(() => {
      if (timeCountRef.current > 0) {
        saveFn(timeCountRef.current)
        timeCountRef.current = 0
      }
    }, saveDuration * 1000)

    return () => {
      clearInterval(saveInterval)
      clearInterval(timeCountInterval)
      // 页面关闭时，如果时间累计不为空，再执行一次保存
      if (timeCountRef.current > 0) {
        saveFn(timeCountRef.current)
        timeCountRef.current = 0
      }
    }
  }, [])
  return { getTimeCount }
}

export { useVideoTimer }
