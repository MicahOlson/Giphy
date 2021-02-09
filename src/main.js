import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){


  $("#findgiphy").click(function(){
    const search = $("#giphy").val();
    $("#findgiphy").val("");
    
    // function clearFields(response) {
    //   for (let i =0; i < response.data.length; i ++){
    //   $("#img"+i).remove;
    //   }
    // }

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
        $("#results0").append(`<li><img src='${response.data[index].images.original.url}' alt="result gif"></li>`);
        
      }
      // clearFields(response);
    }
  });

  $('#findtrendgiphy').click(function() {
    
    let request = new XMLHttpRequest();

    const api = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;

    request.onreadystatechange = function(){
      //console.log(this.readyState)
      if (this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);
        getElements(response);
        
      }
    }

    request.open("GET", api, true);
    request.send();


    function getElements(response) {
      for (let index = 0; index < response.data.length; index ++) {
        $('#result').append(`<li><img src='${response.data[index].images.original.url}' alt="result gif"></li>`);
      } 
    }
  });

  $('#randomgiphy').click(function() {
    let request = new XMLHttpRequest();

    const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=pg-13`

    request.onreadystatechange = function(){
     console.log(this.readyState)
      if (this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);          getElements(response);
          
      }
    }

    request.open("GET", randomURL, true);
    request.send();

    function getElements(response) {
      $('#randomresult').html(`<img src='${response.data.url}' alt="result gif">`);
    }
  })
});