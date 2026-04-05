# Nowa Struktura Emocji (Dla Developera)

Nowa struktura oparta na rozszerzonym modelu emocji z głębszą hierarchią.

---

## Główne emocje (Nowe Primary Emotions - 8 bazowych)

```javascript
const emotions = {
  // --- PRIMARY EMOTIONS (New Structure) ---
  
  "ecstasy": {
    id: "ecstasy",
    name: "Ekstaza",
    nameEn: "Ecstasy",
    description: "Overwhelming feeling of great happiness or joyful excitement.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 0, // 0° - góra (żółty)
    color: "#F7DC6F", // żółty
    colorDark: "#F9E79F",
    questions: [
      "What overwhelming feeling are you experiencing right now — and what does this intensity reveal about what truly matters to you?",
      "How often do you allow yourself to feel this deeply, or do you pull back from such intense experiences?",
      "What would it mean to stay with this feeling without trying to dampen or amplify it?"
    ]
  },
  
  "admiration": {
    id: "admiration",
    name: "Podziw",
    nameEn: "Admiration",
    description: "Recognition and respect for someone or something perceived as having high quality or value.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 45, // 45° (zielony)
    color: "#82E0AA", // zielony
    colorDark: "#ABEBC6",
    questions: [
      "What qualities do you see in others that inspire this sense of admiration — and do you recognize any of these in yourself?",
      "When did you last admire your own abilities or character? What made that moment special?",
      "What can you learn from the people you admire that might help you grow?"
    ]
  },
  
  "terror": {
    id: "terror",
    name: "Terror",
    nameEn: "Terror",
    description: "Extreme fear or dread, often causing panic or paralysis.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 90, // 90° (ciemnozielony)
    color: "#2874A6", // ciemnozielony
    colorDark: "#5499C7",
    questions: [
      "What is the source of this extreme fear — and what would happen if you imagined the worst-case scenario already occurred?",
      "How does terror differ from ordinary fear in your experience, and what does your body need to feel safer?",
      "What protection mechanisms do you have in place when faced with terrifying situations?"
    ]
  },
  
  "amazement": {
    id: "amazement",
    name: "Zachwyt",
    nameEn: "Amazement",
    description: "A feeling of great surprise or wonder.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 135, // 135° (morsko-niebieski)
    color: "#28B4C8", // morsko-niebieski
    colorDark: "#D2B4DE",
    questions: [
      "What has surprised you so deeply that it left you amazed — and what assumptions did it challenge?",
      "How often do you allow yourself to be amazed by ordinary things in your daily life?",
      "What would happen if you approached each day with a sense of potential for amazement?"
    ]
  },
  
  "grief": {
    id: "grief",
    name: "Żałoba",
    nameEn: "Grief",
    description: "Deep sorrow or distress, especially caused by someone's death.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 180, // 180° (ciemnoniebieski)
    color: "#1A5276", // ciemnoniebieski
    colorDark: "#85C1E9",
    questions: [
      "What are you grieving beyond a person or situation — and what part of your identity is shifting with this loss?",
      "How does it feel to let yourself be fully present with this grief without trying to move past it quickly?",
      "What has this experience of loss taught you about what truly matters in life?"
    ]
  },
  
  "loathing": {
    id: "loathing",
    name: "Odrazy",
    nameEn: "Loathing",
    description: "A feeling of intense dislike or disgust; abhorrence.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 225, // 225° (fioletowy)
    color: "#7D3C98", // fioletowy
    colorDark: "#AF7AC5",
    questions: [
      "What values are being so deeply violated that you feel this loathing — and how can you protect those values?",
      "Is there a part of this loathing that reflects something you fear about yourself — and can you meet that with compassion?",
      "What would it look like to hold your boundaries firmly without being consumed by negative feelings?"
    ]
  },
  
  "rage": {
    id: "rage",
    name: "Wściekłość",
    nameEn: "Rage",
    description: "Violent, uncontrollable anger that may lead to destructive behavior.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 270, // 270° (czerwony)
    color: "#EC7063", // czerwony
    colorDark: "#F1948A",
    questions: [
      "What injustice or violation has triggered this explosive anger — and what deeper wound is it defending?",
      "How safe is it for you to fully express this rage, and where could you channel it productively?",
      "What would true justice look like in this situation — separate from revenge or punishment?"
    ]
  },
  
  "vigilance": {
    id: "vigilance",
    name: "Ostrożność",
    nameEn: "Vigilance",
    description: "The action or state of keeping careful watch for possible danger or difficulties.",
    spectrum: "primary",
    parent: null,
    wheelPosition: 315, // 315° (pomarańczowy)
    color: "#F5B041", // pomarańczowy
    colorDark: "#F8C471",
    questions: [
      "What are you scanning for in your environment — and is this hypervigilance serving or limiting you?",
      "When was the last time you felt truly safe to lower your guard — and what would it take to create that safety now?",
      "How can you maintain awareness without living in a state of constant preparation for threats?"
    ]
  }
};
```

