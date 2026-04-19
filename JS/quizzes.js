// DOM Elements
const subjectsSection = document.getElementById('subjects-section');
const configSection = document.getElementById('config-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');

// Quiz State
let currentSubject = '';
let quizConfig = {};
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timePerQuestion = 0;
let totalTime = 0;
let timeElapsed = 0;
let markedForReview = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up subject buttons
    const subjectButtons = document.querySelectorAll('.subject-btn');
    subjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subjectCard = this.closest('.subject-card');
            currentSubject = subjectCard.dataset.subject;
            showConfigSection();
        });
    });
    
    // Set up question count slider
    const questionCount = document.getElementById('question-count');
    const countValue = document.getElementById('count-value');
    
    questionCount.addEventListener('input', function() {
        countValue.textContent = this.value;
    });
    
    // Set up start quiz button
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    
    // Set up quiz navigation
    document.getElementById('prev-btn').addEventListener('click', showPreviousQuestion);
    document.getElementById('next-btn').addEventListener('click', showNextQuestion);
    document.getElementById('mark-review').addEventListener('click', markForReview);
    document.getElementById('submit-quiz').addEventListener('click', finishQuiz);
    
    // Set up results actions
    document.getElementById('new-quiz').addEventListener('click', resetQuiz);
    document.getElementById('review-answers').addEventListener('click', reviewAnswers);
});

// Show configuration section
function showConfigSection() {
    subjectsSection.classList.add('hidden');
    configSection.classList.remove('hidden');
    
    // Update subject name in config
    document.getElementById('config-subject').textContent = currentSubject;
    
    // Load topics for this subject
    loadTopics();
}

// Load topics for the current subject
function loadTopics() {
    const topicsContainer = document.getElementById('topics-container');
    topicsContainer.innerHTML = '';
    
    if (window.quizData && window.quizData[currentSubject]) {
        const topics = window.quizData[currentSubject].topics;
        
        topics.forEach(topic => {
            const topicElement = document.createElement('div');
            topicElement.className = 'topic-checkbox';
            topicElement.innerHTML = `
                <input type="checkbox" id="topic-${topic}" name="topics" value="${topic}" checked>
                <label for="topic-${topic}">${topic}</label>
            `;
            topicsContainer.appendChild(topicElement);
        });
    }
}

// Start the quiz with the selected configuration
function startQuiz() {
    // Get configuration values
    const questionCount = parseInt(document.getElementById('question-count').value);
    timePerQuestion = parseInt(document.getElementById('time-per-question').value);
    const difficulty = document.getElementById('difficulty').value;
    
    // Get selected topics
    const selectedTopics = [];
    document.querySelectorAll('input[name="topics"]:checked').forEach(checkbox => {
        selectedTopics.push(checkbox.value);
    });
    
    // Validate topics selection
    if (selectedTopics.length === 0) {
        alert('Please select at least one topic');
        return;
    }
    
    // Save quiz configuration
    quizConfig = {
        subject: currentSubject,
        questionCount,
        timePerQuestion,
        difficulty,
        topics: selectedTopics
    };
    
    // Generate questions based on configuration
    generateQuestions();
    
    // Initialize quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    markedForReview = new Array(currentQuestions.length).fill(false);
    
    // Calculate total time
    totalTime = timePerQuestion > 0 ? questionCount * timePerQuestion : 0;
    timeElapsed = 0;
    
    // Show quiz section
    configSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    // Start the quiz
    showQuestion(0);
    
    // Start timer if time limit is set
    if (totalTime > 0) {
        startTimer();
    }
}

