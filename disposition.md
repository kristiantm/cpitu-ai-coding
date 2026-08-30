# Kursusdisposition — AI-Coding: Kode som en pirat 🏴‍☠️

**Underviser:** Kristian Thorsted Madsen
**Målgruppe:** 12-17 år (erfaring med tekstprogrammering, fx Python for begyndere; evt. nye i HTML/JS)
**Varighed:** 7 kursusgange à 2 timer
**Værktøjer:** VS Code + Mistral Vibe (gratis credits) · HTML/CSS/JS
**Arbejdsform:** Solo på egen maskine, hold på 10-20 børn

---

## 📌 Kursusoversigt

Kurset lærer børnene at arbejde med **produktspecifikationer** for spil og bruge **AI som kreativt værktøj**. Hver gang bygges et **fuldt funktionelt spil** — sværhedsgraden stiger fra gang til gang — og børnene itererer løbende på deres **levende designdokument (`spec.md`)**, som altid skal passe til spillet. AI'en skriver koden; barnet er designer og kaptajn og skal kunne *forklare*, hvad koden gør.

---

## 🎓 Læringsmål

Forløbet har to lige vigtige spor: at arbejde **design-drevet** og at arbejde **agentisk** (styre en AI, der bygger for dig). Målene er formuleret som noget, man kan *se* barnet gøre — og evalueringen er bygget ind i den faste rytme (spec-tjek og vis-og-fortæl hver gang, demoen gang 7). Ingen tests.

### Spor A: Design-drevet udvikling — efter forløbet kan barnet …

| # | Læringsmål | Tegn på læring (det kan du se) |
|---|---|---|
| A1 | Beskrive en spilidé præcist med spildesignets fagbegreber: mål, vind/tab, hovedperson, gameloop, regler, verden, progression | Spec'en kan læses og forstås af en anden pirat uden mundtlig forklaring; pitchen fungerer i én sætning |
| A2 | Afgrænse et projekt: skelne must have fra nice to have og vælge et scope, der kan nås inden for tiden | Must-listen er færdig ved sessionens slutning — og nice-listen er ikke tom |
| A3 | Behandle designdokumentet som levende: opdatere det, når spillet ændrer sig, så dokument og produkt altid passer sammen | Logbogen har linjer fra hver kursusgang; spec-tjekket finder ingen afvigelser |
| A4 | Omsætte playtest-observationer til designbeslutninger | Playtest-feltet er udfyldt, og mindst én ændring i logbogen kan spores tilbage til det |
| A5 | Formidle et design: pitche mål + gameloop på 30 sekunder og vise det i spillet | Demoen gang 7 — pitchen kommer direkte fra spec'en |

### Spor B: Agentisk arbejde — efter forløbet kan barnet …

| # | Læringsmål | Tegn på læring (det kan du se) |
|---|---|---|
| B1 | Give en AI klare, afgrænsede instruktioner med den rette kontekst | Prompts peger på spec.md ("byg næste punkt"); én feature pr. prompt |
| B2 | Nedbryde et stort mål i små, testbare trin og uddelegere dem ét ad gangen | Milepælslisten i spec'en bruges aktivt; spillet kan køre efter hver eneste ændring |
| B3 | Verificere AI'ens arbejde: teste, opdage afvigelser fra det ønskede og rette kursen | Barnet tester selv, før det beder om næste feature; kan sige "det var ikke det, jeg bad om" og re-prompte i stedet for at give op |
| B4 | Bruge AI som sparringspartner uden at afgive beslutningsretten | Beder om 2-3 forslag, vælger selv — og kan begrunde valget |
| B5 | Tage ejerskab over produktet: forklare i store træk, hvad koden gør, selv om AI'en skrev den | Kan svare på "hvad sker der, hvis vi ændrer det her tal?" ved vis-og-fortæl |
| B6 | Kende værktøjets grænser: vide, at AI kan tage fejl, og at credits og tid er en ressource | Opdager og italesætter en AI-fejl i løbet af forløbet; prompter med omtanke frem for i blinde |

