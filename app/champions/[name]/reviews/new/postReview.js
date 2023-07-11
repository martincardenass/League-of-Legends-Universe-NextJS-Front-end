async function postReview (championname, token, rating, reviewTitle, reviewText) {
  try {
    const url = `http://localhost:5222/api/Review/post/${championname}?rating=${rating}`
    const res = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // * Send token so review gets posted to the logged-in user
        },
        body: JSON.stringify({
          title: reviewTitle,
          text: reviewText
        })
      }
    )

    if (!res.ok) { // ! Handle errors appropriately
      throw new Error(await res.text())
    }

    return res.text()
  } catch (error) {
    return error.message
  }
}

export default postReview
