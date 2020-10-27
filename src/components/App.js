import React from 'react';

class App extends React.Component {
  state = { term: "", currentLetter: "" }

  handleMe = async event => {
    event.preventDefault();
    let trimmedTerm = this.state.term.replace(/\s+/g, '');
    let playLetterFns = [];

    [...trimmedTerm].forEach((char, i) => {
      let audio = new Audio(`${process.env.PUBLIC_URL}/${char.toUpperCase()}.wav`);

      let playLetterFn = new Promise( resolve => {
        setTimeout(() => {
          audio.play();

          this.setState({ currentLetter: char });
          resolve();
        }, (i + 1) * 1000);
      });

      playLetterFns.push(playLetterFn);
    });

    await Promise.all(playLetterFns);

    this.setState({ currentLetter: this.state.term })
  }

  handleInputChange = event => {
    let termValue = event.target.value;

    this.setState({ term: termValue })
  }

  render() {
    return (
      <div className="w-full flex flex-wrap justify-center">
        <div className="w-full flex justify-center h-48">
          <span className="block-inline text-6xl font-bold text-white p-12">{this.state.currentLetter}</span>
        </div>
        <form className="mt-6 p-12 w-8/12 flex flex-wrap justify-center" onSubmit={this.handleMe}>
          <input className="border-b-8 border-gray-800 bg-indigo-500 w-full py-12 px-12 mb-12 text-5xl text-white placeholder-white focus:outline-none" val={this.term} placeholder="Type your word here" onChange={this.handleInputChange} />
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-24 text-2xl rounded">
            Spell
          </button>
        </form>
      </div>
    )
  }
};

export default App;
