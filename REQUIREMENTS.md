# NovaBrew Coffee Taste Profile Quiz — Requirements

## Overview
A web-based personality quiz that helps NovaBrew subscribers discover their coffee personality and receive tailored coffee recommendations. The quiz should feel premium, clear, and approachable, while also collecting useful preference data that supports better matching over time.

## Personality Types

### Bold Explorer
This personality loves intensity, depth, and confidence in a cup. They are drawn to darker, stronger coffees that feel powerful and memorable.

### Smooth Operator
This personality prefers balance, polish, and everyday drinkability. They want something refined, easy to enjoy, and consistently satisfying.

### Cozy Classic
This personality wants comfort, warmth, and familiarity. Their ideal coffee feels relaxing, inviting, and easy to return to again and again.

### Wild Card
This personality is curious and open to surprise. They enjoy unusual flavor profiles, experimentation, and coffees that feel different from the expected.

## Coffee Pairings

- **Bold Explorer** → **Midnight Summit**
  Dark roast with smoky, bold character. Strong and commanding.

- **Smooth Operator** → **Golden Hour**
  Light-medium roast with a sweet, smooth profile. Clean, polished, and easy to love.

- **Cozy Classic** → **Sunrise Blend** and **Sunday Paper**
  Warm, comforting profiles with familiar caramel, hazelnut, vanilla, and chocolate notes.

- **Wild Card** → **Off the Map**
  Experimental micro-lot with unusual processing and surprising flavor notes.

## Quiz Questions

### Question 1
**What kind of coffee flavor do you reach for most often?**
- A. Deep, smoky, and intense → Bold Explorer
- B. Balanced, smooth, and easy to enjoy every day → Smooth Operator
- C. Warm, sweet, and comforting → Cozy Classic
- D. Bright, unusual, and a little unexpected → Wild Card

### Question 2
**When you try a new coffee, what matters most to you?**
- A. A strong profile that makes an impression immediately → Bold Explorer
- B. Consistency and a polished, reliable cup → Smooth Operator
- C. A cozy flavor that feels relaxing and familiar → Cozy Classic
- D. Something surprising that feels different from anything else → Wild Card

### Question 3
**How adventurous are you with your coffee choices?**
- A. I like bold picks, but I still want them to feel powerful and grounded → Bold Explorer
- B. I usually stay in a lane that I know works for me → Smooth Operator
- C. I prefer easygoing, approachable coffees over anything too intense → Cozy Classic
- D. I want to try whatever sounds the most interesting or unusual → Wild Card

### Question 4
**What kind of morning coffee moment sounds best to you?**
- A. A strong cup that wakes me up fast and means business → Bold Explorer
- B. A smooth, easy cup that fits seamlessly into my routine → Smooth Operator
- C. A comforting cup that feels like a slow exhale → Cozy Classic
- D. A cup that makes me curious and gives me something new to think about → Wild Card

### Question 5
**If NovaBrew were choosing a bag for you, what would you want it to optimize for?**
- A. Boldness and depth → Bold Explorer
- B. Balance and drinkability → Smooth Operator
- C. Comfort and familiarity → Cozy Classic
- D. Discovery and experimentation → Wild Card

### Question 6
**Which description feels most like your coffee personality?**
- A. Confident, intense, and not here to play it safe → Bold Explorer
- B. Calm, polished, and dependably good taste → Smooth Operator
- C. Warm, inviting, and all about comfort → Cozy Classic
- D. Curious, expressive, and always open to something new → Wild Card

## Quiz Logic
- Each answer maps to one personality type.
- The quiz tracks totals across all six questions.
- At the end, the app should calculate percentage alignment for each of the four personality types.
- The results page should show all four percentages, with the top personality featured most prominently.
- The percentages should feel polished and visually satisfying, not overly technical.

## Visual Style
- Core direction: **Minimal**
- Refinement: **less bright white, warmer palette**
- Overall feel: clean, premium, approachable, and coffee-toned
- Use warm creams, oat tones, soft browns, and muted coffee-inspired accents instead of stark white backgrounds
- Keep the layout uncluttered with generous spacing, but avoid feeling cold or sterile
- Typography should feel polished and modern
- The experience should feel trustworthy and high quality, not playful or cartoonish

## Extra Features
- **Results images:** Yes
  Each personality result should include an image that reinforces the feeling of that coffee identity.

- **Answer option icons:** Yes
  Use simple icons next to answer options to improve scan-ability and polish.

- **Emoji:** No

## Technical Notes
- Build with Next.js and Tailwind CSS
- Single-page experience with smooth transitions between questions
- Mobile-responsive and easy to complete on a phone
- Results page should be visually polished and shareable
- The build should feel portfolio-ready, not like an internal prototype
