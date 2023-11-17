import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import Auth from '../utils/auth'
import { ADD_USER } from '../utils/mutations'

const SignUp = () => {
  const [addUser, { error }] = useMutation(ADD_USER)
  const [signupFormState, setSignupFormState] = useState({ email: '', password: '' })

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const mutationResponse = await addUser({
        variables: { email: signupFormState.email, password: signupFormState.password },
      })
      const token = mutationResponse.data.addUser.token
      Auth.login(token)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    })
  }

  /* 
  TODO:  Remove <br /> elements when adding styling 
  */

  return (
    <div>
      <h1>Sign Up</h1>
      <p>
        Already a user? <Link to='/login'>Login</Link>
      </p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='email-signup'>Email: </label>
        <input required onChange={handleChange} type='email' name='email' id='email-signup' />
        <br />

        <label htmlFor='password-signup'>Password: </label>
        <input required onChange={handleChange} type='password' name='password' id='password-signup' minLength={8} />
        <br />
        {error ? <p>Sorry there was an error creating your account, please try again.</p> : null}

        <button type='submit'>Create Account</button>
      </form>
    </div>
  )
}

export default SignUp
