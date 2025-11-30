import { useEffect, useState } from 'react';
import { fetchTopics } from '../api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics().then(res => setTopics(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Smart Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {topics.map(topic => (
          <button 
            key={topic}
            onClick={() => navigate(`/quiz/${topic}`)}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-xl font-semibold text-gray-700 border-l-4 border-indigo-500 cursor-pointer"
          >
            {topic} Quiz
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home