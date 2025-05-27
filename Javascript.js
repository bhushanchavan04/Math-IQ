// Wait for the full HTML document to be loaded before running the script
document.addEventListener("DOMContentLoaded", function () {

    let score = 0; // Initialize the score
    let correctAnswer = 8; // Initial correct answer for the first default question (2 * 4)

    // Get references to the DOM elements for score, feedback messages, question, answer boxes, and start button
    const scoreElement = document.getElementById("scorelvalue");
    const correctElement = document.getElementById("Correct");
    const tryElement = document.getElementById("Try");
    const questionElement = document.getElementById("Que");
    const choices = document.querySelectorAll(".box");
    const startRestartButton = document.getElementById("Startrestart");

    // Update the displayed score
    function updateScore() {
        scoreElement.textContent = score;
    }

    // Show the "Correct!" message
    function showCorrect() {
        correctElement.style.display = "block";
        tryElement.style.display = "none";
    }

    // Show the "Try Again!" message
    function showTryAgain() {
        tryElement.style.display = "block";
        correctElement.style.display = "none";
    }

    // Hide both feedback messages
    function hideMessages() {
        tryElement.style.display = "none";
        correctElement.style.display = "none";
    }

    // Generate a new multiplication question and set answer options
    function generateQuestion() {
        // Generate two random numbers between 1 and 10
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2; // Calculate the correct answer
        questionElement.textContent = `${num1} * ${num2}`; // Display the question

        // Randomly choose one of the 4 boxes to contain the correct answer
        const correctBoxIndex = Math.floor(Math.random() * 4);

        // Set answer choices in the boxes
        choices.forEach((box, index) => {
            if (index === correctBoxIndex) {
                // Assign correct answer
                box.textContent = correctAnswer;
            } else {
                // Generate a random wrong answer (not equal to the correct one)
                let wrongAnswer;
                do {
                    wrongAnswer = Math.floor(Math.random() * 81); // Max possible product (9*9 = 81)
                } while (wrongAnswer === correctAnswer);
                box.textContent = wrongAnswer;
            }
        });
    }

    // Start or restart the game
    function startGame() {
        score = 0; // Reset score
        updateScore(); // Display updated score
        generateQuestion(); // Generate a new question
        hideMessages(); // Hide any previous feedback
    }

    // Add click event listeners to each answer choice box
    choices.forEach(box => {
        box.addEventListener("click", function () {
            const selectedAnswer = parseInt(this.textContent, 10); // Get the number user clicked
            if (selectedAnswer === correctAnswer) {
                score++; // Increase score if correct
                showCorrect(); // Show positive feedback
            } else {
                showTryAgain(); // Show negative feedback
            }
            updateScore(); // Refresh the score on screen

            // Wait a moment before loading the next question and hiding messages
            setTimeout(() => {
                generateQuestion();
                hideMessages();
            }, 1000); // 1 second delay
        });
    });

    // Start the game when the Start/Restart button is clicked
    startRestartButton.addEventListener("click", startGame);

    // Automatically start the game when the page loads
    startGame();
});

