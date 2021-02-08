import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#findgiphy").click(function(){
    const search = $("#giphy").val();
    $("#findgiphy").val("");

    let request = new XMLHttpRequest();
    const apiURL = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;

    request.onreadystatechange = function(){
      //console.log(this.readyState)
      if (this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", apiURL, true);
    request.send();

    function getElements(response){
      for (let index = 0; index < response.data.length; index ++){
        $("#results0").append(`<img src='${response.data[index].images.original.url}' alt="result gif">`);
      }
    }
  });
});