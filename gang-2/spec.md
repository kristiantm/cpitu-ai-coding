# 🎮 Slangetæmmer
**Tema:** Western (Det Ville Vesten) · **Version:** 1.0

## ⚡ Pitchen (én sætning)
> "Slangetæmmer er et **snake-spil i western-tema**, hvor du styrer en slange med cowboyhat for at samle guldbarrer, mens du undviger banditter og kaktusser i det villeste vesten."

## 🎯 Vind & tab
- **Du vinder, når:** du har samlet **20 guldbarrer** på en bane
- **Du taber, når:** slangen rammer **sig selv**, en **bandit 🤠**, en **kaktus 🌵** eller en **væg**

## 👾 Hovedperson
- **Udseende:** Brun slange med cowboyhat 🐍🤠
- **Det kan den:** *bevæge sig*, *vokse*, *samle guld*

## 🕹️ Styring
- **Piletaster (↑ ↓ ← →)** = bevæg slangen
- **Mellemrum** = pause (nice to have)
- **ESC** = afslut spil

## 🌍 Verden & baner
- **Baggrund & stemning:**
  - *Ørken-banen:* Gylden sandfarve, solbrændt stemning, sparsomme kaktusser
  - *Saloon-banen:* Træpaneler, rødlige toner, whisky-flasker som power-ups
  - *Mine-banen:* Mørkegrå, jernbanespor som forhindringer, dynamit som special-item

- **Forhindringer & fjender:**
  - **Kaktus 🌵** (statisk forhindring – taber ved kontakt)
  - **Bandit 🤠** (bevæger sig tilfældigt eller mod slangen – taber ved kontakt)
  - **Sheriff ⭐** (venlig NPC – giver ekstra point hvis ramt, men forsvinder bagefter)

- **Banedesign (ASCII-skitser):**
  ```
  🪙 = Guldbarr (point)
  🤠 = Bandit (fjende)
  🌵 = Kaktus (forhindring)
  ⭐ = Sheriff (bonus)
  
  --- Bane 1: Ørken (20x20) ---
  +--------------------+
  |🌵      🪙         🤠 |
  |                    🌵|
  |🤠   🪙              |
  |         🌵          |
  |🪙        ⭐          |
  +--------------------+
  
  --- Bane 2: Saloon (15x15, smallere = sværere) ---
  +---------------+
  |🌵🪙   🤠    🪙|
  |    🌵       🤠  |
  |🤠  ⭐  🪙     🌵|
  |🪙        🤠    |
  +---------------+
  
  --- Bane 3: Mine (20x20 med snævre gange) ---
  +--------------------+
  |🌵🤠🌵🤠🌵🤠🌵🤠🌵|
  |🪙                ⭐|
  |🌵🤠🌵🤠🌵🤠🌵🤠🌵|
  |       🪙        🤠|
  +--------------------+
  ```

## 🔁 Gameloop (hvad gør spilleren igen og igen?)
1. Styr slangen med piletaster for at **samle guldbarrer 🪙**
2. Undvig **banditter 🤠** og **kaktusser 🌵**
3. Prøv at fange **sheriffen ⭐** for bonuspoint
4. Voks i længde for hver guldbarr (klassisk snake-mekanik)
- **Derfor bliver det ved med at være sjovt:**
  - "Man vil **ALTID** prøve én gang til for at slå sin highscore"
  - "Banerne udfordrer med **forskellige strategier** (åbne vs. snævre rum)"

## 📜 Regler (spillets love)
- Slangen **kan ikke gå gennem vægge**
- Slangen **kan ikke gå gennem sig selv** (klassisk snake)
- **Guldbarrer** dukker op på tilfældige positioner
- **Banditter** bevæger sig **tilfældigt** (eller mod slangen på højere sværhedsgrader)
- **Sheriffen** forsvinder efter 5 sekunder, hvis ikke fanget

## 📈 Sværere og sværere
- **Hver 5. guldbarr:** Slangen bliver **10% hurtigere**
- **Hver bane:** Flere banditter (+1 pr. bane) og færre åbne rum
- **Bane 3:** Snævre gange tvinger præcis styring

## 🛠️ Must have ✅ (skal virke — byg ét punkt pr. prompt!)
- [ ] **Bevægelse** (piletaster styrer slangen)
- [ ] **Collision** (vægge, sig selv, fjender, forhindringer)
- [ ] **Point-system** (samle guldbarrer = +10 point pr. stk)
- [ ] **Game states** (menu / spil / game over)
- [ ] **Baneskift** (3 baner, der skifter ved vind/tab)
- [ ] **Slange-vækst** (voks 1 segment pr. guldbarr)

## ✨ Nice to have (hvis der er tid)
- [ ] **Power-ups:**
  - *Whiskey-flaske 🥃* = midlertidig dobbelt hastighed (5 sek)
  - *Dynamit 💥* = fjerner alle banditter på banen
  - *Sheriff-badge 🚔* = ekstra liv
- [ ] **Lyd:** Western-guitar (baggrund), *kling!* (guld), *bang!* (tab), *hvesen* (bevægelse)
- [ ] **Highscore-system** (gemmes lokalt)
- [ ] **Animationer** (slangen blinke ved tab, guld glimter)
- [ ] **Tidsppression** (1 minut per bane – nice to have)

## 🎨 Look & feel
- **Farver:**
  - *Baggrund:* Sepia/beige (ørken), mørkerød (saloon), grå (mine)
  - *Slange:* Brun (#8B4513) med gul cowboyhat
  - *Guldbarrer:* Gylden (#FFD700)
  - *Banditter:* Sort hat + rød skjorte
  - *Kaktus:* Mørkegrøn (#228B22)
  - *Sheriff:* Blå uniform + gul stjerne
- **Grafik:** Simple emoji-agtige former (hvis ASCII) eller pixel-art (hvis tid)
- **Feedback:**
  - Skærm **blinker rød** ved tab
  - **Point-tal hopper** op ved opsamling (+10)
  - **Lydsignal** ved power-up

## 🧪 Playtest (få en anden pirat til at spille!)
| Hvem spillede? | Hvad virkede? | Hvad var svært/forvirrende? |
|---|---|---|
| (TBD) |  |  |

## 🔄 Logbog
| Version | Gang | Hvad ændrede jeg — og hvorfor? | AI-hjælp |
|---|---|---|---|
| 1.0 | 2 | Første spec: Western-snake med 3 baner, guldbarrer, banditter, kaktusser | Mistral Vibe |

## 💡 Idéer til forbedringer (aldrig tom!)
- [ ] Tilføj **dynamisk banegenerering** (procedural Western-towns)
- [ ] Tilføj **multiplayer** (2 spillere, slanger konkurrerer om guld)
- [ ] Tilføj **historie-mode** (fang banditter for at redde byen)
- [ ] Tilføj **dags/nat-cycle** (nat = dårligere synlighed, mere udfordrende)
