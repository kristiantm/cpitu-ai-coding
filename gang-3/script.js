// Her bor hjernen i dit spil: reglerne, bevægelsen og pointene.
// Læs spec.md, og bed Vibe om at bygge det næste punkt på must-listen.

// ===== Canvas og verdensopsætning =====
const spilplade = document.getElementById("spilplade");
const ctx = spilplade.getContext("2d");

const BREDDE = spilplade.width;   // 480
const HOJDE = spilplade.height;   // 480

// Fysiske konstanter
const TYNGDE = 0.5;
const HOP_STYRKE = -10;
const FART = 4;
const GULV_HOJDE = 20;

// ===== Musik og lydeffekter (Web Audio API) =====
// Vi laver al lyd direkte i koden — ingen eksterne filer.
let audioCtx = null;
let musikPaa = false;
let musikTimer = null;
let melodiIndex = 0;

// Noder som frekvenser (Hz)
const N = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, PAUSE: 0
};

// Den klassiske Bubble Bobble-agtige melodi: [node, længde i sekunder]
const melodi = [
  [N.C5, 0.15], [N.E5, 0.15], [N.G5, 0.15], [N.E5, 0.15],
  [N.C5, 0.15], [N.D5, 0.15], [N.E5, 0.30],
  [N.G5, 0.15], [N.E5, 0.15], [N.C5, 0.15], [N.D5, 0.15],
  [N.E5, 0.60],
  [N.C5, 0.15], [N.E5, 0.15], [N.G5, 0.15], [N.C6, 0.15],
  [N.B5, 0.15], [N.G5, 0.15], [N.E5, 0.30],
  [N.G5, 0.15], [N.F5, 0.15], [N.E5, 0.15], [N.D5, 0.15],
  [N.C5, 0.60]
];

// Bas: enklere toner under melodien
const bas = [
  [N.C4, 0.30], [N.C4, 0.30], [N.G4, 0.30], [N.G4, 0.30],
  [N.A4, 0.30], [N.A4, 0.30], [N.F4, 0.30], [N.G4, 0.30],
  [N.C4, 0.30], [N.C4, 0.30], [N.G4, 0.30], [N.G4, 0.30],
  [N.C4, 0.30], [N.G4, 0.30], [N.C4, 0.30], [N.C4, 0.30]
];

// Opret AudioContext (skal ske efter bruger har klikket — gør vi ved spilstart)
function opretAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Spil én tone med en bestemt bølgeform og lydstyrke
function spilTone(freq, varighed, type, startTid, lydstyrke) {
  if (freq === 0) return;  // pause — spil ingenting
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  // Fade ud så tonen ikke knalder af
  gain.gain.setValueAtTime(lydstyrke, startTid);
  gain.gain.exponentialRampToValueAtTime(0.001, startTid + varighed);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTid);
  osc.stop(startTid + varighed);
}

function startMusik() {
  opretAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  musikPaa = true;
  melodiIndex = 0;
  spilNaesteNote();
}

function spilNaesteNote() {
  if (!musikPaa) return;
  const [node, varighed] = melodi[melodiIndex];
  const [basNode] = bas[melodiIndex % bas.length];
  const startTid = audioCtx.currentTime;
  // Melodi: square wave = klassisk 8-bit/arcade-lyd
  spilTone(node, varighed * 0.9, "square", startTid, 0.12);
  // Bas: triangle wave = blødere bund
  spilTone(basNode, varighed * 0.9, "triangle", startTid, 0.08);
  melodiIndex = (melodiIndex + 1) % melodi.length;
  // Spil næste note når denne er færdig
  musikTimer = setTimeout(spilNaesteNote, varighed * 1000);
}

function stopMusik() {
  musikPaa = false;
  if (musikTimer) clearTimeout(musikTimer);
}

// ===== Lydeffekter =====

