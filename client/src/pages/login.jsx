import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  
  // https://tailwindui.com/components/application-ui/forms/sign-in-forms
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleFormSubmit} className='space-y-6' action='#' method='POST'>
          {error ? (
            <p className='p-5 text-lg bg-red-600 text-white font-bold rounded-md'>
              There was an error logging you in, please try again.
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
                autoComplete='current-password'
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
          Don&apos;t have an account?{' '}
          <Link to='/sign-up' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
