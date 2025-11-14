# 🎰 Gacha Simulator

A feature-rich gacha/gacha game simulator built with React. Collect rare items, manage your resources, and unlock achievements in this engaging idle game experience.

![Gacha Simulator](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Gameplay
- **Multiple Banners**: Standard, Weapon Rate-Up, and Support Rate-Up banners with different drop rates
- **Pity System**: Guaranteed SSR item every 90 pulls
- **Spark System**: Choose your desired item after 300 pulls
- **Wishlist**: Mark favorite items to receive them at spark threshold
- **Rarity Tiers**: SSR (Super Super Rare), SR (Super Rare), R (Rare), and N (Normal)

### Progression Systems
- **Daily Login Rewards**: Earn gems and tickets by logging in daily
- **Login Streak**: Increasing rewards for consecutive daily logins
- **Achievements**: 16+ achievements with gem rewards
- **Collection System**: Track all items you've obtained
- **Pull History**: Review your last 30 pulls with timestamps

### Economy
- **Gems**: Premium currency for pulling (💎)
- **Tickets**: Alternative currency for free pulls (🎫)
- **Duplicate Selling**: Convert extra items into gems
- **Achievement Rewards**: Earn gems by completing milestones

### Quality of Life
- **Sound Effects**: Toggle audio feedback for pulls and reveals
- **Skip Animations**: Instant results for faster gameplay
- **Persistent Progress**: All data saved to localStorage
- **Responsive UI**: Clean, modern interface with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/VawnDyu/Gacha.git

# Navigate to project directory
cd Gacha

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

### Pulling Items
1. **Single Pull**: Costs 100 gems or 1 ticket
2. **10-Pull**: Costs 900 gems (save 100 gems!)
3. **Ticket Pull**: Use free tickets earned from daily login

### Banners
- **Standard Banner**: Balanced rates across all item types
- **Weapon Rate-Up**: Increased SSR (5%) and SR rates for weapons
- **Support Rate-Up**: Higher SR rate (25%) for support items

### Pity & Spark
- **Pity Counter**: Resets to 0 after pulling an SSR
- **Spark Counter**: Accumulates across all pulls
- At 300 sparks, choose any item from your wishlist

### Daily Rewards
- Base reward: 100 gems
- Streak bonus: +10 gems per day
- Ticket reward: 1 ticket every 3 days

## 🏆 Achievements

| Achievement | Requirement | Reward |
|------------|-------------|---------|
| First Pull | Make 1 pull | 100 💎 |
| Getting Started | Make 10 pulls | 200 💎 |
| Dedicated | Make 50 pulls | 500 💎 |
| Veteran | Make 100 pulls | 1,000 💎 |
| Whale | Make 250 pulls | 2,500 💎 |
| Legend | Make 500 pulls | 5,000 💎 |
| First SSR | Pull your first SSR | 300 💎 |
| SSR Hunter | Pull 5 SSR items | 500 💎 |
| SSR Master | Pull 10 SSR items | 1,000 💎 |
| SSR Collector | Pull 25 SSR items | 2,500 💎 |
| Starting Collection | Own 5 unique items | 200 💎 |
| Growing Collection | Own 10 unique items | 500 💎 |
| Full Collection | Own all 18 items | 3,000 💎 |
| Lucky Strike | Pull SSR in first 10 pulls | 500 💎 |
| Daily Warrior | Login 7 days straight | 700 💎 |
| Dedicated Player | Login 30 days straight | 3,000 💎 |

## 📁 Project Structure

```
Gacha/
├── src/
│   ├── components/
│   │   ├── StatsView.jsx
│   │   ├── HistoryView.jsx
│   │   ├── SettingsView.jsx
│   │   └── ResultsScreen.jsx
│   ├── constants.js      # Game data and configuration
│   ├── gachaLogic.js     # Pull mechanics and RNG
│   ├── utils.js          # Helper functions
│   ├── hooks.js          # Custom React hooks
│   ├── App.jsx           # Main application
│   ├── App.css           # Styles
│   └── main.jsx          # Entry point
├── public/
├── package.json
└── README.md
```

## 🎨 Customization

### Adding New Items
Edit `src/constants.js` and add to the `ITEMS` array:

```javascript
{
  name: "Your Item Name",
  rarity: "SSR", // SSR, SR, R, or N
  probability: 0.006,
  emoji: "⚔️",
  id: 19
}
```

### Adjusting Drop Rates
Modify banner rates in `BANNERS` array in `constants.js`:

```javascript
{
  id: 'custom',
  name: 'Custom Banner',
  featured: [1, 2, 3], // Featured item IDs
  rates: { SSR: 0.10, SR: 0.20, R: 0.50, N: 0.70 }
}
```

### Changing Thresholds
Update constants in `constants.js`:

```javascript
export const PITY_THRESHOLD = 90;  // Pulls until guaranteed SSR
export const SPARK_THRESHOLD = 300; // Pulls until spark exchange
```

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Lucide React**: Icon library
- **localStorage**: Client-side persistence
- **Web Audio API**: Sound effects

## 📊 Statistics

The game tracks:
- Total pulls made
- Items collected (by rarity)
- Unique items owned
- Current pity counter
- Current spark counter
- Login streak
- Achievement progress

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by popular gacha games like Genshin Impact and Honkai Star Rail
- Built as a learning project for React state management and game mechanics
- Thanks to the open-source community for tools and inspiration

## 📧 Contact

Project Link: [https://github.com/VawnDyu/Gacha](https://github.com/VawnDyu/Gacha)

---
⭐ If you found this inspiring, consider giving it a star!

Made with ❤️ and ☕ by [VawnDyu]