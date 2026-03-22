# Struktura Pytań (Dla Developera)

Bazowane na kole emocji Plutchika.

---

## Główne emocje (Plutchik Wheel - 8 bazowych)

```javascript
const emotions = {
  // --- PRIMARY EMOTIONS ---
  
  "joy": {
    id: "joy",
    name: "Radość",
    nameEn: "Joy",
    description: "Positive delight and happiness when something good happens.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 0, // 0° - góra
    color: "#def658ff", // żółty
    colorDark: "#ecf568ff",
    questions: [
      "What specifically is making you feel this joy right now — and what does it tell you about what you truly value?",
      "How fully are you letting yourself receive this feeling, or are you already waiting for it to pass?",
      "Who in your life deserves to hear about this moment, and what's stopping you from sharing it with them?"
    ]
  },
  
  "trust": {
    id: "trust",
    name: "Zaufanie",
    nameEn: "Trust",
    description: "Confidence and safety in others.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 45,
    color: "#75ea6fff", // zielony
    colorDark: "#2be21eff",
    questions: [
      "What is it about this person or situation that makes you feel safe enough to trust? What does that reflect about your needs?",
      "Have you ever withheld trust from someone or something that deserved it — what was the fear underneath that?",
      "How does it feel in your body when you fully trust? Can you let yourself rest in that right now?"
    ]
  },
  
  "fear": {
    id: "fear",
    name: "Strach",
    nameEn: "Fear",
    description: "Unpleasant response to perceived threat.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 135,
    color: "#216332ff", // ciemnozielony
    colorDark: "#0e4524ff",
    questions: [
      "What is this fear actually trying to protect you from — and is that threat real right now, or is it a memory or story?",
      "When did you first learn to be afraid of this? Whose voice does this fear sound like?",
      "If you knew you were completely safe, what would you do differently today?"
    ]
  },
  
  "surprise": {
    id: "surprise",
    name: "Zaskoczenie",
    nameEn: "Surprise",
    description: "Reaction to the unexpected.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 180,
    color: "#50d5c3ff", // turkusowy/morski
    colorDark: "#16c7a4ff",
    questions: [
      "What expectation or assumption got disrupted here — and is it possible the disruption was for your growth?",
      "What does your reaction to this surprise reveal about what you were holding onto?",
      "If this unexpected thing turned out to be exactly what you needed, how might you see it differently?"
    ]
  },
  
  "sadness": {
    id: "sadness",
    name: "Smutek",
    nameEn: "Sadness",
    description: "Sorrow, grief, or loss.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 225,
    color: "#2377cbff", // granatowy
    colorDark: "#155087ff",
    questions: [
      "What or who are you grieving right now — and have you allowed yourself to fully feel that loss without rushing to fix it?",
      "What does this sadness need from you? Not to solve it — just to be witnessed.",
      "Is there something beautiful about what you're sad over — something worth honoring before you let it go?"
    ]
  },
  
  "disgust": {
    id: "disgust",
    name: "Wstręt",
    nameEn: "Disgust",
    description: "Aversion and revulsion.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 270,
    color: "#8E44AD", // fioletowy
    colorDark: "#6C3483",
    questions: [
      "What value or boundary is being violated that's causing this feeling of disgust? What does that tell you about what matters to you?",
      "Is there any part of what repels you that you also recognize — even faintly — in yourself?",
      "What would it look like to address what disgusts you from a place of values rather than judgment?"
    ]
  },
  
  "anger": {
    id: "anger",
    name: "Złość",
    nameEn: "Anger",
    description: "Strong displeasure and frustration.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 315,
    color: "#f75454ff", // czerwony
    colorDark: "#e51a1aff",
    questions: [
      "What boundary, need, or value feels like it's been crossed right now? Underneath the anger — what's the hurt?",
      "Is this anger familiar? Does it remind you of a feeling from earlier in your life you never fully expressed?",
      "What would you need in order to feel truly heard in this situation — and who is the right person to express it to?"
    ]
  },
  
  "anticipation": {
    id: "anticipation",
    name: "Oczekiwanie",
    nameEn: "Anticipation",
    description: "Looking forward to what comes next.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 90,
    color: "#FFA502", // pomarańczowy
    colorDark: "#E69300",
    questions: [
      "What are you most looking forward to, and what does that desire reveal about who you're becoming?",
      "Is your anticipation rooted in hope, or in anxiety about the future? How can you tell the difference right now?",
      "What can you do today — just one small thing — that honors the future you're moving toward?"
    ]
  }
};
```

