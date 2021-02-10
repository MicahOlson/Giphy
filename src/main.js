import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchGiphy from './js/search_giphy.js';
import FindTrend from './js/find_trend.js';
import RandomGiphy from './js/random_giphy.js';

function clearFields() {
  $("#giphy").val("");
  $("li").remove();
}

$(document).ready(function() {
  $("#findgiphy").click(function() {
    const search = $("#giphy").val();
    clearFields();
    let promise = SearchGiphy.getGiphy(search);
    promise.then(function(response) {
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index ++) {
        $("#images").append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }}, function(error) {
      $("#images").text(`There was an error processing your request: ${error}`);
    });
  });

  $('#findtrendgiphy').click(function() {
    clearFields();
    let promise = FindTrend.getTrend();
    promise.then(function(response) {
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index ++) {
        $('#images').append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }}, function(error) {
      $('#images').text(`There was an error processing your request: ${error}`);
    });
  });
  

  $('#randomgiphy').click(function() {
    clearFields();
    let promise = RandomGiphy.getRandom();
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('#images').html(`<li><img src='${body.data.images.original.url}' alt="result gif"></li>`);
    }, function(error) {
      $('#images').text(`There was an error processing your request: ${error}`);
    });
  });
});