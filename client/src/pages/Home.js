import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
      <p className="text-xl mb-8">Organize your tasks efficiently and boost your productivity</p>
      {currentUser ? (
        <Link 
          to="/dashboard" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;