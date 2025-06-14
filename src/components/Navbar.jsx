import React, { useContext } from 'react';
import { Link } from 'react-router-dom';  // Fixed import
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();

    const {setShowRecruiterLogin} = useContext(AppContext);
    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                
                <Link to='/'><img src={assets.logo} alt="Company Logo" /></Link>
                {user ? (
                    <div className='flex items-center gap-4'>
                        <Link to='/application' className='text-gray-600 hover:text-blue-700'>
                            Applied Jobs
                        </Link>
                        <p>|</p>
                        <p className='max-sm:hidden text-gray-600'>
                            Hi, {user.firstName} {user.lastName}
                        </p>
                        <UserButton  />
                    </div>
                ) : (
                    <div className='flex gap-4 max-sm:text-xs'> 
                        <button onClick={(e)=>setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                        <button 
                            onClick={() => openSignIn()} 
                            className='bg-blue-700 text-white px-6 sm:px-9 py-2 rounded-full'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;