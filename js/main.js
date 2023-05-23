'use strict';

const jukugo = document.querySelector("#jukugo");
const answer = document.querySelector("#answer");
const reveal = document.querySelector("#reveal");

/**
 * 辞書から１つランダムに取得
 * 一度出題された四字熟語は除外し、取得し直す。
 * @meth Math.floor(Math.random() * (max - min) + min);
 */
const tmp = []; // 除外用配列
const getQuestion = (d = dictionary) => {
    // 入力フォームを初期化
    answer.value = '';

    if (tmp.length == d.length) {
        jukugo.textContent = 'お疲れ様でした';
        reveal.remove();  // 完了画面の作成を検討
        return false;
    }

    let key;
    do {
        key = Math.floor(Math.random() * d.length);
    } while (tmp.includes(key));

    tmp.push(key);
    // console.log(tmp);
    return d[key];
}
let question = getQuestion();

/**
 * 問題を表示
 */
const displayQuiz = question => {
    // console.log(question);
    jukugo.textContent = question.jukugo;
    document.querySelector("#meaning").textContent = question.meaning;
    answer.focus();
}
displayQuiz(question);

/**
 * 正解したら次の問題を表示
 */
const checkAnswer = () => {
    answer.addEventListener('keydown', (e) => {
        console.log(e.keyCode);
        if (e.keyCode == 13 ) {
            if(e.target.value === question.kana) {
                answer.classList.remove('deny');
                alert('正解！');
                question = getQuestion();
                if (question != false) {
                    displayQuiz(question);
                    checkAnswer();
                }
            }else{
                answer.classList.add('deny');
            }
        }
    })
}
checkAnswer();

reveal.addEventListener('click', () => {
    alert(question.kana);
})