---

## Podspektra emocji (rozszerzenie koła Plutchika)

```javascript
const subEmotions = {
  // --- JOY subspectra (jaśniejsze żółte) ---
  "serenity": {
    id: "serenity",
    name: "Spokój",
    nameEn: "Serenity",
    description: "Calm, peaceful contentment.",
    spectrum: "subspectrum",
    parent: "joy",
    wheelPosition: 22.5,
    color: "#F9E79F", // jasny żółty
    questions: [
      "What conditions in your life right now are allowing you to feel this calm — and how can you protect or cultivate them more intentionally?",
      "Is this serenity something you arrived at, or something you're allowing? What's the difference for you?",
      "What would it mean to trust that you deserve to feel this peaceful — not as a reward, but as your natural state?"
    ]
  },
  "ecstasy": {
    id: "ecstasy",
    name: "Ekstaza",
    nameEn: "Ecstasy",
    description: "Intense, overwhelming joy.",
    spectrum: "subspectrum",
    parent: "joy",
    wheelPosition: 337.5,
    color: "#F7DC6F", // średni żółty
    questions: [
      "What is this overwhelming feeling trying to show you about what you're truly alive for?",
      "Do you let yourself stay in moments this big, or do you shrink from them? What would it take to really let this in?",
      "How has your capacity to feel joy this deeply been shaped by the hard things you've survived?"
    ]
  },
  "love": {
    id: "love",
    name: "Miłość",
    nameEn: "Love",
    description: "Deep affection and connection.",
    spectrum: "subspectrum",
    parent: "joy",
    wheelPosition: 67.5,
    color: "#FADBD8", // jasny różowy
    questions: [
      "What is it about this person, place, or thing that makes your heart open — and what does that openness tell you about who you are?",
      "Are you letting yourself be as loved as you are loving right now, or is receiving harder than giving?",
      "How has learning to love — and be loved — changed you? What part of you is still learning?"
    ]
  },
  
  // --- TRUST subspectra (jaśniejsze zielone) ---
  "acceptance": {
    id: "acceptance",
    name: "Akceptacja",
    nameEn: "Acceptance",
    description: "Embracing reality as it is.",
    spectrum: "subspectrum",
    parent: "trust",
    wheelPosition: 22.5,
    color: "#ABEBC6", // jasny zielony
    questions: [
      "What are you accepting right now — and is it true acceptance, or is there still a part of you fighting it quietly underneath?",
      "Is there something you've been resisting that you already know, deep down, you need to make peace with?",
      "What would become possible in your life if you stopped needing things to be different than they are?"
    ]
  },
  "submission": {
    id: "submission",
    name: "Podporządkowanie",
    nameEn: "Submission",
    description: "Yielding to others' will.",
    spectrum: "subspectrum",
    parent: "trust",
    wheelPosition: 67.5,
    color: "#A3E4D7", // jasny turkusowy
    questions: [
      "When you defer to others — to a person, a system, a belief — is it coming from genuine trust, or from a fear of what happens if you don't?",
      "Where in your life have you made yourself smaller in order to belong or feel safe? What did that cost you?",
      "What would it feel like to trust someone fully without losing yourself in the process?"
    ]
  },
  
  // --- FEAR subspectra (jaśniejsze zielone/morskie) ---
  "apprehension": {
    id: "apprehension",
    name: "Niepokój",
    nameEn: "Apprehension",
    description: "Mild, lingering worry.",
    spectrum: "subspectrum",
    parent: "fear",
    wheelPosition: 157.5,
    color: "#A3D9C7", // jasny morski
    questions: [
      "What exactly are you dreading — can you name it clearly, or does it feel too vague to hold? Sometimes naming a fear shrinks it. Try.",
      "Is this unease pointing to something real that needs your attention, or is it an old alarm going off in a situation that no longer requires it?",
      "What would you do right now if this low hum of worry simply wasn't there? What does that tell you about what you want?"
    ]
  },
  "terror": {
    id: "terror",
    name: "Terror",
    nameEn: "Terror",
    description: "Extreme, paralyzing fear.",
    spectrum: "subspectrum",
    parent: "fear",
    wheelPosition: 112.5,
    color: "#76D7C4", // średni morski
    questions: [
      "Can you locate where this terror lives in your body right now — your chest, throat, stomach? Place a hand there. What does that part of you need to hear?",
      "Has your nervous system been here before? How old does this fear feel — is it speaking from the present, or from a much younger version of you?",
      "You have survived every worst moment that came before this one. What does that survival tell you about your capacity to get through what's in front of you?"
    ]
  },
  "awe": {
    id: "awe",
    name: "Podziw",
    nameEn: "Awe",
    description: "Fear and wonder mixed together.",
    spectrum: "subspectrum",
    parent: "fear",
    wheelPosition: 202.5,
    color: "#82E0AA", // jasny zielony
    questions: [
      "What is it about this moment that makes you feel so small — and is smallness here frightening, or actually a relief from having to hold everything together?",
      "When did you last feel genuinely awestruck? What has closed you off from that feeling in the time since?",
      "Awe often dissolves the ego for a moment. Who are you, underneath all the roles and worries, when something this vast reminds you of your place in it?"
    ]
  },
  
  // --- SURPRISE subspectra (jaśniejsze morskie) ---
  "distraction": {
    id: "distraction",
    name: "Rozproszenie",
    nameEn: "Distraction",
    description: "Being pulled away from focus.",
    spectrum: "subspectrum",
    parent: "surprise",
    wheelPosition: 202.5,
    color: "#A9DFBF", // jasny morski
    questions: [
      "What are you distracting yourself from right now — and is the distraction giving you rest, or helping you avoid something that needs your attention?",
      "When you scatter your focus like this, what feeling are you most trying to not sit with?",
      "What would it look like to give just five minutes of full, undivided presence to one thing today — and what comes up when you imagine doing that?"
    ]
  },
  "amazement": {
    id: "amazement",
    name: "Zadziwienie",
    nameEn: "Amazement",
    description: "Deep astonishment and wonder.",
    spectrum: "subspectrum",
    parent: "surprise",
    wheelPosition: 157.5,
    color: "#7FDBDA", // jasny turkusowy
    questions: [
      "What did you believe that this moment just proved wrong — and does losing that belief feel like a loss, or a liberation?",
      "How often do you let yourself be genuinely surprised by life, or do you tend to brace for things so you won't be caught off guard?",
      "What would it mean to move through your days with just a little more openness to being amazed — even by small, ordinary things?"
    ]
  },
  
  // --- SADNESS subspectra (jaśniejsze granatowe) ---
  "pensiveness": {
    id: "pensiveness",
    name: "Zaduma",
    nameEn: "Pensiveness",
    description: "Gentle, thoughtful sadness.",
    spectrum: "subspectrum",
    parent: "sadness",
    wheelPosition: 247.5,
    color: "#85929E", // jasny granatowy/szary
    questions: [
      "What are you quietly mourning right now — something lost, something that never was, or a version of yourself you've had to let go of?",
      "Is this melancholy asking you to slow down and feel something, or has it become a comfortable place to hide from something harder?",
      "What small, tender thing could you do today to honor this feeling without drowning in it?"
    ]
  },
  "grief": {
    id: "grief",
    name: "Żałoba",
    nameEn: "Grief",
    description: "Intense sorrow over loss.",
    spectrum: "subspectrum",
    parent: "sadness",
    wheelPosition: 292.5,
    color: "#5D6D7E", // średni granatowy
    questions: [
      "What or who are you grieving — and have you let yourself cry, not to fix anything, but just to say: this mattered, and losing it hurts?",
      "Grief often carries guilt, anger, or relief inside it. What unexpected emotion is hiding inside yours right now?",
      "What did the thing you lost give you that you're afraid you won't find again? How can you start to offer that to yourself?"
    ]
  },
  "remorse": {
    id: "remorse",
    name: "Skrucha",
    nameEn: "Remorse",
    description: "Painful regret for wrongdoing.",
    spectrum: "subspectrum",
    parent: "sadness",
    wheelPosition: 202.5,
    color: "#ABB2B9", // jasny szary
    questions: [
      "What exactly are you holding yourself accountable for — and is this remorse proportionate, or are you punishing yourself beyond what the situation calls for?",
      "Have you actually made amends where you could — or are you using guilt as a substitute for action?",
      "What would it take to genuinely forgive yourself? Not to excuse what happened, but to stop letting it define who you are now?"
    ]
  },
  
  // --- DISGUST subspectra (jaśniejsze fioletowe) ---
  "boredom": {
    id: "boredom",
    name: "Nuda",
    nameEn: "Boredom",
    description: "Ennui and listlessness.",
    spectrum: "subspectrum",
    parent: "disgust",
    wheelPosition: 292.5,
    color: "#D7BDE2", // jasny fioletowy
    questions: [
      "What in your life has lost its meaning for you — and is this boredom a signal that you've outgrown something, or that you're avoiding the effort something requires?",
      "When did you last feel genuinely engaged and alive in what you were doing? What was different then?",
      "What are you tolerating in your daily life that, if you're honest, you know is slowly draining you?"
    ]
  },
  "loathing": {
    id: "loathing",
    name: "Obrzydzenie",
    nameEn: "Loathing",
    description: "Intense disgust and hatred.",
    spectrum: "subspectrum",
    parent: "disgust",
    wheelPosition: 247.5,
    color: "#C39BD3", // średni fioletowy
    questions: [
      "What core value is so deeply violated here that it produces this intensity of feeling? The strength of the reaction usually maps to the depth of the value.",
      "Is any part of what you loathe something you recognize — even faintly, even uncomfortably — in yourself? This isn't about blame. It's about what this reaction is here to teach you.",
      "What would it mean to hold your values this fiercely while releasing the consuming energy of loathing itself — to care without being corroded by it?"
    ]
  },
  "contempt": {
    id: "contempt",
    name: "Pogarda",
    nameEn: "Contempt",
    description: "Disgust and superiority mixed.",
    spectrum: "subspectrum",
    parent: "disgust",
    wheelPosition: 337.5,
    color: "#AF7AC5", // jasny fioletowy
    questions: [
      "Contempt creates distance — what is the distance protecting you from feeling or confronting in this situation?",
      "Is the judgment you hold toward this person or thing connected to a judgment you hold toward a part of yourself? What would happen if you looked at both with the same eye?",
      "What would it cost you to find even one thing you genuinely understand about what you're condemning?"
    ]
  },
  
  // --- ANGER subspectra (jaśniejsze czerwone/pomarańczowe) ---
  "annoyance": {
    id: "annoyance",
    name: "Drażliwość",
    nameEn: "Annoyance",
    description: "Mild irritation.",
    spectrum: "subspectrum",
    parent: "anger",
    wheelPosition: 337.5,
    color: "#F5B7B1", // jasny czerwony
    questions: [
      "What small thing is irritating you — and is it actually about this, or is it the latest in a series of things you've been swallowing without saying anything?",
      "Annoyance often points to a need that isn't being met. What do you need right now that you haven't asked for?",
      "What would you say if you knew you could say it without consequence — and why haven't you said it?"
    ]
  },
  "rage": {
    id: "rage",
    name: "Wściekłość",
    nameEn: "Rage",
    description: "Intense, uncontrolled anger.",
    spectrum: "subspectrum",
    parent: "anger",
    wheelPosition: 292.5,
    color: "#EC7063", // średni czerwony
    questions: [
      "Before anything else — can you find somewhere safe to let this move through your body? Rage held still in the mind becomes poison. What does your body need to do right now?",
      "Underneath this rage, what is the deepest wound? Not the trigger — the wound. When did you first feel this powerless, this unseen, this wronged?",
      "What would justice actually look like here — not revenge, not numbing — but something that would let you feel like your pain was finally acknowledged?"
    ]
  },
  "aggressiveness": {
    id: "aggressiveness",
    name: "Agresywność",
    nameEn: "Aggressiveness",
    description: "Forceful, hostile energy.",
    spectrum: "subspectrum",
    parent: "anger",
    wheelPosition: 22.5,
    color: "#E74C3C", // czerwony
    questions: [
      "What are you fighting for right now — and is the intensity of your drive proportionate to what's actually at stake, or are older battles bleeding into this one?",
      "Is this forcefulness coming from your strength, or from your fear of what happens if you don't push hard enough?",
      "What would a version of this same drive look like if it came from groundedness rather than urgency — and what becomes possible then?"
    ]
  },
  
  // --- ANTICIPATION subspectra (jaśniejsze pomarańczowe/żółte) ---
  "interest": {
    id: "interest",
    name: "Zainteresowanie",
    nameEn: "Interest",
    description: "Attentiveness and curiosity.",
    spectrum: "subspectrum",
    parent: "anticipation",
    wheelPosition: 67.5,
    color: "#F9E79F", // jasny żółty
    questions: [
      "What is pulling your attention right now — and when did you last follow a thread of genuine curiosity just to see where it leads, with no outcome in mind?",
      "Is this interest something new, or a returning signal — something you've been drawn to before but set aside? What made you set it aside?",
      "What would it look like to take this interest seriously, even just for an hour this week?"
    ]
  },
  "vigilance": {
    id: "vigilance",
    name: "Czujność",
    nameEn: "Vigilance",
    description: "Alert watchfulness.",
    spectrum: "subspectrum",
    parent: "anticipation",
    wheelPosition: 112.5,
    color: "#F8C471", // jasny pomarańcz
    questions: [
      "Your nervous system is on high alert — what is it scanning for? Is the threat real and present, or has your body learned to prepare for something that already happened long ago?",
      "What would it feel like to stand down, even briefly — to trust that you don't have to watch everything all the time? What makes that feel impossible right now?",
      "Who or what taught you that you had to be this vigilant to be safe? Have you ever tried to thank that part of yourself, even as you try to give it some rest?"
    ]
  },
  "optimism": {
    id: "optimism",
    name: "Optymizm",
    nameEn: "Optimism",
    description: "Hopeful confidence.",
    spectrum: "subspectrum",
    parent: "anticipation",
    wheelPosition: 22.5,
    color: "#F7DC6F", // średni żółty
    questions: [
      "What is this hope built on — is it grounded in something real, or is it protecting you from looking at something you'd rather not see?",
      "Has your optimism ever gotten you hurt? How do you hold hope now without abandoning your own wisdom?",
      "What's one concrete thing you can do today that is an act of faith in the future you're imagining?"
    ]
  }
};
```

---

## Funkcje pomocnicze

```javascript
// Funkcja pomocnicza do pobierania pytań
function getQuestionsForEmotion(emotionId) {
  if (emotions[emotionId]) {
    return emotions[emotionId].questions;
  }
  if (subEmotions[emotionId]) {
    return subEmotions[emotionId].questions;
  }
  return [];
}

// Funkcja do pobierania nadrzędnej emocji dla podspektra
function getParentEmotion(subEmotionId) {
  if (subEmotions[subEmotionId]) {
    return emotions[subEmotions[subEmotionId].parent];
  }
  return null;
}

// Eksport wszystkich emocji jako jedna struktura
const allEmotions = { ...emotions, ...subEmotions };
```