**Niveaudeling (differentiering):** *Alle* når A1-A3 og B1-B3 — det er kursets kerne og det, rytmen tvinger frem hver gang. *De fleste* når A4-A5 og B4-B5. *Nogle* når alle tolv. Målene A3 og B3 er de to vigtigste at holde øje med som instruktør: et opdateret dokument og vanen med selv at teste er dét, der adskiller at *styre* AI'en fra bare at trykke på den.

---

## 🧭 Piratkodekset — fem underliggende principper

Principperne er ikke ugens tema, men **arbejdsformen i alle 7 gange**. De hænger på væggen (plakaten) og er bygget direkte ind i den faste rytme og i `spec.md`-skabelonen:

| Princip | Sådan lever det i hver eneste kursusgang |
|---|---|
| ① **Mindre er mere** | Kaptajnsreglen: **én feature pr. prompt**. Spillet bygges altid i småbidder, der virker hele vejen. |
| ② **AI er holdkammerat** | Fast vane: bed Vibe om *forslag* ("giv mig 3 idéer til …"), bed om *forklaringer* ("forklar hvad den funktion gør") — og vælg selv. Spørg-lyt-forbedr. |
| ③ **Klare rammer og instruktioner** | Spec'en ER konteksten: standardprompten er *"Læs spec.md og byg næste punkt på listen"*. Upræcis prompt → upræcist spil. |
| ④ **Bryd store opgaver ned** | Hver spec har en afkrydsningsliste af milepæle (mechanics + must/nice). Ét skridt ad gangen fører langt. |
| ⑤ **Vær kreativ — du er designer** | Genren er fælles, men tema, hovedperson og twist er altid barnets eget. Idé-sektionen i spec'en er aldrig tom. |

Refleksionen de sidste 10 minutter vender tilbage til kodekset ("hvilket princip reddede dig i dag?"), så sproget sætter sig uden at stjæle undervisningstid.

---

## 📈 Progressionen — overblik

Sværhedsgraden stiger ad to spor på én gang: **teknisk kompleksitet** og **spec-kompleksitet**. Spillene er ordnet, så hver gang genbruger noget fra sidste gang og tilføjer præcis ét stort nyt lag:

| Gang | Spil | Nye tekniske begreber | Nyt i spec-arbejdet |
|---|---|---|---|
| 1 | Snake/Tetris m. tema | Setup, canvas, game loop, key events | Mini-spec (mål, tema, hovedperson) |
| 2 | Memory-spil | Arrays & state, CSS-animation (flip), match-logik | Fuld skabelon + papir-canvas-rutinen |
| 3 | Puzzle (Sokoban) | 2D-grids, regler, game states (menu/vundet) | Regler + banedesign (ASCII-kort) |
| 4 | Shoot 'em Up (pirat-slag/Space Invaders) | Mange objekter, spawning, collision, scoring | Gameloop + sværhedskurve + milepælsliste |
| 5 | Platformer (Jump & Run) | Gravity, hop, platform-collision, baner | Must have ✅ / Nice to have ✨ som hård linje |
| 6 | Eget projekt | Alt ovenstående efter behov | Fuld spec + scope-tjek før kodning |
| 7 | Demo-dag | Polish & feature freeze | Spec = pitch |

*Bemærk rækkefølgen ift. dit udkast: Memory er rykket frem (turbaseret, ingen realtime — en teknisk pusterum efter setup-tunge gang 1), og platformer er rykket til sidst af de styrede gange, fordi gravity + collision + banedesign er forløbets største samlede byggeopgave. Sokoban før shoot 'em up, fordi grid-logik er lettere at få til at virke end mange samtidige objekter i realtid. Simulation/sandbox (falling sand mv.) udgår som fast gang, men er en oplagt mulighed i gang 6 for de ambitiøse.*

---

## 🔁 Fast rytme (gang 2-5)

