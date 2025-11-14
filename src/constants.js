// Constants
export const ITEMS = [
  { name: "Excalibur", rarity: "SSR", probability: 0.006, emoji: "⚔️", id: 1 },
  { name: "Demon Hunter Sword", rarity: "SSR", probability: 0.006, emoji: "🗡️", id: 2 },
  { name: "Holy Blade", rarity: "SSR", probability: 0.006, emoji: "✨", id: 3 },
  { name: "Dragon Scale Armor", rarity: "SSR", probability: 0.006, emoji: "🛡️", id: 4 },
  { name: "Phoenix Feather", rarity: "SSR", probability: 0.006, emoji: "🔥", id: 5 },
  { name: "Crystal Bow", rarity: "SR", probability: 0.03, emoji: "🏹", id: 6 },
  { name: "Angel Wing", rarity: "SR", probability: 0.03, emoji: "🪽", id: 7 },
  { name: "Fallen Angel Wing", rarity: "SR", probability: 0.03, emoji: "🦇", id: 8 },
  { name: "Magic Staff", rarity: "SR", probability: 0.03, emoji: "🪄", id: 9 },
  { name: "Ancient Scroll", rarity: "SR", probability: 0.03, emoji: "📜", id: 10 },
  { name: "Sandwich", rarity: "R", probability: 0.12, emoji: "🥪", id: 11 },
  { name: "Salad", rarity: "R", probability: 0.12, emoji: "🥗", id: 12 },
  { name: "Burger", rarity: "R", probability: 0.12, emoji: "🍔", id: 13 },
  { name: "Pizza", rarity: "R", probability: 0.12, emoji: "🍕", id: 14 },
  { name: "Sushi", rarity: "R", probability: 0.12, emoji: "🍣", id: 15 },
  { name: "10,000 Coins", rarity: "N", probability: 0.22, emoji: "💰", id: 16 },
  { name: "5,000 Coins", rarity: "N", probability: 0.26, emoji: "💵", id: 17 },
  { name: "1,000 Coins", rarity: "N", probability: 0.26, emoji: "💴", id: 18 }
];

export const BANNERS = [
  { id: 'standard', name: 'Standard Banner', featured: [], rates: { SSR: 0.03, SR: 0.15, R: 0.60, N: 0.74 } },
  { id: 'weapon', name: 'Weapon Rate-Up', featured: [1, 2, 3, 6], rates: { SSR: 0.05, SR: 0.17, R: 0.58, N: 0.70 } },
  { id: 'support', name: 'Support Rate-Up', featured: [4, 5, 7, 8, 9, 10], rates: { SSR: 0.04, SR: 0.25, R: 0.51, N: 0.71 } }
];

export const ACHIEVEMENTS = [
  { id: 1, name: "First Pull", desc: "Make your first pull", req: 1, icon: "🎯", reward: 100 },
  { id: 2, name: "Getting Started", desc: "Make 10 pulls", req: 10, icon: "🌟", reward: 200 },
  { id: 3, name: "Dedicated", desc: "Make 50 pulls", req: 50, icon: "🔥", reward: 500 },
  { id: 4, name: "Veteran", desc: "Make 100 pulls", req: 100, icon: "💪", reward: 1000 },
  { id: 5, name: "Whale", desc: "Make 250 pulls", req: 250, icon: "🐋", reward: 2500 },
  { id: 6, name: "Legend", desc: "Make 500 pulls", req: 500, icon: "👑", reward: 5000 },
  { id: 7, name: "First SSR", desc: "Pull your first SSR", req: 1, icon: "⭐", type: "ssr", reward: 300 },
  { id: 8, name: "SSR Hunter", desc: "Pull 5 SSR items", req: 5, icon: "🏆", type: "ssr", reward: 500 },
  { id: 9, name: "SSR Master", desc: "Pull 10 SSR items", req: 10, icon: "💎", type: "ssr", reward: 1000 },
  { id: 10, name: "SSR Collector", desc: "Pull 25 SSR items", req: 25, icon: "👸", type: "ssr", reward: 2500 },
  { id: 11, name: "Starting Collection", desc: "Own 5 unique items", req: 5, icon: "📦", type: "unique", reward: 200 },
  { id: 12, name: "Growing Collection", desc: "Own 10 unique items", req: 10, icon: "📚", type: "unique", reward: 500 },
  { id: 13, name: "Full Collection", desc: "Own all items", req: 18, icon: "🎊", type: "unique", reward: 3000 },
  { id: 14, name: "Lucky Strike", desc: "Pull an SSR within first 10 pulls", req: 10, icon: "🍀", type: "lucky", reward: 500 },
  { id: 15, name: "Daily Warrior", desc: "Login for 7 days straight", req: 7, icon: "📅", type: "streak", reward: 700 },
  { id: 16, name: "Dedicated Player", desc: "Login for 30 days straight", req: 30, icon: "🔰", type: "streak", reward: 3000 }
];

export const SELL_VALUES = { SSR: 100, SR: 50, R: 20, N: 5 };
export const STORAGE_KEY = 'gacha-save-v2';
export const PITY_THRESHOLD = 90;
export const SPARK_THRESHOLD = 300;