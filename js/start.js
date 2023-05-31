'use strict';

/**
 * レベルを追加し、問題の難易度を分ける
 */
const levels = document.querySelectorAll('.lv-btn');
const startBtn = document.querySelector("#start-btn");
const hrefDefault = document.querySelector("#start-btn").href;

levels.forEach((item, index)=> {

    item.addEventListener('click', e => {

    const level = item.dataset.level;
    const param = `?level=${level}`;

    startBtn.href = `${hrefDefault}${param}`;
        console.log(startBtn.href);
    })
});
