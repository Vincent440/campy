import { NavLink } from 'react-router-dom'
// NavLink applies the 'active' class styling to the currently visited route.

const Navbar = () => {
  return (
    <nav>
      <span>Campy &copy; </span>
      <ul>
        <li>
          <NavLink to='/' end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
          <NavLink to='/sign-up'>Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
