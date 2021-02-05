const fetch = require("node-fetch");

class commentApi {
  constructor() {}

  fetchComments() {
    return fetch("http://jsonplaceholder.typicode.com/comments");
  }
}

module.exports = new commentApi();
