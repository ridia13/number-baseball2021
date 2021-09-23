import React, {Component} from 'react';
import Try from './Try.jsx';
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
    answer: getNumbers(),//ex) [1,2,3,5]
    value: '',
    result: '',
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
    const overlap = new Set(arrNum);//중복 자동제거
    console.log(`arrNum: ${arrNum}`);
    if (zero || overlap.size < 4 || value.length < 4) { //숫자 올바른지 확인
      alert("중복되지 않는 숫자 4개를 입력해주세요. (범위: 1~9)");
    } else { //기존 숫자와의 중복 확인
      this.checkPN();
    }
  }

  checkOut(){//out 확인
    const {result, value, answer, tries} = this.state;
    const joinAnswer = answer.join('');
    if (strike === 0 && ball === 0) { 
      out++;
      this.setState((prevState) => {
        return{
          tries: [...prevState.tries, {tryNum: value, result: `${out} OUT`}],
        }
      });
      out === 3 ? this.setState({result:`You failed😓 정답 : ${joinAnswer}`}) : null;
    }else{
      this.setState((prevState) => {
        return{
          tries: [...prevState.tries, {tryNum: value, result: `${ball}B, ${strike}S`}],
        }
      });
    }
  }

  strikeAndBall(){
    const {value, answer,tries} = this.state;
    const arrPick = value.split('');
    const arrPN = arrPick.map((v) => parseInt(v));

    answer.forEach((v, i) => { //b,s 출력
      if (arrPN.includes(v)) {
        i === arrPN.indexOf(v) ? strike++ : ball++;
      }
    })
    this.checkOut();
  }

  checkResult() {//입력 결과 확인
    const {answer, value, result, tries} = this.state;
    const joinAnswer = answer.join('');
   
    if (joinAnswer === value) {//HR확인
      this.setState({
        result:`${joinAnswer}: HomeRun🎉`,
      })
    } else if (tries.length >= 9) {//시도횟수 확인
      this.setState({
        result:`You failed😓 정답: ${joinAnswer} `,
      })
    }else {//s,b 출력
      this.strikeAndBall();
    }
  }

  checkPN() { //기존 숫자와의 중복확인
    const {value, tries} = this.state;
    let overlapPN = false;
    tries.forEach((v, i) => {
      if(v.tryNum === value){
        overlapPN = true;
      }
    })

    if (overlapPN) {
      alert("기존 숫자와 중복됩니다. 다시 입력해수세요.");
    } else {
      this.checkResult();
    }
  }
 
  onSubmitForm = (e) => {
    e.preventDefault();
    const {value} = this.state;
    strike = 0;      
    ball = 0;
    this.rightNum();
    this.setState({value: ''});
  }

  render(){
    const {result, value, tries} = this.state;//구조분해
    return(
      <>
        <div>{result}</div>
        <form onSubmit={this.onSubmitForm}>
          <input value={value} onChange={this.onChangeInput} type="text" maxLength="4" placeholder="Please enter 4 numbers"/>
          <button>Submit</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((v,i) => {
              return(
                <Try key={v.tryNum} v= {v}/>   
              )
            })}
        </ul>
      </>
    )
  }
}
export default NumberBaseball;



