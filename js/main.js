'use strict';

const submit = document.querySelector("#submit");
const reveal = document.querySelector("#reveal");

/**
 * 辞書から１つランダムに取得
 * 一度出題された四字熟語は除外し、取得し直す。
 * @meth Math.floor(Math.random() * (max - min) + min);
 */
const tmp = []; // 除外用配列
const getQuestion = (d = dictionary) => {
    if (tmp.length == d.length) {
        alert("お疲れ様でした");
        reveal.remove();  // 完了画面の作成を検討
        return false;
    }

    let key;
    do {
        key = Math.floor(Math.random() * d.length);
    } while (tmp.includes(key));

    tmp.push(key);
    console.log(tmp);
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
            if (question != false){
                displayQuiz(question);
                submitAnswer();
            }
        }
    })
}
submitAnswer();

reveal.addEventListener('click', () => {
    alert(question.kana);
})
