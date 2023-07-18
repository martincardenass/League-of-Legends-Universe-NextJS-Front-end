async function patchReview (id, token, rating, reviewTitle, reviewText) {
  try {
    const url = `http://localhost:5222/api/Review/${id}?NewRating=${rating}`
    const res = await fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: reviewTitle, text: reviewText
        })
      })
    // * All validations are done in the backend

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return { success: true, message: res.text() } // * req was succesfull
  } catch (error) {
    return { success: false, message: error.message } // * re was not succesfull
  }
}

export default patchReview