// Pop-lyd: boblen springer (hurtigt stigende tone)
function lydPop() {
  opretAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
  gain.gain.setValueAtTime(0.2, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

// Skyd-lyd: boble skydes afsted (faldende tone)
function lydSkyd() {
  opretAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);
  gain.gain.setValueAtTime(0.08, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

// Hit-lyd: slangen bliver ramt (faldende "ouch"-tone)
function lydHit() {
  opretAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.3);
  gain.gain.setValueAtTime(0.2, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.3);
}

// ===== Game state =====
// Tilstande: "start", "spil", "gameover", "vandt"
let tilstand = "start";

let point = 0;
let liv = 3;
// Uovervindelig kort tid efter at være blevet ramt
let uaarbarligTimer = 0;

// ===== Slangen (spilleren) =====
const slange = {
  x: BREDDE / 2,
  y: HOJDE - GULV_HOJDE - 32,
  bredde: 32,
  hoejde: 32,
  vx: 0,
  vy: 0,
  paaJorden: true,
  retning: 1   // 1 = mod højre, -1 = mod venstre
};

// ===== Platforme (man kan lande på toppen) =====
// Hver platform er en kasse: {x, y, bredde, hoejde}
const platforme = [
  // Nederste række: kan nås fra gulvet (ca. 100 px hop)
  { x: 40,  y: 340, bredde: 80, hoejde: 14 },
  { x: 200, y: 340, bredde: 80, hoejde: 14 },
  { x: 360, y: 340, bredde: 80, hoejde: 14 },
  // Mellemste række: kan nås fra nederste række
  { x: 40,  y: 240, bredde: 80, hoejde: 14 },
  { x: 200, y: 240, bredde: 80, hoejde: 14 },
  { x: 320, y: 240, bredde: 120, hoejde: 14 },
  // Øverste række: kan nås fra mellemste række
  { x: 120, y: 160, bredde: 100, hoejde: 14 },
  { x: 280, y: 160, bredde: 100, hoejde: 14 }
];

// ===== Zots (fjender) =====
// Hver Zot vandrer venstre/højre og vender ved vægge og platform-kanter.
let zots = [];
function lavZot(x, y, fart) {
  return {
    x: x,
    y: y,
    bredde: 28,
    hoejde: 28,
    vx: fart,
    vy: 0,
    paaJorden: false
  };
}

// ===== Bobler slangen skyder =====
let bobler = [];
let bobleNedkoeling = 0;  // tæller ned før næste skud

// ===== Fangne fjender (bobler der svæver op) =====
let fangede = [];

// ===== Startvariabler: antal Zots i level 1 =====
const ANTAL_ZOTS = 3;

function startSpil() {
  tilstand = "spil";
  point = 0;
  liv = 3;
  uaarbarligTimer = 0;
  slange.x = BREDDE / 2;
  slange.y = HOJDE - GULV_HOJDE - 32;
  slange.vx = 0;
  slange.vy = 0;
  slange.paaJorden = true;
  bobler = [];
  fangede = [];
  // Placer 3 Zots: to på gulvet, en på en platform
  zots = [
    lavZot(80, HOJDE - GULV_HOJDE - 28, 1.5),
    lavZot(360, HOJDE - GULV_HOJDE - 28, -1.5),
    lavZot(220, 240 - 28, 1.2)
  ];
  // Start baggrundsmusikken
  startMusik();
}

// ===== Styring =====
const taster = { venstre: false, hoejre: false, hop: false, skyd: false };

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") taster.venstre = true;
  if (e.key === "ArrowRight") taster.hoejre = true;
  if (e.key === "ArrowUp") taster.hop = true;
  if (e.key === " " || e.code === "Space") {
    taster.skyd = true;
    e.preventDefault();
  }
  // Start / genstart med mellemrum eller Enter
  if ((tilstand === "start" || tilstand === "gameover" || tilstand === "vandt")
      && (e.key === " " || e.key === "Enter")) {
    startSpil();
  }
  if (e.key.startsWith("Arrow")) e.preventDefault();
});

document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") taster.venstre = false;
  if (e.key === "ArrowRight") taster.hoejre = false;
  if (e.key === "ArrowUp") taster.hop = false;
  if (e.key === " " || e.code === "Space") taster.skyd = false;
});

// ===== Hjælpefunktion: AABB-collision (to kasser der overlapper) =====
function kasserStoeder(a, b) {
  return a.x < b.x + b.bredde &&
         a.x + a.bredde > b.x &&
         a.y < b.y + b.hoejde &&
         a.y + a.hoejde > b.y;
}