En genkendelig struktur gør et hold på 10-20 selvkørende — og rytmen ER principperne i praksis:

| Tid | Aktivitet | Læringsmål |
|---|---|---|
| 0:00-0:15 | **Bording:** Dagens genre + de nye tekniske begreber. Spil et eksempel sammen på storskærm. | Genrens kerne og dagens nye lag |
| 0:15-0:35 | **Søkort (papir):** Spil-canvas med blyant — mål, hovedperson, tema, gameloop, verden, must/nice. Ingen computer endnu. | Design før kode |
| 0:35-0:45 | **Spec:** Ny projektmappe, kopiér skabelonen, overfør canvas'et til `spec.md`. | Fra idé til specifikation |
| 0:45-1:35 | **Byggeri i iterationer:** Spec → prompt → test → opdater spec. Én feature pr. prompt; milepæle krydses af. | Iterativ udvikling med AI |
| 1:35-1:45 | **Spec-tjek:** Passer spil og spec sammen? Opdater dokumentet (version + logbog), ikke kun koden. | Levende dokumentation |
| 1:45-2:00 | **Vis-og-fortæl + refleksion:** 2-3 børn viser spil OG spec. Ét kodeks-spørgsmål. Gem og ryd op. | Formidling og læring |

---

## 🎯 Kursusgang 1: Introduktion + Snake/Tetris med tema

**Mål:** Alle har et virkende værktøj, forstår HTML/CSS/JS-trekanten og har oplevet hele loopet: idé → spec → AI → spil.

| Tid | Aktivitet | Læringsmål |
|---|---|---|
| 0:00-0:30 | Opsætning + introduktion | VS Code, Vibe, credits, HTML/JS/CSS-basics |
| 0:30-0:50 | Mini-spec (`spec.md`) | Skriv en tydelig specifikation |
| 0:50-1:30 | Kodning (prototype) | Byg i småbidder med Vibe |
| 1:30-1:50 | Iteration (spec + kode) | Opdater spec, forbedr spillet |
| 1:50-2:00 | Demo (frivilligt) + refleksion | Vis spil, tal om processen |

**Detaljer:**

1. **Opsætning (30 min):** Installer VS Code + Vibe-udvidelsen, aktivér credits (og forklar ansvarlig brug). Testprompt: *"Lav en simpel HTML-side med en overskrift og en knap der siger AHOY"*. Mini-intro: `index.html` (struktur), `style.css` (udseende), `script.js` (logik), `<canvas>` til spil — nyt for de fleste trods Python-erfaring. **Hav en skriftlig trin-guide klar**, så de hurtige ikke venter.
2. **Mini-spec (20 min):** Vælg Snake eller Tetris og skriv de tre øverste felter i skabelonen: mål, tema, hovedperson. Holdkammerat-øvelse fra dag ét: *"Vibe, giv mig 3 idéer til et tema til mit Snake-spil"* — og vælg selv. "Snake, men det er en drage der æder riddere" er allerede design.
3. **Kodning (40 min):** Byg i småbidder: 1) bane på skærmen, 2) bevægelse, 3) mad + vokse, 4) game over, 5) tema/grafik. Standardprompten introduceres: *"Læs spec.md og byg næste punkt."*
4. **Iteration (20 min):** Opdater spec'en (fx "game over-skærm", "scoren gemmes") og byg det. Første logbogslinje skrives.
5. **Demo + refleksion (10 min):** Frivillige viser. Spørgsmål: *Hvordan hjalp AI'en dig? Hvad var sværest?*

---

## 🎯 Kursusgang 2: Memory-spil

**Mål:** Arrays og state (blandede kort, vendte kort, fundne par), CSS-flip-animation, match-logik. Turbaseret — ingen realtime — så al energi kan gå til den nye **fulde spec-rutine**: papir-canvas først, derefter komplet `spec.md`.
**Fokus:** Temaet bærer spillet (hvad er på kortene? pirat-loot, dinosaurer, memes …). Stretch: træk-tæller, 2-spiller-tur, sværhedsgrader (flere kort), lyd.

