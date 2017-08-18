$(document).ready(function() {
  document.querySelector('#delConfirm').style.display = "block";
  console.log("we back");
  setTimeout(function() {
    document.querySelector('#delConfirm').style.display = "none";
    window.location = "https://greetings-siya.herokuapp.com/";
  },2500);
})
