import React from 'react';

class App extends React.Component {
  state = { term: "" }

  handleMe = event => {
    event.preventDefault();
    let trimmedUppercasedTerm = this.state.term.replace(/\s+/g, '').toUpperCase();

    [...trimmedUppercasedTerm].forEach((char, i) => {
      let audio = new Audio(`${process.env.PUBLIC_URL}/${char}.wav`);

      setTimeout(() => audio.play(), (i + 1) * 1000);
    })
  }

  handleInputChange = event => {
    let termValue = event.target.value;

    this.setState({ term: termValue })
  }

  render() {
    return (
      <div className="h-screen bg-indigo-500">
        <div className="w-full flex justify-center">
          <form className="mt-12 p-12 w-8/12 flex flex-wrap justify-center" onSubmit={this.handleMe}>
            <input className="border-b-8 border-gray-800 bg-indigo-500 w-full py-12 px-12 mb-12 text-5xl text-white placeholder-white focus:outline-none" val={this.term} placeholder="Type your word here" onChange={this.handleInputChange} />
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-6 px-24 text-2xl rounded">
              Spell
            </button>
          </form>
        </div>
      </div>
    )
  }
};

export default App;
