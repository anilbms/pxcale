(function (){
  
  var Scale = {
    init: function (config) {
      this.width = config.width;
      this.height = config.height;
      this.mode = config.mode; //horizontal or vertical
      this.loadFiles();//load depency files
      this.create();
      this.makeDraggable();
      this.activateClick();
    },
    create: function (){
      //create canvas element
      var canvas = this.canvas = document.createElement('canvas'),
          pxReader = this.pxReader = document.createElement('div'),
          verIcon = this.verIcon = document.createElement('img'),
          horIcon = this.horIcon = document.createElement('img'),// meter reader shows meter value, pixel reader shows current pixel value
          canvasPosition = localStorage.getItem("scalePosition") ?  JSON.parse(localStorage.getItem("scalePosition")) : null;
      document.body.appendChild(canvas);
      document.body.appendChild(pxReader);
      //set attributes for canvas
      canvas.id = 'canvas';
      canvas.setAttribute("draggable", true);
      canvas.className= 'scale-style';

      if (canvasPosition){
        canvas.style.left = canvasPosition.left + "px";
        canvas.style.top = canvasPosition.top + "px";
      }

      pxReader.id = "pxReader";

      // set icons
      verIcon.src= chrome.extension.getURL("vertical.png");
      verIcon.className = 'action-icons';
      horIcon.src= chrome.extension.getURL("horizontal.png");
      horIcon.className = 'action-icons';

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
        //draw scale lines
        /*for (var i = 5; i<=this.width; i=i+5){
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
        }*/
        //place vertical icon
        ctx.drawImage(this.verIcon, 0, 0, 32, 32);
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
    activateClick: function  () {

      var self = this,
          canvas = this.canvas,
          pxReader = this.pxReader,
          ctx = canvas.getContext("2d"),
          position,
          markerLeftPosition;
          this.canvas.addEventListener('click', function (event){
              if (canvas.getContext) {
                  if(self.mode === "hor") {
                    //position
                    pxReader.style.left = event.pageX + "px";
                    pxReader.style.top = canvas.offsetTop + "px";
                    markerLeftPosition = event.pageX - canvas.offsetLeft + "px";
                  }
                  else if (self.mode === "ver") {
                    pxReader.style.left = canvas.offsetLeft + "px";
                    pxReader.style.top = event.pageY + "px";
                    markerLeftPosition = event.pageY - canvas.offsetTop + "px";
                  }
                  //write content
                  pxReader.classList.remove('pixel-pxReader-hide');
                  pxReader.classList.add('pixel-pxReader-show');
                  pxReader.innerHTML="";
                  pxReader.innerHTML = "&nbsp;&nbsp;" + markerLeftPosition;
              }
          });
    },
    makeDraggable: function  () {
      var canvas = this.canvas,
          pxReader = this.pxReader;

      document.addEventListener('dragstart', function (event) {
          var eventData = event.dataTransfer;
          pxReader.classList.add('pixel-pxReader-hide');
          pxReader.classList.remove('pixel-pxReader-show');
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
          var entData = event.dataTransfer
              canvasTop =event.pageY - adjustTop,
              canvasLeft = event.pageX - adjustLeft;
          event.stopPropagation();
          event.preventDefault();
          canvas.style.top = canvasTop + "px";
          canvas.style.left = canvasLeft  + "px";

          localStorage.setItem('scalePosition',JSON.stringify({left:canvasLeft,top:canvasTop}));
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
