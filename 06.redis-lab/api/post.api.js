const fetch = require("node-fetch");

class postApi {
  constructor() {}

  fetchPosts() {
    return fetch("http://jsonplaceholder.typicode.com/posts");
  }
}

module.exports = new postApi();
