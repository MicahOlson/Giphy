import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchGiphy from './js/search_giphy.js';
import FindTrend from './js/find_trend.js';

function clearFields() {
  $("#giphy").val("");
  $("li").remove();
}

$(document).ready(function() {
  $("#findgiphy").click(function(){
    const search = $("#giphy").val();
    clearFields();
    let promise = SearchGiphy.getGiphy(search);
    promise.then(function(response) {
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index ++) {
        $("#results0").append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }}, function(error) {
      $("#results0").text(`There was an error processing your request: ${error}`);
    });
  });

  $('#findtrendgiphy').click(() => {
    clearFields();
    let promise = FindTrend.getTrend();
    promise.then((response) => {
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index ++) {
        $('#result').append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }}, (error) => {
      $("#result").text(`There was an error processing your request: ${error}`);
    });
  });
  

  $('#randomgiphy').click(function() {
    let request = new XMLHttpRequest();

    const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=pg-13`

    request.onreadystatechange = function(){
    console.log(this.readyState)
      if (this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);          
        getElements(response);
          
      }
    }

    request.open("GET", randomURL, true);
    request.send();

    function getElements(response) {
      $('#randomresult').html(`<img src='${response.data.url}' alt="result gif">`);
    }
  });
});