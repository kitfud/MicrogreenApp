let main = document.getElementById("data");
let size = document.getElementById('size-input');
let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")
context.fillStyle = "green"
context.strokeStyle = "brown"
let sizeVal= 1;
let dataVar;
grabData();

function grabData(){
fetch('https://api.npoint.io/9c28b9b051994bba6e16')
  .then(response => response.json())
  .then(data => {
  dataVar = data;
  })
  //.then(data => console.log((dataVar)))
  .catch(error=>
    console.log("Error occured:"+ error)
  )
}

size.onchange = function(){
context.clearRect(0,0,canvas.width,canvas.height);
context.fillRect(10,
10,380*size.value,180)
}

function square(size){
context.fillRect(10,
10,380*size,180)
}

square(sizeVal)








