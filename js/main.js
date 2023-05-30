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
    reveal.nextElementSibling.textContent = question.kana;
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
        if (e.keyCode == 13 ) {
            if (e.target.value === question.kana) {
                alert('正解！');
                current += 1;
                question = getQuestion();
                if (question != false) {
                    displayQuiz(question);
                    checkAnswer();

                    reveal.nextElementSibling.style.height = 0;
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

/**
 * 現在何問目か＋進捗率を取得
 */
function getLocation(current, total) {
    rate = Math.floor((current - 1) / total * 100);
    if(current - 1 == total){
        return `全問終わり（進捗率${rate}%）`;
    }else {
        return `現在【${current}/${total}】問目（進捗率${rate}%）`;
    }
}

/**
 * 正解を見る
 */
const cheat = document.querySelectorAll('.cheat');

cheat.forEach(item => {
    const button = item.querySelector('#reveal');
    const target = button.nextElementSibling;
    target.textContent = question.kana;

    const targetH = target.offsetHeight;
    target.style.height = 0;

    button.addEventListener('click', e => {
        button.classList.toggle('is-open');
        target.classList.toggle('is-open');

        if (target.classList.contains('is-open')) {
            target.style.height = targetH + 'px';
        } else {
            target.style.height = 0;
        }
    })
});

/**
 * 経過時間を表示
 */
let startTime = Date.now();

const timeID = setInterval((tmp, total)=>{
    const millis = Date.now() - startTime;
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);

    if(minutes > 0) {
        document.querySelector('.time').textContent = minutes + '分' + seconds + '秒';
    }else{
        document.querySelector('.time').textContent = seconds + '秒';
    }

    console.log(seconds);
    if (tmp.length == total) {
        clearInterval(timeID);
    }
}, 1000);