---

## Pod-emocje (rozszerzenie nowego koła emocji)

```javascript
const subEmotions = {
  // --- ECSTASY subspectra (żółte odcienie) ---
  "joy": {
    id: "joy",
    name: "Radość",
    nameEn: "Joy",
    description: "A feeling of great pleasure and happiness.",
    spectrum: "subspectrum",
    parent: "ecstasy",
    wheelPosition: 22.5,
    color: "#F9E79F", // jasny żółty
    questions: [
      "What specifically is making you feel this joy right now — and what does it tell you about what you truly value?",
      "How fully are you letting yourself receive this feeling, or are you already waiting for it to pass?",
      "Who in your life deserves to hear about this moment, and what's stopping you from sharing it with them?"
    ]
  },
  "serenity": {
    id: "serenity",
    name: "Spuśćność",
    nameEn: "Serenity",
    description: "A state of being calm, peaceful, and untroubled.",
    spectrum: "subspectrum",
    parent: "ecstasy",
    wheelPosition: 67.5,
    color: "#FCF3CF", // bardzo jasny żółty
    questions: [
      "What conditions in your life right now are allowing you to feel this calm — and how can you protect or cultivate them more intentionally?",
      "Is this serenity something you arrived at, or something you're allowing? What's the difference for you?",
      "What would it mean to trust that you deserve to feel this peaceful — not as a reward, but as your natural state?"
    ]
  },
  "love": {
    id: "love",
    name: "Miłość",
    nameEn: "Love",
    description: "A deep feeling of affection and care towards someone or something.",
    spectrum: "subspectrum",
    parent: "ecstasy",
    wheelPosition: 337.5,
    color: "#FADBD8", // jasny różowy
    questions: [
      "What is it about this person, place, or thing that makes your heart open — and what does that openness tell you about who you are?",
      "Are you letting yourself be as loved as you are loving right now, or is receiving harder than giving?",
      "How has learning to love — and be loved — changed you? What part of you is still learning?"
    ]
  },
  
  // --- ADMIRATION subspectra (zielone odcienie) ---
  "trust": {
    id: "trust",
    name: "Zaufanie",
    nameEn: "Trust",
    description: "Firm belief in the reliability, truth, or ability of someone or something.",
    spectrum: "subspectrum",
    parent: "admiration",
    wheelPosition: 22.5,
    color: "#ABEBC6", // jasny zielony
    questions: [
      "What is it about this person or situation that makes you feel safe enough to trust? What does that reflect about your needs?",
      "Have you ever withheld trust from someone or something that deserved it — what was the fear underneath that?",
      "How does it feel in your body when you fully trust? Can you let yourself rest in that right now?"
    ]
  },
  "acceptance": {
    id: "acceptance",
    name: "Akceptacja",
    nameEn: "Acceptance",
    description: "The action of consenting to receive or undertake something offered.",
    spectrum: "subspectrum",
    parent: "admiration",
    wheelPosition: 67.5,
    color: "#D5F5E3", // bardzo jasny zielony
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
    description: "The action of accepting or yielding to a superior force or to the will or authority of another person.",
    spectrum: "subspectrum",
    parent: "admiration",
    wheelPosition: 337.5,
    color: "#A3E4D7", // jasny turkusowy
    questions: [
      "When you defer to others — to a person, a system, a belief — is it coming from genuine trust, or from a fear of what happens if you don't?",
      "Where in your life have you made yourself smaller in order to belong or feel safe? What did that cost you?",
      "What would it feel like to trust someone fully without losing yourself in the process?"
    ]
  },
  
  // --- TERROR subspectra (ciemnozielone odcienie) ---
  "fear": {
    id: "fear",
    name: "Strach",
    nameEn: "Fear",
    description: "An unpleasant emotion caused by the threat of danger, pain, or harm.",
    spectrum: "subspectrum",
    parent: "terror",
    wheelPosition: 22.5,
    color: "#5499C7", // jasny niebiesko-zielony
    questions: [
      "What is this fear actually trying to protect you from — and is that threat real right now, or is it a memory or story?",
      "When did you first learn to be afraid of this? Whose voice does this fear sound like?",
      "If you knew you were completely safe, what would you do differently today?"
    ]
  },
  "apprehension": {
    id: "apprehension",
    name: "Niepokój",
    nameEn: "Apprehension",
    description: "Anxiety or fear that something bad or unpleasant will happen.",
    spectrum: "subspectrum",
    parent: "terror",
    wheelPosition: 67.5,
    color: "#A3E4D7", // jasny turkusowy
    questions: [
      "What exactly are you dreading — can you name it clearly, or does it feel too vague to hold? Sometimes naming a fear shrinks it. Try.",
      "Is this unease pointing to something real that needs your attention, or is it an old alarm going off in a situation that no longer requires it?",
      "What would you do right now if this low hum of worry simply wasn't there? What does that tell you about what you want?"
    ]
  },
  "awe": {
    id: "awe",
    name: "Podziw",
    nameEn: "Awe",
    description: "A feeling of reverential respect mixed with fear or wonder.",
    spectrum: "subspectrum",
    parent: "terror",
    wheelPosition: 337.5,
    color: "#85C1E9", // jasny niebieski
    questions: [
      "What is it about this moment that makes you feel so small — and is smallness here frightening, or actually a relief from having to hold everything together?",
      "When did you last feel genuinely awestruck? What has closed you off from that feeling in the time since?",
      "Awe often dissolves the ego for a moment. Who are you, underneath all the roles and worries, when something this vast reminds you of your place in it?"
    ]
  },
  
  // --- AMAZEMENT subspectra (morsko-niebieskie odcienie) ---
  "surprise": {
    id: "surprise",
    name: "Zaskoczenie",
    nameEn: "Surprise",
    description: "A feeling of mild astonishment or shock caused by something unexpected.",
    spectrum: "subspectrum",
    parent: "amazement",
    wheelPosition: 22.5,
    color: "#D2B4DE", // jasny fioletowo-niebieski
    questions: [
      "What expectation or assumption got disrupted here — and is it possible the disruption was for your growth?",
      "What does your reaction to this surprise reveal about what you were holding onto?",
      "If this unexpected thing turned out to be exactly what you needed, how might you see it differently?"
    ]
  },
  "distraction": {
    id: "distraction",
    name: "Rozproszenie",
    nameEn: "Distraction",
    description: "A thing that prevents someone from concentrating on something else.",
    spectrum: "subspectrum",
    parent: "amazement",
    wheelPosition: 67.5,
    color: "#A3E4D7", // jasny turkusowy
    questions: [
      "What are you distracting yourself from right now — and is the distraction giving you rest, or helping you avoid something that needs your attention?",
      "When you scatter your focus like this, what feeling are you most trying to not sit with?",
      "What would it look like to give just five minutes of full, undivided presence to one thing today — and what comes up when you imagine doing that?"
    ]
  },
  "disapproval": {
    id: "disapproval",
    name: "Nieprzyznanie",
    nameEn: "Disapproval",
    description: "A feeling of disapproving of something or someone.",
    spectrum: "subspectrum",
    parent: "amazement",
    wheelPosition: 337.5,
    color: "#85C1E9", // jasny niebieski
    questions: [
      "What value or standard is being violated that triggers this disapproval — and how important is it to defend that value?",
      "Is your disapproval masking any discomfort with uncertainty or challenges to your beliefs?",
      "How can you hold your values strongly while remaining open to perspectives that differ from your own?"
    ]
  },
  
  // --- GRIEF subspectra (ciemnoniebieskie odcienie) ---
  "sadness": {
    id: "sadness",
    name: "Smutek",
    nameEn: "Sadness",
    description: "Emotional pain characterized by feelings of disadvantage, loss, despair, and helplessness.",
    spectrum: "subspectrum",
    parent: "grief",
    wheelPosition: 22.5,
    color: "#85C1E9", // jasny niebieski
    questions: [
      "What or who are you grieving right now — and have you allowed yourself to fully feel that loss without rushing to fix it?",
      "What does this sadness need from you? Not to solve it — just to be witnessed.",
      "Is there something beautiful about what you're sad over — something worth honoring before you let it go?"
    ]
  },
  "pensiveness": {
    id: "pensiveness",
    name: "Zaduma",
    nameEn: "Pensiveness",
    description: "A state of deep or serious thought, often tinged with sadness.",
    spectrum: "subspectrum",
    parent: "grief",
    wheelPosition: 67.5,
    color: "#A9DFBF", // jasny zielono-niebieski
    questions: [
      "What are you quietly mourning right now — something lost, something that never was, or a version of yourself you've had to let go of?",
      "Is this melancholy asking you to slow down and feel something, or has it become a comfortable place to hide from something harder?",
      "What small, tender thing could you do today to honor this feeling without drowning in it?"
    ]
  },
  "disappointment": {
    id: "disappointment",
    name: "Rozczarowanie",
    nameEn: "Disappointment",
    description: "A feeling of dissatisfaction when expectations are not fulfilled.",
    spectrum: "subspectrum",
    parent: "grief",
    wheelPosition: 337.5,
    color: "#A3E4D7", // jasny turkusowy
    questions: [
      "What expectations were you holding that weren't met — and how can you gently mourn that gap between reality and wish?",
      "How does it feel to accept that people, situations, or outcomes don't always align with our hopes?",
      "What can you appreciate about the experience itself, despite the disappointment?"
    ]
  },
  
  // --- LOATHING subspectra (fioletowe odcienie) ---
  "disgust": {
    id: "disgust",
    name: "Wstręt",
    nameEn: "Disgust",
    description: "A feeling of revulsion or strong disapproval aroused by something unpleasant or offensive.",
    spectrum: "subspectrum",
    parent: "loathing",
    wheelPosition: 22.5,
    color: "#AF7AC5", // jasny fioletowy
    questions: [
      "What value or boundary is being violated that's causing this feeling of disgust? What does that tell you about what matters to you?",
      "Is there any part of what repels you that you also recognize — even faintly — in yourself?",
      "What would it look like to address what disgusts you from a place of values rather than judgment?"
    ]
  },
  "boredom": {
    id: "boredom",
    name: "Nuda",
    nameEn: "Boredom",
    description: "A state of being weary and restless through lack of interest.",
    spectrum: "subspectrum",
    parent: "loathing",
    wheelPosition: 67.5,
    color: "#FADBD8", // jasny różowy
    questions: [
      "What in your life has lost its meaning for you — and is this boredom a signal that you've outgrown something, or that you're avoiding the effort something requires?",
      "When did you last feel genuinely engaged and alive in what you were doing? What was different then?",
      "What are you tolerating in your daily life that, if you're honest, you know is slowly draining you?"
    ]
  },
  "contempt": {
    id: "contempt",
    name: "Pogarda",
    nameEn: "Contempt",
    description: "The feeling that a person or a thing is beneath consideration, worthless, or deserving scorn.",
    spectrum: "subspectrum",
    parent: "loathing",
    wheelPosition: 337.5,
    color: "#F9E79F", // jasny żółty
    questions: [
      "Contempt creates distance — what is the distance protecting you from feeling or confronting in this situation?",
      "Is the judgment you hold toward this person or thing connected to a judgment you hold toward a part of yourself? What would happen if you looked at both with the same eye?",
      "What would it cost you to find even one thing you genuinely understand about what you're condemning?"
    ]
  },
  
  // --- RAGE subspectra (czerwone odcienie) ---
  "anger": {
    id: "anger",
    name: "Złość",
    nameEn: "Anger",
    description: "A strong feeling of annoyance, displeasure, or hostility.",
    spectrum: "subspectrum",
    parent: "rage",
    wheelPosition: 22.5,
    color: "#F1948A", // jasny czerwony
    questions: [
      "What boundary, need, or value feels like it's been crossed right now? Underneath the anger — what's the hurt?",
      "Is this anger familiar? Does it remind you of a feeling from earlier in your life you never fully expressed?",
      "What would you need in order to feel truly heard in this situation — and who is the right person to express it to?"
    ]
  },
  "annoyance": {
    id: "annoyance",
    name: "Drażliwość",
    nameEn: "Annoyance",
    description: "A feeling of mild irritation or frustration.",
    spectrum: "subspectrum",
    parent: "rage",
    wheelPosition: 67.5,
    color: "#FADBD8", // jasny różowy
    questions: [
      "What small thing is irritating you — and is it actually about this, or is it the latest in a series of things you've been swallowing without saying anything?",
      "Annoyance often points to a need that isn't being met. What do you need right now that you haven't asked for?",
      "What would you say if you knew you could say it without consequence — and why haven't you said it?"
    ]
  },
  "aggressiveness": {
    id: "aggressiveness",
    name: "Agresywność",
    nameEn: "Aggressiveness",
    description: "Ready or likely to attack or confront; characterized by aggression.",
    spectrum: "subspectrum",
    parent: "rage",
    wheelPosition: 337.5,
    color: "#F9E79F", // jasny żółty
    questions: [
      "What are you fighting for right now — and is the intensity of your drive proportionate to what's actually at stake, or are older battles bleeding into this one?",
      "Is this forcefulness coming from your strength, or from your fear of what happens if you don't push hard enough?",
      "What would a version of this same drive look like if it came from groundedness rather than urgency — and what becomes possible then?"
    ]
  },
  
  // --- VIGILANCE subspectra (pomarańczowe odcienie) ---
  "anticipation": {
    id: "anticipation",
    name: "Oczekiwanie",
    nameEn: "Anticipation",
    description: "The act of looking forward to something, especially with pleasure or excitement.",
    spectrum: "subspectrum",
    parent: "vigilance",
    wheelPosition: 22.5,
    color: "#F8C471", // jasny pomarańczowy
    questions: [
      "What are you most looking forward to, and what does that desire reveal about who you're becoming?",
      "Is your anticipation rooted in hope, or in anxiety about the future? How can you tell the difference right now?",
      "What can you do today — just one small thing — that honors the future you're moving toward?"
    ]
  },
  "interest": {
    id: "interest",
    name: "Zainteresowanie",
    nameEn: "Interest",
    description: "A feeling of wanting to know or learn about something or someone.",
    spectrum: "subspectrum",
    parent: "vigilance",
    wheelPosition: 67.5,
    color: "#D5F5E3", // bardzo jasny zielony
    questions: [
      "What is pulling your attention right now — and when did you last follow a thread of genuine curiosity just to see where it leads, with no outcome in mind?",
      "Is this interest something new, or a returning signal — something you've been drawn to before but set aside? What made you set it aside?",
      "What would it look like to take this interest seriously, even just for an hour this week?"
    ]
  },
  "optimism": {
    id: "optimism",
    name: "Optymizm",
    nameEn: "Optimism",
    description: "Hopefulness and confidence about the future or the successful outcome of something.",
    spectrum: "subspectrum",
    parent: "vigilance",
    wheelPosition: 337.5,
    color: "#FCF3CF", // bardzo jasny żółty
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
