const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const flakes = [];
const FLAKE_COUNT = 130;

function rand(min, max){ return Math.random() * (max - min) + min; }

for(let i=0;i<FLAKE_COUNT;i++){
  flakes.push({
    x: rand(0,w),
    y: rand(0,h),
    r: rand(1.1, 3.9),
    vy: rand(0.7, 2.4),
    vx: rand(-0.55, 0.55),
    drift: rand(0.002, 0.012),
    phase: rand(0, Math.PI*2)
  });
}

function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.globalAlpha = 0.9;

  for(const f of flakes){
    f.phase += f.drift;
    f.x += f.vx + Math.sin(f.phase)*0.35;
    f.y += f.vy;

    if(f.y > h + 10){ f.y = -10; f.x = rand(0,w); }
    if(f.x > w + 10) f.x = -10;
    if(f.x < -10) f.x = w + 10;

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();
