// React and hooks
import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Partials
import Snackbar from '../partials/Snackbar';
import ActionsView from '../partials/ActionsView';
import MyProfile from '../partials/MyProfile';

// Page
function Profile() {
  // Menu switcher
  const [selector, setSelector] = useState({ userActions: true });

  // Snackbar state
  const type = useSelector((state) => state.snackbar.type);

  // User global state
  const user = useSelector((state) => state.user.value);

  // Page render
  return (
    <div className='flex flex-col min-h-screen overflow-hidden bg-main-1'>
      <main className='grow'>
        <section>
          <div className='max-w-6xl mx-auto px-4 sm:px-6' data-aos='zoom-y-out'>
            <div className='pt-12'>
              <div className='max-w-3xl mx-auto text-center pb-8 md:pb-8'>
                <h1 className='h1 text-white'>User area</h1>
              </div>
              <div className='mb-8 md:mb-8'>
                <ul className='flex flex-wrap justify-center text-sm font-medium -m-2'>
                  <li className='m-2'>
                    <button
                      className={
                        selector.userActions
                          ? 'inline-flex text-white text-center text-main-1 py-2 px-12 rounded bg-main-3 hover:bg-main-4 transition duration-150 ease-in-out border border-white'
                          : 'inline-flex text-white text-center text-white py-2 px-12 rounded bg-main-2 hover:bg-main-3 shadow-sm transition duration-150 ease-in-out border border-white'
                      }
                      onClick={() => setSelector({ userActions: true })}
                    >
                      User actions
                    </button>
                  </li>
                  <li className='m-2'>
                    <button
                      className={
                        selector.adminActions
                          ? 'inline-flex text-white text-center text-main-1 py-2 px-12 rounded bg-main-3 hover:bg-main-4 transition duration-150 ease-in-out border border-white'
                          : 'inline-flex text-white text-center text-white py-2 px-12 rounded bg-main-2 hover:bg-main-3 shadow-sm transition duration-150 ease-in-out border border-white'
                      }
                      onClick={() => setSelector({ adminActions: true })}
                    >
                      Admin actions
                    </button>
                  </li>
                  <li className='m-2'>
                    <button
                      className={
                        selector.profile
                          ? 'inline-flex text-white text-center text-main-1 py-2 px-12 rounded bg-main-3 hover:bg-main-4 transition duration-150 ease-in-out border border-white'
                          : 'inline-flex text-white text-center text-white py-2 px-12 rounded bg-main-2 hover:bg-main-3 shadow-sm transition duration-150 ease-in-out border border-white'
                      }
                      onClick={() => setSelector({ profile: true })}
                    >
                      My profile
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='border-b-2 border-main-2'></div>
        </section>
        {selector.userActions && <ActionsView admin={false} />}
        {selector.adminActions && <ActionsView admin={true} />}
        {selector.profile && <MyProfile />}
      </main>
      <Snackbar timeout={5000} anchor='bottom-center' type={type} />
    </div>
  );
}

// Page export
export default Profile;
