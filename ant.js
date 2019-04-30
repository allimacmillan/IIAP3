var ant;
var shoes = [];

function startGame() {
    ant = new component('50', '30', "ant.png", "475", "570")
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo = 0;
        console.log('started')
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // updateGameArea()
    },
    stop : function() {
      clearInterval(this.interval);
  }
}

class component {
  constructor(width, height, image, x, y) {
    this.width = width;
    this.height = height;
    this.element = document.createElement("IMG");
    this.element.setAttribute("src", image);
    this.element.setAttribute("width", width);
    this.element.setAttribute("height", height);
    this.element.setAttribute("alt", "Ant Cartoon");
    this.element.style.position="absolute";
    this.element.style.left = x;
    this.element.style.top = y;
    document.body.appendChild(this.element);
  }
  floatUp() {
    this.element.style.top = String(parseInt(this.element.style.top) - 1);
  }
  floatDown() {
    this.element.style.top = String(parseInt(this.element.style.top) + 2);
  }
  moveLeft() {
    this.element.style.left = String(parseInt(this.element.style.left) - 8);
  }
  moveRight() {
    this.element.style.left = String(parseInt(this.element.style.left) + 8);
  }
  crashWith(otherobj) {
    var myleft = this.element.style.left;
    var myright = myleft + (this.width);
    var mytop = this.element.style.top;
    var mybottom = mytop + (this.height);
    var otherleft = otherobj.element.style.left;
    var otherright = otherleft + (otherobj.width);
    var othertop = otherobj.element.style.top;
    var otherbottom = othertop + (otherobj.height);
    var crash = false;
    if (parseInt(this.element.style.left) < parseInt(otherobj.element.style.left) + parseInt(otherobj.width) &&
       parseInt(this.element.style.left) + parseInt(this.width) > parseInt(otherobj.element.style.left) &&
       parseInt(this.element.style.top) < parseInt(otherobj.element.style.top) + parseInt(otherobj.height) &&
       parseInt(this.element.style.top )+ parseInt(this.height) > parseInt(otherobj.element.style.top)) {
      crash = true;
    }
    return crash;
  }
}

function updateGameArea() {
  myGameArea.clear();
  console.log('updateGameArea');
  ant.floatUp();

  //Ant reaches top
  if (parseInt(ant.element.style.top) <= 15) {
    myGameArea.stop();
    alert("YOU WON! Press OK and then space bar to play again.")
  }
  //Ant reaches right side
  if (parseInt(ant.element.style.left) >= 950) {
    console.log('right')
    ant.element.style.left = "950";
  }
  //Ant reaches left side
  if (parseInt(ant.element.style.left) <= 0) {
    console.log('left')
    ant.element.style.left = "0";
  }
  var x, y;
  for (i = 0; i < shoes.length; i += 1) {
    if (ant.crashWith(shoes[i])) {
      console.log('crash');
      myGameArea.stop();
      alert('You lost! Press OK then space bar to try again.')
      return;
    }
  }
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width/2 - 100;
    y = 0;
    shoes.push(new component('110', '100', 'shoe.png', String(Math.floor(Math.random() * 975)), 0));
  }
  for (i = 0; i < shoes.length; i += 1) {
    shoes[i].floatDown();
    if (parseInt(shoes[i].element.style.top) >= 510) {
      document.body.removeChild(shoes[i].element)
      shoes.splice(i, 1);
    }
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}


$(document).ready(function() {
  $(document).keydown(function() {
    if (event.key == "a") {
        ant.moveLeft();
    } else if (event.key == "l") {
        ant.moveRight();
    } else if (event.keyCode == 32) {
      myGameArea.stop();
      ant.element.style.top = "570";
      ant.element.style.left = "475";
      myGameArea.start();
    }
  })
})
