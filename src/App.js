import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import SignUp from './pages/SignUp';
import ProtectRoute from './components/ProtectRoute';

function App() {
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
