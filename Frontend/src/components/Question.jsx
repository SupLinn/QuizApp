
const Question = ({ question, currentNumber, totalQuestions, onOptionSelect }) => {
  const { text, options, topic } = question;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {topic}
        </span>
        <span className="text-sm font-medium text-gray-500">
          Question {currentNumber} <span className="text-gray-300">/</span> {totalQuestions}
        </span>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
          {text}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(option)}
              className="group relative w-full text-left p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
    
                <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                  {index + 1}
                </div>
                
                <span className="ml-4 text-lg text-gray-700 font-medium group-hover:text-indigo-900">
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question