export default class SearchGiphy {
  static getGiphy(search) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const apiURL = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }

      request.open("GET", apiURL, true);
      request.send();
    });
  }
}