## 🎯 Kursusgang 3: Puzzle-spil (Sokoban / flyt kister)

**Mål:** 2D-grids som repræsentation af spilverdenen, bevægelse med collision, game states (menu, spiller, bane klaret).
**Fokus:** Et spil ER sine regler — og regler kan skrives præcist i spec'en ("kisten kan skubbes, ikke trækkes"). Banerne designes i spec'en som ASCII-kort, og Vibe bygger banen direkte fra det tegnede grid — det føles magisk og viser, hvorfor klare rammer virker. Stretch: undo-knap, træk-tæller, bane-vælger.

## 🎯 Kursusgang 4: Shoot 'em Up (pirat-slag / Space Invaders)

**Mål:** Mange samtidige objekter (fjender, skud), spawning, collision, keyboard-input, scoring.
**Fokus:** Gameloop'et for alvor: hvad gør spilleren igen og igen, og hvorfor bliver det ved med at være sjovt? Sværhedskurven skrives i spec'en ("fjender spawner hvert 5. sekund, hurtigere pr. bølge"). Fælles eksperiment på storskærm: en sjusket prompt ("lav fjender") mod en præcis prompt fra spec'en ("3 fjendetyper: langsom stor, hurtig lille, én der skyder tilbage") — sammenlign resultaterne. Stretch: power-ups, boss, bølge-system.

## 🎯 Kursusgang 5: Platformer (Jump & Run)

**Mål:** Gravity, hop, collision med platforme og fjender, banedesign, game states.
**Fokus:** Forløbets største byggeopgave — kan ikke bygges i én prompt, og det er pointen. Milepælslisten i spec'en bliver styrende (1) firkant der hopper, 2) platforme, 3) dø & respawn, 4) mål/flag, 5) bane 2, 6) pynt), og **must have / nice to have** indføres som hård linje: hvad SKAL virke, før noget er "nice"? Det er generalprøven på gang 6-7. Slut af med en brainstorm-side i spec'en: **"Mit demoprojekt"**.

## 🎯 Kursusgang 6: Eget projekt — fra spec til spilbart

**Mål:** Frit valg: videreudvikl et af forløbets spil (high score, levels, power-ups …) ELLER start et nyt (fx et simulations-/sandbox-spil for de ambitiøse). Kravet er det samme: fuld spec før kodning.
**Fokus:** Første halve time er ren designtid — fuld spec med milepælsliste og skarp must/nice-linje. **Voksen-tjek af scope, før der kodes** ("kan must-listen nås på 2½ time?") — dagens vigtigste instruktøropgave. Meldt ud fra start: must-listen skal være færdig i dag; gang 7's første time er til polish, ikke fundament. Ingen nye features de sidste 20 minutter.

## 🎯 Kursusgang 7: Demo-dag! 🚀

**Time 1 — Færdiggørelse:** Polish og nice-to-haves. Sidste spec-tjek: dokumentet skal passe til det, der vises. Hver pirat forbereder en 30-sekunders pitch ud fra spec'en: *Hvad hedder det? Hvad går det ud på (mål + gameloop)? Vis det!* **Feature freeze** 15 min før pausen.
**Time 2 — Demo (uformelt):** Alle viser deres spil. Fast format: pitch → 1-2 min spil → én ting fra spec'en, der ændrede sig undervejs ("det lærte jeg"). Publikum giver peer-feedback: "det fedeste var …". Afrunding ved plakaten: hvilket princip brugte du mest? Evt. forældre med til de sidste 20 min.

---

## 📝 Skabelon til `spec.md`

