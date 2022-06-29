function setup() {
  noStroke();
}

var bark = function (x, y, w, h, r) {
  p5.push();
  p5.translate(x + w / 2, y + h / 2);
  p5.rotate(r);
  p5.fill(163, 124, 82);
  p5.rect(-w / 2, -h / 2, w / 2, h);
  p5.fill(113, 86, 76);
  p5.rect(0, -h / 2, w / 2, h);
  p5.pop();
};
var leaf = function (x, y, w, h, t) {
  p5.push();
  p5.translate(x, y);
  p5.fill(131, 187, 113);
  p5.ellipse(0, 0, w, h);
  p5.fill(86, 125, 86);
  p5.arc(0, 0, w, h, -30, 150);
  p5.pop();
};
var leafU = function (x, y, w, h, t) {
  p5.push();
  p5.translate(x, y);
  p5.fill(86, 125, 86);
  p5.arc(0, 0, w, h, 0, 180);
  p5.fill(131, 187, 113);
  p5.arc(-w * 0.125, 0, w * 0.75, h * 0.75, 0, 180);
  p5.pop();
};
var leafSq = function (x, y, w, h, t) {
  p5.push();
  p5.translate(x - w / 2, y - h / 2);
  var d = Math.sqrt(w * w + h * h) * 0.2;
  p5.fill(86, 125, 86);
  p5.rect(0, 0, w, h, d);
  p5.fill(131, 187, 113);
  p5.rect(0, 0, w, h / 2, d, d, 0, 0);
  p5.pop();
};

// tree 1
var tree1 = function (x, y) {
  p5.push();
  p5.translate(x - 35, y - 300);
  bark(39, 247, 7, 31, 30);
  bark(26, 243, 6, 22, -30);
  bark(30, 238, 11, 63, 0);
  leaf(36, 211, 29, 25, "round");
  leaf(36, 226, 39, 33, "round");
  leaf(55, 243, 29, 26, "round");
  leaf(20, 240, 27, 21, "round");
  p5.pop();
};
// tree 2
var tree2 = function (x, y) {
  p5.push();
  p5.translate(x - 35, y - 300);
  bark(30, 269, 11, 31, 0);
  bark(29, 233, 5, 15, -58);
  bark(34, 232, 6, 22, -30);
  bark(58, 236, 4, 22, 63);
  bark(40, 232, 11, 43, 30);
  leafU(53, 213, 63, 58, "round");
  leafU(27, 222, 39, 36, "round");
  leafU(77, 233, 29, 34, "round");
  p5.pop();
};
// tree 3
var tree3 = function (x, y) {
  p5.push();
  translate(x - 35, y - 300);
  bark(46, 241, 4, 30, 46);
  bark(22, 245, 6, 31, -41);
  bark(30, 238, 11, 63, 0);
  leafSq(38, 219, 65, 44, "round");
  leafSq(14, 240, 39, 29, "round");
  leafSq(61, 243, 45, 27, "round");
  p5.pop();
};
var coldgreen1 = p5.color(89, 142, 89);
var coldgreen2 = p5.color(66, 91, 68);
var fin1 = function (x, y, w, h, c1, c2) {
  p5.push();
  p5.translate(x - w / 2, y - h / 2);
  c1 = c1 || coldgreen1;
  p5.fill(c1);
  p5.triangle(0, -h / 2, 0, h / 2, -w / 2, h / 2);
  c2 = c2 || coldgreen2;
  p5.fill(c2);
  p5.triangle(0, -h / 2, 0, h / 2, w / 2, h / 2);
  p5.pop();
};
var jagged = function (x, y, w, h, c1, c2, s) {
  s = s || 1;
  p5.push();
  p5.translate(x - w / 2, y - h);
  c1 = c1 || coldgreen1;
  p5.fill(c1);
  p5.beginShape();
  p5.vertex(0, 0);
  p5.vertex((-w / 4) * s, (h / 2) * s);
  p5.vertex(-w * 0.125 * s, h * 0.4 * s);
  p5.vertex(0, h * 0.5 * s);

  p5.endShape(CLOSE);
  c2 = c2 || coldgreen2;
  p5.fill(c2);
  p5.beginShape();
  p5.vertex(0, 0);
  p5.vertex((w / 4) * s, (h / 2) * s);
  p5.vertex(w * 0.125 * s, h * 0.4 * s);
  p5.vertex(0, h * 0.5 * s);
  p5.endShape(CLOSE);
  p5.pop();
};
var tree4 = function (x, y) {
  p5.push();
  p5.translate(x - 35, y - 300);
  bark(30, 238, 11, 63, 0);
  fin1(67, 282, 62, 88);
  p5.pop();
};
var tree5 = function (x, y) {
  p5.push();
  p5.translate(x - 35, y - 297);
  bark(30, 235, 11, 63, 0);
  fin1(67, 282, 62, 88, color(79, 115, 78), color(63, 92, 69));
  jagged(67, 282, 62, 88, color(89, 141, 95), color(77, 115, 78), 1.55);
  jagged(67, 282, 62, 88, color(116, 175, 94), color(88, 142, 90), 1.0);

  p5.pop();
};
var tree6 = function (x, y) {
  p5.push();
  p5.translate(x - 35, y - 300);
  bark(30, 238, 11, 63, 0);
  fin1(75, 282, 77, 48, color(79, 115, 78), color(63, 92, 69));
  fin1(62, 254, 52, 40, color(89, 141, 95), color(77, 115, 78));
  fin1(52.5, 226, 33, 22, color(116, 175, 94), color(88, 142, 90));
  p5.pop();
};

function draw() {
  p5.background(255);

  tree1(40, 198 - 50);
  tree2(140, 198 - 50);
  tree3(265, 198 - 50);
  tree4(40, 298);
  tree5(140, 298);
  tree6(265, 298);

  // ground
  p5.fill(155, 190, 96);
  p5.rect(0, 299, 400, 10);
  p5.rect(0, 299 - 150, 400, 10);
}
