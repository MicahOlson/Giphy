export default class RandomGiphy {
  static getRandom() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=pg-13`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open('GET', url, true);
      request.send();
    });
  }
}