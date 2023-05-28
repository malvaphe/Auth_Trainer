// React
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';

// Styles
import './css/style.scss';
import AOS from 'aos';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { set } from './redux/userSlice';

// Services
import UserService from './services/user.service';

// Pages
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

function App() {
  // Current page
  const location = useLocation();

  // Redux
  const dispatch = useDispatch();

  // User global state
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.value);

  // Protected routes
  const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  // Aos
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic'
    });
  });

  // App loading configuration
  useEffect(() => {
    // Is the user logged?
    UserService.amilogged().then(
      (response) => {
        UserService.getcsrftoken();
        dispatch(set(response.userCredentials));
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  // triggered on route change
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  // Return the app when the user state is setted up
  return (
    <>
      {!loading && (
        <Routes>
          {/*  Not user routes */}
          <Route element={<ProtectedRoute isAllowed={!user} redirectPath='/profile' />}>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          {/*  User routes */}
          <Route element={<ProtectedRoute isAllowed={!!user} redirectPath='/' />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
