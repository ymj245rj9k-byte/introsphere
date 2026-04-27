import { Journey, JourneyDay } from '@/types/journey';

export const journeys: Journey[] = [
  {
    id: 'samopoznanie',
    title: 'Self Discovery',
    titleEn: 'Self Discovery',
    subtitle: 'A week of exploring who you are beneath the roles you play.',
    subtitleEn: 'A week of exploring who you are beneath the roles you play.',
    tone: 'gentle, exploratory',
    toneEn: 'gentle, exploratory',
    isActive: true,
    displayOrder: 1,
    icon: '🔍',
  },
  {
    id: 'granice',
    title: 'Boundaries',
    titleEn: 'Boundaries',
    subtitle: 'A week with the question: where do I end and someone else begins?',
    subtitleEn: 'A week with the question: where do I end and someone else begins?',
    tone: 'non-judgmental',
    toneEn: 'non-judgmental',
    isActive: true,
    displayOrder: 2,
    icon: '🚧',
  },
  {
    id: 'energia',
    title: 'Energy',
    titleEn: 'Energy',
    subtitle: 'A week of conscious life audit - what fuels me and what quietly drains me.',
    subtitleEn: 'A week of conscious life audit - what fuels me and what quietly drains me.',
    tone: 'practical & exploratory',
    toneEn: 'practical & exploratory',
    isActive: true,
    displayOrder: 3,
    icon: '⚡',
  },
  {
    id: 'wdziecznosc',
    title: 'Gratitude',
    titleEn: 'Gratitude',
    subtitle: "A week of gratitude that isn't just positive thinking - but truly seeing your life.",
    subtitleEn: "A week of gratitude that isn't just positive thinking - but truly seeing your life.",
    tone: 'warm, mindful',
    toneEn: 'warm, mindful',
    isActive: true,
    displayOrder: 4,
    icon: '🙏',
  },
  {
    id: 'decyzje',
    title: 'Decisions',
    titleEn: 'Decisions',
    subtitle: 'A week for heads that analyze instead of feel. Questions help shorten the path between thought and action.',
    subtitleEn: 'A week for heads that analyze instead of feel. Questions help shorten the path between thought and action.',
    tone: 'practical, a bit provocative',
    toneEn: 'practical, a bit provocative',
    isActive: true,
    displayOrder: 5,
    icon: '⚖️',
  },
  {
    id: 'relacje',
    title: 'Relationships',
    titleEn: 'Relationships',
    subtitle: 'A week with the question: how am I really with people - and what do I learn about myself through them?',
    subtitleEn: 'A week with the question: how am I really with people - and what do I learn about myself through them?',
    tone: 'reflective',
    toneEn: 'reflective',
    isActive: true,
    displayOrder: 6,
    icon: '💞',
  },
];

