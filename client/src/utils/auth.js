// use this to decode a token and get the user's information out of it
// https://github.com/auth0/jwt-decode#readme

import { jwtDecode } from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile () {
    return jwtDecode(this.getToken())
  }

  // check if the user's logged in
  loggedIn () {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token) // return true if there is a token and that token is not expired
  }

  // check if token is expired
  isTokenExpired (token) {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp < Date.now() / 1000) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  getToken () {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  login (idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
    window.location.assign('/')
  }

  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    // this will reload the page and reset the state of the application
    window.location.assign('/')
  }
}

export default new AuthService()
