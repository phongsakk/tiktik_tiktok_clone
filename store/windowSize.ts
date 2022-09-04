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

  const resolutionChange = () => {
    const { innerHeight: height, innerWidth: width } = window

    setSize({
      width: innerWidth,
      height: innerHeight,
      breakpoint: innerWidth > 1536 ? '2xl' : innerWidth > 1280 ? 'xl' : innerWidth > 1024 ? 'lg' : innerWidth > 768 ? 'md' : innerWidth > 640 ? 'sm' : 'xs'
    })
  }

  useEffect(() => {
    window.addEventListener('resize', resolutionChange)
    window.addEventListener('DOMContentLoaded', resolutionChange)
    window.onload = () => resolutionChange()
    return () => {
      window.removeEventListener('resize', resolutionChange)
      window.removeEventListener('DOMContentLoaded', resolutionChange)
      window.onload = () => {}
    }
  }, [])

  return size
}

export default useWindowSize