import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const NavBar = () => {
  const { logOut,user } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log('Error',error);
    }
  };

  return (
    <div className='flex items-center justify-between p-8 z-[100] w-full absolute'>
      <Link to='/'>
        <img
          className='cursor-pointer w-[120px]'
          href='/'
          src='./images/logo.svg'
          alt='Netflix logo'
        />
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='text-white pr-4'>Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600 px-6 py-2 rounded cursor-pointer'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to='/signup'>
            <button className='pr-4'>Sign Up</button>
          </Link>
          <Link to='/login'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer'>
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default NavBar;
