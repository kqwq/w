export default function sketch(p5) {
  p5.setup = () => {
    p5.strokeWeight(2);
    p5.angleMode(p5.DEGREES);
    p5.background(0, 255, 0);
    p5.createCanvas(window.innerWidth, 50, p5.P2D);
  };

  var d = function (n, x1, y1, x2, y2, a) {
    if (!n) {
      //stroke(x1, 0, y2);
      p5.stroke(p5.lerpColor(p5.color(0), p5.color(x2 / 2, y1, 255 - x2), 0.3));
      p5.line(y1, x1, y2, x2);
      return;
    }
    var x3 = (x1 + x2) / 2 + (a * (y2 - y1)) / 2;
    var y3 = (y1 + y2) / 2 - (a * (x2 - x1)) / 2;
    d(n - 1, x3, y3, x1, y1, a);
    d(n - 1, x3, y3, x2, y2, a);
  };

  p5.draw = function () {
    p5.fill(0, 40);
    p5.push();
    // p5.translate(p5.width / 2 - 250 + 25, p5.width / 2);
    // p5.rotate(90);
    // p5.translate(-p5.width / 2, -p5.width / 2);
    p5.rect(0, 0, p5.width, p5.height);
    var b = 40 * p5.sq(p5.sin(p5.frameCount / 3) * 6.56);
    var c = 0.865 + 0.865 * p5.sin(p5.frameCount / 3);
    d(10, p5.height / 2, 0 + 90 + b, p5.height / 2, p5.width - 90 - b, c);
    p5.pop();
  };
}
