const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
  let markov;
  const sentence = 'the cat in the hat is in the hat';

  beforeEach(() => {
    markov = new MarkovMachine(sentence);
  });

  afterAll(() => {
    markov = null;
  });

  test('properly instantiate words and Markov chains', () => {
    const words = sentence.split(' ');
    expect(markov.words).toEqual(expect.arrayContaining(words));
    expect(markov.words.length).toBe(9);
    expect(Object.keys(markov.chains).length).toBe(5);
    expect(markov.chains['hat']).toContain(null);
    expect(markov.chains['the']).toEqual(['cat', 'hat']);
  });

  test('generate text via makeText() function', () => {
    const text = markov.makeText(10);
    const textWords = text.split(' ');

    expect(textWords.length).toBeLessThanOrEqual(10);
    expect(textWords.length).toBeGreaterThan(0);
    expect(markov.words).toEqual(expect.arrayContaining(textWords));
  });

});