export const journeyDays: Record<string, JourneyDay[]> = {
  'samopoznanie': [
    { id: 1, journeyId: 'samopoznanie', dayNumber: 1, dayName: 'Monday', question: 'What did you need most as a child but didn\'t receive? Is this something you\'re still seeking in your adult life?', questionEn: 'What did you need most as a child but didn\'t receive?' },
    { id: 2, journeyId: 'samopoznanie', dayNumber: 2, dayName: 'Tuesday', question: 'What phrase - said to you in childhood - do you still hear in your head when something goes wrong?', questionEn: 'What phrase from childhood still echoes in your mind when things go wrong?' },
    { id: 3, journeyId: 'samopoznanie', dayNumber: 3, dayName: 'Wednesday', question: 'What entertained you endlessly before you learned you needed to be "productive"? When did you last do it?', questionEn: 'What did you love doing before you learned you had to be productive?' },
    { id: 4, journeyId: 'samopoznanie', dayNumber: 4, dayName: 'Thursday', question: 'What emotions did you have to hide or suppress as a child to be accepted? What happened to them?', questionEn: 'What emotions did you have to hide as a child to be accepted?' },
    { id: 5, journeyId: 'samopoznanie', dayNumber: 5, dayName: 'Friday', question: 'Imagine yourself as a little child. What would you want to tell them today - something no one told you back then?', questionEn: 'What would you tell your inner child today?' },
    { id: 6, journeyId: 'samopoznanie', dayNumber: 6, dayName: 'Saturday', question: 'What did you learn about love when you were small? Does this belief help you today or hold you back?', questionEn: 'What did you learn about love when you were young?' },
    { id: 7, journeyId: 'samopoznanie', dayNumber: 7, dayName: 'Sunday', question: 'Write a letter to your inner child. You don\'t need to have answers - just let them know you see them.', questionEn: 'Write a letter to your inner child.' },
  ],
  'granice': [
    { id: 8, journeyId: 'granice', dayNumber: 1, dayName: 'Monday', question: 'In what situation recently did you say "yes" when your whole body was saying "no"? What stopped you?', questionEn: 'When did you recently say yes when your body said no?' },
    { id: 9, journeyId: 'granice', dayNumber: 2, dayName: 'Tuesday', question: 'Who in your life regularly crosses your boundaries - and does this person know? Do you tell them yourself?', questionEn: 'Who regularly crosses your boundaries?' },
    { id: 10, journeyId: 'granice', dayNumber: 3, dayName: 'Wednesday', question: 'What did you learn about boundaries in the home where you grew up? Were boundaries respected, ignored, or punished?', questionEn: 'What did you learn about boundaries in your childhood home?' },
    { id: 11, journeyId: 'granice', dayNumber: 4, dayName: 'Thursday', question: "Where does setting boundaries feel like being 'bad,' 'selfish,' or 'difficult' to you? Where does this belief come from?", questionEn: 'Where does setting boundaries feel wrong to you?' },
    { id: 12, journeyId: 'granice', dayNumber: 5, dayName: 'Friday', question: 'What boundary do you know you should set - and how long have you been putting it off? What would change if you set it?', questionEn: 'What boundary have you been putting off setting?' },
    { id: 13, journeyId: 'granice', dayNumber: 6, dayName: 'Saturday', question: 'Are there areas where your boundaries are too rigid - where you use them as a wall instead of a door? What are they protecting?', questionEn: 'Are any of your boundaries too rigid?' },
    { id: 14, journeyId: 'granice', dayNumber: 7, dayName: 'Sunday', question: 'One boundary you want to start respecting for yourself - not towards others, but within.', questionEn: 'One boundary you want to start respecting within yourself.' },
  ],
  'energia': [
    { id: 15, journeyId: 'energia', dayNumber: 1, dayName: 'Monday', question: 'Think about the last week - when did you feel most alive and light? What was happening, who were you with, what were you doing?', questionEn: 'When did you feel most alive last week?' },
    { id: 16, journeyId: 'energia', dayNumber: 2, dayName: 'Tuesday', question: 'What do you regularly do that leaves you empty - obligation, relationship, habit, environment? Should you change it or accept it?', questionEn: 'What regularly leaves you feeling empty?' },
    { id: 17, journeyId: 'energia', dayNumber: 3, dayName: 'Wednesday', question: "Is there something you avoid because you 'don't have energy' - but what could actually give you that energy back?", questionEn: "What could give you back energy you think you don't have?" },
    { id: 18, journeyId: 'energia', dayNumber: 4, dayName: 'Thursday', question: 'Which people in your life charge you up, and which drain you? Does the amount of time you spend with them reflect this?', questionEn: 'Which people charge you up and which drain you?' },
    { id: 19, journeyId: 'energia', dayNumber: 5, dayName: 'Friday', question: "Where in your body do you feel fatigue that sleep doesn't cure? What is it trying to tell you?", questionEn: "Where in your body do you feel fatigue sleep doesn't cure?" },
    { id: 20, journeyId: 'energia', dayNumber: 6, dayName: 'Saturday', question: 'What belief or life role costs you the most energy - something you are, not just something you do?', questionEn: 'What belief or role costs you the most energy?' },
    { id: 21, journeyId: 'energia', dayNumber: 7, dayName: 'Sunday', question: "If you could reclaim 30% of your energy tomorrow - with one small change - what would it be?", questionEn: 'What one small change would reclaim 30% of your energy?' },
  ],
  'wdziecznosc': [
    { id: 22, journeyId: 'wdziecznosc', dayNumber: 1, dayName: 'Monday', question: 'What are you grateful for but rarely think about - something so obvious it\'s become invisible?', questionEn: 'What are you grateful for but rarely think about?' },
    { id: 23, journeyId: 'wdziecznosc', dayNumber: 2, dayName: 'Tuesday', question: 'Think about a difficult situation from your past. Is there anything - even one thing - you\'re grateful you went through?', questionEn: 'Is there something difficult you\'re grateful you experienced?' },
    { id: 24, journeyId: 'wdziecznosc', dayNumber: 3, dayName: 'Wednesday', question: 'Who did something small for you that had big meaning - and does this person know how much it helped?', questionEn: 'Who did something small that meant a lot to you?' },
    { id: 25, journeyId: 'wdziecznosc', dayNumber: 4, dayName: 'Thursday', question: 'What trait of yours do you rarely thank yourself for - something you just do, not thinking it\'s a gift?', questionEn: 'What trait do you rarely thank yourself for?' },
    { id: 26, journeyId: 'wdziecznosc', dayNumber: 5, dayName: 'Friday', question: 'What in your life - relationship, place, opportunity - might not exist in a few years? How can you appreciate it now?', questionEn: 'What might not exist in a few years that you can appreciate now?' },
    { id: 27, journeyId: 'wdziecznosc', dayNumber: 6, dayName: 'Saturday', question: 'Does gratitude come easily to you, or do you have to force it? What makes it hard to feel on some days?', questionEn: 'Does gratitude come easily to you?' },
    { id: 28, journeyId: 'wdziecznosc', dayNumber: 7, dayName: 'Sunday', question: 'Write to yourself from a future you don\'t yet have - and thank the present for what it\'s building.', questionEn: 'Write to your future self thanking the present.' },
  ],
  'decyzje': [
    { id: 29, journeyId: 'decyzje', dayNumber: 1, dayName: 'Monday', question: 'What decision have you been putting off for over a month? Write it down. Now ask: what are you really afraid of if you make it?', questionEn: 'What decision have you been putting off?' },
    { id: 30, journeyId: 'decyzje', dayNumber: 2, dayName: 'Tuesday', question: "If you could trust only your body - without analyzing - what does it say about this decision? Yes or no?", questionEn: "What does your body say about the decision you're putting off?" },
    { id: 31, journeyId: 'decyzje', dayNumber: 3, dayName: 'Wednesday', question: "Imagine that a year from now you've made this decision. Version A: you did. Version B: you didn't. Which do you remember with relief?", questionEn: 'Which version of the decision would you remember with relief?' },
    { id: 32, journeyId: 'decyzje', dayNumber: 4, dayName: 'Thursday', question: 'Are you seeking more information because you really need it - or because more information = procrastinating responsibility?', questionEn: 'Are you seeking more info or just procrastinating?' },
    { id: 33, journeyId: 'decyzje', dayNumber: 5, dayName: 'Friday', question: 'Who besides yourself are you really making this decision for? Whose opinion lives in your head, and what does it cost you?', questionEn: 'Who are you really making this decision for?' },
    { id: 34, journeyId: 'decyzje', dayNumber: 6, dayName: 'Saturday', question: 'What is the worst thing that can happen if you decide wrong? Now: can you live with it? Usually you can.', questionEn: "What's the worst that can happen if you decide wrong?" },
    { id: 35, journeyId: 'decyzje', dayNumber: 7, dayName: 'Sunday', question: "There's no perfect decision - there's only your decision and what you do with it. What do you need to hear to finally jump?", questionEn: 'What do you need hear to finally decide?' },
  ],
  'relacje': [
    { id: 36, journeyId: 'relacje', dayNumber: 1, dayName: 'Monday', question: 'In which relationship in your life do you feel most like yourself? What does this relationship have that others lack?', questionEn: 'In which relationship do you feel most like yourself?' },
    { id: 37, journeyId: 'relacje', dayNumber: 2, dayName: 'Tuesday', question: 'What pattern repeats in your relationships - something that appears with different people, at different life moments? What does it say about you?', questionEn: 'What pattern repeats in your relationships?' },
    { id: 38, journeyId: 'relacje', dayNumber: 3, dayName: 'Wednesday', question: 'Is there someone you behave differently with than you\'d like - more submissive, more tense, smaller? Why with this person?', questionEn: 'With whom do you behave differently than you\'d like?' },
    { id: 39, journeyId: 'relacje', dayNumber: 4, dayName: 'Thursday', question: 'What do you need in relationships that you rarely or never ask for directly? What stops you from asking?', questionEn: 'What do you need in relationships but rarely ask for?' },
    { id: 40, journeyId: 'relacje', dayNumber: 5, dayName: 'Friday', question: "Is there someone you still 'keep score' with - old guilt, old wound? What would happen if you closed this account?", questionEn: "Is there someone you still keep score with?" },
    { id: 41, journeyId: 'relacje', dayNumber: 6, dayName: 'Saturday', question: 'How close do you really let others in? Where do you draw the line - and what is it protecting?', questionEn: 'How close do you really let others in?' },
    { id: 42, journeyId: 'relacje', dayNumber: 7, dayName: 'Sunday', question: 'What is one thing you can do this week to make one important relationship a little deeper or more authentic?', questionEn: 'What can you do to deepen one relationship this week?' },
  ],
};

export function getJourneyById(id: string): Journey | undefined {
  return journeys.find(j => j.id === id);
}

export function getJourneyDays(journeyId: string): JourneyDay[] {
  return journeyDays[journeyId] || [];
}

export function getJourneyDay(journeyId: string, dayNumber: number): JourneyDay | undefined {
  return journeyDays[journeyId]?.find(d => d.dayNumber === dayNumber);
}
