import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, submitQuiz } from '../api';
import Question from '../components/Question';

export default function QuizPage() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchQuestions(topic);
        
        if (data.length === 0) {
          setError(`No questions found for topic: ${topic}`);
        } else {
          setQuestions(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load quiz. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [topic]);
  const handleOptionSelect = async (selectedOption) => {
    const currentQuestion = questions[currentIndex];

    const newAnswers = [
      ...answers, 
      { questionId: currentQuestion._id, answer: selectedOption }
    ];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (finalAnswers) => {
    setIsSubmitting(true);
    try {
      const { data } = await submitQuiz(finalAnswers);
      navigate('/result', { state: { result: data } });
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit results. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-indigo-300 rounded mb-4"></div>
          <div className="text-indigo-600 font-semibold">Loading your Quiz...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800">Calculating Score...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      {questions.length > 0 && (
        <Question 
          question={questions[currentIndex]}
          currentNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onOptionSelect={handleOptionSelect}
        />
      )}
    </div>
  );
}