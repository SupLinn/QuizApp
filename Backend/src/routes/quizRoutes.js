const express = require("express");
const QuestionModel = require("../models/QuestionModel");

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

    try {
        for (const sub of submissions) {
            const question = await QuestionModel.findById(sub.questionId);
            if (question && question.correctAnswer === sub.answer) {
                score += 10;
                correct++;
            } else {
                incorrect++;
            }
        }
        res.json({ score, correct, incorrect, total: submissions.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;