Den fulde skabelon ligger i **`spec_skabelon.md`** (separat fil). Felterne, i rækkefølge: **Pitchen** (én sætning: "[Navn] er et [genre]-spil, hvor du [gør noget] for at [nå målet]") → **Vind & tab** (begge eksplicit) → **Hovedperson** (udseende + evner som udsagnsord) → **Styring** (taster, adskilt fra gameloop) → **Verden & baner** (inkl. ASCII-banedesign) → **Gameloop** (+ "derfor bliver det ved med at være sjovt") → **Regler** → **Sværere og sværere** (progression) → **Must have ✅ / Nice to have ✨** → **Look & feel** (inkl. feedback/juice) → **Playtest** (få en anden pirat til at spille) → **Logbog** (version, ændring, AI-hjælp) → **Idéer** (aldrig tom).

*Gang 1 bruger kun pitch, tema og hovedperson (mini-spec). Fra gang 2 bruges hele skabelonen, og papir-canvas'et er samme felter som one-pager til blyant. Pitchen genbruges direkte som demo-pitch i gang 7, og playtest-feltet udfyldes under vis-og-fortæl.*

---

## 📁 Filer til kurset

| Fil | Formål | Deling |
|---|---|---|
| `spec_skabelon.md` | Skabelonen beskrevet ovenfor | GitHub / Google Drive |
| `AGENTS.md` | Teknologiske rammer + samarbejdsregler for Vibe — peger på spec.md som kilde til sandhed | Ligger i `starter_template/`, følger med hvert spil |
| `spil_canvas.pdf` | Papir-canvas til print (A4) | Print til hver gang |
| `starter_template/` | Tom mappe: `index.html` + `style.css` + `script.js` + `spec.md` + `AGENTS.md` | GitHub / Google Drive |
| `eksempler/` | Færdige eksempler pr. genre (til storskærm + nødhjælp) | GitHub / Google Drive |
| `setup-guide.pdf` | Trin-for-trin til gang 1 (VS Code, Vibe, credits) | Print + send til forældre |

**Mappestruktur hos børnene:** én mappe pr. spil (`spil-1-snake/`, `spil-2-memory/` …), altid med `spec.md` ved siden af koden — så kan Vibe altid finde den, og gang 6 kan bygge videre på alt.

---

## 💡 Ekstra tips

- **Gang 1 er flaskehalsen.** Test hele setup-flowet på en frisk maskine hjemmefra. Overvej at bede forældre installere VS Code på forhånd (via setup-guiden).
- **Niveauforskelle:** Stretch goals via nice-to-have-listen — de hurtige bliver aldrig færdige, de får bare et vildere spil; de langsomme har stadig et helt spil, når must-listen er nået. Begyndere kan starte fra `starter_template/` og eksemplerne.
- **AI-disciplin:** Undgå tankeløs copy-paste — fast vane at bede Vibe forklare koden. "Én feature pr. prompt" sparer både credits og frustration. Brug AI til fejlfinding, før man rækker hånden op.
- **10-20 børn, få voksne:** Rytmen og skabelonerne er dit stedfortræder-personale. Regel: *"Spørg din spec, spørg din AI, spørg din nabo — så en voksen"* + synlig hjælpe-kø (post-it på skærmen).
- **Plan B:** Hvis credits/wifi driller: banedesign og spec-arbejde på papir, eller byg videre fra `eksempler/` uden AI.
- **Motivation:** Ros processen (god spec, godt scope), ikke kun spillet. Piratsproget genbruges konsekvent: spec = søkort, milepæle = skattejagt, demo = fremvisning i havnen.

---

## 🚀 Næste skridt

1. Opret `spec_skabelon.md`, `starter_template/` og `spil_canvas.pdf`.
2. Byg/find ét eksempel-spil pr. genre til `eksempler/`.
3. Test VS Code + Vibe-opsætningen ende-til-ende (inkl. credits).
4. Skriv setup-guiden og forbered kursusgang 1.
5. Del `teaser.pptx` med forældre/børn.
6. Planlæg demo-dagen (gang 7) — evt. forældreinvitation.

---

**Kontakt:** Kristian Thorsted Madsen, DemAI
