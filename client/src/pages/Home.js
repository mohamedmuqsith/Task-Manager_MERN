import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="py-12 text-center">
      <h1 className="mb-6 text-4xl font-bold">Welcome to Task Manager</h1>
      <p className="mb-8 text-xl">Organize your tasks efficiently and boost your productivity</p>
      {currentUser ? (
        <Link 
          to="/dashboard" 
          className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 text-gray-800 transition bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;