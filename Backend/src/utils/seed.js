const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("../config/mongoDB");
const QuestionModel = require("../models/questionModel");

const questions = [
  {
    topic: 'JavaScript',
    text: 'What is the output of typeof null in JavaScript?',
    options: ['"null"', '"object"', '"undefined"', '"number"'],
    correctAnswer: '"object"'
  },
  {
    topic: 'JavaScript',
    text: 'Which method removes the last element from an array?',
    options: ['shift()', 'unshift()', 'pop()', 'push()'],
    correctAnswer: 'pop()'
  },
  {
    topic: 'JavaScript',
    text: 'What is the result of 3 + 2 + "7"?',
    options: ['12', '327', '"57"', '"327"'],
    correctAnswer: '"57"'
  },
  {
    topic: 'JavaScript',
    text: 'Which symbol is used for template literals?',
    options: ['Single quote (\')', 'Double quote (")', 'Backtick (`)', 'Hyphen (-)'],
    correctAnswer: 'Backtick (`)'
  },
  {
    topic: 'JavaScript',
    text: 'Which keyword creates a block-scoped variable?',
    options: ['var', 'let', 'global', 'def'],
    correctAnswer: 'let'
  },
  {
    topic: 'JavaScript',
    text: 'What is the primary difference in hoisting behavior between var and let?',
    options: ['var is not hoisted', 'let is function scoped', 'var is initialized with undefined', 'let is initialized with null'],
    correctAnswer: 'var is initialized with undefined'
  },
  {
    topic: 'JavaScript',
    text: 'What is the correct syntax for swapping values using array destructuring?',
    options: ['[a, b] = [b, a]', '{a: b} = {b: a}', 'a = b; b = a;', 'swap(a, b)'],
    correctAnswer: '[a, b] = [b, a]'
  },
  {
    topic: 'JavaScript',
    text: 'Which of these is NOT a standard state of a Promise in JavaScript?',
    options: ['pending', 'resolved', 'rejected', 'finished'],
    correctAnswer: 'finished'
  },
  
  {
    topic: 'React',
    text: 'Which hook is used to handle side effects?',
    options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
    correctAnswer: 'useEffect'
  },
  {
    topic: 'React',
    text: 'What syntax is used to write HTML within JavaScript in React?',
    options: ['HTMLJS', 'JSX', 'ReactHTML', 'XML'],
    correctAnswer: 'JSX'
  },
  {
    topic: 'React',
    text: 'How do you pass data from parent to child?',
    options: ['State', 'Props', 'Context', 'Redux'],
    correctAnswer: 'Props'
  },
  {
    topic: 'React',
    text: 'Which hook is used to memoize (cache) the result of an expensive function call?',
    options: ['useCallback', 'useReducer', 'useMemo', 'useState'],
    correctAnswer: 'useMemo'
  },
  {
    topic: 'React',
    text: 'What is a common and efficient method for conditional rendering of a small block of JSX?',
    options: ['if/else statements outside return', 'Ternary operator', 'Using a switch statement inside return', 'Creating a separate component for the logic'],
    correctAnswer: 'Ternary operator'
  },
  {
    topic: 'React',
    text: 'In React Router, which hook is used to access parameters from the URL (e.g., /quiz/:topic)?',
    options: ['useRoute', 'useParams', 'useContext', 'useHistory'],
    correctAnswer: 'useParams'
  },

  {
    topic: 'Node',
    text: 'Node.js is built on which JavaScript engine?',
    options: ['SpiderMonkey', 'Chakra', 'V8', 'JavaScriptCore'],
    correctAnswer: 'V8'
  },
  {
    topic: 'Node',
    text: 'Which core module is used for file system operations?',
    options: ['fs', 'path', 'os', 'http'],
    correctAnswer: 'fs'
  },
  {
    topic: 'Node',
    text: 'How do you export a module in Node.js?',
    options: ['export default', 'module.exports', 'exports.module', 'return module'],
    correctAnswer: 'module.exports'
  },
  {
    topic: 'Node',
    text: 'Which NPM flag is used to save a dependency only for development and testing?',
    options: ['--global', '--save-prod', '--save-dev', '--optional'],
    correctAnswer: '--save-dev'
  },
  {
    topic: 'Node',
    text: 'In Node.js, what does the global variable __dirname contain?',
    options: ['Current file name', 'Path to the current script\'s directory', 'Current working directory', 'Node installation path'],
    correctAnswer: 'Path to the current script\'s directory'
  },
  {
    topic: 'Node',
    text: 'What type of task is most likely to block the single-threaded Node.js event loop?',
    options: ['Network requests', 'File I/O', 'High CPU-bound calculations', 'Database queries'],
    correctAnswer: 'High CPU-bound calculations'
  },

  {
    topic: 'MongoDB',
    text: 'MongoDB stores data in what format?',
    options: ['Tables', 'BSON', 'XML', 'CSV'],
    correctAnswer: 'BSON'
  },
  {
    topic: 'MongoDB',
    text: 'What is the default primary key field?',
    options: ['id', 'uuid', '_id', 'key'],
    correctAnswer: '_id'
  },
  {
    topic: 'MongoDB',
    text: 'Which function is used to query data?',
    options: ['search()', 'query()', 'find()', 'select()'],
    correctAnswer: 'find()'
  },
  {
    topic: 'MongoDB',
    text: 'What is the main benefit of creating an index on a MongoDB field?',
    options: ['It encrypts the data', 'It speeds up read operations (queries)', 'It enables transactions', 'It enforces data validation'],
    correctAnswer: 'It speeds up read operations (queries)'
  },
  {
    topic: 'MongoDB',
    text: 'Which MongoDB concept allows for multi-stage data processing and transformation?',
    options: ['Transactions', 'Aggregation Pipeline', 'Schema Validation', 'Sharding'],
    correctAnswer: 'Aggregation Pipeline'
  },
  {
    topic: 'MongoDB',
    text: 'What is the key difference in the return type of db.collection.find() vs. db.collection.findOne()?',
    options: ['find() returns a document, findOne() returns a cursor', 'find() returns a cursor, findOne() returns a document', 'Both return a document', 'find() is synchronous'],
    correctAnswer: 'find() returns a cursor, findOne() returns a document'
  },
];

const seedData = async () => {
  try {
    await connectDB(); 
    console.log("Database connected for seeding...");

    await QuestionModel.deleteMany({});
    console.log("Old data cleared.");

    await QuestionModel.insertMany(questions);
    console.log(`Successfully imported ${questions.length} questions.`);

    await mongoose.connection.close();
    process.exit();
    
  } catch (error) {
    console.error("Error with seeding:", error);
    process.exit(1);
  }
};

seedData();