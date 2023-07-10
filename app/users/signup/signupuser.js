async function signUpUser (uname, mail, pw) {
  try {
    const res = await fetch('http://localhost:5222/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: uname,
        email: mail,
        role: 'user', // * users created on the frontend don't have admin rights
        password: pw
      })
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return res.text()
  } catch (error) {
    return error.message
  }
}

export default signUpUser
