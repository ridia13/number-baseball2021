"use strict";

const $form = document.querySelector('form'),
  $input = $form.querySelector(".js-input"),
  $submit = $form.querySelector(".js-submit");
const $div = document.querySelector(".js-box");

const RANGE = 9;
const numbers = [];
const randomNums = [];
let pickNums = [];
let tryNum = 0;
let strike = 0;
let ball = 0;
let out = 0;

function setNumbers() { //randomNum 뽑을 숫자 셋팅
  for (let i = 0; i < RANGE; i++) {
    numbers.push(i + 1);
  }
}

function getRandom() { //randomNum 숫자 뽑기
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * numbers.length);
    randomNums.push(numbers[random]);
    numbers.splice(random, 1);
  }
  console.log(`randomNums : ${randomNums}`);
}

function paintResult(number,text){
  const br = document.createElement('br');
  $div.append(`${number} : ${text} `,br);
} 

function checkOut(number){//out 확인
  if (strike === 0 && ball === 0) { 
    out++;
    paintResult(number,`${out} OUT`);
    out === 3 ? paintResult(number,`You failed😓 정답 : ${randomNums}`) : null;
  }else{
    paintResult(number,`${ball}B, ${strike}S`);
    tryNum++;
  }
}

function strikeAndBall(number) {
  const arrPick = number.split('');
  const arrPN = arrPick.map((v) => Number(v));

  randomNums.forEach((v, i) => { //b,s 출력
    if (arrPN.includes(v)) {
      i === arrPN.indexOf(v) ? strike++ : ball++;
    }
  })
  checkOut(number);
  strike = 0;
  ball = 0;
}

function checkResult(number) {//입력 결과 확인
  const joinRandom = randomNums.join('');
  const br = document.createElement('br');

  if (joinRandom === number) {//HR확인
    paintResult(number,`HomeRun🎉`);
  } else if (tryNum >= 9) {//시도횟수 확인
    paintResult(number,`You failed😓 정답 : ${randomNums}`);
  } else {//s,b 출력
    strikeAndBall(number);
  }
}

function checkPN(value) { //기존 숫자와의 중복확인
  const overlapPN = pickNums.includes(value);

  if (overlapPN) {
    alert("기존 숫자와 중복됩니다. 다시 입력해수세요.");
  } else {
    pickNums.push(value);
    checkResult(value);
  }
}

function rightNum(value) {//숫자 올바른지 확인
  const arrNum = value.split('');
  const zero = arrNum.includes("0");
  const overlap = new Set(arrNum);

  if (zero || overlap.size < 4 || value.length < 4) { //숫자 올바른지 확인
    alert("중복되지 않는 숫자 4개를 입력해주세요. (범위: 1~9)");
  } else { //기존 숫자와의 중복 확인
    checkPN(value);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const value = $input.value;

  rightNum(value);
  $input.value = "";
}

function init() {
  setNumbers();
  getRandom();
  $form.addEventListener('submit', handleSubmit);
}
init();