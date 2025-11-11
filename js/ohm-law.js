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

const canvas = document.getElementById('ivGraph');
const ctx    = canvas.getContext('2d');
const maxV   = 12;          // match slider limit
const maxI   = 1.2;         // full-scale current
const data   = [];          // [{V, I}, …] live trace

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // grid
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 10; i++) {
    const x = (i / 10) * canvas.width;
    const y = (i / 10) * canvas.height;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // axes labels
  ctx.fillStyle = '#000';
  ctx.font = '12px sans-serif';
  ctx.fillText('V (V)', canvas.width - 20, canvas.height - 5);
  ctx.fillText('I (A)', 2, 10);

  // plot trace
  if (data.length < 2) return;
  ctx.strokeStyle = 'navy';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  data.forEach((pt, idx) => {
    const x = (pt.V / maxV) * canvas.width;
    const y = canvas.height - (pt.I / maxI) * canvas.height;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function update() {
  /* (keep all previous needle / bulb code) */
  const V = +Vslider.value;
  const R = +Rslider.value;
  const I = V / R;

  /* … existing display + needles + bulb … */

  // push new point (limit array so it doesn’t grow forever)
  data.push({V, I});
  if (data.length > 150) data.shift();
  drawGraph();
}

/* call update() once at start so graph appears immediately */
update();
