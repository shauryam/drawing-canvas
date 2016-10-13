//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately

var color = $('.selected').css('background-color');
var r;
var g;
var b; 
var rgbColor;
var context = $("canvas")[0].getContext("2d");
var $canvas = $("canvas");
var lastEvent;
var mouseDown;


//When clicking on control list items
$('.controls').on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element    
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});
  
//When new color is pressed
$('#revealColorSelect').click(function(){
  //Show color select or hide the color select
  changeColor();
  $('#colorSelect').toggle();
});
  
//When color sliders change
function changeColor(){
  r = $('#red').val();
  g = $('#green').val();
  b = $('#blue').val();
  rgbColor = 'rgb(' + r +',' + g + ',' + b + ')'
  $('#newColor').css("background-color", rgbColor);
}


  //update the new color span
$("input[type=range]").on("input", changeColor);
  

//When add color is pressed
$('#addNewColor').click(function(){
  var $newColor = $('<li></li>');
  $newColor.css("background-color", $('#newColor').css("background-color"));
  $('.controls ul').append($newColor);
  $newColor.click();
})
  //Append the color to the controls ul
  //Select the new color

  $canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    if(mouseDown){        
      context.beginPath();
      context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  }).mouseup(function(){
    mouseDown = false;
  }).mouseleave(function(){
    $canvas.mouseup();
  });

//On mouse events on the canvas
  //Draw lines\
