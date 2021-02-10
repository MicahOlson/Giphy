export default class FindTrend {
  static getTrend() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;
      request.onload = () => {
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