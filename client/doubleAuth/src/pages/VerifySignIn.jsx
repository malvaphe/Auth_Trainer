// React and hooks
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import UserService from '../services/user.service';

// Page
function VerifySignIn() {
  // Url params
  const { email, socketId, key } = useParams();

  // Hooks
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  // When the page is loaded, check if the user can be authenticated
  useEffect(() => {
    UserService.signmein(email, socketId, key).then(
      () => {
        setSuccess(true);
      },
      (error) => {
        setMessage(error.response.data.msg);
      }
    );
  }, []);

  // Render the page
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <main className='grow'>
        <section className='bg-main-1' data-aos='zoom-y-out'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              <h1 className='h1 bg-clip-text text-white text-center'>AuthTrainer</h1>
              <h2 className='h2 bg-clip-text text-white text-center pb-4'>SignIn verification</h2>
              {success ? (
                <h2 className='h2 bg-clip-text text-white text-center py-4'>
                  User authenticated <span className='text-main-3'>successfully</span>, you can now close this window.
                </h2>
              ) : message === '' ? (
                <h2 className='h2 bg-clip-text text-white text-center py-4'>Trying to authenticate the user...</h2>
              ) : (
                <h2 className='h2 bg-clip-text text-white text-center py-4'>
                  Authentication <span className='text-main-3'>failed</span> with this error:{' '}
                  <span className='text-main-3'>{message}</span>
                </h2>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Page export
export default VerifySignIn;
