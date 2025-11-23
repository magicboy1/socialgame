let audioContext: AudioContext | null = null;
let hasInteracted = false;

function getAudioContext(): AudioContext | null {
  if (!hasInteracted) return null;
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
      return null;
    }
  }
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  return audioContext;
}

export function initAudio() {
  hasInteracted = true;
  getAudioContext();
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function playChord(frequencies: number[], duration: number, type: OscillatorType = 'sine') {
  frequencies.forEach(freq => playTone(freq, duration, type));
}

export const sounds = {
  playSelect: () => {
    playTone(600, 0.1, 'sine');
  },

  playCorrect: () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    playTone(523.25, 0.15, 'sine');
    setTimeout(() => playTone(659.25, 0.15, 'sine'), 100);
    setTimeout(() => playTone(783.99, 0.25, 'sine'), 200);
  },

  playIncorrect: () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    playTone(300, 0.15, 'sine');
    setTimeout(() => playTone(250, 0.2, 'sine'), 120);
  },

  playAdvance: () => {
    playTone(800, 0.1, 'sine');
    setTimeout(() => playTone(1000, 0.1, 'sine'), 80);
  },

  playVictory: () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    playChord([523.25, 659.25], 0.2, 'sine');
    setTimeout(() => playChord([587.33, 739.99], 0.2, 'sine'), 150);
    setTimeout(() => playChord([659.25, 830.61], 0.2, 'sine'), 300);
    setTimeout(() => playChord([783.99, 987.77], 0.4, 'sine'), 450);
  },

  playStart: () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    playTone(523.25, 0.15, 'sine');
    setTimeout(() => playTone(659.25, 0.15, 'sine'), 100);
    setTimeout(() => playTone(783.99, 0.15, 'sine'), 200);
    setTimeout(() => playTone(1046.50, 0.25, 'sine'), 300);
  },
};
