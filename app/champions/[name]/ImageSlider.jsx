'use client'
import styles from './championsname.module.css'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const ImageSlider = ({ champion }) => {
  const images = []
  const reference = useRef()

  useEffect(() => {
    const handleScroll = (event) => {
      const element = reference.current
      if (!element) return

      // Extract the current size of the window, will use it to determine the speed of the scroll slider
      const windowWidth = window.innerWidth

      // * propierties we need from the reference element
      const { scrollWidth, clientWidth, scrollLeft } = element

      // * calculate if we reached the left side end
      const endReached = scrollLeft + clientWidth > scrollWidth - 10

      if (endReached && event.deltaY >= 0) {
        return
      }

      const startReached = scrollLeft === 0

      if (startReached && event.deltaY < 0) {
        return
      }

      event.preventDefault()
      element.style.scrollSnapType = 'x proximity'
      element.scrollBy({
        left: event.deltaY > 0 ? windowWidth : -windowWidth, // * image size is the speed of scrolling
        behavior: 'smooth'
      })
    }

    const element = reference.current
    if (element) {
      element.addEventListener('wheel', handleScroll)
    }

    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const element = reference.current
    let isMouseDown = false
    let startPosX = 0
    let startScrollLeft = 0

    const handleMouseDown = (event) => {
      isMouseDown = true
      startPosX = event.clientX // Store the initial X position of the mouse
      startScrollLeft = element.scrollLeft // Store the initial scrollLeft position of the element
    }

    const handleMove = (event) => {
      if (!isMouseDown) return // If the mouse button is not pressed, exit the function
      event.preventDefault()

      const posX = event.clientX // Calculate the distance moved horizontally by the mouse
      const scroll = (posX - startPosX) * 1.5 // Update the scrollLeft position based on the initial position and the distance moved

      element.style.scrollSnapType = 'none' // * x proximty looks bad
      element.scrollLeft = startScrollLeft - scroll
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    if (element) {
      element.addEventListener('mousedown', handleMouseDown)
      element.addEventListener('mousemove', handleMove)
      element.addEventListener('mouseup', handleMouseUp)
    }

    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  for (let i = 0; i < champion.additionalImages.length; i++) {
    images.push(
      <Image
        className={styles.sliderimg}
        key={i}
        src={champion.additionalImages[i]}
        alt={champion.name}
        width={2000}
        height={715}
        quality={100}
        style={{ maxWidth: '100%', height: '100%' }}
      />
    )
  }

  return (
    <section ref={reference} className={styles.slider}>
      {images}
    </section>
  )
}

export default ImageSlider
