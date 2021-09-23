import React, {Component} from 'react';

class Try extends Component{
  render(){
    const {v} = this.props;
    return(
      <li>
        try: <b>{v.tryNum}</b>, result: <b>{v.result}</b>
      </li>
  )}
}
export default Try;

// hooks
// const Try = ({tryInfo}) =>{//{tryInfo}자리에 props 도 가능 -> return안에도 props 적어줘야함
// props 존재 시 부모가 있다는 것, but 부모도 props라면 리덕스 등 추천
// <li>
//   try: <b>{tryInfo.try}</b>, result: <b>{tryInfo.result}</b>
// </li> 