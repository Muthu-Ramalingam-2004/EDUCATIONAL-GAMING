import confetti from 'canvas-confetti';

export function fireConfetti() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFB800', '#1E56A0', '#10B981']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#8B5CF6', '#EC4899', '#3B82F6']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FFD700', '#FFA500', '#00E5FF']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch (err) {
    console.warn('Confetti trigger skipped', err);
  }
}
