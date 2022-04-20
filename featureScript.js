//tokenData.hash = "0xb05208b700962c155d7870a075b3170ff68b56af0495bb2c1f0ba49f68fbf796"
function calculateFeatures(tokenData) {
  const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
  }
  const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });

  const map = function(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
  };

  function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
  };

  const palettes = {
    radiance: "Radiance",
    screen: "Screen",
    threshold: "Threshold",
    darken: "Darken",
    chroma: "Chroma",
    hard_mix: "Hard Mix",
    lin_burn: "Linear Burn",
    nautical: "Nautical",
    pinlight: "Pinlight",
    soft_light: "Soft Light",
    range: "Range",
    vibrance: "Vibrance",
    accents_A: "Highlight",
    accents_B: "Color Burn",
    rays: "Rays",
    render: "Render"
}

  const randomPalette = function (palettes) {
    let keys = Object.keys(palettes);
    const paletteName = keys[Math.floor(map(decPairs[0],0,255,0,keys.length-0.001))];
    return palettes[paletteName];
  };
  palette = randomPalette(palettes);

  // COMBO FUNCTIONS

  function choosePalette() {
    const palPercent = map(decPairs[0],0,255,0,1);
      if (palPercent < .09) {
        chosenPal = "Rays"
      }else if (palPercent < .1){
        chosenPal = "Nautical"
      }else if (palPercent < .2){
        chosenPal = "Vibrance"
      }else if (palPercent < .29){
        chosenPal = "Range"
      }else if (palPercent < .38){
        chosenPal = "Darken"
      }else if (palPercent < .46){
        chosenPal = "Linear Burn"
      }else if (palPercent < .54){
        chosenPal = "Highlight"
      }else if (palPercent < .61){
        chosenPal = "Hard Mix"
      }else if (palPercent < .67){
        chosenPal = "Radiance"
      }else if (palPercent < .73){
        chosenPal = "Screen"
      }else if (palPercent < .78){
        chosenPal = "Threshold"
      }else if (palPercent < .83){
        chosenPal = "Soft Light"
      }else if (palPercent < .88){
        chosenPal = "Chroma"
      }else if (palPercent < .93){
        chosenPal = "Color Burn"
      }else if (palPercent < .97){
        chosenPal = "Pinlight"
      }else{
        chosenPal = "Render"
      }
      return chosenPal
  }
  const screwCols = {
    silver: "Silver",
    gold: "Gold",
    black: "Black"
  }
  
  function chooseScrew() {
    const screwPercent = map(decPairs[9],0,255,0,1);
    let scrC = screwCols.silver;
    if (screwPercent < .1) {
      scrC = screwCols.gold;
    }
    if (screwPercent > .15 && screwPercent < .4) {
      scrC = screwCols.black;
    }
    return scrC;
  }

  function chooseLower(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  function chooseLower_Combine() {
    const cL_Combine_percent = map(decPairs[4],0,255,0,1);
      if (cL_Combine_percent < .18) {
        lo = "Color Field"
      }else if (cL_Combine_percent < .33){
        lo = "Bauhaus"
      }else if (cL_Combine_percent < .48){
        lo = "Contour"
      }else if (cL_Combine_percent < .61){
        lo = "Channels"
      }else if (cL_Combine_percent < .73){
        lo = "Rays"
      }else if (cL_Combine_percent < .84){
        lo = "Newman's Triangle"
      }else if (cL_Combine_percent < .94){
        lo = "Levels"
      }else{
        lo = "Skew"
      }
      return lo
  }

  function chooseUpper(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  function chooseUpper_Combine() {
    const cU_Combine_percent = map(decPairs[11],0,255,0,1);
      if (cU_Combine_percent < .20) {
        up = "Lens Flare"
      }else if (cU_Combine_percent < .35){
        up = "Sails"
      }else if (cU_Combine_percent < .47){
        up = "Celestials"
      }else if (cU_Combine_percent < .56){
        up = "Bisect"
      }else if (cU_Combine_percent < .67){
        up = "Axis"
      }else if (cU_Combine_percent < .76){
        up = "Curves"
      }else if (cU_Combine_percent < .85){
        up = "Panorama"
      }else if (cU_Combine_percent < .94){
        up = "Arrowhead"
      }else{
        up = "Glyphs"
      }
      return up
  }

  function chooseUpper_Trident() {
    const cU_Trident_percent = map(decPairs[13],0,255,0,1);
      if (cU_Trident_percent < .23) {
        up = "Lens Flare"
      }else if (cU_Trident_percent < .42){
        up = "Sails"
      }else if (cU_Trident_percent < .54){
        up = "Celestials"
      }else if (cU_Trident_percent < .62){
        up = "Axis"
      }else if (cU_Trident_percent < .76){
        up = "Glyphs"
      }else if (cU_Trident_percent < .87){
        up = "Curves"
      }else if (cU_Trident_percent < .95){
        up = "Arrowhead"
      }else{
        up = "Bisect"
      }
      return up
  }

  function choosePerimeter(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

function choosePerimCombine() {
  const perim_percent = map(decPairs[12],0,255,0,1);
    if (perim_percent < .3) {
      perim = "Frame"
    }else if (perim_percent < .55){
      perim = "Molding"
    }else if (perim_percent < .75){
      perim = "Inset"
    }else if (perim_percent < .90){
      perim = "Offset"
    }else {
      perim = "Albers"
    }
    return perim
}

  function chooseTexture() {
    const texture_percent = map(decPairs[1],0,255,0,1);
      if (texture_percent < .3) {
        tex = "Halftone Dots"
      }else if (texture_percent < .58){
        tex = "Onion Skin"
      }else if (texture_percent < .83){
        tex = "Dots"
      }else{
        tex = "Parchment"
      }
      return tex
  }

  const styles = {
    tulip: {
      upper: ["Tulip"],
      lower: ["Skew", "Perspective", "Newman's Triangle", "Contour", "Color Field", "Levels", "Bauhaus", "Channels", "Trident", "Rays"],
      perimeter: ["Frame", "Molding", "Albers"]
    },
    combine: {
      upper: ["fourPieceOverlay", "windowAndSail", "kelly_Bshape2", "crescentAndRectangles", "curveSilo", "sails", "swoop", "celest"],
      lower: ["Skew", "Newman's Triangle", "Contour", "Color Field", "Levels", "Bauhaus", "Channels", "Rays", "Trident"],
      perimeter: ["Frame", "Molding", "Inset", "Offset", "Albers"]
    },
    blackTul: {
      upper: ["Black Tulip"],
      lower: ["Skew", "Perspective", "Newman's Triangle", "Rays"],
      perimeter: ["Molding", "Albers"]
    },
    lowerTrident: {
      upper: [chooseUpper_Trident],
      lower: ["Trident"],
      perimeter: ["Molding", "Albers"]
    }
  }

  function chooseResult() {
    const resultPercent = map(decPairs[7],0,255,0,1);
    let style = styles.combine;
    let lower = chooseLower_Combine();
    let upper = chooseUpper_Combine()
    let perimeter = choosePerimCombine() 
    p = choosePalette()
    if (resultPercent < .01) {
      p = "Black Tulip Palette"
      style = styles.blackTul;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
      perimeter = choosePerimeter(style.perimeter, 3);
    }
    if (resultPercent > .01 && resultPercent < .04) {
      style = styles.tulip;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
      perimeter = choosePerimeter(style.perimeter, 3);
    }
    if (resultPercent > .04 && resultPercent < .09) {
      style = styles.lowerTrident;
      lower = "Trident"
      upper = chooseUpper_Trident()
      perimeter = choosePerimeter(style.perimeter, 3);
    }
    //const perimeter = choosePerimeter(style.perimeter, 3);
    //const upper = chooseUpper(style.upper, 6);
    scr = chooseScrew()

    return {lower, perimeter, upper, p, scr};
  }

  const {lower, perimeter, upper} = chooseResult();
/*
  function chooseTexture() {
    const textures = ["dots", "checkerboard", "halftone dots", "paper"]
    return textures[Math.floor(map(decPairs[1],0,255,0,textures.length - 0.001))]
  }*/

  function chooseTransparency() {
    const transparencies = ["low", "high"]
    return transparencies[Math.floor(map(decPairs[7],0,255,0,transparencies.length - 0.001))]
  }

  return {
    "Color Palette": p,
    "Texture": chooseTexture(),
    //"transparency": chooseTransparency(),
    "Underlay": lower,
    "Edge": perimeter,
    "Overlay": upper,
    "Screw Color": scr
   }
}

console.log(calculateFeatures(tokenData));