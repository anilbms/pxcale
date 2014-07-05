var link = document.createElement("link");
link.href = chrome.extension.getURL("style.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var div = document.createElement('div'),
    marker = document.createElement('div'),
    adjustLeft,
    adjustTop;

//append all elements
document.body.appendChild( div );
div.appendChild( marker );

//set attributes for div
div.id = 'myDivId';
div.setAttribute("draggable", true);
div.className= 'scale-style';

// set attributes for marker
marker.id = "pixel-marker";
marker.className = "pixel-marker-hide";

div.addEventListener('click', function (event){
    markerLeftPosition = event.pageX - div.offsetLeft + "px";
    marker.style.left = markerLeftPosition;
    marker.classList.remove('pixel-marker-show');
    marker.classList.add('pixel-marker-show');
    marker.innerHTML="";
    marker.innerHTML = "&nbsp;&nbsp;" + markerLeftPosition;
});

document.addEventListener('dragstart', function (event) {
    var entData = event.dataTransfer;
    
    entData.effectAllowed="move";
    entData.dropEffect="move";
    adjustLeft = event.pageX - div.offsetLeft;
    adjustTop = event.pageY - div.offsetTop;
    
});
document.addEventListener('dragenter', function (event) {
    event.preventDefault();
});
document.addEventListener('dragover', function (event) {
    event.preventDefault();
});
document.addEventListener('drop', function (event) {
    var entData = event.dataTransfer;
    event.stopPropagation();
    event.preventDefault();
    div.style.top = event.pageY - adjustTop + "px";
    div.style.left = event.pageX - adjustLeft  + "px";
});