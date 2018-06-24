import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Modal from './components/ClickCard/ClickCard.js';
import Footer from './components/Footer/Footer.js';
import cards from './cards.json';

import cards from './cards.json'


/*import logo from './logo.svg';
import './App.css'; */

class App extends Component {
  state = {
    cards: cards,
    score: 0,
    topScore: 0,
    clickedCards: [],
    footerText: ""
  }

  clickedCharacter = (id) => {
    const [pageBody] = document.getElementsByTagName('body');

    if(this.state.clickedCards.includes(id)){
      this.setState({score: 0, clickedCards: []})

      pageBody.classList.add('shakeWrapper')
      this.setState({footerText: 'You picked that already! Start over.'})
      setTimeout(() => {
        pageBody.classList.remove('shakeWrapper');
      }, 500);
      setTimeout(() => {
        this.setState({footerText: ""})
        
      }, 1800)

  } else {
    this.setState({clickedCards: [...this.state.clickedCards, id]})
    this.setState({score: this.state.score +1})
    if(this.state.score >= this.state.topScore){
      this.setState({topScore: this.state.score +1})

  }
  if (this.state.score === 11){
    this.setState({footerText: 'You Won! Play Again?'})
    this.setState({score: 0, clickedCards: [], cards: cards})
    setTimeout(() => {
      this.setState({footerText: ''})
       }, 1800)
     }
  }
}

reArrangeCards = (array) => {
  let currentIndex = array.length;

  while (0 !== currentIndex) {
    //pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    let temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  this.setState({cards:cards});

}

renderCards = (array) => {
  return this.state.cards.map(card => (
    <section className='col s4 m3 l3' key={card.id} id={card.id}>
    <clickCard
       name={card.name}
       image={card.image}
       reArrangeCards={() => {this.reArrangeCards(this.state.cards)}}/>
       </section>

    )
  )
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
