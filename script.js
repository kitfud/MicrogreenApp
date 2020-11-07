let main = document.getElementById("data");
let size = document.getElementById('size-input');
let sizeText = document.getElementById
('size-text')
let microgreen = document.getElementById('microgreen-input');
let date = document.getElementById("start-date")
let submitButton = document.getElementById("submit")
let dataSection = document.getElementById("data")

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
document.getElementById('start-date').value = new Date().toDateInputValue();

let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")
context.fillStyle = "green"
context.strokeStyle = "brown"
let sizeVal= 1;
let dataVar;
grabData();
square(sizeVal);

function grabData(){
fetch('https://api.npoint.io/9c28b9b051994bba6e16')
  .then(response => response.json())
  .then(data => {
  dataVar = data;
  })
  .catch(error=>
    console.log("Error occured:"+ error)
  )
}

function square(size){
context.fillRect(10,
10,380*size,180)
}


size.onchange = function(){
context.clearRect(0,0,canvas.width,canvas.height);
context.fillRect(10,
10,380*size.value,180)
sizeText.innerHTML = "Matt Size(10x"+size.value*20+" inches)"
}

submitButton.onclick = function(){
  let matSize= document.getElementById('size-input').value
  let selectedDate = date.value;
  let selectedGreen = microgreen.value
  let microInfo = getMicroInfo(selectedGreen.toLowerCase())

  formatPlan(selectedDate,selectedGreen,microInfo,matSize)
}



function getMicroInfo(green){
let returnVal;
for (let plant in dataVar.microgreens){
if (green == plant){
  returnVal = dataVar.microgreens[plant]
  return returnVal
}
}
}

function formatPlan(date,microgreen,growingInfo,growArea){
//console.log(date)
var parts =date.split('-');
// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.
let weightedHours = growingInfo.cover*24;
let blackoutHours = growingInfo.BO*24;
let toharvestHours = growingInfo.daysToHarvest*24;
var blackoutbegin = new Date(parts[0], parts[1] - 1, parts[2]); 
//console.log(mydate);

blackoutbegin.setHours(blackoutbegin.getHours() + weightedHours)

let beginblackout= blackoutbegin.toISOString().substring(0, 10)

blackoutbegin.setHours(blackoutbegin.getHours() + blackoutHours)

let endblackout= blackoutbegin.toISOString().substring(0, 10)

parts =date.split('-');
blackoutbegin = new Date(parts[0], parts[1] - 1, parts[2]);
blackoutbegin.setHours(blackoutbegin.getHours() + toharvestHours)
let harvest = blackoutbegin.toISOString().substring(0, 10);

let seeds = growingInfo.seedWeight*growArea
let sowCoverMethod = getSowCoverMethod(growingInfo)
let planText = 
`
<span style="color:red">Microgreen:</span> ${microgreen}</br>
<span style="color:red">Sow Weight:</span> ${seeds} grams</br>
<span style="color:red">Sow Date:</span> ${formatDate(date)}</br>
<span style="color:red">Sow Cover Method:</span>${sowCoverMethod}</br>
<span style="color:red">Black Out Begin:</span>${formatDate(beginblackout)}</br>
<span style="color:red">Black Out End:</span>${formatDate(endblackout)}</br>
<span style="color:red">Harvest Date:</span>${formatDate(harvest)}</br>
`

dataSection.innerHTML = planText;
}

function formatDate(date) {
  var parts =date.split('-');
// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.
var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
var d = mydate
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
}

function getSowCoverMethod(object){
  if(object.W){
    return "Weighted Tray"
  }
  else{
    return "Empty Tray"
  }
}




/*
$(document).ready(function(){

})
*/















