const voltageSlider = document.getElementById('voltage');
const resistanceSlider = document.getElementById('resistance');
const vDisplay = document.getElementById('vDisplay');
const rDisplay = document.getElementById('rDisplay');
const currentOut = document.getElementById('current');
const vOut = document.getElementById('vOut');
const rOut = document.getElementById('rOut');
const answer = document.getElementById('answer');

function update() {
  const V = parseFloat(voltageSlider.value);
  const R = parseFloat(resistanceSlider.value);
  const I = V / R;

  vDisplay.textContent = V.toFixed(1);
  rDisplay.textContent = R;
  currentOut.textContent = I.toFixed(2);
  vOut.textContent = V.toFixed(1);
  rOut.textContent = R;
  answer.textContent = I.toFixed(2) + ' A';
}

voltageSlider.addEventListener('input', update);
resistanceSlider.addEventListener('input', update);

update(); // initial call
