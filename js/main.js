'use strict';

const submit = document.querySelector("#submit");
const reveal = document.querySelector("#reveal");

/**
 * 辞書から１つランダムに取得
 * @meth Math.floor(Math.random() * (max - min) + min);
 */
const getQuestion = (d = dictionary) => {
    const key = Math.floor(Math.random() * (d.length));

    return d[key];
}
let question = getQuestion();

/**
 * 問題を表示
 */
const displayQuiz = question => {
    // console.log(question);
    document.querySelector("#jukugo").textContent = question.jukugo;
    document.querySelector("#meaning").textContent = question.meaning;
}
displayQuiz(question);

/**
 * 正解したら次の問題を表示
 */
const submitAnswer = () => {
    submit.addEventListener('click', () => {
        const answer = document.querySelector("#answer").value;

        if (answer === question.kana) {
            alert('正解！');
            question = getQuestion();
            displayQuiz(question);
            submitAnswer();
        }
    })
}
submitAnswer();

reveal.addEventListener('click', () => {
    alert(question.kana);
})
