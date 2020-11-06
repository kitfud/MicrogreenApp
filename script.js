let main = document.getElementById("data")
let dataVar ="nope";

function grabData(){
fetch('https://api.npoint.io/9c28b9b051994bba6e16')
  .then(response => response.json())
  .then(data => {
  dataVar = data;
  })
  .then(data => console.log((dataVar)))
  .catch(error=>
    console.log("error:"+ error)
  )
}
grabData()