// ===== Opdater slangen =====
function opdaterSlange() {
  if (taster.venstre) { slange.vx = -FART; slange.retning = -1; }
  else if (taster.hoejre) { slange.vx = FART; slange.retning = 1; }
  else { slange.vx = 0; }

  if (taster.hop && slange.paaJorden) {
    slange.vy = HOP_STYRKE;
    slange.paaJorden = false;
  }

  slange.vy += TYNGDE;
  slange.x += slange.vx;
  slange.y += slange.vy;

  // Sidevægge
  if (slange.x < 0) slange.x = 0;
  if (slange.x + slange.bredde > BREDDE) slange.x = BREDDE - slange.bredde;

  // Gulv
  const gulvTop = HOJDE - GULV_HOJDE;
  slange.paaJorden = false;
  if (slange.y + slange.hoejde > gulvTop) {
    slange.y = gulvTop - slange.hoejde;
    slange.vy = 0;
    slange.paaJorden = true;
  }

  // Land på platforme (kun fra oven — one-way)
  for (const p of platforme) {
    if (slange.vy >= 0 &&
        slange.x + slange.bredde > p.x &&
        slange.x < p.x + p.bredde &&
        slange.y + slange.hoejde > p.y &&
        slange.y + slange.hoejde < p.y + p.hoejde + 12) {
      slange.y = p.y - slange.hoejde;
      slange.vy = 0;
      slange.paaJorden = true;
    }
  }

  // Skyd boble (med nedkøling så man ikke spamer)
  if (taster.skyd && bobleNedkoeling <= 0) {
    skydBoble();
    bobleNedkoeling = 18;
  }
  if (bobleNedkoeling > 0) bobleNedkoeling--;

  if (uaarbarligTimer > 0) uaarbarligTimer--;
}

// ===== Skyd en boble =====
function skydBoble() {
  lydSkyd();  // skyd-lyd
  bobler.push({
    x: slange.x + slange.bredde / 2 - 10,
    y: slange.y + 6,
    bredde: 20,
    hoejde: 20,
    vx: slange.retning * 5,
    liv: 70  // boblen lever i ca. 1 sekund
  });
}

// ===== Opdater bobler (skudt) =====
function opdaterBobler() {
  for (let i = bobler.length - 1; i >= 0; i--) {
    const b = bobler[i];
    b.x += b.vx;
    b.liv--;
    // Rammr væg → forsvind
    if (b.x < 0 || b.x + b.bredde > BREDDE || b.liv <= 0) {
      bobler.splice(i, 1);
      continue;
    }
    // Tjek collision med Zots → fang dem
    for (let j = zots.length - 1; j >= 0; j--) {
      const z = zots[j];
      if (kasserStoeder(b, z)) {
        // Fang fjenden: lav en fangen-boble der svæver op
        fangede.push({
          x: z.x,
          y: z.y,
          bredde: 28,
          hoejde: 28,
          vy: -1.2,
          timer: 240,  // ca. 4 sek før fjenden slipper fri
          farve: "#7be0ff"
        });
        zots.splice(j, 1);
        bobler.splice(i, 1);
        break;
      }
    }
  }
}

// ===== Opdater fangne fjender (bobler der svæver op) =====
function opdaterFangede() {
  for (let i = fangede.length - 1; i >= 0; i--) {
    const f = fangede[i];
    f.y += f.vy;
    f.timer--;

    // Spilleren rører den → pop og få point!
    if (kasserStoeder(f, slange)) {
      point += 100;
      lydPop();  // pop-lyd!
      fangede.splice(i, 1);
      continue;
    }

    // Tiden løber ud eller boblen når toppen → fjenden slipper fri
    if (f.timer <= 0 || f.y + f.hoejde < 0) {
      // Spawn en vredere Zot der falder ned
      zots.push(lavZot(f.x, 40, f.x < BREDDE / 2 ? 2.2 : -2.2));
      fangede.splice(i, 1);
    }
  }
}

// ===== Opdater Zots =====
function opdaterZots() {
  const gulvTop = HOJDE - GULV_HOJDE;
  for (const z of zots) {
    // Tyngdekraft
    z.vy += TYNGDE;
    z.x += z.vx;
    z.y += z.vy;
    z.paaJorden = false;

    // Vægge → vend om
    if (z.x < 0) { z.x = 0; z.vx = Math.abs(z.vx); }
    if (z.x + z.bredde > BREDDE) { z.x = BREDDE - z.bredde; z.vx = -Math.abs(z.vx); }

    // Gulv
    if (z.y + z.hoejde > gulvTop) {
      z.y = gulvTop - z.hoejde;
      z.vy = 0;
      z.paaJorden = true;
    }

    // Land på platforme
    for (const p of platforme) {
      if (z.vy >= 0 &&
          z.x + z.bredde > p.x &&
          z.x < p.x + p.bredde &&
          z.y + z.hoejde > p.y &&
          z.y + z.hoejde < p.y + p.hoejde + 12) {
        z.y = p.y - z.hoejde;
        z.vy = 0;
        z.paaJorden = true;
      }
    }

    // Vend om ved platform-kant (ingen grund foran) når man står på noget
    if (z.paaJorden) {
      const foranX = z.vx > 0 ? z.x + z.bredde + 2 : z.x - 2;
      const fodY = z.y + z.hoejde + 2;
      let grundForan = foranX < 0 || foranX > BREDDE; // væg tæller som grund
      if (foranX >= 0 && foranX <= BREDDE) {
        // Tjek om gulv er der
        if (fodY >= gulvTop) grundForan = true;
        for (const p of platforme) {
          if (foranX >= p.x && foranX <= p.x + p.bredde &&
              fodY >= p.y && fodY <= p.y + p.hoejde + 4) {
            grundForan = true;
          }
        }
      }
      if (!grundForan) z.vx = -z.vx;
    }

    // Zot rører slangen → mist et liv
    if (uaarbarligTimer <= 0 && kasserStoeder(z, slange)) {
      liv--;
      lydHit();  // ouch-lyd
      uaarbarligTimer = 90;  // ca. 1.5 sekund uovervindelig
      // Smid slangen lidt tilbage
      slange.vx = -slange.retning * 4;
      slange.vy = -6;
      if (liv <= 0) {
        tilstand = "gameover";
        stopMusik();
      }
    }
  }
}

