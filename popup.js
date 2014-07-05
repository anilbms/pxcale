// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  //alert("document");
});

window.onload = function() {
    //alert("window");
  var btn1 = document.querySelector('#sayHi');
  btn1.addEventListener('click', function (event) {
    //console.log("hello world");
  });
}