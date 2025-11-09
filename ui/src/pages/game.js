// Game Configuration
const gameConfig = {
    easy: {
        operations: ['+', '-'],
        maxNumber: 10,
        minNumber: 1,
        questionsPerLevel: 5,
        timePerQuestion: 15,
        levels: 3
    },
    medium: {
        operations: ['+', '-', '×'],
        maxNumber: 20,
        minNumber: 1,
        questionsPerLevel: 8,
        timePerQuestion: 12,
        levels: 4
    },
    hard: {
        operations: ['+', '-', '×', '÷'],
        maxNumber: 50,
        minNumber: 1,
        questionsPerLevel: 10,
        timePerQuestion: 10,
        levels: 5
    }
};

// Game State
const gameState = {
    character: '',
    difficulty: '',
    level: 1,
    score: 0,
    lives: 3,
    currentQuestion: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    hintsUsed: 0,
    currentProblem: null
};

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const feedbackContainer = document.getElementById('feedbackContainer');
const startGameBtn = document.getElementById('startGameBtn');
const characters = document.querySelectorAll('.character');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const playerCharacter = document.getElementById('playerCharacter');
const playerName = document.getElementById('playerName');
const starsCount = document.getElementById('starsCount');
const levelDisplay = document.getElementById('levelDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const mathProblem = document.getElementById('mathProblem');
const num1Element = document.getElementById('num1');
const operatorElement = document.getElementById('operator');
const num2Element = document.getElementById('num2');
const answerOptions = document.getElementById('answerOptions');
const levelProgress = document.getElementById('levelProgress');
const helpBtn = document.getElementById('helpBtn');
const resultTitle = document.getElementById('resultTitle');
const finalStars = document.getElementById('finalStars');
const finalLevel = document.getElementById('finalLevel');
const correctAnswers = document.getElementById('correctAnswers');
const resultMessage = document.getElementById('resultMessage');
const playAgainBtn = document.getElementById('playAgainBtn');
const homeBtn = document.getElementById('homeBtn');
const feedbackContent = document.getElementById('feedbackContent');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackMessage = document.getElementById('feedbackMessage');

// Sound Effects (placeholders - you'll need to add actual sound files)
const sounds = {
    correct: new Audio('sounds/correct.mp3'),
    wrong: new Audio('sounds/wrong.mp3'),
    levelUp: new Audio('sounds/level-up.mp3'),
    gameOver: new Audio('sounds/game-over.mp3'),
    click: new Audio('sounds/click.mp3')
};

// Initialize the game
function init() {
    // Character selection
    characters.forEach(character => {
        character.addEventListener('click', () => {
            characters.forEach(c => c.classList.remove('selected'));
            character.classList.add('selected');
            gameState.character = character.dataset.character;
            checkStartButtonState();
        });
    });

    // Difficulty selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.difficulty = btn.dataset.difficulty;
            checkStartButtonState();
        });
    });

    // Start game button
    startGameBtn.addEventListener('click', startGame);

    // Help button
    helpBtn.addEventListener('click', provideHint);

    // Play again button
    playAgainBtn.addEventListener('click', () => {
        resultScreen.classList.add('hidden');
        resetGame();
        startGame();
    });

    // Home button
    homeBtn.addEventListener('click', () => {
        resultScreen.classList.add('hidden');
        resetGame();
        showWelcomeScreen();
    });

    // Disable sound effects initially (since we don't have actual files yet)
    Object.values(sounds).forEach(sound => {
        sound.volume = 0;
    });
}

// Check if start button should be enabled
function checkStartButtonState() {
    if (gameState.character && gameState.difficulty) {
        startGameBtn.disabled = false;
    }
}

