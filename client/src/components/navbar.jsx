import { NavLink } from 'react-router-dom'
// NavLink applies the 'active' class styling to the currently visited route.
import Auth from '../utils/auth'
const Navbar = () => {
  const renderLoginLinks = () => {
    // If users logged in display a logout link that refreshes the page by not using a react-router-dom link after calling logout,
    if (Auth.loggedIn()) {
      return (
        <li>
          <a href='/login' onClick={() => Auth.logout()}>
            Logout
          </a>
        </li>
      )
    } else {
      // If the user is not logged in show a Login link or a Sign Up link
      return (
        <>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/sign-up'>Sign Up</NavLink>
          </li>
        </>
      )
    }
  }

  return (
    <nav>
      <span>Campy &copy; </span>
      <ul>
        <li>
          <NavLink to='/' end>
            Dashboard
          </NavLink>
        </li>
        {renderLoginLinks()}
      </ul>
    </nav>
  )
}

export default Navbar
