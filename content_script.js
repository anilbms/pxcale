(function (){
  
  var self = Scale = {
    init: function (config) {
      this.width = config.width;
      this.height = config.height;
      this.mode = config.mode; //horizontal or vertical
      this.loadFiles();//load depency files
      this.create();
      this.makeDraggable();
      this.canvas.addEventListener('click',this.activateClick);
    },
    create: function (){
      //create canvas element
      var canvas = this.canvas = document.createElement('canvas'),
          pxReader = this.pxReader = document.createElement('div');// meter reader shows meter value, pixel reader shows current pixel value
      document.body.appendChild(canvas);
      document.body.appendChild(pxReader);
      //set attributes for canvas
      canvas.id = 'canvas';
      canvas.setAttribute("draggable", true);
      canvas.className= 'scale-style';

      pxReader.id = "pxReader";

      if(this.mode ==="hor") {
        this.drawHorScale();
      }
      else {
        this.drawVerScale();
      }
    },
    loadFiles: function (){
      //FIXME this method is not needed , find a way to include css files in chrome extension
      var link = document.createElement("link");
      link.href = chrome.extension.getURL("style.css");
      link.type = "text/css";
      link.rel = "stylesheet";
      document.getElementsByTagName("head")[0].appendChild(link);
    },
    drawHorScale: function (){
      var canvas = document.querySelector("#canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d"),
            initialPoint = 5;
        ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 5; i<=this.width; i=i+5){
            ctx.fillStyle = "rgb(0,0,0)";

          if (i%100 === 0){
            ctx.fillRect (i, 0, 1, 50);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect (i-0.5, 20, 2, 45);
            ctx.font = "18px Arial";
            ctx.fillStyle="rgb(0,0,0)";
            ctx.fillText(i,i-35,65);
          }
          else if (i%50 === 0){
            ctx.fillRect (i, 0, 1, 50);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect (i-0.5, 20, 2, 30);
          }
          else if (i%10 === 0){
            ctx.fillRect (i, 0, 1, 35);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect (i-0.5, 20, 2, 15);
          }
          else {
            ctx.fillRect (i, 0, 1, 20);
          }
        }
      }
    },
    drawVerScale: function (){
            var canvas = document.querySelector("#canvas");
            if (canvas.getContext) {
              var ctx = canvas.getContext("2d"),
                  initialPoint = 5;
              ctx.clearRect(0, 0, this.width, this.height);
              for (var i = 5; i<=this.height; i=i+5){
                  ctx.fillStyle = "rgb(0,0,0)";

                if (i%100 === 0){
                  ctx.fillRect (0, i, 50, 1);
                  ctx.fillStyle = "rgb(0,0,0)";
                  ctx.fillRect (20, i-0.5,  45, 2);
                  ctx.font = "18px Arial";
                  ctx.fillStyle="rgb(0,0,0)";
                  ctx.fillText(i,50,i-5);
                }
                else if (i%50 === 0){
                  ctx.fillRect (0, i, 50, 1);
                  ctx.fillStyle = "rgb(0,0,0)";
                  ctx.fillRect (20, i-0.5, 30,2);
                }
                else if (i%10 === 0){
                  ctx.fillRect (0,i, 35,1);
                  ctx.fillStyle = "rgb(0,0,0)";
                  ctx.fillRect (20,i-0.5, 15, 2);
                }
                else {
                  ctx.fillRect (0,i, 20,1);
                }
              }
            }
    },
    activateClick: function  (event) {
      var canvas = this,
          pxReader = document.querySelector('#pxReader'),
          ctx = canvas.getContext("2d"),
          position,
          markerLeftPosition;
      if (canvas.getContext) {
          if(this.mode === "hor") {
            //position
            pxReader.style.left = event.pageX - canvas.offsetLeft + "px";
            pxReader.style.top = 0 + "px";
            markerLeftPosition = event.pageX - div.offsetLeft + "px";
          }
          else if (this.mode === "ver") {
            pxReader.style.left = 0 + "px";
            pxReader.style.top = event.pageY - canvas.offsetTop + "px";
            markerLeftPosition = event.pageY - canvas.offsetTop + "px";
          }
          //write content
          pxReader.classList.remove('pixel-pxReader-hide');
          pxReader.classList.add('pixel-pxReader-show');
          pxReader.innerHTML="";
          pxReader.innerHTML = "&nbsp;&nbsp;" + markerLeftPosition;
      }
    }.bind(self),
    makeDraggable: function  () {
      var canvas = this.canvas,
          pxReader = this.pxReader;

      document.addEventListener('dragstart', function (event) {
          var eventData = event.dataTransfer;

          eventData.effectAllowed="move";
          eventData.dropEffect="move";
          adjustLeft = event.pageX - canvas.offsetLeft;
          adjustTop = event.pageY - canvas.offsetTop;

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
          canvas.style.top = event.pageY - adjustTop + "px";
          canvas.style.left = event.pageX - adjustLeft  + "px";
      });
    }
  };
  //initialize Scale
  Scale.init({
    mode: "hor",
    width: 500,
    height: 100
  }); 
})();
