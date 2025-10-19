document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitBtn = document.getElementById('submit');
    const resultContainer = document.getElementById('result');

    let quizData = [];

    fetch('get_quiz.php')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            showQuiz();
        })
        .catch(error => console.error('Error fetching quiz:', error));

    function showQuiz() {
        quizContainer.innerHTML = '';

        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question_text}</p>
                <label><input type='radio' name='q${q.id}' value='a'> ${q.option_a}</label><br>
                <label><input type='radio' name='q${q.id}' value='b'> ${q.option_b}</label><br>
                <label><input type='radio' name='q${q.id}' value='c'> ${q.option_c}</label><br>
                <label><input type='radio' name='q${q.id}' value='d'> ${q.option_d}</label><br>
            `;

            quizContainer.appendChild(questionDiv);
        });
    }

    submitBtn.addEventListener('click', () => {
        let score = 0;

        quizData.forEach(q => {
            const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (selected && selected.value === q.correct_answer) {
                score++;
            }
        });

        resultContainer.innerHTML = `🎯 Your score: ${score} / ${quizData.length}`;
    });
});
