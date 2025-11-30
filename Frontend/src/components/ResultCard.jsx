import { useNavigate } from 'react-router-dom';

const ResultCard = ({ result }) => {
  const navigate = useNavigate();
  const { score, correct, incorrect, total } = result;

  // Calculate percentage for a nice visual badge
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center transform transition-all hover:scale-[1.01]">
      
      {/* --- Hero Section: Score --- */}
      <div className="bg-indigo-600 p-10 text-white">
        <p className="uppercase tracking-widest text-indigo-200 text-sm font-semibold mb-2">
          Final Score
        </p>
        <div className="text-7xl font-extrabold mb-2">
          {score}
        </div>
        <div className="inline-block bg-indigo-800 bg-opacity-50 px-4 py-1 rounded-full text-sm font-medium">
          {percentage}% Accuracy
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Total */}
          <div className="bg-gray-50 p-4 rounded-2xl">
            <span className="block text-2xl font-bold text-gray-800">{total}</span>
            <span className="text-xs text-gray-500 uppercase font-semibold">Total</span>
          </div>
          
          {/* Correct */}
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <span className="block text-2xl font-bold text-green-600">{correct}</span>
            <span className="text-xs text-green-600 uppercase font-semibold">Correct</span>
          </div>

          {/* Incorrect */}
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
            <span className="block text-2xl font-bold text-red-600">{incorrect}</span>
            <span className="text-xs text-red-600 uppercase font-semibold">Wrong</span>
          </div>
        </div>

        {/* --- Action Button --- */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-gray-900 hover:bg-black text-white text-lg font-bold rounded-xl shadow-lg transition-transform transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ResultCard