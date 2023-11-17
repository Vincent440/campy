import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'

import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

const Login = () => {
  const [loginFormState, setLoginFormState] = useState({ email: '', password: '' })

  const [loginUser, { error }] = useMutation(LOGIN_USER)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const mutationResponse = await loginUser({
        variables: { email: loginFormState.email, password: loginFormState.password },
      })
      const token = mutationResponse.data.login.token
      Auth.login(token)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    })
  }
  /* 
 TODO:  Remove <br /> elements when adding styling 
*/
  return (
    <div>
      <h1>Login</h1>
      <p>Don&apos;t have an account? <Link to='/sign-up'>Sign Up</Link></p>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor='email-login'>Email: </label>
        <input required onChange={handleChange} type='email' name='email' id='email-login' />
        <br />

        <label htmlFor='password-login'>Password: </label>
        <input required onChange={handleChange} type='password' name='password' id='password-login' />
        <br />
        {error ? <p>There was an error logging you in, please try again.</p> : null}

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
