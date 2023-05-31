'use strict';

/**
 * レベルを追加し、問題の難易度を分ける
 */
const levels = document.querySelectorAll('.lv-btn');
const startBtn = document.querySelector("#start-btn");
const hrefDefault = document.querySelector("#start-btn").href;

levels.forEach((level, index)=> {

    level.addEventListener('click', e => {
    const param = `?level=${index + 1}`;

    startBtn.href = `${hrefDefault}${param}`;
        console.log(startBtn.href);
    })
});
