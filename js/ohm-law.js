const Vslider = document.getElementById('voltage');
const Rslider = document.getElementById('resistance');
const vDisp = document.getElementById('vDisplay');
const rDisp = document.getElementById('rDisplay');
const curOut = document.getElementById('current');
const vOut   = document.getElementById('vOut');
const rOut   = document.getElementById('rOut');
const ans    = document.getElementById('answer');

const aNeedle = document.getElementById('ammeterNeedle');
const vNeedle = document.getElementById('voltmeterNeedle');
const glow    = document.getElementById('glow');

function update() {
  const V = +Vslider.value;
  const R = +Rslider.value;
  const I = V / R;               // I in amperes

  // ---- display numbers ----
  vDisp.textContent = V.toFixed(1);
  rDisp.textContent = R;
  curOut.textContent = I.toFixed(2);
  vOut.textContent   = V.toFixed(1);
  rOut.textContent   = R;
  ans.textContent    = I.toFixed(2) + ' A';

  // ---- meter needles ----
  // full-scale: 12 V, 1.2 A
  const vAngle = (V / 12) * 80 - 40;   // -40° … +40°
  const aAngle = (I / 1.2) * 80 - 40;
  vNeedle.setAttribute('transform', `rotate(${vAngle} 230 90)`);
  aNeedle.setAttribute('transform', `rotate(${aAngle} 170 140)`);

  // ---- bulb brightness ----
  const norm  = Math.min(I / 0.8, 1);        // 0.8 A = full bright
  glow.setAttribute('opacity', norm * 0.7);
}

Vslider.addEventListener('input', update);
Rslider.addEventListener('input', update);
update();   // initial draw
