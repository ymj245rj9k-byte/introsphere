import { useState } from 'react';
import { Emotion } from '@/types/emotion';
import { Button } from '@/components/ui/button';
import { getSubSpectrumForParent, getEmotion } from '@/data/emotions';

interface EmotionDetailsProps {
  emotion: Emotion;
  open: boolean;
  onClose: () => void;
  onConfirm: (emotion: Emotion) => void;
}

// Import questions from docs - mapping based on docs/questions.md
const emotionQuestions: Record<string, string[]> = {
  ecstasy: [
    'What is this overwhelming feeling trying to show you about what you\'re truly alive for?',
    'Do you let yourself stay in moments this big, or do you shrink from them? What would it take to really let this in?',
    'How has your capacity to feel joy this deeply been shaped by the hard things you\'ve survived?'
  ],
  joy: [
    'What specifically is making you feel this joy right now — and what does it tell you about what you truly value?',
    'How fully are you letting yourself receive this feeling, or are you already waiting for it to pass?',
    'Who in your life deserves to hear about this moment, and what\'s stopping you from sharing it with them?'
  ],
  serenity: [
    'What conditions in your life right now are allowing you to feel this calm — and how can you protect or cultivate them more intentionally?',
    'Is this serenity something you arrived at, or something you\'re allowing? What\'s the difference for you?',
    'What would it mean to trust that you deserve to feel this peaceful — not as a reward, but as your natural state?'
  ],
  love: [
    'What is it about this person, place, or thing that makes your heart open — and what does that openness tell you about who you are?',
    'Are you letting yourself be as loved as you are loving right now, or is receiving harder than giving?',
    'How has learning to love — and be loved — changed you? What part of you is still learning?'
  ],
  admiration: [
    'What is it about this person or situation that commands your admiration — and what does that reveal about the qualities you value most in yourself or others?',
    'Have you ever withheld admiration from someone who deserved it — what was the fear or insecurity underneath that?',
    'How does it feel in your body when you genuinely admire someone? Can you let yourself feel that without envy or diminishment?'
  ],
  trust: [
    'What is it about this person or situation that makes you feel safe enough to trust? What does that reflect about your needs?',
    'Have you ever withheld trust from someone or something that deserved it — what was the fear underneath that?',
    'How does it feel in your body when you fully trust? Can you let yourself rest in that right now?'
  ],
  acceptance: [
    'What are you accepting right now — and is it true acceptance, or is there still a part of you fighting it quietly underneath?',
    'Is there something you\'ve been resisting that you already know, deep down, you need to make peace with?',
    'What would become possible in your life if you stopped needing things to be different than they are?'
  ],
  terror: [
    'Can you locate where this terror lives in your body right now — your chest, throat, stomach? Place a hand there. What does that part of you need to hear?',
    'Has your nervous system been here before? How old does this fear feel — is it speaking from the present, or from a much younger version of you?',
    'You have survived every worst moment that came before this one. What does that survival tell you about your capacity to get through what\'s in front of you?'
  ],
  fear: [
    'What is this fear actually trying to protect you from — and is that threat real right now, or is it a memory or story?',
    'When did you first learn to be afraid of this? Whose voice does this fear sound like?',
    'If you knew you were completely safe, what would you do differently today?'
  ],
  apprehension: [
    'What exactly are you dreading — can you name it clearly, or does it feel too vague to hold? Sometimes naming a fear shrinks it. Try.',
    'Is this unease pointing to something real that needs your attention, or is it an old alarm going off in a situation that no longer requires it?',
    'What would you do right now if this low hum of worry simply wasn\'t there? What does that tell you about what you want?'
  ],
  amazement: [
    'What did you believe that this moment just proved wrong — and does losing that belief feel like a loss, or a liberation?',
    'How often do you let yourself be genuinely surprised by life, or do you tend to brace for things so you won\'t be caught off guard?',
    'What would it mean to move through your days with just a little more openness to being amazed — even by small, ordinary things?'
  ],
  surprise: [
    'What expectation or assumption got disrupted here — and is it possible the disruption was for your growth?',
    'What does your reaction to this surprise reveal about what you were holding onto?',
    'If this unexpected thing turned out to be exactly what you needed, how might you see it differently?'
  ],
  distraction: [
    'What are you distracting yourself from right now — and is the distraction giving you rest, or helping you avoid something that needs your attention?',
    'When you scatter your focus like this, what feeling are you most trying to not sit with?',
    'What would it look like to give just five minutes of full, undivided presence to one thing today — and what comes up when you imagine doing that?'
  ],
  grief: [
    'What or who are you grieving — and have you let yourself cry, not to fix anything, but just to say: this mattered, and losing it hurts?',
    'Grief often carries guilt, anger, or relief inside it. What unexpected emotion is hiding inside yours right now?',
    'What did the thing you lost give you that you\'re afraid you won\'t find again? How can you start to offer that to yourself?'
  ],
  sadness: [
    'What or who are you grieving right now — and have you allowed yourself to fully feel that loss without rushing to fix it?',
    'What does this sadness need from you? Not to solve it — just to be witnessed.',
    'Is there something beautiful about what you\'re sad over — something worth honoring before you let it go?'
  ],
  pensiveness: [
    'What are you quietly mourning right now — something lost, something that never was, or a version of yourself you\'ve had to let go of?',
    'Is this melancholy asking you to slow down and feel something, or has it become a comfortable place to hide from something harder?',
    'What small, tender thing could you do today to honor this feeling without drowning in it?'
  ],
  loathing: [
    'What core value is so deeply violated here that it produces this intensity of feeling? The strength of the reaction usually maps to the depth of the value.',
    'Is any part of what you loathe something you recognize — even faintly, even uncomfortably — in yourself? This isn\'t about blame. It\'s about what this reaction is here to teach you.',
    'What would it mean to hold your values this fiercely while releasing the consuming energy of loathing itself — to care without being corroded by it?'
  ],
  disgust: [
    'What value or boundary is being violated that\'s causing this feeling of disgust? What does that tell you about what matters to you?',
    'Is there any part of what repels you that you also recognize — even faintly — in yourself?',
    'What would it look like to address what disgusts you from a place of values rather than judgment?'
  ],
  boredom: [
    'What in your life has lost its meaning for you — and is this boredom a signal that you\'ve outgrown something, or that you\'re avoiding the effort something requires?',
    'When did you last feel genuinely engaged and alive in what you were doing? What was different then?',
    'What are you tolerating in your daily life that, if you\'re honest, you know is slowly draining you?'
  ],
  rage: [
    'Before anything else — can you find somewhere safe to let this move through your body? Rage held still in the mind becomes poison. What does your body need to do right now?',
    'Underneath this rage, what is the deepest wound? Not the trigger — the wound. When did you first feel this powerless, this unseen, this wronged?',
    'What would justice actually look like here — not revenge, not numbing — but something that would let you feel like your pain was finally acknowledged?'
  ],
  anger: [
    'What boundary, need, or value feels like it\'s been crossed right now? Underneath the anger — what\'s the hurt?',
    'Is this anger familiar? Does it remind you of a feeling from earlier in your life you never fully expressed?',
    'What would you need in order to feel truly heard in this situation — and who is the right person to express it to?'
  ],
  annoyance: [
    'What small thing is irritating you — and is it actually about this, or is it the latest in a series of things you\'ve been swallowing without saying anything?',
    'Annoyance often points to a need that isn\'t being met. What do you need right now that you haven\'t asked for?',
    'What would you say if you knew you could say it without consequence — and why haven\'t you said it?'
  ],
  vigilance: [
    'Your nervous system is on high alert — what is it scanning for? Is the threat real and present, or has your body learned to prepare for something that already happened long ago?',
    'What would it feel like to stand down, even briefly — to trust that you don\'t have to watch everything all the time? What makes that feel impossible right now?',
    'Who or what taught you that you had to be this vigilant to be safe? Have you ever tried to thank that part of yourself, even as you try to give it some rest?'
  ],
  anticipation: [
    'What are you most looking forward to, and what does that desire reveal about who you\'re becoming?',
    'Is your anticipation rooted in hope, or in anxiety about the future? How can you tell the difference right now?',
    'What can you do today — just one small thing — that honors the future you\'re moving toward?'
  ],
  interest: [
    'What is pulling your attention right now — and when did you last follow a thread of genuine curiosity just to see where it leads, with no outcome in mind?',
    'Is this interest something new, or a returning signal — something you\'ve been drawn to before but set aside? What made you set it aside?',
    'What would it look like to take this interest seriously, even just for an hour this week?'
  ]
};

