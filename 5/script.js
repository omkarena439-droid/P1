/**
 * ===================================================================
 * THE GRANTHI CASE — Core Interactive Investigation Engine
 * ===================================================================
 * Subject: GRANTHI
 * Created by: Her Best Friend
 * Theme: Mystery → Memories → Friendship
 * ===================================================================
 */

// Secret Password Configuration (Case-insensitive, trims spaces)
const SECRET_PASSWORD = "BESTFRIEND";

// Application State
const AppState = {
  currentStep: 1,
  totalSteps: 12,
  musicPlaying: false,
  soundMuted: false,
  quizAnswers: { q1: null, q2: null, q3: null },
  isThemeWarm: false,
  confettiActive: false
};

/* ===================================================================
   WEB AUDIO API SOUND DESIGN & AMBIENT SYNTHESIZER
   =================================================================== */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.synthInterval = null;
    this.ambientGain = null;
    this.isSynthesizing = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tactile Detective Click Sound
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Stamp Thud Sound
  playStamp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  // Success / Correct Chime
  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch (e) {}
  }

  // Subtle Wrong Buzz
  playWrong() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(130, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  // Vault Unlock Chime
  playUnlock() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.6);
      });
    } catch (e) {}
  }

  // Confetti Fanfare Celebration
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99], // C major
        [587.33, 739.99, 880.00], // D major
        [659.25, 830.61, 987.77], // E major
        [783.99, 987.77, 1174.66, 1318.51] // G/C high sparkle
      ];

      chords.forEach((chord, step) => {
        chord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + step * 0.18);

          gain.gain.setValueAtTime(0.2, this.ctx.currentTime + step * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + step * 0.18 + 0.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + step * 0.18);
          osc.stop(this.ctx.currentTime + step * 0.18 + 0.7);
        });
      });
    } catch (e) {}
  }

  // Generative Ambient Music Fallback
  // (In case user opens without custom mp3, provides a heartwarming ambient lofi background)
  startAmbientSynth() {
    if (this.isSynthesizing || this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.isSynthesizing = true;
      const progression = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [392.00, 493.88, 587.33, 698.46]  // G7
      ];
      let stepIndex = 0;

      const playChord = () => {
        if (!this.isSynthesizing || !this.ctx || this.isMuted) return;
        const currentChord = progression[stepIndex % progression.length];
        stepIndex++;

        currentChord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(AppState.isThemeWarm ? 1200 : 700, this.ctx.currentTime);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const volume = AppState.isThemeWarm ? 0.05 : 0.04;
          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 4.0);
        });
      };

      playChord();
      this.synthInterval = setInterval(playChord, 3800);
    } catch (e) {}
  }

  stopAmbientSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSynth();
    }
    return this.isMuted;
  }
}

const sounds = new SoundEngine();

/* ===================================================================
   BACKGROUND MUSIC CONTROLLER
   =================================================================== */

class MusicController {
  constructor() {
    this.audioEl = document.getElementById('bgMusic');
    this.toggleBtn = document.getElementById('musicToggleBtn');
    this.statusEl = document.getElementById('musicStatus');
    this.soundWavesEl = document.getElementById('soundWaves');
    this.isCustomMp3Active = false;

    if (this.audioEl) {
      this.audioEl.volume = 0.25; // 25% volume default
    }

    this.bindEvents();
  }

  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => {
        sounds.playClick();
        this.togglePlayback();
      });
    }

    // Monitor if mp3 has valid audio tracks or if it ends
    if (this.audioEl) {
      this.audioEl.addEventListener('error', () => {
        // If mp3 is not ready, start ambient synth fallback seamlessly
        if (AppState.musicPlaying) {
          sounds.startAmbientSynth();
        }
      });
    }
  }

  start() {
    if (AppState.musicPlaying) return;
    AppState.musicPlaying = true;
    sounds.init();

    if (this.audioEl) {
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isCustomMp3Active = true;
            this.updateUI(true);
          })
          .catch(() => {
            // Audio autoplay blocked or file is silent/fallback
            this.isCustomMp3Active = false;
            sounds.startAmbientSynth();
            this.updateUI(true);
          });
      }
    } else {
      sounds.startAmbientSynth();
      this.updateUI(true);
    }
  }

  togglePlayback() {
    if (AppState.musicPlaying) {
      AppState.musicPlaying = false;
      if (this.audioEl) this.audioEl.pause();
      sounds.stopAmbientSynth();
      this.updateUI(false);
    } else {
      AppState.musicPlaying = true;
      if (this.isCustomMp3Active && this.audioEl) {
        this.audioEl.play().catch(() => sounds.startAmbientSynth());
      } else {
        sounds.startAmbientSynth();
      }
      this.updateUI(true);
    }
  }

  setWarmVolume() {
    if (this.audioEl) {
      // Soften music volume gently during emotional section
      this.audioEl.volume = 0.18;
    }
  }

  updateUI(isPlaying) {
    if (!this.toggleBtn) return;
    if (isPlaying) {
      this.toggleBtn.classList.add('playing');
      if (this.statusEl) this.statusEl.textContent = 'MUSIC ON';
    } else {
      this.toggleBtn.classList.remove('playing');
      if (this.statusEl) this.statusEl.textContent = 'MUSIC OFF';
    }
  }
}

