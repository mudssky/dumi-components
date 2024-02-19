import { useEffect, useLayoutEffect, useRef } from 'react'

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
  options?: {
    saveDuration?: number
    checkIsPlaying?: () => boolean
  },
) {
  const { saveDuration = 60, checkIsPlaying } = options || {}
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

/**
 * 使用useRef同步state的值，解决useEffect闭包陷阱问题
 * 还有一种方法是使用setState时使用函数就不会产生闭包。或者使用useReducer
 *
 * @param state
 * @returns
 *
 * @example
 * 这个是经典案例
 *     const [count,setCount] = useState(0);
    useEffect(() => {
        setInterval(() => {
            console.log(count);
            setCount(count + 1);
        }, 1000);
    }, []);
 */
function useStateRef<T = any>(state: T) {
  const stateRef = useRef<T>(state)
  // 每次渲染时更新stateRef，确保每次ref中是最新的state
  useLayoutEffect(() => {
    stateRef.current = state
  })
  return stateRef
}

export { useStateRef, useVideoTimer }
