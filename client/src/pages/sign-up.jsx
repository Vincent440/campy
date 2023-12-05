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
 
 // https://tailwindui.com/components/application-ui/forms/sign-in-forms
 return (
   // <div>
    //   <h1>Sign Up</h1>
    //   <p>
    //     Already a user? <Link to='/login'>Login</Link>
    //   </p>
    //   <form onSubmit={handleFormSubmit}>
    //     <label htmlFor='email-signup'>Email: </label>
    //     <input required onChange={handleChange} type='email' name='email' id='email-signup' />
    //     <br />

    //     <label htmlFor='password-signup'>Password: </label>
    //     <input required onChange={handleChange} type='password' name='password' id='password-signup' minLength={8} />
    //     <br />
    //     {error ? <p>Sorry there was an error creating your account, please try again.</p> : null}

    //     <button type='submit'>Create Account</button>
    //   </form>
    // </div>
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
      <img
        className='mx-auto h-10 w-auto'
        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
        alt='Your Company'
      />
      <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        Create a new account
      </h2>
    </div>

    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <form onSubmit={handleFormSubmit} className='space-y-6' action='#' method='POST'>
        {error ? (
          <p className='p-5 text-lg bg-red-600 text-white font-bold rounded-md'>
            There was an error creating your account, please try again.
          </p>
        ) : null}
        <div>
          <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Password
            </label>
            {/* <div className='text-sm'>
                <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                  Forgot password?
                </a>
              </div> */}
          </div>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='new-password'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign in
          </button>
        </div>
      </form>

      <p className='mt-10 text-center text-sm text-gray-500'>
        Already have an account?{' '}
        <Link to='/login' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
          Login
        </Link>
      </p>
    </div>
  </div>
  )
}

export default SignUp
