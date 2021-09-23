import React, {Component} from 'react';
import Try from './try.jsx';
let strike = 0;
let ball = 0;
let out = 0;

function  getNumbers() {//랜덤숫자 4개 겹치지않게 뽑기
  const candidate = [1,2,3,4,5,6,7,8,9];
  let array = [] ;
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * candidate.length);
    const chosen = candidate.splice(random,1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component{
  state = {
    value: '',
    result: '',
    answer: getNumbers(),//ex) [1,2,3,5]
    tries:[],
  };

  onChangeInput = (e) => {
    e.preventDefault();
    this.setState({value: e.target.value});
  };
  
  rightNum() {//숫자 올바른지 확인
    const {value} = this.state;
    const arrNum = value.split('');
    const zero = arrNum.includes("0");
    const overlap = new Set(arrNum);
  
    if (zero || overlap.size < 4 || value.length < 4) { //숫자 올바른지 확인
      alert("중복되지 않는 숫자 4개를 입력해주세요. (범위: 1~9)");
    } else { //기존 숫자와의 중복 확인
      checkPN(value);
    }
  }

  // checkPN(value) { //기존 숫자와의 중복확인
  //   const {tries,value} = this.state;
  //   let overlapPN = false;
  //   tries.forEach((v,i) => {
  //     if(v.try === value){
  //       overlapPN = true;
  //     }
  //   })
  
  //   if (overlapPN) {
  //     alert("기존 숫자와 중복됩니다. 다시 입력해수세요.");
  //   } else {
      
  //     checkResult(value);
  //   }
  // }
  
  // strikeAndBall(number) {
    
  //   const arrPick = number.split('');
  //   const arrPN = arrPick.map((v) => Number(v));
  
  //   randomNums.forEach((v, i) => { //b,s 출력
  //     if (arrPN.includes(v)) {
  //       i === arrPN.indexOf(v) ? strike++ : ball++;
  //     }
  //   })
  //   checkOut(number);
  //   strike = 0;
  //   ball = 0;
  // }

  //  checkResult(number) {//입력 결과 확인
  //   const {answer, value, result, tries} = this.state;
  //   const joinAnswer = answer.join('');
  //   const br = document.createElement('br');
  
  //   if (joinAnswer === value) {//HR확인
  //     this.setState({
  //       result:`${joinAnswer} HomeRun🎉`,
  //     })
  //   } else if (tries.length >= 9) {//시도횟수 확인
  //     this.setState({
  //       result:`${value} : You failed😓 정답 : ${joinAnswer} `,
  //     })
  //   } else {//s,b 출력
  //     this.setState((prevState) => {
  //       tries:[...prevState.tries, {try: value, result: `${strike}S ${ball}B`}],
  //     })
  //     strikeAndBall(number);
  //   }
  // }
  onSubmitForm = (e) => {
    e.preventDefault();
    const {result, value, tries, answer} = this.state;//구조분해
    const joinAnswer = answer.join('');
    const input = e.target[0];
    console.dir(e.target[0].value);
    if(joinAnswer === value){//홈런
      this.setState({
        result:`${joinAnswer} HomeRun🎉`,
      })
    }else if(tries.length >= 9){//기회 모두 다 썼을 경우
      this.setState({
        result:'You failed😓 정답 :' + joinAnswer.join(','),
      })
    }else{//기회 9번 이하 경우
      const arrValue = value.split('');
      const arrPV = arrValue.map((v) => parseInt(v));
      answer.forEach((v, i) => { //b,s 출력
        if (arrPV.includes(v)) {
          i === arrPV.indexOf(v) ? strike++ : ball++;
          this.setState((prevState)=> {
            return{
              tries:[...prevState.tries, {try: value, result: `${strike}S ${ball}B`}],
            }
          })
        }
      })
    }

    strike = 0;
    ball = 0;
    input.value = '';
  }

  render(){
    const {result, value, tries} = this.state;//구조분해
    return(
      <>
        <div>{result}</div>
        <form onSubmit={this.onSubmitForm}>
          <input defaultValue={value} onChange={this.onChangeInput} type="text" maxLength="4" placeholder="Please enter 4 numbers"/>
          <button>Submit</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((v,i) => {
              return(
                <Try key={v.try} tryInfo= {v}/>               
              )
            })}
        </ul>
      </>
    )
  }
  
}
export default NumberBaseball;



