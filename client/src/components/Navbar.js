import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="p-4 text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container flex flex-col items-center justify-between gap-4 mx-auto md:flex-row">
        <Link 
          to="/" 
          className="text-2xl font-bold transition-colors hover:text-indigo-200"
        >
          TaskMaster
        </Link>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          {currentUser ? (
            <>
              <Link 
                to="/dashboard" 
                className="px-3 py-2 font-medium transition-colors rounded-md hover:bg-indigo-700 hover:text-white"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
              >
                <span>Logout</span>
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex items-center px-3 py-2 space-x-2 font-medium transition-colors rounded-md hover:bg-indigo-700 hover:text-white"
              >
                <span>Login</span>
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 font-medium text-indigo-600 transition-colors bg-white rounded-md hover:bg-indigo-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;