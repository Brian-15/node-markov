/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1] !== undefined? this.words[i + 1]: null;

      if (chains[currWord]) {
        chains[currWord].push(nextWord);
      } else {
        chains[currWord] = [nextWord];
      }
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
  
    let currWord = this.words[Math.floor(Math.random() * this.words.length)];
    let text = '';
    
    for (let i = 1; i <= numWords; i++) {
      text += `${currWord} `;
      const nextWords = this.chains[currWord];
      currWord = nextWords[Math.floor(Math.random()*nextWords.length)];
      
      if (currWord === null) break;
    }

    return text;
  }
}
