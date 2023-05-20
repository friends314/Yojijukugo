'use strict';

const submit = document.querySelector("#submit");

if (submit) {
    submit.addEventListener('click', () => {
        const answer = document.querySelector("#answer").value;
        // console.log(answer);
        if (answer === 'ぶんしつひんぴん') {
            alert('正解！');
        }
    })
}
