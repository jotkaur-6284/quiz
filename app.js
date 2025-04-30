const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct_answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct_answer: "Mars"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
      correct_answer: "Shakespeare"
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct_answer: "Carbon Dioxide"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;
  let timer;
  let timeLeft = 120; // 2 minutes in seconds
  
  const questionElement = document.querySelector('.question');
  const optionButtons = document.querySelectorAll('.option');
  const nextButton = document.querySelector('.next-button');
  const resultElement = document.querySelector('.result');
  const timerElement = document.getElementById('timer');
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        showFinalResult();
      }
    }, 1000);
  }
  
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionButtons.forEach((button, index) => {
      button.innerText = currentQuestion.options[index];
      button.style.backgroundColor = '';
    });
    selectedAnswer = null;
  }
  
  optionButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      selectedAnswer = index;
      optionButtons.forEach(btn => btn.style.backgroundColor = '');
      button.style.backgroundColor = '#ddd';
    });
  });
  
  nextButton.addEventListener('click', () => {
    if (selectedAnswer === null) {
      alert('Please select an answer!');
      return;
    }
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
      resultElement.innerText = '';
      resultElement.classList.remove('show');
    } else {
      clearInterval(timer);
      showFinalResult();
    }
  });
  
  function checkAnswer() {
    const correctAnswer = quizData[currentQuestionIndex].correct_answer;
    const userAnswer = optionButtons[selectedAnswer].innerText;
    if (userAnswer === correctAnswer) {
      score++;
    }
  }
  
  function showFinalResult() {
    questionElement.style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    nextButton.style.display = 'none';
    timerElement.style.display = 'none';
    
    resultElement.innerText = `Quiz Over! Your Score: ${score} / ${quizData.length}`;
    resultElement.classList.add('show');
  }
  
  loadQuestion();
  startTimer();
  