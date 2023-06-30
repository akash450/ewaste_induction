import React, { useState } from 'react';
import Header from '../../components/Header';
import FinishPage from '../FinishPage';
import '../../App.css';

function Quiz() {
    const questions = [
      {
        question: 'You should always wear:',
        answers: ['Safety glasses', 'Gloves and closed in shoes', 'All of the above', 'None'],
        correctAnswer: 2,
      },
      {
        question: 'What is an example of an unsafe practice?',
        answers: ['Following supervisor instructions', 'Using the appropriate tools.', 'Throwing items around the workshop', 'None'],
        correctAnswer: 2,
      },
      {
        question: 'Which of the following are tools?',
        answers: ['Screwdrivers', 'Torque wrench', 'Pliers', 'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'Tools should be:',
        answers: ['Only held by one person', 'Kept back in the toolbox when done', 'Both', 'None'],
        correctAnswer: 2,
      },
      {
        question: 'Which of the following statements are true?',
        answers: ['Our mission is to provide opportunities in our local communities to recycle, volunteer, train and empower people of all abilities in a fun, social and inclusive environment.', 
        'Our vision is to empower people to thrive and belong; provide a safe place for people of all abilities; give them purpose and an opportunity to develop social and practical skills, while helping the environment.', 
        'Our values are: to respect all people as individuals, celebrate what people can do, empower and enable people to be the best they can be, be consciously proactive in reducing our environmental footprint.',
        'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'It is not okay to:',
        answers: ['Disrespect other workers', 'Not listen to the supervisors', 'Try to hurt others', 'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'What is e-waste?',
        answers: ['Computers and TVs', 'Electronic devices and phones', 'Anything that runs on a battery', 'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'As part of our program, you are encouraged to:',
        answers: ['Learn new skills', 'Interact with others', 'Ensure e-waste is placed in the correct bins', 'All of the above'],
        correctAnswer: 3,
      },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const successMessage = "Congrats! You completed all the modules!";
    const failMessage = "Almost there! Try again!";

    const handleAnswer = (index) => {
      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    };

    return (
      <div className='default'>
        <header className='header'>
          <Header/>
          <h1 className='formHeading'>Quiz</h1>
        </header>
          
        <main className='quizContainer'>
          {showScore ? (
          <div className="container">
            {score === 8 ? 
            <FinishPage 
            message={successMessage}
            navigateTo={1}
            addPoints={200}/> 
            : 
            <FinishPage 
            message={failMessage}
            navigateTo={2}/>
            }
          </div>
          ) : 
          (<div className='quizContainer'>
            <p className='questionText'>
              {questions[currentQuestion].question}
            </p>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button className='answerButton' 
              key={index}
              style={{color: 'white'}} 
              onClick={() => {handleAnswer(index)}}
              >
                {answer}
              </button>
            ))}
          </div>
        )}
        </main>
      </div>
    )
}
  
export default Quiz