// React and hooks
import React, { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { toggleSnackbarOpen, setType } from '../redux/snackbarSlice';

// Services
import AdminService from '../services/admin.service';
import UserService from '../services/user.service';

// Component
function ActionsView({ admin }) {
  // Redux dispatcher
  const dispatch = useDispatch();

  // Component hooks
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  // Admin action
  const adminGetAction = () => {
    setLoading(false);
    AdminService.admingetaction().then(
      (response) => {
        setLoading(false);
        dispatch(setType('success'));
        dispatch(toggleSnackbarOpen(response.msg));
      },
      (error) => {
        setLoading(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };
  const adminPostAction = () => {
    setLoading2(true);
    AdminService.adminpostaction(message).then(
      (response) => {
        setLoading2(false);
        dispatch(setType('success'));
        dispatch(toggleSnackbarOpen('You sent this message: ' + response.msg));
      },
      (error) => {
        setLoading2(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };

  // User action
  const userGetAction = () => {
    setLoading(false);
    UserService.usergetaction().then(
      (response) => {
        setLoading(false);
        dispatch(setType('success'));
        dispatch(toggleSnackbarOpen(response.msg));
      },
      (error) => {
        setLoading(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };
  const userPostAction = () => {
    setLoading2(true);
    UserService.userpostaction(message).then(
      (response) => {
        setLoading2(false);
        dispatch(setType('success'));
        dispatch(toggleSnackbarOpen('You sent this message: ' + response.msg));
      },
      (error) => {
        setLoading2(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };
  const userPostActionABAC = () => {
    setLoading3(true);
    UserService.userpostactionabac(message2).then(
      (response) => {
        setLoading3(false);
        dispatch(setType('success'));
        dispatch(toggleSnackbarOpen('You sent this message: ' + response.msg));
      },
      (error) => {
        setLoading3(false);
        dispatch(setType('error'));
        dispatch(toggleSnackbarOpen(error.response.data.msg));
      }
    );
  };

  // Component render
  return admin ? (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 pt-6' data-aos='zoom-y-out'>
        <div className='py-2 md:py-2'>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4 text-center'>
            <h2 className='text-lg text-white'>
              The following GET action can only be performed by authenticated admins, it returns a message.
            </h2>
          </div>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4'>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3'>
                <button
                  type='button'
                  onClick={() => adminGetAction()}
                  className='btn text-white bg-main-2 hover:bg-main-3 w-full'
                  disabled={loading}
                >
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
                  GET action
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='py-2 md:py-2'>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4 text-center'>
            <h2 className='text-lg text-white'>
              The following POST action can only be performed by authenticated admins, it returns the sent message.
            </h2>
          </div>
          <form className='max-w-3xl mx-auto pb-4 md:pb-4'>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3 mb-4'>
                <input
                  id='message'
                  className='form-textarea w-full text-gray-800'
                  placeholder='Write a message and click the button...'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3'>
                <button
                  type='button'
                  onClick={() => adminPostAction()}
                  className='btn text-white bg-main-2 hover:bg-main-3 w-full'
                  disabled={loading2}
                >
                  {loading2 && (
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
                  POST action
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  ) : (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 pt-6' data-aos='zoom-y-out'>
        <div className='py-2 md:py-2'>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4 text-center'>
            <h2 className='text-lg text-white'>
              The following GET action can only be performed by authenticated users, it returns a message.
            </h2>
          </div>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4'>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3'>
                <button
                  type='button'
                  onClick={() => userGetAction()}
                  className='btn text-white bg-main-2 hover:bg-main-3 w-full'
                  disabled={loading}
                >
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
                  GET action
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='py-2 md:py-2'>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4 text-center'>
            <h2 className='text-lg text-white'>
              The following POST action can only be performed by authenticated users, it returns the sent message.
            </h2>
          </div>
          <form className='max-w-3xl mx-auto pb-4 md:pb-4'>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3 mb-4'>
                <input
                  id='message'
                  className='form-textarea w-full text-gray-800'
                  placeholder='Write a message and click the button...'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3'>
                <button
                  type='button'
                  onClick={() => userPostAction()}
                  className='btn text-white bg-main-2 hover:bg-main-3 w-full'
                  disabled={loading2}
                >
                  {loading2 && (
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
                  POST action
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='py-2 md:py-2'>
          <div className='max-w-3xl mx-auto pb-4 md:pb-4 text-center'>
            <h2 className='text-lg text-white'>
              The following POST action can only be performed by authenticated users, only if the time ends with even
              minutes, it returns the sent message.
            </h2>
          </div>
          <form className='max-w-3xl mx-auto pb-4 md:pb-4'>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3 mb-4'>
                <input
                  id='message'
                  className='form-textarea w-full text-gray-800'
                  placeholder='Write a message and click the button...'
                  value={message2}
                  onChange={(e) => {
                    setMessage2(e.target.value);
                  }}
                  required
                ></input>
              </div>
            </div>
            <div className='flex flex-wrap justify-center -mx-3 mb-1'>
              <div className='w-full md:w-1/2 px-3'>
                <button
                  type='button'
                  onClick={() => userPostActionABAC()}
                  className='btn text-white bg-main-2 hover:bg-main-3 w-full'
                  disabled={loading3}
                >
                  {loading3 && (
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
                  POST action
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Component export
export default ActionsView;
