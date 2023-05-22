'use strict';

const submit = document.querySelector("#submit");

/**
 * 辞書から１つランダムに取得
 * @meth Math.floor(Math.random() * (max - min) + min);
 */
const key = Math.floor(Math.random() * (dictionary.length));
const obj = dictionary[key];

// HTML初期表示
document.querySelector("#jukugo").textContent = obj.jukugo;
document.querySelector("#meaning").textContent = obj.meaning;


if (submit) {
    submit.addEventListener('click', () => {
        const answer = document.querySelector("#answer").value;
        // console.log(answer);
        if (answer === obj.kana) {
            alert('正解！');
        }
    })
}
