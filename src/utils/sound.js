/**
 * Interactive Audio Engine for Rathika's Birthday Website
 * Supports HTML5 Audio with graceful procedural Web Audio synthesizer fallback!
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Procedural sound effects using Web Audio API
export const playPopSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    // Ignore audio errors silently
  }
};

export const playBlowSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.8);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch (e) {
    // Graceful fallback
  }
};

export const playSparkleSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const now = ctx.currentTime + idx * 0.07;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    });
  } catch (e) {
    // Ignore
  }
};

export const playHugSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const chord = [392.00, 493.88, 587.33, 783.99, 987.77]; // G major arpeggio
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime + i * 0.06;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    });
  } catch (e) {
    // Ignore
  }
};

// Procedural Ambient Music Synth (Active when no external mp3 is supplied)
class ProceduralMusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.mood = 'cheerful'; // 'cheerful' | 'emotional'
    this.intervalId = null;
    this.volume = 0.4;
  }

  start(mood = 'cheerful') {
    this.mood = mood;
    this.isPlaying = true;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (this.intervalId) clearInterval(this.intervalId);

    // Cheerful pentatonic melody notes vs Soft emotional dreamy piano chords
    const cheerfulNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
    const emotionalChords = [
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    let step = 0;
    const tickTime = this.mood === 'cheerful' ? 420 : 1200;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      try {
        const curCtx = getAudioContext();
        if (!curCtx) return;

        if (this.mood === 'cheerful') {
          // Playful music-box chime
          const note = cheerfulNotes[Math.floor(Math.random() * cheerfulNotes.length)];
          const osc = curCtx.createOscillator();
          const gain = curCtx.createGain();
          osc.type = 'triangle';
          const now = curCtx.currentTime;
          osc.frequency.setValueAtTime(note, now);
          gain.gain.setValueAtTime(0.06 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.connect(gain);
          gain.connect(curCtx.destination);
          osc.start(now);
          osc.stop(now + 0.55);
        } else {
          // Warm emotional piano chord
          const chord = emotionalChords[step % emotionalChords.length];
          step++;
          chord.forEach((freq, idx) => {
            const osc = curCtx.createOscillator();
            const gain = curCtx.createGain();
            osc.type = 'sine';
            const now = curCtx.currentTime + idx * 0.08;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.045 * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
            osc.connect(gain);
            gain.connect(curCtx.destination);
            osc.start(now);
            osc.stop(now + 1.5);
          });
        }
      } catch (err) {
        // Silently skip
      }
    }, tickTime);
  }

  setMood(newMood) {
    if (this.mood === newMood) return;
    this.mood = newMood;
    if (this.isPlaying) {
      this.start(newMood);
    }
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const proceduralPlayer = new ProceduralMusicPlayer();