const music = new MusicController();

/* ===================================================================
   PARTICLES & BACKGROUND CANVAS ENGINE
   =================================================================== */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 35 : 65;
    this.animationId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.8 ? 'petal' : 'dot',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isWarm = AppState.isThemeWarm;

    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // Wrap around screen
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (isWarm) {
        // Soft romantic petals / warm golden sparkles
        if (p.type === 'petal') {
          this.ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity * 0.8})`;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size * 2, p.size, 0, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          this.ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity * 0.7})`;
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      } else {
        // Mystery detective particles (subtle magenta, purple, soft white radar motes)
        this.ctx.fillStyle = p.opacity > 0.5 
          ? `rgba(255, 51, 102, ${p.opacity * 0.7})` 
          : `rgba(160, 59, 255, ${p.opacity * 0.5})`;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

/* ===================================================================
   CONFETTI & CELEBRATION ENGINE
   =================================================================== */

class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.pieces = [];
    this.active = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 140) {
    this.active = true;
    AppState.confettiActive = true;
    const colors = ['#ff3366', '#ff85a1', '#ffd166', '#06d6a0', '#118ab2', '#b388eb', '#ffffff'];

    for (let i = 0; i < count; i++) {
      this.pieces.push({
        x: this.canvas.width * 0.5 + (Math.random() - 0.5) * 120,
        y: this.canvas.height * 0.55 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 6,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        shape: Math.random() > 0.4 ? 'rect' : 'heart',
        opacity: 1,
        gravity: 0.38
      });
    }

    this.render();
  }

  render() {
    if (!this.ctx || !this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const p = this.pieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.005;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        // Draw Heart
        const s = p.size * 0.6;
        this.ctx.beginPath();
        this.ctx.moveTo(0, s * 0.3);
        this.ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.5, 0, s * 1.4);
        this.ctx.bezierCurveTo(s * 1.2, s * 0.5, s, -s * 0.6, 0, s * 0.3);
        this.ctx.fill();
      }

      this.ctx.restore();

      if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
        this.pieces.splice(i, 1);
      }
    }

    if (this.pieces.length > 0) {
      requestAnimationFrame(() => this.render());
    } else {
      this.active = false;
      AppState.confettiActive = false;
    }
  }
}

let confettiEngine = null;

/* ===================================================================
   NAVIGATION & FLOW CONTROLLER
   =================================================================== */

class InvestigationFlow {
  constructor() {
    this.hudStepCounter = document.getElementById('hudStepCounter');
    this.hudProgressFill = document.getElementById('hudProgressFill');
    this.screens = document.querySelectorAll('.screen-section');

    this.bindButtons();
    this.initQuiz();
    this.initPassword();
  }

  // Update HUD progress indicators
  updateHUD(stepNumber) {
    AppState.currentStep = stepNumber;
    const formattedStep = stepNumber < 10 ? `0${stepNumber}` : stepNumber;
    const formattedTotal = AppState.totalSteps < 10 ? `0${AppState.totalSteps}` : AppState.totalSteps;

    if (this.hudStepCounter) {
      this.hudStepCounter.textContent = `STEP ${formattedStep} / ${formattedTotal}`;
    }

    if (this.hudProgressFill) {
      const percentage = (stepNumber / AppState.totalSteps) * 100;
      this.hudProgressFill.style.width = `${percentage}%`;
    }
  }

