import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { result } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Answer Review</h1>
        </div>

        <div className="space-y-4">
          {result.details.map((item, idx) => (
            <ReviewCard key={item.questionId} item={item} index={idx} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
            <button 
                onClick={() => navigate('/')}
                className="bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-black transition"
            >
                Start New Quiz
            </button>
        </div>
      </div>
    </div>
  );
}