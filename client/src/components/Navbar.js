import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <button 
                onClick={logout}
                className="flex items-center space-x-1 hover:underline"
              >
                <span>Logout</span>
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-1 hover:underline">
                <span>Login</span>
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              </Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;