  // Smooth Transition to a Specific Step
  goToStep(targetStep) {
    if (targetStep < 1 || targetStep > AppState.totalSteps) return;

    const currentScreen = document.querySelector(`.screen-section.active`);
    const nextScreen = document.querySelector(`.screen-section[data-step="${targetStep}"]`);

    if (currentScreen) {
      currentScreen.style.opacity = '0';
      currentScreen.style.transform = 'translateY(-20px) scale(0.98)';
      setTimeout(() => {
        currentScreen.classList.remove('active');
        if (nextScreen) {
          nextScreen.classList.add('active');
          // Trigger step specific setup
          this.onStepEnter(targetStep);
          // Scroll page to top smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            nextScreen.style.opacity = '1';
            nextScreen.style.transform = 'translateY(0) scale(1)';
          }, 40);
        }
      }, 400);
    }

    this.updateHUD(targetStep);
  }

  // Actions triggered when entering a step
  onStepEnter(step) {
    switch (step) {
      case 2: // Intro Terminal
        this.runIntroTeleprompter();
        break;
      case 3: // Evidence #01 Threat Meter
        this.runThreatMeter();
        break;
      case 4: // Evidence #02 Stamp
        this.runEvidence2Stamp();
        break;
      case 5: // Evidence #03 Pagal Reveal
        this.runEvidence3Punchline();
        break;
      case 8: // Mood Shift (Now Step 8)
        this.activateWarmTheme();
        this.runMoodSequence();
        break;
      case 11: // Final Verdict (Now Step 11)
        this.runVerdictSequence();
        break;
      default:
        break;
    }
  }

  // Bind All Primary Navigation Buttons
  bindButtons() {
    // Screen 1 -> Screen 2
    const startBtn = document.getElementById('startInvestigationBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        sounds.playClick();
        music.start();
        this.goToStep(2);
      });
    }

    // Screen 2 -> Screen 3
    const viewEvidenceBtn = document.getElementById('viewEvidenceBtn');
    if (viewEvidenceBtn) {
      viewEvidenceBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(3);
      });
    }

    // Screen 3 -> Screen 4
    const ev1Btn = document.getElementById('evidence1NextBtn');
    if (ev1Btn) {
      ev1Btn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(4);
      });
    }

    // Screen 4 -> Screen 5
    const ev2Btn = document.getElementById('evidence2NextBtn');
    if (ev2Btn) {
      ev2Btn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(5);
      });
    }

    // Screen 5 -> Screen 6 (Memory Verification Quiz)
    const ev3Btn = document.getElementById('evidence3NextBtn');
    if (ev3Btn) {
      ev3Btn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(6);
      });
    }

    // Screen 6 Quiz Complete Proceed -> Screen 7 (Secret Lock)
    const quizProceedBtn = document.getElementById('quizProceedBtn');
    if (quizProceedBtn) {
      quizProceedBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(7);
      });
    }

    // Screen 8 Mood Shift -> Screen 9 (Confidential Letter)
    const toLetterBtn = document.getElementById('proceedToLetterBtn');
    if (toLetterBtn) {
      toLetterBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(9);
      });
    }

    // Screen 9 Letter -> Screen 10 (Friendship Promise)
    const letterNextBtn = document.getElementById('letterNextBtn');
    if (letterNextBtn) {
      letterNextBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(10);
      });
    }

    // Screen 10 Promise -> Screen 11 (Final Verdict)
    const promiseNextBtn = document.getElementById('promiseNextBtn');
    if (promiseNextBtn) {
      promiseNextBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(11);
      });
    }

    // Screen 11 Verdict -> Screen 12 (Final Surprise)
    const verdictProceedBtn = document.getElementById('verdictProceedBtn');
    if (verdictProceedBtn) {
      verdictProceedBtn.addEventListener('click', () => {
        sounds.playClick();
        this.goToStep(12);
      });
    }

    // Screen 12 Final Celebration: "CASE CLOSED ❤️"
    const caseClosedBtn = document.getElementById('caseClosedBtn');
    const postClosureBox = document.getElementById('postClosureBox');
    if (caseClosedBtn) {
      caseClosedBtn.addEventListener('click', () => {
        sounds.playCelebration();
        if (confettiEngine) {
          confettiEngine.burst(160);
          setTimeout(() => confettiEngine.burst(100), 600);
        }
        if (postClosureBox) {
          postClosureBox.classList.add('visible');
        }
      });
    }

    // Replay Button: Reset whole experience
    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sounds.playClick();
        this.resetInvestigation();
      });
    }

    // SFX Toggle
    const sfxBtn = document.getElementById('sfxToggleBtn');
    const sfxIcon = document.getElementById('sfxIcon');
    if (sfxBtn && sfxIcon) {
      sfxBtn.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        sfxIcon.textContent = isMuted ? '🔇' : '🔊';
      });
    }
  }

  /* ===================================================================
     MEMORY VERIFICATION QUIZ LOGIC (SCREEN 6)
     =================================================================== */

  initQuiz() {
    const questions = [
      document.getElementById('quizQuestion1'),
      document.getElementById('quizQuestion2'),
      document.getElementById('quizQuestion3')
    ];
    const quizCompleteStage = document.getElementById('quizCompleteStage');

    // Handle Question Option Clicks
    document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        const qNum = parseInt(targetBtn.getAttribute('data-q'), 10);
        const opt = targetBtn.getAttribute('data-opt');
        const feedbackEl = document.getElementById(`feedbackQ${qNum}`);

        // Disable options in this question
        const parentOptions = targetBtn.parentElement.querySelectorAll('.quiz-opt-btn');
        parentOptions.forEach(b => (b.disabled = true));

        if (qNum === 1) {
          // Question 1: Who is more pagal?
          // Correct answer: "Both 😭"
          if (opt === 'both') {
            targetBtn.classList.add('opt-correct');
            feedbackEl.textContent = 'CORRECT. Unfortunately, both are equally pagal. 😭';
            feedbackEl.style.color = '#27c93f';
            sounds.playSuccess();
          } else {
            targetBtn.classList.add('opt-wrong');
            feedbackEl.textContent = 'Nice try, Madam. 😂 Both are equally pagal!';
            feedbackEl.style.color = '#ff3b69';
            sounds.playWrong();
          }

          // Advance to Q2 after delay
          setTimeout(() => {
            if (questions[0]) questions[0].classList.remove('active');
            if (questions[1]) questions[1].classList.add('active');
          }, 1800);

        } else if (qNum === 2) {
          // Question 2: Who gets angry faster?
          // All have funny personalized reactions
          if (opt === 'granthi_angry') {
            targetBtn.classList.add('opt-correct');
            feedbackEl.textContent = 'Arey bilkul sach! 0 to 100 in 2.5 seconds flat! 😤😂';
            feedbackEl.style.color = '#ff85a1';
            sounds.playSuccess();
          } else if (opt === 'friend_calm') {
            targetBtn.classList.add('opt-wrong');
            feedbackEl.textContent = 'Jhoot bolne ki bhi limit hoti hai Madam! 😇😂';
            feedbackEl.style.color = '#ffbd2e';
            sounds.playWrong();
          } else {
            targetBtn.classList.add('opt-correct');
            feedbackEl.textContent = 'Bilkul! Mostly depends on hunger levels! 😂';
            feedbackEl.style.color = '#27c93f';
            sounds.playSuccess();
          }

          // Advance to Q3 after delay
          setTimeout(() => {
            if (questions[1]) questions[1].classList.remove('active');
            if (questions[2]) questions[2].classList.add('active');
          }, 1800);

        } else if (qNum === 3) {
          // Question 3: Who should make the first move after a fight?
          // Correct answer: "Both should talk 🫶🏻"
          if (opt === 'both_talk') {
            targetBtn.classList.add('opt-correct');
            feedbackEl.textContent = 'CORRECT. Self-respect side pe rakh ke baat karo. 🫶🏻';
            feedbackEl.style.color = '#27c93f';
            sounds.playSuccess();
          } else {
            targetBtn.classList.add('opt-wrong');
            feedbackEl.textContent = 'Aise kaise chalega? Both should talk! 🫶🏻';
            feedbackEl.style.color = '#ff3b69';
            sounds.playWrong();
          }

          // Show Quiz Completion Banner
          setTimeout(() => {
            if (questions[2]) questions[2].classList.remove('active');
            if (quizCompleteStage) {
              quizCompleteStage.classList.add('visible');
              sounds.playSuccess();
            }
          }, 1800);
        }
      });
    });
  }

  /* ===================================================================
     SECRET PASSWORD & DIGITAL VAULT (SCREEN 8)
     =================================================================== */

  initPassword() {
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('secretPasswordInput');
    const statusMsg = document.getElementById('passwordStatusMsg');
    const padlockIcon = document.getElementById('padlockIcon');
    const clueToggleBtn = document.getElementById('clueToggleBtn');
    const clueDrawer = document.getElementById('clueDrawer');
    const card = document.querySelector('.vault-lock-card');

    // Clue Toggle
    if (clueToggleBtn && clueDrawer) {
      clueToggleBtn.addEventListener('click', () => {
        sounds.playClick();
        clueDrawer.classList.toggle('open');
      });
    }

    if (passwordForm && passwordInput) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.verifyPassword(passwordInput.value);
      });
    }
  }

  verifyPassword(inputVal) {
    const passwordInput = document.getElementById('secretPasswordInput');
    const statusMsg = document.getElementById('passwordStatusMsg');
    const padlockIcon = document.getElementById('padlockIcon');
    const card = document.querySelector('.vault-lock-card');

    if (!inputVal || !inputVal.trim()) {
      if (statusMsg) {
        statusMsg.textContent = 'Password toh daal pehle Madam! 😂';
        statusMsg.className = 'password-status-msg denied';
      }
      sounds.playWrong();
      return;
    }

    // Cleaned input: remove spaces, uppercase
    const cleaned = inputVal.replace(/\s+/g, '').toUpperCase();
    const expected = SECRET_PASSWORD.replace(/\s+/g, '').toUpperCase();

    if (cleaned === expected) {
      // ACCESS GRANTED
      sounds.playUnlock();
      if (statusMsg) {
        statusMsg.textContent = 'ACCESS GRANTED. 🔓';
        statusMsg.className = 'password-status-msg granted';
      }
      if (padlockIcon) {
        padlockIcon.classList.add('unlocked');
      }

      // Smooth transition to Mood Shift (Step 8)
      setTimeout(() => {
        this.goToStep(8);
      }, 1400);

    } else {
      // ACCESS DENIED
      sounds.playWrong();
      if (statusMsg) {
        statusMsg.textContent = 'ACCESS DENIED. 😂 Madam, thoda aur soch.';
        statusMsg.className = 'password-status-msg denied';
      }
      if (card) {
        card.classList.remove('shake-element');
        void card.offsetWidth; // Trigger reflow
        card.classList.add('shake-element');
      }
      if (passwordInput) {
        passwordInput.select();
      }
    }
  }

  /* ===================================================================
     STEP SPECIFIC ANIMATIONS
     =================================================================== */

  // Screen 2: Intro Teleprompter & Identity Detection
  runIntroTeleprompter() {
    const lines = document.querySelectorAll('.animated-teleprompter .tele-line');
    const detectionBox = document.getElementById('detectionBox');
    const viewEvidenceBtn = document.getElementById('viewEvidenceBtn');

    lines.forEach(line => {
      const delay = parseInt(line.getAttribute('data-delay'), 10) || 500;
      setTimeout(() => {
        line.classList.add('visible');
        sounds.playClick();
      }, delay);
    });

    // Reveal Identity Detected Box
    setTimeout(() => {
      if (detectionBox) {
        detectionBox.classList.add('visible');
        sounds.playStamp();
      }
      if (viewEvidenceBtn) {
        viewEvidenceBtn.disabled = false;
        viewEvidenceBtn.classList.remove('disabled-initially');
        viewEvidenceBtn.classList.add('pulse-glow');
      }
    }, 7200);
  }

  // Screen 3: Threat Meter
  runThreatMeter() {
    const bar = document.getElementById('threatBar');
    setTimeout(() => {
      if (bar) {
        bar.style.width = '100%';
        sounds.playStamp();
      }
    }, 300);
  }

  // Screen 4: Evidence 2 Stamp
  runEvidence2Stamp() {
    const stamp = document.getElementById('confirmedStamp');
    setTimeout(() => {
      if (stamp) {
        stamp.classList.add('stamped');
        sounds.playStamp();
      }
    }, 450);
  }

  // Screen 5: Evidence 3 Pagal Punchline
  runEvidence3Punchline() {
    const part2 = document.getElementById('pagalPart2');
    const seriousAlert = document.getElementById('seriousAlert');

    setTimeout(() => {
      if (part2) {
        part2.classList.add('visible');
        sounds.playClick();
      }
    }, 1400);

    setTimeout(() => {
      if (seriousAlert) {
        seriousAlert.classList.add('visible');
        sounds.playStamp();
      }
    }, 2800);
  }

  // Screen 9: Mood Shift & Theme Transition
  activateWarmTheme() {
    AppState.isThemeWarm = true;
    document.body.classList.remove('theme-mystery');
    document.body.classList.add('theme-warm');
    music.setWarmVolume();
  }

  runMoodSequence() {
    const m1 = document.getElementById('mLine1');
    const m2 = document.getElementById('mLine2');
    const m3 = document.getElementById('mLine3');

    setTimeout(() => { if (m1) m1.classList.add('visible'); }, 400);
    setTimeout(() => { if (m2) m2.classList.add('visible'); }, 1400);
    setTimeout(() => {
      if (m3) {
        m3.classList.add('visible');
        sounds.playSuccess();
      }
    }, 2500);
  }

  // Screen 12: Courtroom Verdict Review Sequence
  runVerdictSequence() {
    const steps = document.querySelectorAll('.court-review-steps .court-step, .court-review-steps .court-pause-line, .court-review-steps .court-decision-announce');
    const guiltyContainer = document.getElementById('guiltyContainer');
    const charges = document.querySelectorAll('.charges-list .charge-item');
    const sentenceBox = document.querySelector('.sentence-box');

    steps.forEach(step => {
      const delay = parseInt(step.getAttribute('data-delay'), 10) || 400;
      setTimeout(() => {
        step.classList.add('visible');
        sounds.playClick();
      }, delay);
    });

    setTimeout(() => {
      if (guiltyContainer) {
        guiltyContainer.classList.add('visible');
        sounds.playStamp();
      }
    }, 4500);

    charges.forEach(charge => {
      const delay = parseInt(charge.getAttribute('data-delay'), 10) || 5000;
      setTimeout(() => {
        charge.classList.add('visible');
        sounds.playClick();
      }, delay);
    });

    setTimeout(() => {
      if (sentenceBox) {
        sentenceBox.classList.add('visible');
        sounds.playSuccess();
      }
    }, 7200);
  }

  // Reset Everything back to Case File #0017
  resetInvestigation() {
    AppState.currentStep = 1;
    AppState.isThemeWarm = false;
    AppState.currentPhotoIndex = 1;

    // Reset Theme
    document.body.classList.remove('theme-warm');
    document.body.classList.add('theme-mystery');

    // Reset Quiz
    document.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.disabled = false;
      b.classList.remove('opt-correct', 'opt-wrong');
    });
    document.querySelectorAll('.quiz-feedback-box').forEach(fb => {
      fb.textContent = '';
    });
    const quiz1 = document.getElementById('quizQuestion1');
    const quiz2 = document.getElementById('quizQuestion2');
    const quiz3 = document.getElementById('quizQuestion3');
    const quizComplete = document.getElementById('quizCompleteStage');
    if (quiz1) quiz1.classList.add('active');
    if (quiz2) quiz2.classList.remove('active');
    if (quiz3) quiz3.classList.remove('active');
    if (quizComplete) quizComplete.classList.remove('visible');

    // Reset Password
    const passwordInput = document.getElementById('secretPasswordInput');
    const passwordStatus = document.getElementById('passwordStatusMsg');
    const padlock = document.getElementById('padlockIcon');
    if (passwordInput) passwordInput.value = '';
    if (passwordStatus) passwordStatus.textContent = '';
    if (padlock) padlock.classList.remove('unlocked');

    // Reset Threat Meter
    const threatBar = document.getElementById('threatBar');
    if (threatBar) threatBar.style.width = '0%';

    // Reset Stamps
    const stamp2 = document.getElementById('confirmedStamp');
    if (stamp2) stamp2.classList.remove('stamped');

    // Reset Post Closure Dialogue
    const postClosure = document.getElementById('postClosureBox');
    if (postClosure) postClosure.classList.remove('visible');

    // Return to Step 1
    this.goToStep(1);
  }
}

/* ===================================================================
   INITIALIZATION ON DOM LOAD
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Canvas Systems
  new ParticleEngine('particleCanvas');
  confettiEngine = new ConfettiEngine('confettiCanvas');

  // Initialize Core Game Flow
  window.investigationGame = new InvestigationFlow();
});