// ===== Tegn-funktioner =====
function tegnVerden() {
  ctx.fillStyle = "#16244a";
  ctx.fillRect(0, 0, BREDDE, HOJDE);

  // Platforme
  ctx.fillStyle = "#2c4a7a";
  for (const p of platforme) {
    ctx.fillRect(p.x, p.y, p.bredde, p.hoejde);
    ctx.fillStyle = "#f5a200";
    ctx.fillRect(p.x, p.y, p.bredde, 3);
    ctx.fillStyle = "#2c4a7a";
  }

  // Gulv
  ctx.fillStyle = "#3a2a18";
  ctx.fillRect(0, HOJDE - GULV_HOJDE, BREDDE, GULV_HOJDE);
  ctx.fillStyle = "#f5a200";
  ctx.fillRect(0, HOJDE - GULV_HOJDE, BREDDE, 3);
}

function tegnSlange() {
  // Blink når uovervindelig (hvert andet billede)
  if (uaarbarligTimer > 0 && Math.floor(uaarbarligTimer / 6) % 2 === 0) return;
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🐍", slange.x + slange.bredde / 2, slange.y + slange.hoejde / 2);
}

function tegnZots() {
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const z of zots) {
    ctx.fillText("👾", z.x + z.bredde / 2, z.y + z.hoejde / 2);
  }
}

function tegnBobler() {
  ctx.fillStyle = "#7be0ff";
  for (const b of bobler) {
    ctx.beginPath();
    ctx.arc(b.x + b.bredde / 2, b.y + b.hoejde / 2, b.bredde / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tegnFangede() {
  ctx.font = "22px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const f of fangede) {
    // Boble rundt om fangen
    ctx.fillStyle = f.farve;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(f.x + f.bredde / 2, f.y + f.hoejde / 2, f.bredde / 2 + 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillText("👾", f.x + f.bredde / 2, f.y + f.hoejde / 2);
  }
}

function tegnHud() {
  // Point og liv øverst
  ctx.font = "18px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#fff";
  ctx.fillText("Point: " + point, 10, 8);
  ctx.textAlign = "right";
  ctx.fillText("Liv: " + "❤️".repeat(liv), BREDDE - 10, 8);
}

function tegnSkærm(overskrift, underTekst) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, BREDDE, HOJDE);
  ctx.fillStyle = "#f5a200";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(overskrift, BREDDE / 2, HOJDE / 2 - 30);
  ctx.fillStyle = "#fff";
  ctx.font = "18px sans-serif";
  ctx.fillText(underTekst, BREDDE / 2, HOJDE / 2 + 20);
}

// ===== Game loop =====
function gameLoop() {
  if (tilstand === "spil") {
    opdaterSlange();
    opdaterBobler();
    opdaterFangede();
    opdaterZots();

    // Vandt? Alle Zots fanget og sprunget (ingen zots, ingen fangede)
    if (zots.length === 0 && fangede.length === 0) {
      tilstand = "vandt";
      stopMusik();
    }
  }

  // Tegn altid verdenen så banen vises bagved
  tegnVerden();
  if (tilstand === "spil" || tilstand === "gameover" || tilstand === "vandt") {
    tegnBobler();
    tegnFangede();
    tegnZots();
    tegnSlange();
    tegnHud();
  }

  if (tilstand === "start") {
    tegnSkærm("🐍 Bubble Bobble", "Tryk Mellemrum eller Enter for at starte");
  } else if (tilstand === "gameover") {
    tegnSkærm("Game Over", "Point: " + point + "  —  Tryk Mellemrum for at prøve igen");
  } else if (tilstand === "vandt") {
    tegnSkærm("DU VANDT! 🎉", "Point: " + point + "  —  Tryk Mellemrum for at spille igen");
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
