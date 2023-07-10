function logout () {
  localStorage.removeItem('token')
  location.replace('/')
}

export default logout
