const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

// Toggle Button  
toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset(); 
})


// Display color from user HEX input
hexInput.addEventListener('keyup', () => {
  
  const hex = hexInput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex;  
  reset();
})


// Checking if the HEX Color is valid 
const isValidHex = (hex) => {
  if(!hex) return false;
  
  const strippedHex = hex.replace('#', '');
  return strippedHex.length === 3 || strippedHex.length === 6;
}


  // Convert Hex Color to RGB 
  const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#', '');
  
    if(strippedHex.length === 3){
      strippedHex = strippedHex[0] + strippedHex[0] 
      + strippedHex[1] + strippedHex[1] 
      + strippedHex[2] + strippedHex[2];
    }
    
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);
    
    return {r,g,b};
  }

  // Convert RGB Color to Hex 
  const convertRGBToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
  }
  

    // Alter Color by Percentage
    const alterColor = (hex, percentage) => {
      const {r, g, b} = convertHexToRGB(hex);
      
      const amount = Math.floor((percentage/100) * 255);
      
      const newR = increaseWithin0To255(r,amount);
      const newG = increaseWithin0To255(g,amount);
      const newB = increaseWithin0To255(b,amount)
      return convertRGBToHex(newR, newG, newB);
    }

    // Ensure Hex Values Between 0 and 255
    const increaseWithin0To255 = (hex, amount) => {


      //or 
      return Math.min(255, Math.max(0, hex + amount));

    }

    alterColor("fff", 10)

    // Display Percentage from Slider 
    slider.addEventListener('input', () => {
      if(!isValidHex(hexInput.value)) return;
      
      sliderText.textContent = `${slider.value}%`;
   
      const valueAddition  = 
        toggleBtn.classList.contains('toggled') ? 
        -slider.value 
        : slider.value;
      
      const alteredHex = alterColor(hexInput.value, valueAddition);
      alteredColor.style.backgroundColor = alteredHex;
      alteredColorText.innerText = `Altered Color ${alteredHex}`; 
    })

    // Input Reset 
    const reset = () =>{ 
      slider.value = 0;
      sliderText.innerText=`0%`;
      alteredColor.style.backgroundColor = hexInput.value
      alteredColorText.innerText = `Altered Color ${hexInput.value}`; 

    }
    


