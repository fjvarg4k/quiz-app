const STORE = [
  {
    question: 'What is the most popular male dog name?',
    answers: ['Charlie', 'Duke', 'Max', 'Oliver'],
    correctAnswer: 'Max',
  },
  {
    question: 'What is the most popular dog breed in the world?',
    answers: ['Poodle', 'Labrador Retriever', 'German Shepherd', 'Chihuahua'],
    correctAnswer: 'Labrador Retriever',
  },
  {
    question: 'Most adult dogs have how many teeth?',
    answers: ['30', '42', '24', '28'],
    correctAnswer: '42',
  },
  {
    question: 'What is the smallest dog breed?',
    answers: ['Chihuahua', 'Dachshund', 'Pomeranian', 'Shih Tzu'],
    correctAnswer: 'Chihuahua',
  },
  {
    question: 'How old was the world’s oldest dog, an Australian cattle hound named Bluey, in human years?',
    answers: ['21', '25', '34', '29'],
    correctAnswer: '29',
  },
  {
    question: 'Which of these foods are dangerous to dogs?',
    answers: ['Ham', 'Grapes', 'Chicken', 'Bananas'],
    correctAnswer: 'Grapes',
  },
  {
    question: 'What dog breed has a bluish-black tongue?',
    answers: ['Chow Chow', 'American Bulldog', 'Australian Cattledog', 'Weimaraner'],
    correctAnswer: 'Chow Chow',
  },
  {
    question: 'What is the largest breed of dog?',
    answers: ['English Mastiff', 'St. Bernard', 'Irish Wolfhound', 'Great Dane'],
    correctAnswer: 'Irish Wolfhound',
  },
  {
    question: 'What dog breed yodels instead of barks?',
    answers: ['English Bulldog', 'Whippet', 'Basset Hound', 'Basenji'],
    correctAnswer: 'Basenji',
  },
  {
    question: 'Despite its name, the Great Dane originated in what country?',
    answers: ['England', 'Germany', 'Japan', 'Egypt'],
    correctAnswer: 'Germany',
  }
];

let questionNum = 0;
let correctCount = 0;
let incorrectCount = 0;

// Responsible for generating the next question
function generateQuestion() {
  if (questionNum < STORE.length) {
    return `
      <h2>${STORE[questionNum].question}</h2>
      <form class="question-form">
        <fieldset>
          <label for="answerChoice-1">${STORE[questionNum].answers[0]}</label>
          <input type="radio" name="possibleAnswer" value="${STORE[questionNum].answers[0]}" id="answerChoice-1" required>
          <label for="answerChoice-2">${STORE[questionNum].answers[1]}</label>
          <input type="radio" name="possibleAnswer" value="${STORE[questionNum].answers[1]}" id="answerChoice-2">
          <label for="answerChoice-3">${STORE[questionNum].answers[2]}</label>
          <input type="radio" name="possibleAnswer" value="${STORE[questionNum].answers[2]}" id="answerChoice-3">
          <label for="answerChoice-4">${STORE[questionNum].answers[3]}</label>
          <input type="radio" name="possibleAnswer" value="${STORE[questionNum].answers[3]}" id="answerChoice-4">
          <button type="submit" class="submit-btn">Submit</button>
        </fieldset>
      </form>
    `;
  } else {
    renderFinalScore();
  }
}

// Decides what feedback to give the user based on if answer is correct or incorrect
function selectedAnswer() {
  $('.main-body').on('submit', 'form', function(event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (userAnswer === correctAnswer) {
      renderCorrectAnswerFeedback();
      increaseCorrectScore();
    } else {
      renderIncorrectAnswerFeedback();
      increaseIncorrectScore();
    }
  });
}

// Increment correct score counter
function increaseCorrectScore() {
  correctCount++;
  $('.correct-count').text(correctCount);
}

// Increment incorrect score counter
function increaseIncorrectScore() {
  incorrectCount++;
  $('.incorrect-count').text(incorrectCount);
}

// Gives user feedback if correct
function generateCorrectAnswerFeedback() {
  return `
  <div class="correctResponseFeedback">
    <p>Good job! You got the right answer.</p>
  </div>
  <button type="button" class="nextQuestion-btn">Next Question</button>
  `;
}

// Renders user feedback if correct
function renderCorrectAnswerFeedback() {
  // $('.question-form').remove();
  $('.main-body').html(generateCorrectAnswerFeedback());
}

// Gives user feedback if incorrect
function generateIncorrectAnswerFeedback() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  return `
  <div class="incorrectResponseFeedback">
    <p>You got the wrong answer.</p>
    <p>The correct answer is: ${correctAnswer}</p>
  </div>
  <button type="button" class="nextQuestion-btn">Next Question</button>
  `;
}

// Renders user feedback if incorrect
function renderIncorrectAnswerFeedback() {
  // $('.question-form').remove();
  $('.main-body').html(generateIncorrectAnswerFeedback());
}

// Generates the initial score counter
function generateScoreCounter() {
  return `
  <ul class="score-tracker">
    <li>Correct: <span class="correct-count">0</span></li>
    <li>Incorrect: <span class="incorrect-count">0</span></li>
  </ul>
  `;
}

// Responsible for generating final user score
function generateFinalScore() {
  if (correctCount > 7) {
    return `
    <h3>You got ${correctCount} out of 10 questions correct. You're a dog expert.</h3>
    <button type="button" class="restartQuiz-btn">Restart quiz</button>
    `;
  } else if (correctCount > 4) {
    return `
    <h3>You got ${correctCount} out of 10 questions correct. I guess you know your dogs...</h3>
    <button type="button" class="restartQuiz-btn">Restart quiz</button>
    `;
  } else {
    return `
    <h3>You got ${correctCount} out of 10 questions correct. Your dog knowledge could use some help.</h3>
    <button type="button" class="restartQuiz-btn">Restart quiz</button>
    `;
  }
}

// Responsible for rendering final user score
function renderFinalScore() {
  $('.score-tracker').remove();
  $('.main-body').html(generateFinalScore());
}

// Renders the next question when 'next question' button is clicked
function renderNextQuestion() {
  $('.main-body').on('click', '.nextQuestion-btn', function(event) {
    questionNum++;
    $('.main-body').html(generateQuestion());
  });
}

// Responsible for starting the quiz
function startQuiz() {
  $('.intro-text').on('click', '.start-quiz', function(event) {
    $('.intro-text').remove();
    $('.main-title').after(generateScoreCounter());
    $('.main-body').css('display', 'block');
    $('.main-body').append(generateQuestion());
  });
};

// Responsible for restarting the quiz
function restartQuiz() {
  $('.main-body').on('click', '.restartQuiz-btn', function(event) {
    location.reload();
  });
}

function handleQuiz() {
  startQuiz();
  selectedAnswer();
  renderNextQuestion();
  restartQuiz();
}

$(handleQuiz);
