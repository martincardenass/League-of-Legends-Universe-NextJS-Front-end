'use client'
import { useState } from 'react'
import styles from './new/newreview.module.css'

function SelectHearts () {
  const [heartCount, setHeartCount] = useState(0)
  const hearts = []

  const handleHeartClick = (event) => {
    setHeartCount(parseInt(event.target.id))
  }

  for (let i = 5; i >= 1; i--) {
    const isClicked = i <= heartCount // * Workaround for selected hearts.
    hearts.push(
      <label key={i} onClick={() => { setHeartCount(i) }}>
        <span id={i} className={isClicked ? styles.clicked : ''} onClick={handleHeartClick}>❤</span>
      </label>
    )
  }
  return { hearts, heartCount, setHeartCount }
}

export default SelectHearts
