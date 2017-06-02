$(document).ready(function() {
  document.querySelector('#delConfirm').style.display = "block";
  console.log("we back");
  setTimeout(function() {
    document.querySelector('#delConfirm').style.display = "none";
  },2500);
})
