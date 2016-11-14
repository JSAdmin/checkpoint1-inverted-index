'use strict';
/**
 * Function that regularizes input
 * @param tokens
 * @return newToken
 */
const tokenize = (tokens) => {
  const newToken = tokens.replace(/[^a-z0-9]+/gi, ' ')
    .trim().toLowerCase();
  //send out the new token
  return newToken;
};

class Index {
  /**
   * Get Index method that indexes JSON file
   * @param data (key,value pair)
   * @return fileIndex
   */
  getIndex(data) {
    let fileIndex = {};

    for (let i = 0; i < data.docs.length; i++) {

      fileIndex[data.name] = [i];
    }
    return fileIndex;
  }
  /**
   * Create Index method that indexes text content of uploaded file
   * @param file
   * @return wordOccurrence
   */
  createIndex(file) {
    const wordOccurrence = {};
    const merge = [];
    let keywords = [];
    let uniqueWords;

    if (file.length === 0) {
      return false;
    }
    else {

      for (let i = 0; i < file.length; i++) {
        let clean = tokenize(file[i].text);
        merge.push(clean.split(' '));
        keywords = [].concat.apply([], merge);
        uniqueWords = new Set(keywords);
        
        for (let key of uniqueWords.keys()) {
          if (clean.includes(key)) {
            if (!wordOccurrence.hasOwnProperty(key)) {

              wordOccurrence[key] = [];
            }

            wordOccurrence[key].push(i);
          }
        }
      }
    }
    return wordOccurrence;
  }
  /**
   * Search Index Method that searches uploaded file with 
   * the aid of the created index
   * @param terms(words to be searched), occurrence
   * @return result
   */
  searchIndex(terms, occurrence) {
    let result = {};

    if (typeof terms !== 'string' || terms === '' || (terms.trim()) === '') {
      return false;
    }
    else {
      const token = tokenize(terms);
      const words = token.split(' ');

      for (let i = 0; i < words.length; i++) {

        if (occurrence[words[i]] === undefined) {

          result[words[i]] = 'Not Found';
        }
        else {
          const key = words[i];
          const value = occurrence[words[i]];
          result[key] = value;
        }
      }
    }
    return result;
  }

}
