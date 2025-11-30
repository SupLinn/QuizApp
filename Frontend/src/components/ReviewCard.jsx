const ReviewCard = ({ item, index }) => {
  const { text, userAnswer, correctAnswer, isCorrect } = item;

  return (
    <div className={`p-6 rounded-xl border-l-4 shadow-sm mb-4 bg-white ${
      isCorrect ? 'border-green-500' : 'border-red-500'
    }`}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm border border-gray-200 shadow-sm">
            {index + 1}
        </span>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className={`p-3 rounded-lg ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <span className="block text-xs font-bold uppercase opacity-70 mb-1">
                Your Answer
              </span>
              <div className="flex items-center gap-2">
                 <span>{isCorrect ? '✓' : '✗'}</span>
                 <span className="font-medium">{userAnswer}</span>
              </div>
            </div>
            {!isCorrect && (
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-800">
                <span className="block text-xs font-bold uppercase opacity-70 mb-1">
                  Correct Answer
                </span>
                <span className="font-medium">
                  {correctAnswer}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard