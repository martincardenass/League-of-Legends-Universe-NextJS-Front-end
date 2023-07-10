async function authCredentials (user, pw) {
  try { // * trycatch block avoids nextjs error warning
    const url = 'http://localhost:5222/api/User/login'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user,
        password: pw
      })
    })

    if (!res.ok) { // * If the response its not ok, return the error message
      throw new Error(await res.text()) // * as plaint text
    }

    return res.text() // * Returning a plain text with the token
  } catch (error) {
    return error.message
  }
}

export default authCredentials
