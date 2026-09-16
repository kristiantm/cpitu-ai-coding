# 🎮 Bubble Bobble: Ny Edition
**Tema:** Søde drager-unger i en farverig hule · **Version:** 1.0

## ⚡ Pitchen (én sætning)
> "Bubble Bobble er et platformspil, hvor du spyr bobler på fjender for at fange dem og poppe dem, før de slipper fri."

## 🎯 Vind & tab
- **Du vinder, når:** alle fjender på level 1 er fanget og sprunget
- **Du taber, når:** en fjende rører dig, og du ikke har flere liv (du starter med 3)

## 👾 Hovedperson
- **Udseende:** lille slange 🐍
- **Det kan den:** hoppe, skyde bobler

## 🕹️ Styring
- Venstre/højre pil = bevæg dig
- Mellemrum = skyd boble
- (Op-pil eller W = hop — vælger vi sammen)

## 🌍 Verden & baner
- **Baggrund & stemning:** farverig hule med mørkeblå vægge og glitrende bobler
- **Forhindringer & fjender:** platforme at stå på, små rundige fjender ("Zots") der vandrer rundt
- **Level 1-kort (ASCII):**

```
██████████████████████████
█                        █
█   ░░░       ░░░        █   <- platforme (░)
█          [Z]           █   <- Zot-fjender
█   ░░░       ░░░   ░░░  █
█                        █
█   ░░░░░░    ░░░░░░░░░  █
█                        █
█   [Z]          [Z]    █
██████████████████████████  <- gulv
```

## 🔁 Gameloop (hvad gør spilleren igen og igen?)
1. Bevæg dig og hop mellem platforme
2. Skyd bobler for at fange fjender
3. Pop boblerne (ved at røre dem) før fjenden slipper ud
- **Derfor bliver det ved med at være sjovt:** man vil ALTID lige prøve én gang til, fordi det snurrer hurtigt, og det er tilfredsstillende at poppe en hel kæde af fjender.

## 📜 Regler (spillets love)
- Fjender kan kun fanges, mens de er udenfor en boble — skyd boblen i dem.
- En fanget fjende bliver til en boble, der svæver op; rør boblen for at poppe den og score point.
- Fanger du ikke boblen hurtigt, slipper fjenden fri (stadig vredere).
- Man kan ikke gå gennem vægge eller platforme.
- Hopper du på en platform, lander du på toppen.

## 📈 Sværere og sværere
- Level 1 er den letteste bane: 3 Zots i moderat tempo.
- Senere niveauer (nice-to-have) kan tilføje flere/hurtigere fjender og flere platforme.

## 🛠️ Must have ✅ (skal virke — byg ét punkt pr. prompt!)
- [x] Spilleren kan bevæge sig venstre/højre og hoppe på en bane
- [x] Platforme man kan stå på (collision)
- [x] Spilleren kan skyde bobler
- [x] Fjender ("Zots") vandrer rundt på banen
- [x] Bobler kan fange fjender (collision boble ↔ fjende)
- [x] Fangne fjender bliver til bobler, der popper og giver point
- [x] Spilleren mister et liv ved berøring af fjende
- [x] Game states: start / spil / game over (og "du vandt!")

## ✨ Nice to have (hvis der er tid)
- [ ] Power-ups: specialbobler, ekstra liv
- [ ] Flere level-designs / skiftende farver
- [x] Musik/lyd-effekter (kan laves med Web Audio — kræver at vi spørger først)

## 🎨 Look & feel
- **Farver:** mørkeblå hule + grøn slange + lyseblå/farverige bobler · **Grafik:** simple former (cirkler, rektangler) og emojis
- **Feedback:** bobler popper med et lille "boing"-hop; point-tal hopper op, når du scorer; skærmen blinker kort, når du mister et liv

## 🧪 Playtest (få en anden pirat til at spille!)
| Hvem spillede? | Hvad virkede? | Hvad var svært/forvirrende? |
|---|---|---|
| | | |

## 🔄 Logbog
| Version | Gang | Hvad ændrede jeg — og hvorfor? | AI-hjælp |
|---|---|---|---|
| 1.0 | X | Første spec | — |
| 1.1 | 1 | Slangen kan bevæge sig og hoppe (gulv + vægge) | Vibe |
| 1.2 | 1 | Platforme, bobler, Zots, fang/pop, liv, game states — hele must-listen | Vibe |
| 1.3 | 1 | Musik (Bubble Bobble-tema) + lydeffekter (pop, skyd, hit) via Web Audio | Vibe |

## 💡 Idéer til forbedringer (aldrig tom!)
- [ ] Kæde-pop: popper du én boble, kan den tage naboer med
- [ ] Combo-point: pop flere fjender hurtigt for bonus
