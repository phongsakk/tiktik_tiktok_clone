import { useEffect, useState } from "react"

export interface WindowSize {
  width: number
  height: number
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
  })

  const resolutionChane = () => {
    const { innerHeight: height, innerWidth: width } = window

    setSize({
      width: innerWidth,
      height: innerHeight,
      breakpoint: innerWidth > 1536 ? '2xl' : innerWidth > 1280 ? 'xl' : innerWidth > 1024 ? 'lg' : innerWidth > 768 ? 'md' : innerWidth > 640 ? 'sm' : 'xs'
    })
  }

  useEffect(() => {
    window.addEventListener('resize', resolutionChane)
    window.addEventListener('DOMContentLoaded', resolutionChane)
    return () => {
      window.removeEventListener('resize', resolutionChane)
      window.removeEventListener('DOMContentLoaded', resolutionChane)
    }
  }, [])

  return size
}

export default useWindowSize