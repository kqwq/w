export default function sketch(p) {
  var rows = 25;
  var cols = Math.floor((p.width / p.height) * rows);
  var cellW = p.width / cols;
  var cellH = p.height / rows;
  var onMap = {};
  var graveyard = []; // show dying cells
  var normalColors = false;
  let started = false;
  let startProgress = 0;
  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, 50, p.P2D);
    cols = Math.floor((p.width / p.height) * rows);
    cellW = p.width / cols;
    cellH = p.height / rows;
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, 50, p.P2D);
    cols = Math.floor((p.width / p.height) * rows);
    cellW = p.width / cols;
    cellH = p.height / rows;
    p.frameRate(50);
    (function init() {
      [
        [6, 10],
        [7, 10],
        [6, 11],
        [7, 11],
        [16, 10],
        [16, 11],
        [16, 12],
        [17, 9],
        [17, 13],
        [18, 8],
        [18, 14],
        [19, 8],
        [19, 14],
        [20, 11],
        [21, 9],
        [21, 13],
        [22, 10],
        [22, 11],
        [22, 12],
        [23, 11],
        [26, 8],
        [26, 9],
        [26, 10],
        [27, 8],
        [27, 9],
        [27, 10],
        [28, 7],
        [28, 11],
        [30, 7],
        [30, 11],
        [30, 6],
        [30, 12],
        [40, 8],
        [41, 8],
        [40, 9],
        [41, 9],
      ].map(function (x) {
        On(x[0], x[1]);
      });
    })();
  };

  function increment(hm, x, y) {
    var i = ((cols + x) % cols) + "|" + ((y + rows) % rows);
    if (hm[i]) {
      hm[i]++;
    } else {
      hm[i] = 1;
    }
  }
  function nextState() {
    var heatmap = {};
    graveyard = [];

    for (var i in onMap) {
      var x = Number(i.split("|")[0]);
      var y = Number(i.split("|")[1]);
      increment(heatmap, x + 1, y + 1);
      increment(heatmap, x + 1, y + 0);
      increment(heatmap, x + 1, y - 1);
      increment(heatmap, x + 0, y - 1);
      increment(heatmap, x - 1, y - 1);
      increment(heatmap, x - 1, y + 0);
      increment(heatmap, x - 1, y + 1);
      increment(heatmap, x + 0, y + 1);
    }

    for (var i in heatmap) {
      var x = Number(i.split("|")[0]);
      var y = Number(i.split("|")[1]);
      // if (false&&x<0 || x>=cols || y<0 || y>= rows) {
      //     // If off-screen
      //     delete heatmap[i];
      // }
      var count = heatmap[i];
      if (count === 3) {
        // safe
      } else if (count === 2) {
        // safe iff cell was alive
        if (!onMap[i]) {
          delete heatmap[i];
        }
      } else {
        // die
        delete heatmap[i];
        graveyard.push([x, y, count]);
      }
    }
    onMap = heatmap;
  }

  function On(x, y) {
    onMap[x + "|" + y] = 1;
  }

  p.mouseDragged = () => {
    if (!started || p.mouseY > 50) return;
    let chX = p.mouseX - p.pmouseX;
    let chY = p.mouseY - p.pmouseY;
    var d = Math.sqrt(p.sq(chX) + p.sq(chY));
    for (let i = 0; i < d; i++) {
      On(
        Math.floor((p.pmouseX + (chX * i) / d) / cellW),
        Math.floor((p.pmouseY + (chY * i) / d) / cellH)
      );
    }
  };
  p.keyPressed = () => {
    normalColors = !normalColors;
  };
  p.draw = () => {
    p.noStroke();
    p.clear();
    p.background(0, 0);
    if (started) {
      for (var i in onMap) {
        var x = i.split("|")[0];
        var y = i.split("|")[1];
        p.fill(90);
        p.rect(x * cellW, y * cellH, cellW, cellH);
      }
      for (var i in graveyard) {
        var x = graveyard[i][0];
        var y = graveyard[i][1];
        var count = graveyard[i][2];
        if (normalColors || count === 1) {
          p.fill(0);
        }
        p.rect(x * cellW, y * cellH, cellW, cellH);
      }
      if (!p.mouseIsPressed) {
        nextState();
      }
    } else {
      if (p.mouseIsPressed && p.mouseY <= 50) {
        startProgress++;
      } else {
        startProgress *= 0.85;
      }
      if (startProgress > 50) {
        started = true;
      }
      p.fill(0, 255, 0);
      p.rect(0, 48, (startProgress * p.width) / 50, 2);
    }
  };
}