// Start the game
function startGame() {
    // Play click sound
    playSound('click');

    // Hide welcome screen, show game screen
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    // Set player character and name
    playerCharacter.src = `assets/svg/${gameState.character}.svg`;
    playerName.textContent = getCharacterName(gameState.character);

    // Initialize game state based on difficulty
    const config = gameConfig[gameState.difficulty];
    gameState.totalQuestions = config.questionsPerLevel * config.levels;
    gameState.level = 1;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.correctAnswers = 0;
    gameState.hintsUsed = 0;

    // Update UI
    updateUI();

    // Generate first problem
    generateProblem();
}

// Get character name based on character type
function getCharacterName(character) {
    switch (character) {
        case 'astronaut':
            return 'Space Explorer';
        case 'pirate':
            return 'Math Pirate';
        case 'wizard':
            return 'Number Wizard';
        default:
            return 'Player';
    }
}

// Update UI elements
function updateUI() {
    starsCount.textContent = gameState.score;
    levelDisplay.textContent = gameState.level;
    
    // Update lives display
    livesDisplay.innerHTML = '';
    for (let i = 0; i < gameState.lives; i++) {
        const heart = document.createElement('img');
        heart.src = 'assets/svg/heart.svg';
        heart.alt = 'Heart';
        heart.className = 'heart-icon';
        livesDisplay.appendChild(heart);
    }

    // Update progress bar
    const config = gameConfig[gameState.difficulty];
    const progressPercentage = (gameState.currentQuestion % config.questionsPerLevel) / config.questionsPerLevel * 100;
    levelProgress.style.width = `${progressPercentage}%`;
}

// Generate a new math problem
function generateProblem() {
    const config = gameConfig[gameState.difficulty];
    
    // Choose random operation based on difficulty
    const operation = config.operations[Math.floor(Math.random() * config.operations.length)];
    
    let num1, num2, answer;
    
    // Generate numbers and answer based on operation
    switch (operation) {
        case '+':
            num1 = getRandomNumber(config.minNumber, config.maxNumber);
            num2 = getRandomNumber(config.minNumber, config.maxNumber);
            answer = num1 + num2;
            break;
        case '-':
            // Ensure num1 >= num2 to avoid negative answers for younger kids
            num1 = getRandomNumber(config.minNumber, config.maxNumber);
            num2 = getRandomNumber(config.minNumber, num1);
            answer = num1 - num2;
            break;
        case '×':
            // Keep multiplication simple
            num1 = getRandomNumber(config.minNumber, Math.min(10, config.maxNumber));
            num2 = getRandomNumber(config.minNumber, Math.min(10, config.maxNumber));
            answer = num1 * num2;
            break;
        case '÷':
            // Generate division problems with whole number answers
            num2 = getRandomNumber(1, Math.min(10, config.maxNumber));
            answer = getRandomNumber(1, Math.min(10, config.maxNumber));
            num1 = num2 * answer;
            break;
    }
    
    // Store current problem
    gameState.currentProblem = {
        num1,
        num2,
        operation,
        answer
    };
    
    // Update problem display
    num1Element.textContent = num1;
    operatorElement.textContent = operation;
    num2Element.textContent = num2;
    
    // Generate answer options
    generateAnswerOptions(answer);
}

