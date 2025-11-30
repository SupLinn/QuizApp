import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchTopics = () => axios.get(`${API_URL}/quizzes`, {withCredentials: true});

export const fetchQuestions = (topic) => axios.get(`${API_URL}/questions/${topic}`, {withCredentials: true});

export const submitQuiz = (submissions) => axios.post(`${API_URL}/submit`, { submissions }, {withCredentials: true});