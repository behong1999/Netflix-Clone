import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import SignUp from './pages/SignUp';
import ProtectRoute from './components/ProtectRoute';
import { TabTitle } from './utils/TabTitle';
import { useEffect } from 'react';

function App() {
  const titles = {
    '/': 'Netflix',
    '/login': 'Login',
    '/signup': 'Sign Up',
    '/account': 'Favorites',
  };

  const location = useLocation();

  useEffect(() => {
    const title = titles[location.pathname] || 'Netflix';
    TabTitle(title);
  });

  return (
    <div className='text-white'>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/account'
            element={
              <ProtectRoute>
                <Account />
              </ProtectRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
