import styles from './new/newreview.module.css'

const Hearts = ({ review }) => {
  const hearts = []
  for (let i = 5; i >= 1; i--) {
    const isHearted = i <= review.rating
    hearts.push(
      <label key={i}>
        <span className={isHearted ? styles.clicked : ''}>❤</span>
      </label>
    )
  }
  return hearts.reverse()
}

export default Hearts
