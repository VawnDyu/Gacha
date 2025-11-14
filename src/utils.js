import { ITEMS, STORAGE_KEY } from "./constants";

// Utilities
export const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const playSound = (type, soundEnabled) => {
  if (!soundEnabled) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const sounds = {
    pull: { freq: 800, duration: 0.1, gain: 0.3 },
    ssr: { freq: 1200, duration: 0.3, gain: 0.4 },
    reveal: { freq: 600, duration: 0.2, gain: 0.2 }
  };

  const sound = sounds[type];
  if (sound) {
    oscillator.frequency.value = sound.freq;
    gainNode.gain.setValueAtTime(sound.gain, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  }
};

export const calculateSSRCount = (collection) => {
  return Object.entries(collection)
    .filter(([name]) => ITEMS.find(i => i.name === name)?.rarity === "SSR")
    .reduce((sum, [_, count]) => sum + count, 0);
};

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];