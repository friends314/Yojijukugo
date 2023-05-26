'use strict';

const jukugo = document.querySelector("#jukugo");
const answer = document.querySelector("#answer");
const reveal = document.querySelector("#reveal");
const meaning = document.querySelector("#meaning");
const loc = document.querySelector("#location");

const total = dictionary.length;  // 問題数
let current = 1;                 // 現在何問目か
let rate = 0; // 進捗率

/**
 * 辞書から１つランダムに取得
 * 一度出題された四字熟語は除外し、取得し直す。
 * @meth Math.floor(Math.random() * (max - min) + min);
 */
const tmp = []; // 除外用配列
const getQuestion = (d = dictionary) => {
    // 入力フォームを初期化
    answer.value = '';

    if (tmp.length == total) {
        jukugo.textContent = 'お疲れ様でした';

        const current_location = getLocation(current, total);
        loc.textContent = current_location;

        reveal.remove();  // 完了画面の作成を検討
        meaning.remove();
        answer.remove();
        return false;
    }

    let key;
    do {
        key = Math.floor(Math.random() * total);
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
    console.log(question);
    jukugo.textContent = question.jukugo;
    meaning.textContent = question.meaning;
    answer.focus();
    const current_location = getLocation(current, total);
    loc.textContent = current_location;
}
displayQuiz(question);

/**
 * 正解したら次の問題を表示
 */
const checkAnswer = () => {
    answer.addEventListener('keydown', (e) => {
        // console.log(e.keyCode);
        if (e.keyCode == 13 ) {
            // console.log(e.target.value);
            if (e.target.value === question.kana) {
                alert('正解！');
                current += 1;
                question = getQuestion();
                if (question != false) {
                    displayQuiz(question);
                    checkAnswer();
                }
            } else if (e.target.value !== ''){
                answer.classList.add('deny');
            }else{
                answer.classList.remove('deny');
            }
        }
    })
}
checkAnswer();

reveal.addEventListener('click', () => {
    alert(question.kana);
})

/**
 * 現在何問目か＋進捗率を取得
 */
function getLocation(current, total) {
    rate = Math.floor((current - 1) / total * 100);
    // console.log (current);
    // console.log(total);
    if(current - 1 == total){
        return `全問終わり（進捗率${rate}%）`;
    }else {
        return `現在【${current}/${total}】問目（進捗率${rate}%）`;
    }
}
