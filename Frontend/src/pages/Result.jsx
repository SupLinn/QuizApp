import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <ResultCard result={result} />
    </div>
  );
}