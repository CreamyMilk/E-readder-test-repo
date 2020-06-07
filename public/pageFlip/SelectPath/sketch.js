function setup() {
  noCanvas();
  let text;
  linkLocation = document.getElementById('linkLocation')
 

  loadStrings('ListOfFiles.txt', fileready)
}

function fileready(lines) {
  console.log(lines);
  for (x of lines){
    let butt = document.createElement('button');
    butt.textContent= x;
    butt.onclick = function(){localStorage.setItem('filename',butt.textContent);alert(localStorage.getItem('filename'))}
    linkLocation.appendChild(butt)
    linkLocation.appendChild(document.createElement('br'))
  }
}
