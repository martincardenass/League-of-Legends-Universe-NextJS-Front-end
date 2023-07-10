function shuffle (value) { // * Fisher Yates algorithm to shuffle arrays
  for (let i = 0; i < 5; i++) {
    const temp = value[i]
    const r = Math.floor(Math.random() * value.length)
    value[i] = value[r]
    value[r] = temp
  }
  return value
}

export default shuffle