interface SubEmotion {
  id: string;
  name: string;
  nameEn: string;
  intensity: number;
  color: string;
}

export function EmotionDetails({ emotion, open, onClose, onConfirm }: EmotionDetailsProps) {
  if (!open) return null;

  const [showSubSpectrum, setShowSubSpectrum] = useState(false);
  const [selectedSubEmotion, setSelectedSubEmotion] = useState<Emotion | null>(null);

  const subSpectrum = getSubSpectrumForParent(emotion.parentId ?? '').map(sub => {
    const fullEmotion = sub.id ? getEmotion(sub.id) : undefined;
    return {
      ...sub,
      color: fullEmotion?.color || '#FFFFFF'
    } as SubEmotion;
  });

  const questions = emotionQuestions[emotion.id] || 
                  subSpectrum.flatMap(sub => sub.id ? emotionQuestions[sub.id] : []).slice(0, 3) ||
                  ['How are you feeling right now?'];

  const handleConfirm = () => {
    onConfirm(selectedSubEmotion || emotion);
    onClose();
  };

  if (showSubSpectrum) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
          onClick={onClose}
        />

        {/* Sub-spectrum Dialog */}
        <div className="relative bg-surface rounded-xl border border-border shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: emotion.color }}
            >
              <span className="text-2xl">{emotion.name[0]}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{emotion.name}</h2>
              <p className="text-sm text-muted-foreground">{emotion.nameEn}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Choose more specifically:</p>
            <div className="grid grid-cols-2 gap-2">
              {subSpectrum.map((sub) => (
                <button
                  key={sub.id}
                  className={`p-3 rounded-lg border text-left ${
                    selectedSubEmotion?.id === sub.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                  style={{ backgroundColor: `${sub.color}20`, borderColor: sub.color }}
                  onClick={() => sub.id ? setSelectedSubEmotion(getEmotion(sub.id) as Emotion) : undefined}
                >
                  <p className="font-medium text-foreground">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.nameEn}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedSubEmotion(null);
                setShowSubSpectrum(false);
              }} 
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedSubEmotion(emotion);
                setShowSubSpectrum(false);
              }} 
              className="flex-1"
            >
              Stay with {emotion.nameEn}
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1"
              disabled={!selectedSubEmotion}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'color-mix(in srgb, var(--atmosphere-bg) 80%, transparent)' }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-surface rounded-xl border border-border shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: emotion.color }}
          >
            <span className="text-2xl">{emotion.name[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{emotion.name}</h2>
            <p className="text-sm text-muted-foreground">{emotion.nameEn}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-foreground">Pytania do refleksji:</p>
          <ul className="space-y-2">
            {questions.slice(0, 3).map((q, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Zamknij
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowSubSpectrum(true)} 
            className="flex-1"
          >
            Doprecyzuj
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Wybierz
          </Button>
        </div>
      </div>
    </div>
  );
}