// Generate random number within range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate answer options
function generateAnswerOptions(correctAnswer) {
    // Clear previous options
    answerOptions.innerHTML = '';
    
    // Create array with correct answer
    const options = [correctAnswer];
    
    // Add 3 wrong answers
    while (options.length < 4) {
        const config = gameConfig[gameState.difficulty];
        let wrongAnswer;
        
        // Generate wrong answer based on difficulty
        if (gameState.difficulty === 'easy') {
            // For easy, wrong answers are +/-1 or +/-2 from correct
            const offset = getRandomNumber(1, 2) * (Math.random() < 0.5 ? 1 : -1);
            wrongAnswer = correctAnswer + offset;
        } else {
            // For medium/hard, wrong answers are within a wider range
            const maxOffset = gameState.difficulty === 'medium' ? 5 : 10;
            const offset = getRandomNumber(1, maxOffset) * (Math.random() < 0.5 ? 1 : -1);
            wrongAnswer = correctAnswer + offset;
        }
        
        // Ensure wrong answer is positive and not a duplicate
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    
    // Shuffle options
    shuffleArray(options);
    
    // Create option elements
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        answerOptions.appendChild(optionElement);
    });
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check if answer is correct
function checkAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer === gameState.currentProblem.answer;
    
    if (isCorrect) {
        // Correct answer
        gameState.score += 10;
        gameState.correctAnswers++;
        showFeedback(true, 'Great job!');
        playSound('correct');
    } else {
        // Wrong answer
        gameState.lives--;
        showFeedback(false, `Oops! The answer was ${gameState.currentProblem.answer}`);
        playSound('wrong');
    }
    
    // Update UI
    updateUI();
    
    // Check if game should continue
    if (gameState.lives <= 0) {
        // Game over
        setTimeout(() => {
            endGame('Game Over');
        }, 1500);
    } else {
        // Move to next question
        gameState.currentQuestion++;
        
        // Check if level is complete
        const config = gameConfig[gameState.difficulty];
        if (gameState.currentQuestion % config.questionsPerLevel === 0) {
            // Level complete
            if (gameState.level < config.levels) {
                // Move to next level
                gameState.level++;
                showFeedback(true, `Level ${gameState.level} Unlocked!`);
                playSound('levelUp');
            } else {
                // Game complete
                setTimeout(() => {
                    endGame('Game Complete!');
                }, 1500);
                return;
            }
        }
        
        // Generate next problem after delay
        setTimeout(() => {
            generateProblem();
        }, 1500);
    }
}

// Provide hint
function provideHint() {
    // Disable hint button temporarily
    helpBtn.disabled = true;
    
    // Highlight correct answer
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
        if (parseInt(option.textContent) === gameState.currentProblem.answer) {
            option.style.backgroundColor = '#55efc4';
            
            // Reset after 1 second
            setTimeout(() => {
                option.style.backgroundColor = '';
                helpBtn.disabled = false;
            }, 1000);
        }
    });
    
    // Track hint usage
    gameState.hintsUsed++;
}

// Show feedback
function showFeedback(isCorrect, message) {
    feedbackIcon.src = isCorrect ? 'assets/svg/correct.svg' : 'assets/svg/wrong.svg';
    feedbackMessage.textContent = message;
    
    // Show feedback
    feedbackContainer.classList.remove('hidden');
    
    // Hide after 1.5 seconds
    setTimeout(() => {
        feedbackContainer.classList.add('hidden');
    }, 1500);
}

// End game
function endGame(title) {
    // Update result screen
    resultTitle.textContent = title;
    finalStars.textContent = gameState.score;
    finalLevel.textContent = gameState.level;
    correctAnswers.textContent = gameState.correctAnswers;
    
    // Generate result message
    let message;
    const totalQuestions = gameState.totalQuestions;
    const correctPercentage = (gameState.correctAnswers / gameState.currentQuestion) * 100;
    
    if (correctPercentage >= 90) {
        message = "Amazing! You're a math superstar!";
    } else if (correctPercentage >= 70) {
        message = "Great job! You're getting really good at math!";
    } else if (correctPercentage >= 50) {
        message = "Good effort! Keep practicing to improve!";
    } else {
        message = "Nice try! Math takes practice. Don't give up!";
    }
    
    resultMessage.textContent = message;
    
    // Show result screen
    resultScreen.classList.remove('hidden');
    
    // Play sound
    if (title === 'Game Over') {
        playSound('gameOver');
    } else {
        playSound('levelUp');
    }
}

// Reset game state
function resetGame() {
    gameState.level = 1;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.hintsUsed = 0;
}

// Show welcome screen
function showWelcomeScreen() {
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

// Play sound effect
function playSound(soundName) {
    // Uncomment when actual sound files are added
    // sounds[soundName].currentTime = 0;
    // sounds[soundName].play();
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 