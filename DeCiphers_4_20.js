//tokenData.hash = "0xe1f64b8dde1eb350cb828e63aaedbe421738bfcdad826698a89387bd45269ebb" //celest & levels
//tokenData.hash = "0x6190b7bbdc50fb801d41d7a9cefb4206493a8ef8549e2c91fb3086f7d87280a3" //perim 3
//tokenData.hash = "0xb05208b700962c155d7870a075b3170ff68b56af0495bb2c1f0ba49f68fbf796"
//p5.disableFriendlyErrors = true;
let bV;
let v;
let ctx;
let bS;
let eS;
let bC;
let eC;
let strW;

const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
}
const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });

S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(tokenData.hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);

const seed = parseInt(tokenData.hash.slice(2,16), 16);

function rnd(min, max) {
    const rand = R();
    if (typeof min === 'undefined') {
      return rand;
    } else if (typeof max === 'undefined') {
      if (min instanceof Array) {
        return min[floor(rand * min.length)];
      } else {
        return rand * min;
      }
    } else {
      if (min > max) {
        const tmp = min;
        min = max;
        max = tmp;
      }
      return rand * (max - min) + min;
    }
}

const palettes = {
    radiance: {
      base: [235,163,121],
      sec: [63,199,180],
      pri: [202,79,107],
      acc: [89,179,120],
      dark: [48,48,47],
      light: [240,239,205],
      con: [250,191,183],
      aux: [55,178,177],
      perim: [99,176,228],
      o: [78,82,158],
      t: [2,7,18]
    },
    screen: {
      base: [105,152,198],
      sec: [185,230,255],
      pri: [249,210,99],
      acc: [201,81,150],
      dark: [15,17,42],
      light: [210,234,240],
      con: [251,249,213],
      aux: [64,81,158],
      perim: [126,192,154],
      o: [211,53,85],
      t: [255,82,130]
    },
    threshold: {
      base: [59,74,124],
      sec: [217,177,103],
      pri: [154,154,204],
      acc: [99,176,153],
      dark: [18,40,76],
      light: [243,231,210],
      con: [134,209,215],
      aux: [248,38,175],
      perim: [23,40,76],
      o: [223,96,102],
      t: [163,163,225]
    },
    darken: {
      base: [18,40,76],
      sec: [110,145,183],
      pri: [164,219,225],
      acc: [255,166,17],
      dark: [120,81,69],
      light: [10,186,181],
      con: [59,74,124],
      aux: [132,206,242],
      perim: [255,58,24],
      o: [69,84,165],
      t: [210,210,109]
    },
    chroma: {
      base: [240,241,118],
      sec: [64,139,194],
      pri: [84,167,220],
      acc: [135,203,225],
      dark: [58,74,154],
      light: [243,231,210],
      con: [0,47,167],
      aux: [87,178,117],
      perim: [221,113,151],
      o: [234,162,161],
      t: [2,7,18]
    },
    hard_mix: {
      base: [250,233,78],
      sec: [69,84,165],
      pri: [218,56,50],
      acc: [105,181,87],
      dark: [4,3,3],
      light: [236,241,233],
      con: [246,214,188],
      aux: [79,169,160],
      perim: [237,51,147],
      o: [231,230,81],
      t: [2,7,18]
  },
    lin_burn: {
        base: [242,237,208],
        sec: [99,101,103],
        pri: [206,54,49],
        acc: [61,136,122],
        dark: [44,81,112],
        light: [241,237,211],
        con: [98,57,45],
        aux: [246,237,123],
        perim: [247,238,226],
        o: [255,92,148],
        t: [2,7,18]
    },
    nautical: {
      base: [14,32,52],
      sec: [203,203,203],
      pri: [44,81,112],
      acc: [252,239,79],
      dark: [241,225,167],
      light: [229,224,212],
      con: [206,55,49],
      aux: [97,188,191],
      perim: [220,191,243],
      o: [72,98,169],
      t: [163,163,225]
  },
    pinlight: {
        base: [142,146,146],
        sec: [91,95,111],
        pri: [216,217,216],
        acc: [38,45,96],
        dark: [1,1,1],
        light: [245,225,208],
        con: [250,243,165],
        aux: [79,188,226],
        perim: [147,166,216],
        o: [7,0,23],
        t: [2,7,18]
    },
    soft_light: {
        base: [112,111,105],
        sec: [216,217,216],
        pri: [145,145,145],
        acc: [216,236,88],
        dark: [30,30,41],
        light: [250,243,165],
        con: [242,226,210],
        aux: [255,103,0],
        perim: [1,1,1],
        o: [220,208,255],
        t: [163,163,225]
    },
    range: {
        base: [32,16,47],
        sec: [233,149,110],
        pri: [219,58,62],
        acc: [191,211,235],
        dark: [21,63,150],
        light: [246,245,246],
        con: [75,188,209],
        aux: [246,234,77],
        perim: [255,195,36],
        o: [219,235,247],
        t: [163,163,225]
    },
    vibrance: {
        base: [222,93,53],
        sec: [0,47,167],
        pri: [247,228,82],
        acc: [90,175,146],
        dark: [166,0,160],
        light: [241,231,211],
        con: [246,245,246],
        aux: [217,49,137],
        perim: [77,158,209],
        o: [236,174,194],
        t: [2,7,18]
    },
    highlight: {
        base: [246,245,246],
        sec: [146,145,146],
        pri: [217,216,217],
        acc: [44,79,135],
        dark: [48,48,48],
        light: [240,238,209],
        con: [241,193,185],
        aux: [239,193,70],
        perim: [146,145,146],
        o: [231,149,145],
        t: [2,7,18]
    },
    col_burn: {
        base: [241,237,211],
        sec: [114,131,145],
        pri: [44,46,125],
        acc: [249,208,99],
        dark: [15,17,42],
        light: [210,234,240],
        con: [241,237,211],
        aux: [187,215,163],
        perim: [216,217,216],
        o: [255,255,0],
        t: [2,7,18]
    },
    rays: {
      base: [32, 62, 71],
      sec: [62,72,153],
      pri: [177,187,195],
      acc: [222,170,142],
      dark: [76,173,218],
      light: [228,201,181],
      con: [234,162,161],
      aux: [221,226,238],
      perim: [78,153,81],
      o: [242,202,199],
      t: [225,126,172]
    },
    render: {
      base: [242,226,210],
      sec: [201,170,204],
      pri: [247,237,88],
      acc: [213,132,177],
      dark: [82,87,161],
      light: [246,245,246],
      con: [250,244,165],
      aux: [174,205,84],
      perim: [221,81,64],
      o: [19,174,209],
      t: [26,26,27]
    }
}
const blPal = {
  base: [219,219,219],
  sec: [158,158,158],
  pri: [247,247,247],
  acc: [255,221,97],
  dark: [247,237,198],
  light: [7,7,7],
  con: [255,255,0],
  aux: [212,192,169],
  perim: [140,131,126],
  o: [23,22,22],
  t: [252,186,3]
}
const gr_1 = [201,233,234]
const gr_2 = [226,227,226]
const gr_3 = [246,245,247]
const randomPalette = function (palettes) {
  let keys = Object.keys(palettes);
  const paletteName = keys[floor(map(decPairs[0],0,255,0,keys.length-0.001))];
  return palettes[paletteName];
};
// SETUP & DRAW
function w(val) {if (val == null) return width;return width * val;}
function h(val) {if (val == null) return height;return height * val;}
function setup() {
  bV = bezierVertex;
  v = vertex;
  ctx = drawingContext;
  bS = beginShape;
  eS = endShape;
  bC = beginContour;
  eC = endContour;
  strW = strokeWeight;
  pixelDensity(4)
  noiseSeed(seed)
  const smD = windowWidth < windowHeight ? windowWidth : windowHeight;
  createCanvas(smD, smD);
  sV = width/50
}
function draw() {
  chooseResult()
  noLoop()
}
// BG & TEXTURE FUNCTIONS
function bg_rect(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  let rt_ang = [0, HALF_PI, PI, PI + HALF_PI]
  let rotation_angle = rt_ang[floor(rnd() * rt_ang.length)];;
  rotate(rotation_angle)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function bg_rect_noR(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function tS(x1, y1, x2, y2, weight, r, g, b, alpha) {
  push()
  const relWeight = map(weight, 0, width, 1, 40);
  stroke(r, g, b, alpha)
  strW(w(0.002));
  for (let i = 0; i < relWeight; i++){
    let theta = rnd(TWO_PI);
    let nx1 = x1 + 0.5*rnd(weight/2)*cos(theta);
    let ny1 = y1 + 0.5*rnd(weight/2)*sin(theta);
    let nx2 = x2 + 0.5*rnd(weight/2)*cos(theta);
    let ny2 = y2 + 0.5*rnd(weight/2)*sin(theta);
    line(nx1, ny1, nx2, ny2)
  }
  pop()
}
function bg_p(pal1,pal2,pal3) {
  const x_left_1 = rnd(w(0.05), w(0.15))
  const y_top_1 = rnd(h(0.05), h(0.15))
  const x_right_1 = rnd(w(0.7),w(0.85))
  const y_bottom_1 = rnd(h(0.7),h(0.85))
  const shift = rnd(w(0.08),w(0.16))
  const x_left_2 = x_left_1 + shift/2
  const x_right_2 = x_right_1 - shift/2
  const y_top_2 = y_top_1 + shift/2
  const y_bottom_2 = h(1) - shift/2
  const xMid = rnd(w(0.4), w(0.6))
  const y_split = rnd(h(0.15), h(0.4))
  blendMode(SCREEN)
  let p_lines = 700
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_1, x_right_1)
    let y1 = y_top_1
    let y2 = map(x, x_left_1, x_right_1, y_bottom_1 - shift, y_bottom_1)
    tS(x, y1, x, y2, w(0.005), 255, 238, 237, 90)
  }
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_1 + shift, x_right_1 + shift)
    let y1 = y_top_1 + shift
    let y2 = map(x, x_left_1 + shift, x_right_1 + shift, y_bottom_1, y_bottom_1 + shift)
    tS(x, y1, x, y2, w(0.005), 245, 240, 240, 90)
  }
  blendMode(BLEND)
  for (let i = 0; i < p_lines*1.5; i++){
    let x = map(i, 0 , p_lines*1.5, x_left_2, x_right_2)
    let y1 = map(x, x_left_2, x_right_2, y_split, y_top_2)
    let y2 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    tS(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal1[0], pal1[1], pal1[2], 115)
  }
  for (let i = 0; i < p_lines*1.5; i++){
    let x = map(i, 0, p_lines*1.5, x_left_2, x_right_2)
    let y1 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    if(x < xMid){
        y2 = map(x, x_left_2, xMid, h(0.54595), h(0.80185))
    }else{
        y2 = map(x, xMid, x_right_2, h(0.80185), h(0.6895))
    }
    tS(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal2[0], pal2[1], pal2[2], 115)
  }
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_2, xMid)
    let y1 = map(x, x_left_2, xMid, h(0.54595), h(0.80135))
    let y2 = map(x, x_left_2, xMid, y_bottom_2, h(0.80135))
    tS(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal3[0], pal3[1], pal3[2], 115)
  }
}
function bg_rug() {
  cs1 = p.pri
  cs2 = p.con
  cs3 = p.sec
  let x_left = w(0.1)
  let x_right = w(0.9)
  let x_left_m = rnd(w(0.3),w(0.45))
  let x_right_m = rnd(w(0.55),w(0.8))
  let y_top = h(0.1)
  let y_bottom = h(0.9)
  let y_l_split = rnd(w(0.3),w(0.7))
  //let y_m_split = rnd(w(0.3),w(0.7))
  let y_r_split = rnd(w(0.3),w(0.7))
  let y_diff = rnd(h(0.05),h(0.2))
  let n_l = 1200
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, x_left, x_right)
    if(x < x_left_m){
      let y_mid = map(x,x_left,x_left_m,y_l_split-y_diff,y_l_split+y_diff)
      tS(x, y_top, x, y_mid, w(0.007), cs1[0], cs1[1], cs1[2], 85)
      tS(x, y_mid, x, y_bottom, w(0.007), cs2[0], cs2[1], cs2[2], 85)
    }else if(x >= x_left_m && x <= x_right_m){
      let y_mid = map(x,x_left_m,x_right_m,y_l_split+y_diff,y_r_split-y_diff)
      tS(x, y_top, x, y_mid, w(0.007), cs3[0], cs3[1], cs3[2], 85)
      tS(x, y_mid, x, y_bottom, w(0.007), cs1[0], cs1[1], cs1[2], 85)
    }else{
      let y_mid = map(x,x_right_m,x_right,y_r_split-y_diff,y_r_split+y_diff)
      tS(x, y_top, x, y_mid, w(0.007), cs2[0], cs2[1], cs2[2], 85)
      tS(x, y_mid, x, y_bottom, w(0.007), cs3[0], cs3[1], cs3[2], 85)
    }
  }
}
function dots_texture() {
  let pal = p.t
  let xoff = 0
  let inc = .01
  let yoff = 0
  let y_inc = .005
  let nc = 200
  for (let i = 0; i <= nc; i++){
    let x = map(i, 0, nc, w(0), w(1))
    for (let j = 0; j <= nc; j++){
      let y = map(j, 0, nc, h(0), h(1))
        fill(pal[0], pal[1],  pal[2], 165*noise(yoff))
        ellipse(x + w(.048)*noise(xoff), y + h(.048)*noise(xoff), w(0.001))
        yoff += y_inc
      }
    xoff += inc
  }
}
function checkerboard() {
  push()
  let pal = p.t
  translate(width/2, height/2)
  let rt = [0, HALF_PI, PI, PI + HALF_PI]
  const rt_an = rt[floor(rnd() * rt.length)];;
  rotate(rt_an)
  //blendMode(BURN)
  let size = map(rt_an,0,HALF_PI + QUARTER_PI,w(.003),w(.0045))
  let num_cols = width/size/2
  let num_rows = num_cols
  let xoff = 0
  let inc = .01
  for (let i = 0; i < num_cols; i++){
    for (let j = 0; j < num_rows + floor(sin(xoff)*3) + rnd(-10,5); j++){
      fill(pal[0], pal[1], pal[2], map(j,0,num_rows,125,1))
      noStroke()
      if (j%2 == 0){
        rect(i*2*size+size - width/2,j*size - height/2,size,size)
      }else{
        rect(i*2*size - width/2,j*size - height/2,size,size)
      }
    }
    xoff += inc
  }
  pop()
}
function textured_bg_stripes(pal_1, pal_2) {
  push()
  translate(width/2,height/2)
  let y_shift = h(0.025)
  let y_start = -h(.27)
  let inc = .01;
  xoff = 0 
  const bg_nm_1 = 2400
  for (let i = 0; i < bg_nm_1; i++){
    x = map(i, 0, bg_nm_1, -width/2, width/2)
    y1 = y_start + noise(xoff)*(width/60)
    y2 = height/2
    tS(x, y1, x, y2, w(0.025), pal_1[0], pal_1[1], pal_1[2], 10)
    xoff += inc
  }
  const bg_nm_2 = 900
  for (let i = 0; i < bg_nm_2; i++){
    y = map(i, 0, bg_nm_2, -h(.15), h(.4))
    tS(-w(.5), y, w(.5), y + y_shift, w(.05), pal_2[0], pal_2[1], pal_2[2], 40)
  }
  pop()
}
function painted_rectangle(pal) {
  push()
  translate(width/2,height/2)
  let xPos1 = rnd(-w(0.4), -w(0.3))
  let xPos2 = rnd(w(0.35), w(0.45))
  let yPos1 = -w(.5)
  let yPos2 = rnd(h(.25),h(.4))
  //let alpha = rnd(13, 28)
  //let weight = rnd(w(0.023), w(0.038))
  let n_l = 1000
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, xPos1, xPos2)
    tS(x, yPos1, x, yPos2, w(.008), pal[0], pal[1], pal[2], 85)
  }
  pop()
}
function plH(weight, pal, alpha) {
  push()
  translate(width/2,height/2)
  let xPos1 = -w(.5)
  //let xPos2_options = [w(0.15), w(0.35), w(0.6)]
  let xPos2 = w(.5)
  let l_t = rnd(h(0.02), h(0.04))
  let yPos1 = rnd(h(0.1), h(0.2))
  let yPos2 = yPos1 + l_t
  let n_l = 50
  for (let i =0; i < n_l; i++){
    let y = map(i, 0, n_l, yPos1, yPos2)
    let x1 = xPos1
    let x2 = xPos2
    tS(x1, y, x2, y, weight, pal[0], pal[1], pal[2], alpha)
  }
  pop()
}
function plV(weight, pal, alpha) {
  push()
  translate(width/2,height/2)
  let xoff = 0
  let inc = .0015
  //let xPos2_options = [w(0.15), w(0.35), w(0.6)]
  //let xPos2 = w(.025)
  let l_t = rnd(h(0.02), h(0.04))
  let yPos1 = -h(.5)
  let yPos2 = h(.5)
  let n_l = 1500
  let l_w = rnd(w(.025),w(.065))
  for (let i = 0; i < n_l; i++){
    let y = map(i, 0, n_l, yPos1, yPos2)
    let x1 = 0-l_w*noise(xoff)
    let x2 = x1+l_w
    tS(x1, y, x2, y, weight, pal[0], pal[1], pal[2], alpha)
    xoff += inc
  }
  pop()
}
function halftone_dots() {
  let pal = p.t
  let num_dots = 160
  let cell_size = height/num_dots
  let xoff = 0
  let inc = 10/num_dots
  let default_size = 0.6*cell_size
  noStroke()
  fill(pal[0], pal[1], pal[2],125)
  for (let i = 0; i < num_dots; i++){
    let yoff = 0
    for (let j = 0; j < num_dots; j++){
      let x = i*cell_size + w(.01 * noise(xoff, yoff));
      let y = j*cell_size + w(0.01 * noise(xoff + 1000, yoff + 1000))
      ellipse(x,y,default_size * noise(xoff + 2000, yoff + 2000))
      yoff += inc
    }
    xoff += inc
  }
}
function paper() {
  push()
  xoff = 0
  let num = 135
  let inc = 25/num
  noFill()
  strW(w(.0003))
  for (let i = 0; i < 150; i++){
    let y = map(i, 0, 150, 0, h(1))
    let op = map(y, 0, h(.5), 65, 0)
    if (y > h(.5)){
      op = map(y, h(.5), h(1), 0, 65)
    }
    stroke(p.t[0],p.t[1],p.t[2],op)
    line(0, y, w(1),y)
  }
  for (let i = 0; i < 150; i++){
    let x = map(i, 0, 150, 0, w(1))
    let op = map(x, 0, w(.5), 65, 0)
    if (x > h(.5)){
      op = map(x, w(.5), w(1), 0, 65)
    }
    stroke(p.t[0],p.t[1],p.t[2],op)
    line(x, 0, x, h(1))
  }
  noStroke()
  for (let i = 0; i < num; i++){
    let yoff = 0 
    y = map(i, 0, num, 0, h(1))
    for (let j = 0; j < 2*num; j++){
      x = map(j, 0, 2*num, 0, w(1))
      ny = y + w(.09)*noise(xoff, yoff)
      ny2 = y + w(.16)*noise(xoff, yoff)
      fill(p.t[0],p.t[1],p.t[2],115)
      ellipse(x, ny, width/(11*num))
      fill(p.o[0],p.o[1],p.o[2],80)
      ellipse(x, ny2, width/(11*num))
      yoff += inc
    }
    xoff += inc
  }
  pop()
}
function crescent(a,x,y,r,pal) {
  push()
  stroke(0);
  let step = w(0.0015);

  for (let i = r/2; i < r; i+=step) {
    push();
    translate(x, y);
    rotate(radians(a));
    translate(0, -i);
    let l = sqrt(r * r - i * i);
    tS(l, 0, -l, 0, w(0.007), pal[0],pal[1],pal[2],105)
    //translate(0, 2*i);
    //line(l, 0, -l, 0);
    pop();
  }

  pop()
}
function jpegArt(x,y,sx,sy) {
  bC()
  for (var i = 0; i < 16; i++) {
    v(x+sx*Math.cos(2 * PI * i / 16), y + sy * Math.sin(2 * PI * i / 16) + rnd(-w(.001), w(.001)))
  }
  eC(CLOSE)
}
function pG_shape() {
  push()
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(p.perim[0],p.perim[1],p.perim[2],165)
  bS()
  v(w(.002),h(.002))
  v(w(.002),h(.998))
  v(w(.998),h(.998))
  v(w(.998),h(.002))
  bC()
  v(w(.023),h(.023))
  v(w(.977),h(.023))
  v(w(.977),h(.977))
  v(w(.023),h(.977))
  eC(CLOSE)
  eS(CLOSE)
  pop()
}
function p2_shape(scr_type) {
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0.8*sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(p.aux[0],p.aux[1],p.aux[2],165)
  bS();
  v(w(0.037),h(0.037))
  v(w(0.64),h(0.037))
  v(w(0.64),h(0.048))
  v(w(0.089),h(0.048))
  v(w(0.089),h(0.089))
  v(w(0.048),h(0.089))
  v(w(0.048),h(0.64))
  v(w(0.037),h(0.64))
  v(w(0.037),h(0.037))
  eS(CLOSE);
  fill(p.con[0],p.con[1],p.con[2],200)
  bS();
  v(w(0.089),h(0.089))
  v(w(0.106),h(0.089))
  v(w(0.106),h(0.106))
  v(w(0.089),h(0.106))
  eS(CLOSE);
  //rect(w(0.089),h(0.089),(0.037),h(0.037))
  scr_type(w(0.062),h(0.062))
}
function p3_l() {
  bS()
  v(w(.027),h(.027))
  v(w(.027),h(.25))
  v(w(.088),h(.25))
  v(w(.088),h(.088))
  v(w(.25),h(.088))
  v(w(.25),h(.027))
  eS(CLOSE)
}
function squ() {
  v(0,0)
  v(0,h(1))
  v(w(1),h(1))
  v(w(1),0)
}
// PERIMETERS
function perimeter_general() {
  pG_shape()
  screw(w(.013),h(.013))
  screw(w(.013),h(.987))
  screw(w(.987),h(.987))
  screw(w(.987),h(.013))
}
function per1() {
  perimeter_general()
  push()
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(p.t[0],p.t[1],p.t[2],165)
  strokeCap(PROJECT);
  strokeJoin(MITER);
  bS();
  v(w(0.028),h(0.028))
  v(w(0.972),h(0.028))
  v(w(0.972),h(0.972))
  v(w(0.028),h(0.972))
  bC()
  v(w(0.048),h(0.048))
  v(w(0.048),h(0.872))
  v(w(0.128),h(0.872))
  v(w(0.128),h(0.952))
  v(w(0.952),h(0.952))
  v(w(0.952),h(0.128))
  v(w(0.872),h(0.128))
  v(w(0.872),h(0.048))
  v(w(0.128),h(0.048))
  v(w(0.048),h(0.048))
  eC()
  eS(CLOSE);
  let s_p = [[w(.04),h(.04)],[w(.96),h(.96)],[w(.04),h(.96)],[w(.96),h(.04)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function per2() {
  perimeter_general()
  push()
  p2_shape(screw)
  //screw(w(0.062),h(0.062))
  pop()
}
function per3() {
  pG_shape()
  push()
  rectMode(CORNER)
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 1.2*sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(p.pri[0],p.pri[1],p.pri[2],185)
  rect(w(.027),h(.85),w(.946),h(.123))
  fill(p.aux[0],p.aux[1],p.aux[2],185)
  bS()
  v(w(.85),h(.848))
  v(w(.973),h(.848))
  v(w(.973),h(.027))
  v(w(.152),h(.027))
  v(w(.152),h(.15))
  v(w(.85),h(.15))
  eS(CLOSE)
  fill(p.light[0],p.light[1],p.light[2],65)
  bS()
  v(w(.027),h(.027))
  v(w(.027),h(.848))
  v(w(.148),h(.848))
  v(w(.148),h(.027))
  eS(CLOSE)
  ctx.shadowBlur = 0;
  var color_c1 = gr_1
  var color_c2 = gr_2
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 215)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 30)
  let nlp = 1000
  let ymid = rnd(h(.3),h(.65))
  for (let i = 0; i < nlp; i++){
    let y = map(i, 0, nlp, h(.027),h(.848))
    let x1 = w(.028)
    let x2 = w(.148)
    if (y <= ymid){
      let inter = map(y, h(.027), ymid, 1, 0)
      c = lerpColor(b1, b2, inter)
      stroke(c) // MAIN STROKE
    }else{
      let inter2 = map(y, ymid, h(.848), 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
    }
    strW(h(1)/(nlp*.6))
    line(x1, y, x2, y)
  }
  push()
  translate(w(0),h(1))
  angleMode(DEGREES)
  rotate(270)
  p2_shape(screwSm2)
  pop()
  screwSm2(w(.013),h(.013))
  translate(-w(.025),-h(.025))
  ctx.shadowBlur = 0.8*sV;
  noStroke()
  fill(p.acc[0],p.acc[1],p.acc[2],125)
  p3_l()
  ctx.shadowOffsetX =  0.5*sV;
  ctx.shadowOffsetY = 0.5*sV;
  ctx.shadowBlur = 2*sV;
  p3_l()
  translate(w(1.025),h(1.025))
  rotate(180)
  scale(1.35)
  ctx.shadowOffsetX =  -0.25*sV;
  ctx.shadowOffsetY = -0.25*sV;
  ctx.shadowBlur = sV;
  noStroke()
  fill(p.o[0],p.o[1],p.o[2],125)
  p3_l()
  ctx.shadowOffsetX =  0.5*sV
  ctx.shadowOffsetY = 0.5*sV;
  ctx.shadowBlur = 2*sV;
  p3_l()
  pop()
  let s_p = [[w(.027),h(.027)],[w(.027),h(.195)],[w(.195),h(.027)],[w(.96),h(.04)],[w(.86),h(.14)],[w(.162),h(.14)],[w(.92),h(.92)],[w(.92),h(.7)],[w(.7),h(.92)],[w(.134),h(.835)],[w(.013),h(.987)],[w(.987),h(.987)],[w(.987),h(.013)]]
  s_p.forEach(i => screwSm2(i[0],i[1]))
}
function per4() {
  push()
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 2*sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(p.t[0],p.t[1],p.t[2],155)
  bS()
  squ()
  bC()
  v(w(.09),h(.09))
  v(w(.91),h(.09))
  v(w(.91),h(.91))
  v(w(.09),h(.91))
  eC()
  eS(CLOSE)
  fill(p.o[0],p.o[1],p.o[2],155)
  bS()
  squ()
  bC()
  v(w(.06),h(.06))
  v(w(.94),h(.06))
  v(w(.94),h(.94))
  v(w(.06),h(.94))
  eC()
  eS(CLOSE)
  fill(p.aux[0],p.aux[1],p.aux[2],155)
  bS()
  squ()
  bC()
  v(w(.03),h(.03))
  v(w(.97),h(.03))
  v(w(.97),h(.97))
  v(w(.03),h(.97))
  eC()
  eS(CLOSE)
  let s_p = [[w(.046),h(.046)],[w(.046),h(.954)],[w(.954),h(.954)],[w(.954),h(.046)]]
  s_p.forEach(i => screwSm(i[0],i[1]))
  pop()
}
// CHOOSER FUNCTIONS
function chooseKellyOverlay() {
  const kellyOverlays = [kelly_bigB_2, kellyTr]
  kellyOverlays[floor(map(decPairs[2],0,255,0,kellyOverlays.length - 0.001))]()
}

// ASSEMBLY FUNCTIONS
function lv_ln(x, line_width, weight, pal, alpha) {
  push()
  let lv_nl = 550
  for (let i = 0; i < lv_nl; i++){
    let y = map(i, 0, lv_nl, -h(.5), h(.5))
    let x1 = x - line_width/2
    let x2 = x + line_width/2
    tS(x1, y, x2, y, weight, pal[0], pal[1], pal[2], alpha)
  }
  pop()
}
function lh_ln(y, line_width, weight, pal, alpha) {
  push()
  let lh_nl = 550
  for (let i = 0; i < lh_nl; i++){
    let x = map(i, 0, lh_nl, -w(.5), w(.5))
    let y1 = y - line_width/2
    let y2 = y + line_width/2
    tS(x, y1, x, y2, weight, pal[0], pal[1], pal[2], alpha)
  }
  pop()
}
function tr_hL(pal, alpha, y_limits) {
  let inc = .01;
  let xoff = 0 
  let hL_nl = 600
  for (let i = 0; i <= hL_nl; i++){
    let y = map(i, 0, hL_nl, y_limits[0], y_limits[1] + w(0.003))
    let x_left = map(y, y_limits[0], y_limits[1] - w(0.002), 0, -w(.5))
    let x_right = map(y, y_limits[0], y_limits[1] + w(0.002), 0, w(.5))
    tS(x_left - w(0.01)*noise(xoff), y, x_right + w(0.01)*noise(xoff), y, w(0.003), pal[0], pal[1], pal[2], alpha)
    xoff += inc
  }
}
function tr_vL(pal, alpha, y_limits) {
  let inc = .01;
  let xoff = 0 
  let vL_nl = 850
  for (let i = 0; i <= vL_nl; i++){
    let x = map(i, 0, vL_nl, -w(.5), w(.5))
    if(x<0){
      y = map(x, -w(.5), 0, y_limits[1], y_limits[0])
    }else{
      y = map(x, 0, w(.5), y_limits[0], y_limits[1])
    }
    tS(x, y - w(.007)*noise(xoff), x, y_limits[1], w(0.005), pal[0], pal[1], pal[2], alpha)
    xoff += inc
  }
}
function trLS(weight, pal, alpha) {
  push()
  let rotate_options = [0,180]
  rotation_value = rotate_options[floor(rnd() * rotate_options.length)];;
  angleMode(DEGREES)
  rotate(rotation_value)
  lv_ln(width/2, w(0.085), weight, pal, alpha/2)
  lv_ln(0, w(0.015), weight, pal, alpha)
  lh_ln(h(0.43), w(0.015), weight, pal, alpha)
  lh_ln(h(0.21), w(0.015), weight, pal, alpha)
  pop()
}
function kelly_bigB_2() {
  strokeCap(PROJECT);
  strokeJoin(MITER);
  bS();
  v(w(1),h(0.0284));
  v(w(1),h(1));
  bV(w(1),h(1),w(0.539),h(1),w(0.508),h(0.666));
  bV(w(0.508),h(0.666),w(0.511),h(0.981),w(0),h(1));
  v(w(0),h(0));
  bV(w(0),h(0),w(0.394),h(0.0252),w(0.492),h(0.397));
  bV(w(0.492),h(0.397),w(0.502),h(0.0442),w(1),h(0.0284));
  eS(CLOSE);
}
function kellyTr() {
  push()
  translate(width/2,height/2)
  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];
  blendMode(OVERLAY)
  tr_hL(p.con, 45, y_limits)
  pop()
}
function screw(x,y) {
  push()
  blendMode(BLEND)
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(scr[0], scr[1], scr[2], 255)
  ellipse(x, y, w(0.01))
  fill(.8*scr[0], .8*scr[1], .8*scr[2], 255)
  ellipse(x, y, w(0.008))
  //ellipse(x, y, w(0.005))
  push()
  fill(.35*scr[0], .35*scr[1], .35*scr[2], 255)
  ctx.shadowBlur = 0.6*sV;;
  ctx.shadowColor = 'white';
  translate(x,y)
  rectMode(CENTER)
  angleMode(DEGREES)
  rotate(rnd(0,360))
  rect(0,0,w(0.008),h(0.0015))
  rect(0,0,w(0.0015),h(0.008))
  pop()
  pop()
}
function screwSm(x,y) {
  push()
  blendMode(BLEND)
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0.8*sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(scr[0], scr[1], scr[2], 255)
  ellipse(x, y, w(0.008))
  fill(.8*scr[0], .8*scr[1], .8*scr[2], 255)
  ellipse(x, y, w(0.0064))
  //ellipse(x, y, w(0.005))
  push()
  fill(.35*scr[0], .35*scr[1], .35*scr[2], 255)
  ctx.shadowBlur = 0.6*sV;;
  ctx.shadowColor = 'white';
  translate(x,y)
  rectMode(CENTER)
  angleMode(DEGREES)
  rotate(rnd(0,360))
  rect(0,0,w(0.0064),h(0.00115))
  rect(0,0,w(0.00115),h(0.0064))
  pop()
  pop()
}
function screwSm2(x,y) {
  push()
  blendMode(BLEND)
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0.7*sV;
  ctx.shadowColor = 'black';
  noStroke()
  fill(scr[0], scr[1], scr[2], 255)
  ellipse(x, y, w(0.007))
  fill(.8*scr[0], .8*scr[1], .8*scr[2], 255)
  ellipse(x, y, w(0.0054))
  //ellipse(x, y, w(0.005))
  push()
  fill(.35*scr[0], .35*scr[1], .35*scr[2], 255)
  ctx.shadowBlur = 0.7*sV;;
  ctx.shadowColor = 'white';
  translate(x,y)
  rectMode(CENTER)
  angleMode(DEGREES)
  rotate(rnd(0,360))
  rect(0,0,w(0.0054),h(0.00094))
  rect(0,0,w(0.00094),h(0.0054))
  pop()
  pop()
}
function moholyCircle(x_t,y_t,pal,r,start,stop,step) {
  push()
  r = w(0.3);
  //angle = 0;
  //step = 0.1; //in radians equivalent of 360/6 in degrees
  strW(w(0.002))
  stroke(235)
  angleMode(DEGREES)
  translate(x_t,y_t)
  for (angle = start; angle < stop; angle += step){
    var x = r * sin(angle);
    var y = r * cos(angle);
    var x2 = 0.98*r * sin(angle);
    var y2 = 0.98*r * cos(angle);
    //draw ellipse at every x,y point
    //line(x,y,x2,y2)
    tS(x, y, x2, y2, w(0.003), pal[0], pal[1], pal[2], 35)
  }
  pop()
}
function triCut(pal,alpha) {
  fill(pal[0],pal[1],pal[2],alpha)
  stroke(pal[0],pal[1],pal[2],alpha/2)
  strW(w(.002))
  bS()
  v(w(.12),h(.12))
  v(w(.38),h(.12))
  v(w(.38),h(.88))
  v(w(.12),h(.88))
  bC()
  v(w(.08),h(.24))
  v(w(.25),h(.76))
  v(w(.42),h(.24))
  eC()
  eS(CLOSE)
}
function triRect(pal,alpha) {
  fill(pal[0],pal[1],pal[2],alpha)
  stroke(pal[0],pal[1],pal[2],alpha/2)
  strW(w(.002))
  bS()
  v(w(.003),h(.003))
  v(w(.003),h(.997))
  v(w(.497),h(.997))
  v(w(.497),h(.003))
  bC()
  v(w(.12),h(.12))
  v(w(.38),h(.12))
  v(w(.38),h(.24))
  v(w(.42),h(.24))
  v(w(.38),h(.36235))
  v(w(.38),h(.88))
  v(w(.12),h(.88))
  v(w(.12),h(.36235))
  v(w(.08),h(.24))
  v(w(.12),h(.24))
  eC()
  eS(CLOSE)
}
function bShape(pal,a,alpha) {
  fill(pal[0],pal[1],pal[2], alpha)
  stroke(pal[0],pal[1],pal[2], alpha/2.2)
  strW(w(.002))
  let xoff = 0
  let inc = .03
  strokeCap(PROJECT);
  strokeJoin(MITER);
  let jw = w(.35)
  let jy = h(.2)
  let jpegs = [[jw,jy,w(.003),h(.005)],[jw*(1.21),jy*(1.15),w(.004),h(.007)],[jw*(.98),jy*(1.16),w(.003),h(.005)],[jw*(.95),jy*(.8),w(.002),h(.004)],[jw*(.86),jy*(.95),w(.003),h(.007)],[jw*(1.06),jy*(0.8),w(.001),h(.003)],[jw*(.77),jy*(1.2),w(.002),h(.005)],[jw*(1.11),jy*(1.23),w(.003),h(.004)],[jw*(.9),jy*(1.25),w(.003),h(.006)],[jw*(1.12),jy*(1.06),w(.005),h(.008)],[jw*(.9),jy*(1.1),w(.003),h(.004)],[jw*(1.1),jy*(.89),w(.005),h(.006)],[jw*(1.1),jy*(1.12),w(.003),h(.005)],[jw*(1.06),jy*(.94),w(.004),h(.006)]]
  bS();
  //v(w(0.353) + a,h(0.003));
  //v(w(0.353)+ a,h(0.997));
  for (var y = h(0.003); y <= h(0.997); y += h(0.001)){
      var x = w(0.269) + a + w(0.024)*noise(xoff)
      v(x, y)
      xoff += inc
  }
  v(w(0.67)+ a,h(0.997));
  bV(w(0.67)+ a,h(0.997),w(0.67)+ a,h(0.545),w(0.38)+ a,h(0.49));
  bV(w(0.43)+ a,h(0.491),w(0.67)+ a,h(0.419),w(.67)+ a,h(0.003));
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  eS(CLOSE)
  bS()
  v(w(0.13) + a,h(0.003))
  for (var y = h(0.003); y <= h(0.997); y += h(0.001)){
      var x = w(0.24) + a + w(0.024)*noise(xoff)
      v(x, y)
      xoff += inc
  }
  v(w(0.13) + a,h(0.997))
  eS(CLOSE)
}
// OVERLAY ASSEMBLY FUNCTIONS
function window_overlay(x_left_outside, x_left_inside, x_right_outside, x_right_inside, y_top, y_inside, y_bottom, pal, shadowBlur, sX, sY) {
  push()
  ctx.shadowOffsetX = sX;
  ctx.shadowOffsetY = sY;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = 'black';
  //blendMode(BURN)
  fill(pal[0], pal[1], pal[2], 125)
  stroke(pal[0], pal[1], pal[2], 65)
  strokeJoin(ROUND)
  strW(w(0.0015))
  bS()
  v(x_left_outside, y_top)
  v(x_right_outside - w(.001), y_top)
  v(x_right_outside - w(.001), y_bottom - h(0.003))
  v(x_left_outside, y_bottom - h(0.003))
  bC()
  v(x_left_inside, y_bottom - h(0.1))
  v(x_right_inside, y_bottom - h(0.1))
  v(x_right_inside, y_inside)
  v(x_left_inside, y_inside)
  eC()
  eS(CLOSE)
  let color_c1 = gr_2
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 25)
  let b2 = color(255,255,255,215)
  let gradient_mid = rnd(x_left_outside+w(.12),x_right_outside-w(.12))
  strokeCap(SQUARE)
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowBlur = 0;
  let n_l = 600
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, x_left_outside, x_right_outside)
    strW(width/(.8*n_l))
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      stroke(c) // MAIN STROKE
      //line(x, h(1)-barH, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      c = lerpColor(b2, b1, inter2)
      stroke(c) // OVERLAY STROKE
      //line(x, h(1)-barH, x, h(0.998))
    }
    if (x < x_left_inside){
        line(x,y_top,x,y_bottom - h(0.003))
    }else if(x >= x_left_inside && x <= x_right_inside){
        line(x,y_top,x,y_inside)
        line(x,y_bottom - h(0.1),x,y_bottom - h(0.003))
    }else{
        line(x,y_top,x,y_bottom - h(0.003))
    }
  }
  let s_p = [[x_left_outside + w(.02), y_top + h(.02)],[x_right_outside - w(.02), y_top + h(.02)],[x_left_outside + w(.02), y_bottom - h(.02)],[x_right_outside - w(.02), y_bottom - h(.02)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function rcTrCut(left, right, bottom, top, pal) {
  push()
  ctx.shadowOffsetX =  - 0.3*sV;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  fill(pal[0], pal[1], pal[2], 155)
  stroke(pal[0], pal[1], pal[2], 85)
  strokeJoin(ROUND)
  strW(w(0.0015))
  let tri_mid = right - (right - left)/2
  let jw = right - (right-tri_mid)/1.8
  let jy = bottom/2
  let jpegs = [[jw,jy*(.08),w(.003),h(.005)],[jw*(1.02),jy*(.1),w(.004),h(.007)],[jw*(.98),jy*(.13),w(.003),h(.005)],[jw*(.95),jy*(.16),w(.002),h(.004)],[jw*(1.03),jy*(.18),w(.003),h(.007)],[jw*(1.06),jy*(.109),w(.001),h(.003)],[jw*(1.09),jy*(.21),w(.002),h(.005)],[jw*(1.11),jy*(.23),w(.003),h(.004)],[jw*(1.08),jy*(.26),w(.003),h(.006)],[jw*(1.12),jy*(.06),w(.005),h(.008)],[jw*(1.08),jy*(.075),w(.003),h(.004)],[jw*(1.1),jy*(.085),w(.005),h(.006)],[jw*(1.1),jy*(.125),w(.003),h(.005)],[jw*(1.06),jy*(.29),w(.004),h(.006)],[jw*(0.94),jy*(.06),w(.004),h(.006)]]
  bS()
  v(left + w(0.003), bottom - h(0.003))
  v(right - w(0.003), bottom - h(0.003))
  v(right - w(0.003), top + h(0.003))
  v(left + w(0.003), top + h(0.003))
  bC()
  v(tri_mid, top + h(0.05))
  v(right - w(0.05), bottom - h(0.05))
  v(left + w(0.05), bottom - h(0.05))
  eC()
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  //jpegArt(w(.85),h(.08),w(.003),h(.005))
  eS(CLOSE)
  let color_c1 = gr_1
  //let color_c2 = gr_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 0)
  let b2 = color(255,255,255,95)
  let gradient_mid = rnd(left+w(.06),tri_mid-w(.09))
  strokeCap(ROUND)
  blendMode(SCREEN)
  ctx.shadowOffsetX =  0;
  ctx.shadowBlur = 0;
  let tr_num_lines = 1000
  for (let i = 0; i < tr_num_lines; i++){
    let x = map(i, 0, tr_num_lines, left + w(0.003), right - w(0.003))
    if (x <= gradient_mid){
      let inter = map(x, left + w(0.003), gradient_mid, 1, 0)
      c = lerpColor(b2, b1, inter)
    }else{
      let inter2 = map(x, gradient_mid, right - w(0.003), 1, 0)
      c = lerpColor(b1, b2, inter2)
    }
    stroke(c)
    strW(width/(.65*tr_num_lines))
    if (x < left + w(0.05)){
        line(x,top + h(0.003),x,bottom - h(0.003))
    }else if(x > left + w(0.05) && x <= tri_mid){
        line(x,top + h(0.003),x,map(x,left + w(0.05),tri_mid,bottom - h(0.05), top + h(0.05)))
        line(x,bottom - h(0.05),x,bottom - h(0.003))
    }else if(x > tri_mid && x < right - w(0.05)){
        line(x,top + h(0.003),x,map(x,tri_mid, right - w(0.05), top + h(0.05), bottom - h(0.05)))
        line(x,bottom - h(0.05),x,bottom - h(0.003))
    }else{
        line(x,top + h(0.003),x,bottom - h(0.003))
    }
  }
  pop()
}
function gradient_plate(x_left, x_break, y_top, gradient_width, gradient_height, gradient_height_2) {
  push()
  var color_c1 = gr_1
  var color_c2 = gr_1
  var color_c3 = gr_3
  var c1 = color(color_c1[0], color_c1[1], color_c1[2], 165)
  var c2 = color(color_c2[0], color_c2[1], color_c2[2], 125)
  var c3 = color(color_c3[0], color_c3[1], color_c3[2], 215)
  var xoff = 0
  var inc = .02
  let gp_nl = 800
  for (let i = 0; i < gp_nl; i++){
    let x = map(i, 0, gp_nl, x_left + w(0.003),x_left + gradient_width)
    let inter = map(x, x_left, x_left + gradient_width, 0, 1)
    let c = lerpColor(c2, c3, inter)
    push()
    for (var j = 0; j < 25; j++){
      var y = (y_top + h(0.024) + h(0.036)*noise(xoff)) - h(0.00055)*j
      fill(20, map(j, 2, 20, 30, 0))
      noStroke()
      ellipse(x, y, w(0.001))
    }
    pop()
    strokeCap(ROUND)
    strW(width/1000)
    if (x < x_break - w(0.004)){
      stroke(c)
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height - w(0.004))
    }else{
      stroke(c)
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height_2 - w(0.004))
    }
    xoff += inc
  }
  pop()
}
function gradient_flat(x_left, y_top, gradient_width, gradient_height, shadow) {
  push()
  var color_c1 = gr_2
  var color_c2 = gr_3
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 215)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 65)
  var xoff = 0
  var inc = 0.03
  strokeCap(ROUND)
  let gf_nl = 1000
  for (let i = 0; i < gf_nl; i++){
    let x = map(i, 0, gf_nl, x_left + w(0.003), x_left + gradient_width - w(0.003))
    for (var j = 0; j < 25; j++){
        let y = (y_top + gradient_height + w(0.025)*noise(xoff)) + shadow*j
        fill(20, map(j, 5, 23, 45, 0))
        noStroke()
        ellipse(x, y, w(0.0013))}
    if (x <= x_left + w(0.185)){
      let inter = map(x, x_left, x_left + w(0.185), 1, 0)
      c = lerpColor(b1, b2, inter)
      strW(gradient_width/(0.3*gf_nl))
      stroke(c) // MAIN STROKE
      line(x, y_top + w(0.002), x, y_top + gradient_height + w(0.025)*noise(xoff))
    }else{
      let inter2 = map(x, x_left + w(0.185), x_left + gradient_width, 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
      line(x, y_top + w(0.002), x, y_top + gradient_height + w(0.025)*noise(xoff))
    }
    xoff += inc
  }
  pop()
}
function tul(a) {
    push()
    scale(0.85)
    translate(rnd(-w(0.25), w(0.1)), h(0.175))
    v(w(0.49661) + a, h(.998));
    bV(w(0.49661) + a, h(.998), w(0.49688) + a, h(0.93156), w(0.49819) + a, h(0.92564));
    bV(w(0.49819) + a, h(0.92564), w(0.49706) + a,h(0.90822), w(0.49557) + a, h(0.89574));
    bV(w(0.49557) + a, h(0.89574), w(0.48579) + a, h(0.81425), w(0.48423) + a, h(0.79959));
    bV(w(0.48267) + a, h(0.78493), w(0.46055) + a, h(0.675), w(0.417) + a, h(0.6276));
    bV(w(0.37345) + a, h(0.5802), w(0.33175) + a, h(0.57642), w(0.30866) + a, h(0.56568));
    bV(w(0.28557) + a, h(0.55494), w(0.24635) + a, h(0.5442), w(0.27668) + a, h(0.529));
    bV(w(0.30701) + a, h(0.5138), w(0.34239) + a, h(0.50246), w(0.39484) + a, h(0.53532));
    bV(w(0.44729) + a, h(0.56818), w(0.44855) + a, h(0.65916), w(0.46184) + a, h(0.692));
    bV(w(0.47513) + a, h(0.72488), w(0.48354) + a, h(0.747), w(0.49126) + a, h(0.79785));
    bV(w(0.49898) + a, h(0.84868), w(0.4977) + a, h(0.81233), w(0.4977) + a, h(0.79978));
    bV(w(0.4977) + a, h(0.78723), w(0.49253) + a, h(0.69524), w(0.49253) + a, h(0.674));
    bV(w(0.49253) + a, h(0.65276), w(0.49686) + a, h(0.51881), w(0.49486) + a, h(0.496));
    bV(w(0.49286) + a, h(0.47319), w(0.48286) + a, h(0.46721), w(0.46568) + a, h(0.46481));
    bV(w(0.4485) + a, h(0.46241), w(0.38852) + a, h(0.44642), w(0.37453) + a, h(0.41524));
    bV(w(0.36054) + a, h(0.38406), w(0.36294) + a, h(0.37446), w(0.37013) + a, h(0.36167));
    bV(w(0.37732) + a, h(0.34888), w(0.4217) + a, h(0.21618), w(0.4289) + a, h(0.1814));
    bV(w(0.4361) + a, h(0.14662), w(0.44635) + a, h(0.12948), w(0.45449) + a, h(0.13783));
    bV(w(0.46108) + a, h(0.14459), w(0.46437) + a, h(0.1501), w(0.47211) + a, h(0.1411));
    bV(w(0.47957) + a, h(0.13241), w(0.48652) + a, h(0.12296), w(0.50711) + a, h(0.11991));
    bV(w(0.53563) + a, h(0.11569), w(0.54683) + a, h(0.13263), w(0.56003) + a, h(0.1774));
    bV(w(0.57323) + a, h(0.22217), w(0.606) + a, h(0.30733),w(0.62319) + a, h(0.33372));
    bV(w(0.64035) + a, h(0.36011), w(0.64838) + a, h(0.40967), w(0.606) + a, h(0.42886));
    bV(w(0.56362) + a, h(0.44805), w(0.52445) + a, h(0.45086), w(0.512) + a, h(0.48763));
    bV(w(0.51555) + a, h(0.5244), w(0.5124) + a, h(0.62396), w(0.5136) + a, h(0.70191));
    bV(w(0.5148) + a, h(0.77986), w(0.51525) + a, h(0.74829), w(0.5156) + a, h(0.77191));
    bV(w(0.51639) + a, h(0.82477), w(0.52122) + a, h(0.78349), w(0.52402) + a, h(0.7687));
    bV(w(0.52682) + a, h(0.75391), w(0.53364) + a, h(0.64514), w(0.64718) + a, h(0.634));
    bV(w(0.79024) + a, h(0.62049), w(0.75096) + a, h(0.66255), w(0.71618) + a, h(0.66535));
    bV(w(0.6814) + a, h(0.66815), w(0.6821) + a, h(0.68935), w(0.6148) + a, h(0.66958));
    bV(w(0.55968) + a, h(0.6534), w(0.54044) + a, h(0.72595), w(0.53564) + a, h(0.74434));
    bV(w(0.53084) + a, h(0.76273), w(0.53516) + a, h(0.79894), w(0.52164) + a, h(0.82789));
    bV(w(0.50978) + a, h(0.85329), w(0.51579) + a, h(0.86797), w(0.51664) + a, h(0.89516));
    bV(w(0.51749) + a, h(0.92235), w(0.52579) + a, h(0.94096), w(0.52438) + a, h(0.95982));
    bV(w(0.52306) + a, h(0.97733), w(0.52069) + a, h(.998), w(0.52069) + a, h(.998));
    pop()
}
function meetingCircles(pal, sx, a, alpha) {
  push()
  stroke(pal[0], pal[1], pal[2], alpha/1.8)
  strW(w(0.003))
  fill(pal[0], pal[1], pal[2], alpha)
  let sy = h(.002)
  //strokeJoin(MITER)
  //strokeCap(PROJECT)
  bS();

  v(w(0.60115)+sx,h(0.44316)-sy);
  v(w(0)+sx,h(0.44316)-sy);
  v(w(0)+sx,h(0.57023)-sy);
  bV(w(0.04553)+sx,h(0.6971)-sy,w(0.13383)+sx,h(0.75023)-sy,w(0.229)+sx,h(0.76587)-sy);
  bV(w(0.04657)+sx,h(0.77214)-sy,w(0)+sx,h(0.82966)-sy,w(0)+sx,h(0.82966)-sy);
  v(w(0)+sx,h(1)-sy);
  v(w(0.60115)+sx,h(1)-sy);
  v(w(0.60115)+sx,h(0.80545)-sy);
  bV(w(0.502)+sx,h(0.785)-sy,w(0.41848)+sx,h(0.77366)-sy,w(0.34833)+sx,h(0.7686)-sy);
  bV(w(0.48275)+sx,h(0.7556)-sy,w(0.60115)+sx,h(0.69731)-sy,w(0.60115)+sx,h(0.69731)-sy);
  v(w(0.60115)+sx,h(0.44316)-sy);
  bC()
  tul(a)
  eC()
  eS()

  screw(w(0.012)+sx, h(0.988)-sy)
  screw(w(0.012)+sx, h(0.457)-sy)
  screw(w(0.59)+sx, h(0.988)-sy)
  screw(w(0.59)+sx, h(0.457)-sy)
  pop()
}
function crescentCutOut() {
  bS();
  v(w(.003),h(.003));
  v(w(.003),h(.997));
  v(w(0.5),h(.997));
  v(w(0.5),h(.003));
  bC();
  v(w(0.056),h(0.9333));
  v(w(0.056),h(0.08363));
  bV(w(0.43),h(0.08363),w(0.47),h(0.33644),w(0.47),h(0.50846));
  bV(w(0.47),h(0.68048),w(0.43),h(0.9333),w(0.056),h(0.9333));
  eC()
  eS();
  let s_p = [[w(.02),h(.02)],[w(.02),h(.98)],[w(.47),h(.02)],[w(.47),h(.98)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function corner(pal) {
  ctx.shadowOffsetX = -0.5*sV;
  ctx.shadowOffsetY = -0.5*sV;
  ctx.shadowBlur = 2.3*sV;
  ctx.shadowColor = 'black';
  fill(pal[0],pal[1],pal[2],185)
  stroke(pal[0],pal[1],pal[2],125)
  strW(w(.0015))
  let jw = w(.925)
  let jy = h(.75)
  let jpegs = [[jw,jy*(.8),w(.003),h(.005)],[jw*(1.02),jy*(.9),w(.004),h(.007)],[jw*(.98),jy*(.93),w(.003),h(.005)],[jw*(.95),jy*(.96),w(.002),h(.004)],[jw*(1.03),jy*(.98),w(.003),h(.007)],[jw*(1.06),jy*(.97),w(.001),h(.003)],[jw*(1.05),jy*(1.2),w(.002),h(.005)],[jw*(1.04),jy*(1.23),w(.003),h(.004)],[jw*(1.06),jy*(1.06),w(.004),h(.009)],[jw*(1.04),jy*(.92),w(.006),h(.01)],[jw*(1.04),jy*(.89),w(.002),h(.003)]]
  bS()
  v(w(.85),h(0.5))
  v(w(.85),h(.85))
  v(w(.75),h(.85))
  v(w(.75),h(.997))
  v(w(.997),h(.997))
  v(w(.997),h(.5))
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  eS(CLOSE)
  let s_p = [[w(.98),h(.98)],[w(.77),h(.98)],[w(.87),h(.52)],[w(.98),h(.52)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function twoRectangles(pal,al1,al2) {
  ctx.shadowOffsetX = 0.2*sV;
  ctx.shadowOffsetY = 0.2*sV;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  fill(pal[0],pal[1],pal[2],al2)
  stroke(pal[0],pal[1],pal[2],al1)
  strW(w(.001))
  bS()
  v(w(.75),h(0.4))
  v(w(.997),h(0.4))
  v(w(.997),h(.997))
  v(w(0.75),h(.997))
  eS(CLOSE)
  bS()
  v(w(.65),h(0.2))
  v(w(.65),h(.85))
  v(w(.85),h(.85))
  v(w(.85),h(.2))
  eS(CLOSE)
  var color_c1 = gr_2
  var color_c2 = gr_1
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 25)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 5)
  var xoff = 0
  var inc = 0.03
  strokeCap(ROUND)
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  let gf_nl = 250
  let g_mid = 90
  for (let i = 0; i < gf_nl; i++){
    let x = map(i, 0, gf_nl, w(.65), w(.85))
    if (i <= g_mid){
      let inter = map(i, 0, g_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
    }else{
      let inter2 = map(i, g_mid, gf_nl, 1, 0)
      c = lerpColor(b2, b1, inter2)
    }
    strW(w(.2)/(.3*gf_nl))
    stroke(c) // OVERLAY STROKE
    line(x, h(.2), x, h(.85))
    xoff += inc
  }
  //fill(pal[0],pal[1],pal[2],al2)
  corner(pal)
  let s_p = [[w(.77),h(.42)],[w(.77),h(.83)],[w(.83),h(.83)],[w(.67),h(.22)],[w(.67),h(.83)],[w(.83),h(.22)],[w(.98),h(.42)],[w(.83),h(.42)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function bigCurve(pal1,pal2,alpha) {
  noStroke()
  fill(pal1[0],pal1[1],pal1[2],alpha)
  bS();
  v(w(0.002),h(0.002));
  v(w(0.91979),h(0.002));
  v(w(0.91979),h(0.18465));
  bV(w(0.78571),h(0.18465),w(0.09933),h(0.215),w(0.09783),h(0.54487));
  v(w(0.09783),h(0.54487));
  v(w(0.09783),h(0.998));
  v(w(0.002),h(0.998));
  bC()
  v(w(0.62975),h(0.07873));
  bV(w(0.561),h(0.07873),w(0.50543),h(0.10962),w(0.50543),h(0.14658));
  v(w(0.50543),h(0.80547));
  bV(w(0.50543),h(0.84147),w(0.56133),h(0.87332),w(0.63),h(0.87332));
  bV(w(0.69883),h(0.87332),w(0.7544),h(0.84243),w(0.7544),h(0.80547));
  v(w(0.7544),h(0.14658));
  bV(w(0.7544),h(0.1106),w(0.6985),h(0.07873),w(0.62975),h(0.07873));
  eC(CLOSE)
  eS(CLOSE);
  fill(pal2[0],pal2[1],pal2[2],alpha)
  bS()
  v(w(0.924),h(0.002))
  v(w(0.998),h(0.002))
  v(w(0.998),h(0.998))
  v(w(0.1),h(0.998))
  v(w(0.1),h(0.968))
  v(w(0.924),h(0.968))
  eS(CLOSE)
  screw(w(0.048), h(0.048))
  screw(w(0.048), h(0.952))
}
function sailshape(x_l, y_b) {
  noStroke()
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 2*sV;
  ctx.shadowColor = 'black';
  let sail_color = p.aux
  let sail_bottom_split = w(1)-(w(1) - x_l)/2 - w(.05)
  let sail_bottom_split_2 = w(1)-(w(1) - x_l)/2 + w(.05)
  fill(sail_color[0],sail_color[1],sail_color[2],120)
  stroke(sail_color[0],sail_color[1],sail_color[2],65)
  strW(w(.002))
  let jw = w(.997)-(w(.997)-x_l)/2
  let jy = y_b/2
  let jpegs = [[jw*(1.18),jy*(1.1),w(.004),h(.007)],[jw*(1.06),jy*(1.14),w(.003),h(.005)],[jw*(1),jy*(1.16),w(.002),h(.004)],[jw*(1.13),jy*(1.15),w(.003),h(.007)],[jw*(1.1),jy*(1.24),w(.001),h(.003)],[jw*(1.17),jy*(1.11),w(.002),h(.005)],[jw*(1.12),jy*(1.05),w(.003),h(.008)],[jw*(1.14),jy*(1.02),w(.004),h(.01)],[jw*(1.1),jy*(0.96),w(.002),h(.005)],[jw*(1.18),jy*(0.91),w(.004),h(.005)],[jw*(1.18),jy*(0.98),w(.002),h(.003)]];
  bS()
  v(w(0.997),y_b)
  v(w(0.997),h(0.003))
  v(w(0.97),h(0.003))
  v(w(0.97),h(0.1))
  v(x_l,h(0.6))
  v(x_l,h(0.6))
  v(x_l,h(0.8))
  v(sail_bottom_split,y_b)
  v(sail_bottom_split_2,y_b)
  v(w(0.97),h(.8))
  v(w(0.97),y_b)

  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  eS(CLOSE)
  ctx.shadowBlur = 0;
  let color_c1_sail = gr_3;
  let b1_sail = color(color_c1_sail[0], color_c1_sail[1], color_c1_sail[2], 10);
  let b2_sail = color(255,255,255,125);
  const gradient_mid_sail = rnd(x_l+w(.05),x_l+x_l/2)
  let sail_num_lines = 500

  for (let i = 0; i < sail_num_lines; i++){
    let x = map(i, 0, sail_num_lines, x_l, w(0.997))
    if (x <= gradient_mid_sail){
        let inter = map(x, x_l, gradient_mid_sail, 1, 0)
        c = lerpColor(b1_sail, b2_sail, inter)
      }else{
        let inter2 = map(x, gradient_mid_sail, w(0.997), 1, 0)
        c = lerpColor(b2_sail, b1_sail, inter2)
      }
    if (x < w(0.97)){
        y1 = map(x,x_l,w(0.97),h(0.6),h(0.1))
        if(x < sail_bottom_split){
          y2 = map(x,x_l,sail_bottom_split,h(0.8),y_b)
        }else if(x > sail_bottom_split && x < sail_bottom_split_2){
          y2 = y_b
        }else{
          y2 = map(x,sail_bottom_split_2,w(0.97),y_b,h(.8))
        }
    }else{
        y1 = h(0.003)
        y2 = y_b
    }
    stroke(c)
    strW((w(0.997) - x_l)/sail_num_lines)
    line(x,y1,x,y2)
  }
}
function biglens(pal, pal2) {

  translate(width/2,height/2)
  angleMode(RADIANS)
  let rt_ang = [0, HALF_PI, PI, PI + HALF_PI]
  let rotation_angle = rt_ang[floor(rnd() * rt_ang.length)];;
  rotate(rotation_angle)

  strW(w(.002))
  //noStroke()
  fill(pal[0],pal[1],pal[2], 165)
  stroke(pal[0],pal[1],pal[2], 90)
  push()
  rectMode(CORNER)
  let a = w(.5)
  let jw = w(.56)-a
  let jy = h(.35)-a
  let jpegs = [[2.9*jw,.6*jy,w(.003),h(.005)],[3.3*jw,.3*jy,w(.006),h(.01)],[3.55*jw,.75*jy,w(.004),h(.009)],[3.62*jw,.1*jy,w(.003),h(.004)],[3.34*jw,.55*jy,w(.002),h(.003)],[3.85*jw,-.3*jy,w(.003),h(.005)]]
  bS()
  //rect(w(0.56),h(0.35),w(.23),h(.648))
  v(w(0.56)-a,h(0.35)-a)
  v(w(0.56)-a,h(0.998)-a)
  v(w(0.79)-a,h(0.998)-a)
  v(w(0.79)-a,h(0.35)-a)
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  eS(CLOSE)
  pop()
  fill(pal2[0],pal2[1],pal2[2], 190)
  stroke(pal2[0],pal2[1],pal2[2], 90)
  bS();
  v(w(.003)-a,h(0.7312)-a);
  bV(w(0)-a,h(0.7312)-a,w(0.2082)-a,h(1.11)-a,w(0.6666)-a,h(0.96078)-a);
  bV(w(1.09107)-a,h(0.7812)-a,w(1.02)-a,h(0.3871)-a,w(0.937)-a,h(0.2264)-a);
  bV(w(0.8808)-a,h(0.1246)-a,w(0.80214)-a,h(0.06281)-a,w(0.80214)-a,h(0.0628)-a);
  v(w(0.80214)-a,h(.003)-a);
  v(w(0.76475)-a,h(.003)-a);
  v(w(0.76475)-a,h(0.85641)-a);
  bV(w(0.76475)-a,h(0.85641)-a,w(0.359)-a,h(1.15432)-a,w(0.04483)-a,h(0.7312)-a);
  bC();
  v(w(0.83194)-a,h(0.13688)-a);
  bV(w(1.014)-a,h(0.33565)-a,w(1)-a,h(0.64225)-a, w(0.80342)-a,h(0.825)-a);
  v(w(0.80342)-a,h(0.825)-a);
  bV(w(0.81321)-a,h(0.11752)-a,w(0.80342)-a,h(0.10848)-a, w(0.82278)-a,h(0.12688)-a);
  eC();
  eS();
  angleMode(DEGREES)
  let as = rnd(w(0.43),w(0.72))
  stroke(pal[0],pal[1],pal[2], 165)
  strW(w(.06))
  strokeCap(PROJECT)
  noFill()
  arc(w(0.65)-a,h(0.45)-a,0.95*as,0.95*as,165,270,OPEN)
  //noStroke()
  fill(pal2[0],pal2[1],pal2[2], 190)
  strW(w(.002))
  stroke(pal2[0],pal2[1],pal2[2], 100)
  arc(w(0.65)-a,h(0.45)-a,as,as,90,270,OPEN)
  let s_p = [[w(.784),h(.013)],[w(.784),h(.87)],[w(.04),h(.755)],[w(0.65) - 0.05*as,h(0.45) + 0.45*as],[w(0.65) - 0.05*as,h(0.45) - 0.45*as],[w(0.65) - 0.465*as,h(0.42)],[w(0.65) - 0.465*as,h(0.48)],[w(.78),h(.987)],[w(.987),h(.5)]]
  s_p.forEach(i => screw(i[0]-a,i[1]-a))
}
function silo_tr() {
  bS();
  v(w(.38283),h(.12481));
  bV(w(.38283),h(.12481),w(.40083),h(.07661),w(.49983),h(.07414));
  bV(w(.59411),h(.07414),w(.61701),h(.12481),w(.61701),h(.12481));
  eS();

  bS();
  v(w(.37963),h(.54133));
  v(w(.37963),h(.77688));
  bV(w(.37963),h(.77688),w(.37476),h(.8343),w(.50016),h(.84249));
  bV(w(.61846),h(.84249),w(.62037),h(.77688),w(.62037),h(.77688));
  v(w(.62037),h(.54176));
  v(w(.50016),h(.81344));
  eS();

  bS();
  v(w(.38283),h(.12481));
  bV(w(.38283),h(.12481),w(.37963),h(.1309),w(.37963),h(.1452));
  v(w(.37963),h(.54133));
  v(w(.19514),h(.12481));
  eS();

  bS();
  v(w(.61717),h(.12481));
  bV(w(.61717),h(.12481),w(.62037),h(.1309),w(.62037),h(.1452));
  v(w(.62037),h(.54133));
  v(w(.80486),h(.12481));
  eS();
}
function siloShapes(pal1,pal2,pal3,alpha) {
  fill(pal1[0],pal1[1],pal1[2],alpha)
  stroke(pal1[0],pal1[1],pal1[2],alpha/2)
  strW(w(.002))
  //noStroke()

  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;

  bS()
  v(w(.925),h(.003));
  v(w(.997),h(.003));
  v(w(.997),h(.997));
  v(w(.1),h(.997));
  v(w(.1),h(.95));
  v(w(.925),h(.95));
  eS(CLOSE)

  silo_tr()
  let jw = w(.15)
  let jy = h(.15)
  let jpegs = [[jw,jy,w(.003),h(.005)],[jw*(1.12),jy,w(.004),h(.007)],[jw*(.93),jy*(1.08),w(.003),h(.005)],[jw*(.95),jy*(.92),w(.002),h(.004)],[jw*(1.1),jy*(1.18),w(.003),h(.007)],[jw*(1.13),jy*(1.25),w(.001),h(.003)],[jw*(.88),jy*(1.32),w(.002),h(.005)],[jw*(.82),jy*(.82),w(.003),h(.008)],[jw*(.75),jy*(.95),w(.003),h(.004)],,[jw*(.48),jy*(.43),w(.002),h(.004)],[jw*(.54),jy*(.65),w(.006),h(.01)],[jw*(.36),jy,w(.004),h(.006)],[jw*(.27),jy*(.5),w(.003),h(.005)],[jw*(1.34),jy*(1.5),w(.003),h(.007)]]

  fill(pal2[0],pal2[1],pal2[2],alpha)
  stroke(pal2[0],pal2[1],pal2[2],alpha/2)
  bS();
  v(w(.003),h(.003));
  v(w(.003),h(.997));
  v(w(.09794),h(.997));
  v(w(.09794),h(.54432));
  bV(w(.09794),h(.54432),w(.09856),h(.411),w(0.27536),h(.30592));
  v(w(.19514),h(.12481));
  v(w(.38283),h(.12481));
  bV(w(.3953),h(.09605),w(.44289),h(.07414),w(.49983),h(.07414));
  bV(w(.55659),h(.07414),w(.60427),h(.09659),w(.61701),h(.12481));
  v(w(.80486),h(.12481));
  v(w(.77866),h(.184));
  v(w(.78666),h(.18363));
  v(w(.91974),h(.18363));
  v(w(.91974),h(.003));
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  eS(CLOSE);

  fill(pal3[0],pal3[1],pal3[2],alpha/1.5)
  stroke(pal3[0],pal3[1],pal3[2],alpha/2)

  bS();
  v(w(.50015),h(.81344));
  v(w(.37963),h(.54133));
  v(w(.37963),h(.13655));
  v(w(.38283),h(.12481));
  v(w(.61717),h(.12481));
  v(w(.62037),h(.13358));
  v(w(.62037),h(.54133));
  v(w(.50015),h(.81344));
  eS();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 2.5*sV;
  fill(pal1[0],pal1[1],pal1[2],alpha/1.5)
  stroke(pal1[0],pal1[1],pal1[2],alpha/2.5)
  strW(w(.003))
  silo_tr()

  let s_p = [[w(.018),h(.018)],[w(.018),h(.982)],[w(.982),h(.018)],[w(.123),h(.982)],[w(.904),h(.018)],[w(.904),h(.169)],[w(.45),h(.105)],[w(.55),h(.105)],[w(.4),h(.785)],[w(.6),h(.785)],[w(.25),h(.15)],[w(.75),h(.15)]]
  s_p.forEach(i => screw(i[0],i[1]))
  
}
function trident_shape(d, d2) {
  bS();
  v(w(.8912),h(0) - d2*.746);
  bV(w(.8912) - d2/6,h(0),w(0.8114),h(0.4973),w(0.5088),h(0.5603));
  v(w(0.5222) + d/18,h(0.0597) - d);
  v(w(0.4442) + d/18,h(0.09418) - d);
  v(w(0.43393),h(0.56664));
  bV(w(0.123),h(0.55332),w(0.0347),h(0),w(0.0347),h(0));
  v(w(0),h(0));
  v(w(0),h(0.11));
  bV(w(0),h(0.11),w(0.06349),h(0.58058),w(0.43284),h(0.62284));
  v(w(0.426),h(0.9509));
  v(w(0.5),h(0.8951));
  v(w(0.5073),h(0.62257));
  bV(w(0.82914),h(0.57986),w(0.94169),h(0),w(0.94169) + d2/4,h(0) - d2*.8);
  eS();
}
// LOWER LAYER FUNCTIONS
function rug_layout() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  //brush_line_bg_texture_GS()
  //brush_line_bg_texture_GS()
  chooseTexture()
  bg_rug()
}
function persp() {
  bg_rect_noR(p.base)
  translate(-width/2,-height/2)
  //brush_line_bg_texture_GS()
  //brush_line_bg_texture_GS()
  chooseTexture()
  bg_p(p.sec,p.pri,p.acc)
}
function persL_bT() {
  bg_rect_noR(blPal.base)
  translate(-width/2,-height/2)
  //brush_line_bg_texture_GS()
  //brush_line_bg_texture_GS()
  chooseTexture()
  bg_p(blPal.sec,blPal.pri,blPal.acc)
}
function triangle_with_lines() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  push()
  textured_bg_stripes(p.sec, p.dark)
  chooseTexture()
  translate(width/2, height/2)
  let rt_2 = [0, HALF_PI, PI, PI + HALF_PI]
  const rt_an_2 = rt_2[floor(rnd() * rt_2.length)];;
  rotate(rt_an_2)

  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];

  const alpha_under = 80
  const alpha_over = 115
  const alpha_lines = 125
  push()
  //translate(rnd(-w(0.25),w(0.25)),0)
  tr_hL(p.dark, alpha_under, y_limits)
  tr_vL(p.pri, alpha_over, y_limits)
  //blendMode(OVERLAY)
  var line_functions_linked = [trLS]
  line_functions_linked[floor(rnd() * line_functions_linked.length)](w(0.006), p.acc, alpha_lines);
  pop()
  pop()
}
function kellyLayout() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  let x_left = w(0.15)
  let x_right = rnd(w(0.8),w(0.9))
  let y_top = h(0.1)
  let y_bottom = h(0.9)
  let bigRectColor = p.sec
  let insideShapeColor = p.light
  let innerRectColor = p.pri
  let stripeColor = p.con
  let innerStripeColor = p.light
  let x_left_inside = x_left + w(0.03);
  let x_right_inside = x_right - w(0.05);
  let y_top_inside = y_top + h(0.1);
  chooseTexture()
  let nl1 = 1600
  for (let i = 0; i < nl1; i++){
    let x = map(i,0,nl1,x_left,x_right)
    tS(x, y_top, x, y_bottom, w(0.01), bigRectColor[0], bigRectColor[1], bigRectColor[2], 125) 
  }
  let nl2 = 500
  for (let i = 0; i < nl2; i++){
    let x = map(i, 0, nl2, x_left + w(0.1), x_right - w(0.1))
    tS(x, 1.25*y_top_inside, x, h(1), w(0.001), innerRectColor[0], innerRectColor[1], innerRectColor[2], 255)
  }
  blendMode(HARD_LIGHT)
  let fillColor = p.pri
  fill(fillColor[0],fillColor[1],fillColor[2],125)
  chooseKellyOverlay()
  blendMode(BLEND)
  let nl3 = 1500
  for (let i = 0; i < nl3; i++){
    let x = map(i, 0, nl3, x_left_inside, x_right_inside)
    if(x < x_left + w(0.1)){
        tS(x, y_top_inside - h(0.02), x, 3*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else if(x > x_left + w(0.1) && x < x_right - w(0.1)){
        tS(x, y_top_inside - h(0.02), x, 1.25*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else{
        tS(x, y_top_inside - h(0.02), x, 2*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }
  }
  let nl4 = 1000
  for (let i = 0; i <= nl4; i++){
    let x = map(i, 0, nl4, 0, x_right)
    tS(x, y_bottom, x, y_bottom + (h(1)-y_bottom)/2, w(0.006), stripeColor[0], stripeColor[1], stripeColor[2], 125)
  }
  let nl5 = 500
  for (let i = 0; i < nl5; i++){
    let x = map(i, 0, nl5, w(.15), width/2)
    tS(x, y_bottom + w(0.01), x, y_bottom + (h(1)-y_bottom)/2 - w(0.01), w(0.005), innerStripeColor[0], innerStripeColor[1], innerStripeColor[2], 95)
  }
  

}
function basicNewman() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  textured_bg_stripes(p.sec, p.con)
  painted_rectangle(p.pri)
  plH(w(0.005), p.aux, 60)
  //plV(w(0.01), p.light, 90)
}
function basicMoholy() {
  push()
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  //brush_line_bg_texture_GS()
  //brush_line_bg_texture_GS()
  let rect_x = rnd(w(0.25),w(0.5))
  let rect_y = rnd(h(0.2),h(0.4))
  let rect_y_inside = rect_y + h(0.1)
  let rect_y_inside_low = rect_y + h(0.35)
  let rect_width = rect_x + (width - rect_x)/4
  let rect_height = rect_y + h(0.5)
  let rect_color = p.sec
  noStroke()
  let circle_color = p.con
  fill(circle_color[0],circle_color[1],circle_color[2],255)
  ellipse(rect_x,rect_y_inside,2*(rect_y_inside-rect_y))
  fill(rect_color[0],rect_color[1],rect_color[2],135)
  //rect(rect_x,rect_y,rect_width,rect_height)
  bS()
  v(rect_x,rect_y)
  v(rect_width,rect_y)
  v(rect_width,rect_height)
  v(rect_x,rect_height)
  bC()
  v(rect_x-0.05*rect_width, rect_y_inside)
  v(rect_x-0.05*rect_width, rect_y_inside_low)
  v(rect_x+0.05*rect_width, rect_y_inside_low)
  v(rect_x+0.05*rect_width, rect_y_inside)
  eC()
  eS(CLOSE)
  angleMode(DEGREES)
  let angle_begin = rnd(360,720)
  let angle_diff = rnd(135,270)
  let angle_end = angle_begin + angle_diff
  let arc_x = rnd(w(0.3),w(0.5))
  let arc_y = arc_x
  let arc_size = map(arc_x,w(0.3),w(0.5),w(0.37),w(0.76))
  let second_angle_offset = angle_begin/3
  noFill()
  let arc_color = p.light
  let arc_color_2 = p.acc
  let arc_color_3 = p.sec
  strokeCap(SQUARE)
  noStroke()
  fill(arc_color_3[0], arc_color_3[1], arc_color_3[2], 190)
  //arc(arc_x, arc_y, 1.12*arc_size, 1.12*arc_size, angle_begin-0.5*second_angle_offset, angle_begin+wedge_angle_offset, OPEN);
  crescent(angle_begin,arc_x,arc_y,0.57*arc_size,p.sec)
  noFill()
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = map(arc_size,w(0.32),w(0.8),0.1*sV,0.5*sV)
  ctx.shadowColor = 'grey';
  strW(arc_x/20)
  stroke(arc_color_2[0], arc_color_2[1], arc_color_2[2], 235)
  arc(arc_x, arc_y, 1.047*arc_size, 1.047*arc_size, angle_begin-second_angle_offset, angle_end-second_angle_offset);
  ctx.shadowBlur = map(arc_size,w(0.32),w(0.8),0.05*sV,0.25*sV)
  strW(arc_x/40)
  stroke(arc_color[0], arc_color[1], arc_color[2], 235)
  arc(arc_x, arc_y, arc_size, arc_size, angle_begin, angle_end);
  //moholyCircle(arc_x,arc_y,p.light,arc_size/3,angle_begin,angle_end,0.01)
  pop()
}
function threeSquares() {
  push()
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  let x_0 = w(0.02)
  let y_0 = h(0.02)
  let rect_size_1 = rnd(w(0.27),w(0.43))
  let rect_size_2 = 1.5*rect_size_1
  let r1c = p.con
  rectMode(CORNER)
  let num_lines_small = 300
  for (let i = 0; i < num_lines_small; i++){
    let x = map(i ,0, num_lines_small, x_0, x_0 + rect_size_1)
    let y1 = y_0
    let y2 = y_0 + rect_size_1
    tS(x, y1, x, y2, w(.004), r1c[0],r1c[1],r1c[2],225)
  }
  //noStroke()
  let r2c = p.sec
  let num_lines_mid = 500
  for (let i = 0; i < num_lines_mid; i++){
    let y = map(i ,0, num_lines_mid, y_0+rect_size_1/4,y_0+rect_size_1/4 + rect_size_2)
    let x1 = x_0+rect_size_1/4
    let x2 = x_0+rect_size_1/4 + rect_size_2
    tS(x1, y, x2, y, w(.005), r2c[0],r2c[1],r2c[2],125)
}
  let r3c = p.pri
  let num_lines_big = 280
  for (let i = 0; i < num_lines_big; i++){
    let x = map(i ,0, num_lines_big, x_0+rect_size_1, x_0 + 1.3*rect_size_2)
    let y1 = y_0+rect_size_1
    let y2 = y_0 + 1.3*rect_size_2
    tS(x, y1, x, y2, w(.005), r3c[0],r3c[1],r3c[2],150)
  }
  let l1c = p.acc
  let l2c = p.light
  let x_split = rnd(125,475)
  let num_lines_bar = 800
  for (let i = 0; i < num_lines_bar; i++){
    let x = map(i, 0, num_lines_bar, x_0, w(0.85))
    let y1 = y_0
    let y2 = y_0 + rect_size_1/6
      if(i < x_split){
      tS(x, y1, x, y2, w(0.008), l1c[0],l1c[1],l1c[2],165)
    }else{
      tS(x, y1, x, y2, w(.008), l2c[0],l2c[1],l2c[2],165)
    }
  }
  pop()
}
function squaresSail() {
  push()
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  let x_left_out = rnd(w(0.1),w(0.2))
  let x_right_out = w(1) - x_left_out
  let y_top_out = rnd(h(0.06),h(0.18))
  let y_bottom_out = h(1) - 1.5*y_top_out
  let x_left_in = x_left_out + rnd(w(0.05),w(0.1))
  let x_right_in = x_right_out - rnd(w(0.05),w(0.1))
  let y_top_in = y_top_out + rnd(w(0.05),w(0.1))
  let y_bottom_in = y_bottom_out - rnd(w(0.05),w(0.1))
  let c1 = p.sec
  let c2 = p.pri
  let c3 = p.light
  let c4 = p.acc
  let c5 = p.dark
  let num_lines_1 = 650
  for (let i = 0; i < num_lines_1; i++){
    let x = map(i, 0, num_lines_1, x_left_out, x_right_out)
    let y1 = y_top_out
    let y2 = y_bottom_out
    tS(x, y1, x, y2, w(.005), c1[0],c1[1],c1[2], 125)
  }
  let num_lines_2 = 600
  for (let i = 0; i < num_lines_2; i++){
    let x = map(i, 0, num_lines_2, x_left_in, x_right_in)
    let y1 = y_top_in
    let y2 = y_bottom_in
    tS(x, y1, x, y2, w(.005), c2[0],c2[1],c2[2], 125)
  }
  let sail_x_left = x_left_out
  let sail_x_2 = 1.35*x_left_in 
  let sail_x_3 = sail_x_2 + w(0.035)
  let sail_x_4 = w(0.5)
  let sail_x_end = w(0.52)
  let sail_y_top = h(0)
  let sail_y_2 = y_top_out/2
  let sail_y_3 = h(0.5)
  let sail_y_4 = sail_y_3 + h(0.1)
  let sail_y_5 = sail_y_4
  let sail_y_end = y_bottom_out
  let num_lines_sail = 450
  for (let i = 0; i < num_lines_sail; i++){
    let x = map(i, 0, num_lines_sail, sail_x_left, sail_x_end)
    if(x < sail_x_4){
      y1 = map(x,sail_x_left,sail_x_4,sail_y_3,sail_y_2)
    }else{
      y1 = sail_y_top
    }
    if(x <= sail_x_2){
      y2 = map(x,sail_x_left,sail_x_2,sail_y_4,sail_y_end)
    }else if(x > sail_x_2 && x <= sail_x_3){
      y2 = sail_y_end
    }else if(x > sail_x_3 && x < sail_x_4){
      y2 = map(x,sail_x_3,sail_x_4,sail_y_end,sail_y_5)
    }else{
      y2 = sail_y_end
    }
    tS(x, y1, x, y2, w(.005), c3[0],c3[1],c3[2],135)
  }
  let num_lines_4 = 800
  for (let i = 0; i < num_lines_4; i++){
    let y = map(i, 0, num_lines_4, y_top_out, 1.1*y_bottom_out)
    let x1 = 0.9*x_left_out
    if(y <= y_bottom_out){
      x2 = x_left_out
    }else{
      x2 = sail_x_4
    }
    tS(x1, y, x2, y, w(.003), c4[0],c4[1],c4[2],125)
  }
  let num_lines_5 = 400
  for (let i = 0; i < num_lines_5; i++){
    let x = map(i, 0, num_lines_5, sail_x_4, x_right_out)
    let y1 = y_bottom_out
    let y2 = 1.1*y_bottom_out
    tS(x, y1, x, y2, w(.005), c5[0],c5[1],c5[2],125)
  }
  pop()
}
function trident() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  push()
  let scaleDegree = rnd(0.8,1.04)
  let trident_color = p.light
  noStroke()
  fill(trident_color[0],trident_color[1],trident_color[2],215)
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = map(scaleDegree,0.5,1.1,0.05*sV,0.3*sV);
  ctx.shadowColor = 'black';
  scale(scaleDegree)
  trident_shape(0,0)
  pop()
  let shape_color = p.acc
  let shape_x1 = rnd(w(0.06),w(0.23))
  let shape_x2 = shape_x1 + w(scaleDegree)/5
  let y_max = map(scaleDegree, 0.5, 1.1, h(0.35), h(0.9))
  let nlines = 150
  for (let i = 0; i < nlines; i++){
    let x = map(i, 0, nlines, shape_x1, shape_x2)
    let y1 = h(0)
    let y2 = map(x, shape_x1, shape_x2, y_max, y_max - 0.03*y_max)
    tS(x, y1, x - map(y_max,h(0.3),h(0.7),0.06*x,0.032*x), y2, w(0.008), shape_color[0],shape_color[1],shape_color[2], 125)
  }
  crescent(115, map(scaleDegree, 0.5, 1.1, w(0.35), w(0.5)), map(scaleDegree, 0.5, 1.1, h(0.35), h(0.5)), map(scaleDegree, 0.5, 1.1, h(0.28), h(0.5)), p.aux)
}
function rays() {
  bg_rect(p.base)
  translate(-width/2,-height/2)
  chooseTexture()
  push()
  const values = Object.values(p)
  let num_sections = rnd(25,150)
  for (let i = 0; i < num_sections; i++){
    let x0 = map(i, 0, num_sections, 0, w(.99))
    let prop = values[floor(rnd() * values.length)]
    let section_width = rnd(w(0.3),w(1.8))/num_sections
    let num_lines = 150
    for (let j = 0; j < num_lines; j++){
      let x = map(j, 0, num_lines, x0, x0+section_width)
      let y1 = 0
      let y2 = h(1)
      tS(x, y1, x, y2, map(j,0,num_lines,w(.005),w(.05)), prop[0], prop[1], prop[2], map(j,0,num_lines,0,15))
    }
  }
  pop()
}
// OVERLAY FUNCTIONS
function pnrm() {
  push()
  const y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  const y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  //const y_limits_random = [y_limits_1, y_limits_2]
  //const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];
  const x_l = w(0)
  const x_m = rnd(w(0.28),w(0.48))
  const x_l_m = (x_m - x_l)/2 - w(.1)
  const x_r = w(1)
  //const x_r_m = (x_r - (x_r - x_m))/2 // for future use to align
  const y_l = rnd(h(0.1),h(0.3))
  const y_r = rnd(h(0.63),h(0.85))
  const wWid = (x_m - x_l_m)/3.3
  window_overlay(x_l_m, x_l_m + wWid, x_m, x_m - wWid, y_l, y_l+wWid, h(1), p.base, sV, -0.3*sV, 0)
  rcTrCut(x_m, x_r, y_r, h(0), p.aux)
  gradient_plate(x_l, x_l_m, h(0), x_m, h(1), y_l)
  push()
  pop()
  gradient_flat(x_m, y_r, x_r-x_m, (h(1)-y_r)/2, h(0.00055))
  window_overlay(x_l_m, x_l_m + wWid, x_m, x_m - wWid, y_l, y_l+wWid, h(1), p.light, 1.6*sV, -1.2*sV, 0) //maybe delete?
  pop()
  let s_p = [[x_l_m/2, h(1) - h(0.04)],[x_l_m/2, y_l/1.5],[x_m-x_l_m/2, y_l/1.5],[x_m +w(.02),y_r+h(.02)],[x_r -w(.02),y_r+h(.02)],[x_m+w(.02),h(.02)],[x_m+w(.02),y_r-h(.02)],[x_r-w(.02),h(.02)],[x_r-w(.02),y_r-h(.02)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function tulipCutOut() {
  push()
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = -0.3*sV;;
  ctx.shadowBlur = 2*sV;;
  ctx.shadowColor = 'black';
  let shift_x = rnd(w(0.1), w(0.23))
  let a = rnd(-w(.15), w(.023))
  meetingCircles(p.light, shift_x, a, 165)
  blendMode(SCREEN)
  meetingCircles(p.light, shift_x, a, 165)
  pop()
}
function blackTul() {
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = -0.2*sV;;
  ctx.shadowBlur = sV;;
  ctx.shadowColor = 'black';
  push()
  let shift_x = rnd(w(0.1), w(0.23))
  let a = rnd(-w(.15), w(.023))
  meetingCircles(blPal.t, shift_x, a, 75)
  blendMode(SCREEN)
  meetingCircles(blPal.t, shift_x, a, 215)
  pop()
}
function curves() {
  push()
  ctx.shadowOffsetX =  0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 1.5*sV;
  ctx.shadowColor = 'black';
  noStroke()
  let a = -w(.127)
  bShape(p.aux,a,125)
  blendMode(SCREEN)
  bShape(p.aux,a,160)
  pop()
  let s_p = [[w(0.665) + a - w(0.03),h(.985)],[w(0.665) + a - w(0.03),h(.015)],[w(0.274) + a + w(0.03),h(.985)],[w(0.274) + a + w(0.03),h(0.015)],[w(0.192) + a,h(.985)],[w(0.192) + a,h(.015)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function sails() {
  push()
  const wxl = w(0.003)
  const wxr = rnd(w(0.45),w(0.63))
  const wWid = (wxr - wxl)/7
  const wTop = h(.003)
  const barH = rnd(h(0.05),h(0.15))
  const sail_width = wxr + w(0.005)
  window_overlay(wxl, wxl + wWid, wxr, wxr - wWid, wTop, wTop+wWid, h(1) - barH, p.aux, w(0.015), -w(.005), -w(.002))
  noStroke()
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 2.5*sV;
  ctx.shadowColor = 'black';
  let sail_color = p.acc
  fill(sail_color[0],sail_color[1],sail_color[2],120)
  strW(w(.002))
  stroke(sail_color[0],sail_color[1],sail_color[2],60)
  sailshape(sail_width, h(1) - barH - h(.003))
  let bar_color = p.sec
  fill(bar_color[0],bar_color[1],bar_color[2],85)
  ctx.shadowBlur = 2*sV;
  bS()
  v(w(0.003),h(1)-barH)
  v(w(0.997),h(1)-barH)
  v(w(0.997),h(0.997))
  v(w(0.003),h(0.997))
  eS(CLOSE)
  colorMode(RGB, 255, 255, 255, 255);
  let color_c1 = gr_1
  //let color_c2 = gr_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 35)
  let b2 = color(255,255,255,165)
  let gradient_mid = rnd(w(0.2),w(0.8))
  strokeCap(SQUARE)
  ctx.shadowBlur = 0;
  let bar_nl = 1000
  for (let i = 0; i < bar_nl; i++){
    let x = map(i, 0, bar_nl, w(0.003), w(0.997))
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      c = lerpColor(b2, b1, inter2)
    }
    strW(width/(0.3*bar_nl))
    stroke(c) // MAIN STROKE
    line(x, h(1)-barH, x, h(0.997))
  }
  let s_p = [[w(.015),h(1)-barH/2],[w(.985),h(1)-barH/2],[w(.985),h(1)-barH-h(.0152)],[w(0.985),h(0.015)],[sail_width + w(.015),h(0.61)],[sail_width + w(.015),h(0.79)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function arrow() {
  push()
  sailshape(w(.5),h(.997))
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  triRect(p.con, 135)
  triCut(p.acc,180)
  ctx.shadowOffsetX = -0.6*sV;
  ctx.shadowOffsetY = 0.6*sV;
  ctx.shadowBlur = 3*sV;

  triCut(p.acc,95)
  let s_p = [[w(.015),h(.015)],[w(.985),h(.015)],[w(.985),h(.985)],[w(0.015),h(0.985)],[w(0.485),h(0.985)],[w(0.485),h(0.015)],[w(0.71),h(0.985)],[w(0.52),h(0.62)],[w(0.52),h(0.78)],[w(.135),h(.135)],[w(.365),h(.135)],[w(.135),h(.865)],[w(.365),h(.865)],[w(.105),h(.255)],[w(.395),h(.255)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function glyphs() {
  push()
  ctx.shadowBlur = sV;
  ctx.shadowColor = 'black';
  twoRectangles(p.acc,125,165)
  noStroke()
  fill(p.o[0],p.o[1],p.o[2],190)
  stroke(p.o[0],p.o[1],p.o[2],115)
  strW(w(.002))
  crescentCutOut()
  blendMode(SCREEN)
  fill(p.o[0],p.o[1],p.o[2],115)
  crescentCutOut()
  pop()
  
}
function bisect() {

  siloShapes(p.aux, p.o, p.con, 165)
  //noStroke()
  fill(p.t[0],p.t[1],p.t[2],200)
  corner(p.t)
}
function lens() {
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 1.5*sV;
  ctx.shadowColor = 'black';
  biglens(p.o, p.con) 
}
function celest() {
  push()
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 2*sV;
  ctx.shadowColor = 'black';
  const values = Object.values(p)
  let num_c = rnd(5,10)
  let prop = values[floor(rnd() * values.length)]
  noStroke()
  fill(prop[0], prop[1], prop[2], 165)
  ellipse(w(.5),h(.5),w(.15))
  angleMode(DEGREES)
  let unif_sW = (rnd(w(.14),w(.35))/num_c)
  let ch = rnd(1)
  for (let i = 0; i < num_c; i++){
    let prop = values[floor(rnd() * values.length)]
    let s = map(i, 0, num_c, w(.25), w(.975))
    let a1 = map(i, 0 , num_c, 30, 330)
    let adiff = map(i, 0 , num_c, 60, 270)
    let a_rand = rnd(-30,30)
    dynam_sW = (rnd(w(.14),w(.38))/num_c)
    if(ch > .5){
      sW = dynam_sW
    }else{
      sW = unif_sW
    }
    strW(sW)
    noFill()
    stroke(prop[0], prop[1], prop[2], map(i, 0, num_c, 215, 145))
    strokeCap(ROUND)
    arc(w(.5),h(.5),s,s,a1+a_rand,a1+adiff+a_rand)
    push()
    translate(w(.5),h(.5))
    screw(.5*s*cos(a1+a_rand),.5*s*sin(a1+a_rand))
    screw(.5*s*cos(a1+adiff+a_rand),.5*s*sin(a1+adiff+a_rand))
    pop()
  }
  screw(w(.5),h(.5))
  pop()
}
function mN_over() {

  translate(width/2,height/2)
  angleMode(RADIANS)
  let rt_ang = [0, HALF_PI, PI, PI + HALF_PI]
  let rotation_angle = rt_ang[floor(rnd() * rt_ang.length)];;
  rotate(rotation_angle)

  push()
  let a = w(.5)
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 1.5*sV;
  ctx.shadowColor = 'black';
  let s = w(.5)
  let sm_C_y = rnd(h(.18),h(.63))-a
  let sm_C_x = map(sm_C_y, -a, a, w(.625),w(.725))-a
  angleMode(DEGREES)
  strW(w(.002))
  fill(p.aux[0], p.aux[1], p.aux[2], 165)
  stroke(p.aux[0], p.aux[1], p.aux[2], 100)
  arc(w(.7)-a,h(.7)-a,s,s,264,84)
  fill(p.light[0], p.light[1], p.light[2], 165)
  stroke(p.light[0], p.light[1], p.light[2], 100)
  bS()
  arc(sm_C_x,sm_C_y,s/1.5,s/1.5,84,264)
  eS()
  fill(p.o[0], p.o[1], p.o[2], 165)
  stroke(p.o[0], p.o[1], p.o[2], 100)
  bS()
  v(w(.003)-a,h(.6)-a)
  v(w(.003)-a,h(0.65)-a)
  v(w(.997)-a,h(.75)-a)
  v(w(.997)-a,h(.7)-a)
  eS()
  fill(p.t[0], p.t[1], p.t[2], 190)
  stroke(p.t[0], p.t[1], p.t[2], 100)
  bS()
  v(w(.6)-a,h(.003)-a)
  v(w(.65)-a,h(.003)-a)
  v(w(.75)-a,h(.997)-a)
  v(w(.7)-a,h(.997)-a)
  eS()
  fill(p.pri[0], p.pri[1], p.pri[2], 190)
  stroke(p.pri[0], p.pri[1], p.pri[2], 100)
  bS()
  v(w(.525)-a,h(.1)-a)
  v(w(.575)-a,h(.15)-a)
  v(w(.65)-a,h(.85)-a)
  v(w(.6)-a,h(.8)-a)
  eS()
  if(sm_C_y <= h(.63)-a){
    screw(sm_C_x - s/5.87, sm_C_y)
  }
  pop()
  let s_p = [[w(.02),h(.625)],[w(.98),h(.725)],[w(.693),h(.693)],[w(.61),h(.685)],[w(0.625),h(0.02)],[w(.725),h(.98)]]
  s_p.forEach(i => screw(i[0]-a,i[1]-a))
  //screw(sm_C_x - s/5.75, sm_C_y)
}
// COMBO FUNCTIONS
const screwCols = {
  silver: [233, 233, 233],
  gold: [247, 197, 47],
  black: [55, 55, 55]
}

function choosePalette() {
  const palPercent = map(decPairs[0],0,255,0,1);
    if (palPercent < .09) {
      chosenPal = palettes.rays
    }else if (palPercent < .1){
      chosenPal = palettes.nautical
    }else if (palPercent < .2){
      chosenPal = palettes.vibrance
    }else if (palPercent < .29){
      chosenPal = palettes.range
    }else if (palPercent < .38){
      chosenPal = palettes.darken
    }else if (palPercent < .46){
      chosenPal = palettes.lin_burn
    }else if (palPercent < .54){
      chosenPal = palettes.highlight
    }else if (palPercent < .61){
      chosenPal = palettes.hard_mix
    }else if (palPercent < .67){
      chosenPal = palettes.radiance
    }else if (palPercent < .73){
      chosenPal = palettes.screen
    }else if (palPercent < .78){
      chosenPal = palettes.threshold
    }else if (palPercent < .83){
      chosenPal = palettes.soft_light
    }else if (palPercent < .88){
      chosenPal = palettes.chroma
    }else if (palPercent < .93){
      chosenPal = palettes.col_burn
    }else if (palPercent < .97){
      chosenPal = palettes.pinlight
    }else{
      chosenPal = palettes.render
    }
    return chosenPal
}

function chooseScrew() {
  const screwPercent = map(decPairs[9],0,255,0,1);
  let scrC = screwCols.silver;
  if (screwPercent < .1) {
    scrC = screwCols.gold;
  }
  if (screwPercent > .1 && screwPercent < .3) {
    scrC = screwCols.black;
  }
  return scrC;
}

function chooseLower(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

function chooseLower_Combine() {
  const cL_Combine_percent = map(decPairs[4],0,255,0,1);
    if (cL_Combine_percent < .18) {
      lo = basicNewman
    }else if (cL_Combine_percent < .33){
      lo = basicMoholy
    }else if (cL_Combine_percent < .48){
      lo = kellyLayout
    }else if (cL_Combine_percent < .61){
      lo = squaresSail
    }else if (cL_Combine_percent < .73){
      lo = rays
    }else if (cL_Combine_percent < .84){
      lo = triangle_with_lines
    }else if (cL_Combine_percent < .94){
      lo = threeSquares
    }else{
      lo = rug_layout
    }
    return lo
}

function chooseUpper(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

function chooseUpper_Combine() {
  const cU_Combine_percent = map(decPairs[11],0,255,0,1);
    if (cU_Combine_percent < .20) {
      up = lens
    }else if (cU_Combine_percent < .35){
      up = sails
    }else if (cU_Combine_percent < .47){
      up = celest
    }else if (cU_Combine_percent < .56){
      up = bisect
    }else if (cU_Combine_percent < .67){
      up = mN_over
    }else if (cU_Combine_percent < .76){
      up = curves
    }else if (cU_Combine_percent < .85){
      up = pnrm
    }else if (cU_Combine_percent < .94){
      up = arrow
    }else{
      up = glyphs
    }
    return up
}

function chooseUpper_Trident() {
  const cU_Trident_percent = map(decPairs[13],0,255,0,1);
    if (cU_Trident_percent < .23) {
      up = lens
    }else if (cU_Trident_percent < .42){
      up = sails
    }else if (cU_Trident_percent < .54){
      up = celest
    }else if (cU_Trident_percent < .62){
      up = mN_over
    }else if (cU_Trident_percent < .76){
      up = glyphs
    }else if (cU_Trident_percent < .87){
      up = curves
    }else if (cU_Trident_percent < .95){
      up = arrow
    }else{
      up = bisect
    }
    return up
}

function choosePerimeter(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

function choosePerimCombine() {
  const perim_percent = map(decPairs[12],0,255,0,1);
    if (perim_percent < .3) {
      perim = perimeter_general
    }else if (perim_percent < .55){
      perim = per1
    }else if (perim_percent < .75){
      perim = per2
    }else if (perim_percent < .90){
      perim = per3
    }else {
      perim = per4
    }
    return perim
}
/*
function chooseTexture() {
  const textures = [dots_texture, checkerboard, halftone_dots, paper]
  textures[floor(map(decPairs[1],0,255,0,textures.length - 0.001))]()
}*/

function chooseTexture() {
  const texture_percent = map(decPairs[1],0,255,0,1);
    if (texture_percent < .3) {
      tex = halftone_dots
    }else if (texture_percent < .58){
      tex = checkerboard
    }else if (texture_percent < .83){
      tex = dots_texture
    }else{
      tex = paper
    }
    return tex()
}

const styles = {
  tulip: {
    id: "tulip",
    upper: [tulipCutOut],
    lower: [rug_layout,persp,triangle_with_lines,kellyLayout,basicNewman,threeSquares,basicMoholy,squaresSail,trident,rays],
    perimeter: [perimeter_general, per1, per4]
  },
  combine: {
    id: "combine",
    upper: [pnrm, sails, curves, glyphs, bisect, arrow, lens, celest],
    lower: [chooseLower_Combine],
    perimeter: [per1, per2, per3, per4]
  },
  blackTul: {
    id: "blackTul",
    upper: [tulipCutOut],
    lower: [rug_layout, persp, triangle_with_lines, rays],
    perimeter: [per1, per4]
  },
  lowerTrident: {
    id: "lowerTrident",
    upper: [chooseUpper_Trident],
    lower: [trident],
    perimeter: [per1, per4]
  }
}

function chooseResult() {
    const resultPercent = map(decPairs[7],0,255,0,1);
    console.log(resultPercent)
    let style = styles.combine;
    let lower = chooseLower_Combine();
    let upper = chooseUpper_Combine()
    let perimeter = choosePerimCombine()
    p = choosePalette()
    if (resultPercent < .01) {
      style = styles.blackTul;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
      perimeter = choosePerimeter(style.perimeter, 3);
      p = blPal
    }
    if (resultPercent > .01 && resultPercent < .04) {
      style = styles.tulip;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
      perimeter = choosePerimeter(style.perimeter, 3);
    }
    if (resultPercent > .04 && resultPercent < .09) {
      style = styles.lowerTrident;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper_Trident()
      perimeter = choosePerimeter(style.perimeter, 3);
    }
    //const perimeter = choosePerimeter(style.perimeter, 3);
    //const upper = chooseUpper(style.upper, 6);
    scr = chooseScrew()

    if(styles.tulip.id === style.id || styles.blackTul.id === style.id) {
      push();
    }
    lower();
    perimeter();
    if(styles.tulip.id === style.id || styles.blackTul.id === style.id) {
      pop();
    }
    if(perimeter === per3){
      scale(0.699)
      translate(w(0.215),h(0.215))
    }else if(perimeter === per4){
      scale(0.82)
      translate(w(0.11),h(0.11))
    }else{
      scale(0.95)
      translate(w(0.026),h(0.026))
    }
    upper();
}