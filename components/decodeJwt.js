function decodeJwt (value) {
  const decodedToken = JSON.parse(window.atob(value.split('.')[1]))

  const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
  const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  return { id, username, email, role } // returns an object containing id, username, email and role
}

export default decodeJwt
// * https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
