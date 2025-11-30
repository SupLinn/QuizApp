const express = require("express");
const QuestionModel = require("../models/questionModel");

const router = express.Router()

router.get('/quizzes', async (req, res) => {
  try {
    const topics = await QuestionModel.distinct('topic');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/questions/:topic', async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate([
      { $match: { topic: req.params.topic } },
      { $sample: { size: 5 } }
    ]);

    const onlyQuestion = questions.map((question) => {
        const {_id, text, options} = question
        return {
            _id,
            text,
            options
        }
    });

    res.json(onlyQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/submit', async (req, res) => {
  const { submissions } = req.body;
  
  let score = 0;
  let correct = 0;
  let incorrect = 0;
  const detailedResults = [];

  try {
    const questionIds = submissions.map(s => s.questionId);
    const questions = await QuestionModel.find({ _id: { $in: questionIds } });

    const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

    for (const sub of submissions) {
      const question = questionMap.get(sub.questionId);
      
      if (!question) continue;

      const isCorrect = question.correctAnswer === sub.answer;

      if (isCorrect) {
        score += 10;
        correct++;
      } else {
        incorrect++;
      }

      detailedResults.push({
        questionId: question._id,
        text: question.text,
        userAnswer: sub.answer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        topic: question.topic
      });
    }

    res.json({ 
      score, 
      correct, 
      incorrect, 
      total: submissions.length,
      details: detailedResults
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;