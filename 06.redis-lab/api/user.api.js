const fetch = require("node-fetch");

class userApi {
  constructor() {}
  
  fetchUsers() {
    return fetch("http://jsonplaceholder.typicode.com/users");
  }
}

module.exports = new userApi();
