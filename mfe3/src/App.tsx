
import React from 'react'
import ReactDOM from 'react-dom'
import Countdown from './components/CountDown';

export default class App extends React.Component {
   



   handleClick = ()=> {
      alert("I am from React");  
  }



  render() {
   
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
    return (
      <>
      <img style= {{marginRight: "10px"}} src={logoUrl} height="30"></img>
        React MFE3
        <Countdown initialSeconds={50000}/>

        <button onClick={this.handleClick}>Call me</button>
       </>
       
    )
  }
}

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define('react-element', ReactMfe);