// Generate questions based on configuration
function generateQuestions() {
    currentQuestions = [];
    
    if (window.quizData && window.quizData[quizConfig.subject]) {
        const subjectData = window.quizData[quizConfig.subject];
        let availableQuestions = [];
        
        // Filter questions by selected topics
        quizConfig.topics.forEach(topic => {
            if (subjectData.questions[topic]) {
                availableQuestions = availableQuestions.concat(subjectData.questions[topic]);
            }
        });
        
        // Filter by difficulty if not mixed
        if (quizConfig.difficulty !== 'mixed') {
            availableQuestions = availableQuestions.filter(q => q.difficulty === quizConfig.difficulty);
        }
        
        // Shuffle questions and select the required number
        availableQuestions = shuffleArray(availableQuestions);
        currentQuestions = availableQuestions.slice(0, quizConfig.questionCount);
    } else {
        // Fallback: Use sample questions if no data is available
        currentQuestions = [
            {
                question: "Sample question 1?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correctAnswer: 0,
                difficulty: "medium"
            },
            {
                question: "Sample question 2?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correctAnswer: 1,
                difficulty: "medium"
            }
        ];
    }
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Show a specific question
function showQuestion(index) {
    if (index < 0 || index >= currentQuestions.length) return;
    
    currentQuestionIndex = index;
    const question = currentQuestions[index];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Update options
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <input type="radio" id="option${i+1}" name="answer" value="${i}">
            <label for="option${i+1}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
        
        // Add event listener to option
        const radioInput = optionElement.querySelector('input');
        radioInput.addEventListener('change', function() {
            userAnswers[currentQuestionIndex] = parseInt(this.value);
        });
    });
    
    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex] !== null) {
        const selectedOption = document.querySelector(`input[name="answer"][value="${userAnswers[currentQuestionIndex]}"]`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').textContent = index === currentQuestions.length - 1 ? 'Finish' : 'Next';
    
    // Show submit button on last question
    document.getElementById('submit-quiz').classList.toggle('hidden', index !== currentQuestions.length - 1);
    
    // Update question counter
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('total-questions').textContent = currentQuestions.length;
    
    // Update progress bar
    const progressPercent = ((index + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    // Update mark for review button
    updateMarkReviewButton();
}

// Update mark for review button
function updateMarkReviewButton() {
    const markButton = document.getElementById('mark-review');
    if (markedForReview[currentQuestionIndex]) {
        markButton.innerHTML = '<i class="fas fa-check-circle"></i> Marked for Review';
        markButton.classList.add('marked');
    } else {
        markButton.innerHTML = '<i class="far fa-circle"></i> Mark for Review';
        markButton.classList.remove('marked');
    }
}

// Show next question
function showNextQuestion() {
    // Save current answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    } else {
        finishQuiz();
    }
}

// Show previous question
function showPreviousQuestion() {
    // Save current answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Mark current question for review
function markForReview() {
    markedForReview[currentQuestionIndex] = !markedForReview[currentQuestionIndex];
    updateMarkReviewButton();
}

// Start the quiz timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update timer every second
    timerInterval = setInterval(() => {
        timeElapsed++;
        
        // Calculate remaining time
        const remainingTime = totalTime - timeElapsed;
        
        if (remainingTime <= 0) {
            // Time's up
            clearInterval(timerInterval);
            finishQuiz();
            return;
        }
        
        // Format time as MM:SS
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color when time is running out
        if (remainingTime <= 30) {
            timerElement.style.color = 'var(--danger)';
        }
    }, 1000);
}

// Finish the quiz and show results
function finishQuiz() {
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Calculate results
    const totalQuestions = currentQuestions.length;
    let correctAnswers = 0;
    let attempted = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        if (userAnswers[i] !== null) {
            attempted++;
            if (userAnswers[i] === currentQuestions[i].correctAnswer) {
                correctAnswers++;
            }
        }
    }
    
    const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update results UI
    document.getElementById('score-percent').textContent = `${scorePercent}%`;
    document.getElementById('score-fraction').textContent = `${correctAnswers}/${totalQuestions}`;
    document.getElementById('result-total').textContent = totalQuestions;
    document.getElementById('result-attempted').textContent = attempted;
    document.getElementById('result-correct').textContent = correctAnswers;
    document.getElementById('result-incorrect').textContent = attempted - correctAnswers;
    
    // Format time taken
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('result-time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Animate score circle
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scorePercent / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
        circle.style.strokeDashoffset = offset;
    }, 100);
    
    // Show results section
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

// Reset quiz and go back to subjects
function resetQuiz() {
    resultsSection.classList.add('hidden');
    subjectsSection.classList.remove('hidden');
    
    // Reset state
    currentSubject = '';
    quizConfig = {};
    currentQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    markedForReview = [];
    
    // Reset timer display
    document.getElementById('timer').textContent = '10:00';
    document.getElementById('timer').style.color = 'var(--danger)';
}

// Review answers (not implemented in this version)
function reviewAnswers() {
    alert('Answer review feature will be implemented in the next version.');
}

// Sample question data (in a real application, this would be in separate JS files)
window.quizData = {
    Mathematics: {
        topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"],
        questions: {
            Algebra: [
                {
                    question: "If x + y = 5 and x - y = 1, what is the value of x?",
                    options: ["2", "3", "4", "5"],
                    correctAnswer: 1,
                    difficulty: "easy"
                },
                {
                    question: "Solve for x: 2x² - 5x - 3 = 0",
                    options: ["x = 3, -0.5", "x = -3, 0.5", "x = 1.5, -1", "x = -1.5, 1"],
                    correctAnswer: 0,
                    difficulty: "medium"
                }
            ],
            Geometry: [
                {
                    question: "What is the area of a circle with radius 5?",
                    options: ["10π", "25π", "50π", "100π"],
                    correctAnswer: 1,
                    difficulty: "easy"
                }
            ]
        }
    },
    English: {
        topics: ["Grammar", "Vocabulary", "Comprehension"],
        questions: {
            Grammar: [
                {
                    question: "Choose the correct sentence:",
                    options: [
                        "She don't like apples.",
                        "She doesn't like apples.",
                        "She doesn't likes apples.",
                        "She don't likes apples."
                    ],
                    correctAnswer: 1,
                    difficulty: "easy"
                }
            ]
        }
    }
    // Other subjects would be defined similarly
};