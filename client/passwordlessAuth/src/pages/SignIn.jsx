// React and hooks
import React, { useState, useEffect } from 'react';

// Partials
import Snackbar from '../partials/Snackbar';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../redux/userSlice';
import { toggleSnackbarOpen, setType } from '../redux/snackbarSlice';

// Services
import UserService from '../services/user.service';

// Socket, used to confirm the authentication with the magic link sent by email
import { io } from 'socket.io-client';
import { url } from '../const';
const socket = io(url);

// Current time, to validate the sign in request
const timeNow = Date.now();

// Page
function SignIn() {
  // Redux dispatcher
  const dispatch = useDispatch();

  // Signin hooks
  const [email, setEmail] = useState('');
  const [sentKey, setSentKey] = useState('');
  const [buttonText, setButtonText] = useState('Sign in');
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const type = useSelector((state) => state.snackbar.type);

  // Send the sign in request
  const handleSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    UserService.signin(email, socket.id, timeNow, null).then(
      () => {
        setButtonText('Please check your inbox...');
      },
      (error) => {
        setLoading(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };
  const handleSigninWithKey = (myKey) => {
    UserService.signin(email, socket.id, timeNow, myKey).then(
      (response) => {
        UserService.getcsrftoken();
        dispatch(set(response.userCredentials));
      },
      (error) => {
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };

  // Add a socket listener, when the server emit the 'verifySignIn' event to the user, the user will try to sign in with the provided key
  useEffect(() => {
    socket.on('verifySignIn', (data) => {
      UserService.signin(data.email, socket.id, timeNow, data.key).then(
        (response) => {
          UserService.getcsrftoken();
          dispatch(set(response.userCredentials));
        },
        (error) => {
          dispatch(setType('error'));
          dispatch(toggleSnackbarOpen(error.response.data.msg));
        }
      );
    });
  }, []);

  // Render the page
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <main className='grow'>
        <section className='bg-main-1' data-aos='zoom-y-out'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              <h1 className='h1 bg-clip-text text-white text-center'>AuthTrainer</h1>
              <h2 className='h2 bg-clip-text text-white text-center pb-4'>Passwordless authentication</h2>
              <div className='max-w-sm mx-auto'>
                <form onSubmit={handleSignin}>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <input
                        disabled={loading}
                        id='email'
                        type='text'
                        className='form-input w-full text-gray-800 text-center'
                        placeholder='Enter your email...'
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mt-6'>
                    <div className='w-full px-3'>
                      <button className='btn text-white bg-main-2 hover:bg-main-3 w-full' disabled={loading}>
                        {loading && (
                          <svg
                            role='status'
                            className='inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-lime-400'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                              fill='currentColor'
                            />
                            <path
                              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                              fill='currentFill'
                            />
                          </svg>
                        )}
                        {buttonText}
                      </button>
                    </div>
                  </div>
                  {loading && (
                    <div data-aos='zoom-y-out'>
                      <h3 className='h4 bg-clip-text text-white text-center mt-6'>
                        Click the magic link we sent to your email or enter the secret key.
                      </h3>
                      <div className='flex flex-wrap -mx-3 mb-4 mt-2'>
                        <div className='w-full px-3'>
                          <input
                            id='sentKey'
                            type='text'
                            className='form-input w-full text-gray-800 text-center'
                            placeholder='Enter the secret key...'
                            value={sentKey}
                            onChange={(e) => {
                              setSentKey(e.target.value);
                              if (e.target.value.length === 6) {
                                handleSigninWithKey(e.target.value);
                              }
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Snackbar timeout={5000} anchor='bottom-center' type={type} />
    </div>
  );
}

// Page export
export default SignIn;
