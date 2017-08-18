$(document).ready(function() {
  document.querySelector('#delConfirm').style.display = "block";
  console.log("we back");
  setTimeout(function() {
    document.querySelector('#delConfirm').style.display = "none";
    window.location = "http://localhost:3000/";
  },2500);
})
