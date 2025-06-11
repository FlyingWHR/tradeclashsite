# Trade Clash - Animated GitHub Site

An animated landing page for Trade Clash, a real-world news powered trade war simulator where 16 agentic AI leaders make insane policy decisions and you profit from the economic chaos.

## 🎮 Features

### 🎨 Design
- **Figma-based Design**: Faithfully recreated from the original Trade Clash Figma design
- **Dark Theme**: Cyberpunk-inspired dark color scheme with gradient overlays
- **Typography**: DIN Alternate for headers and Inter for body text
- **Responsive**: Mobile-first design that works on all devices

### ✨ Animations
- **Hero Animations**: Staggered title animation with fade-in effects
- **Rolling Leaders**: Continuously rotating leader avatars
- **Live Leaderboard**: Rolling player rankings with dynamic updates
- **News Feed**: Real-time updating news cards with pulse animations
- **Floating Charts**: Animated economic visualizations
- **Particle Effects**: Subtle background particles for atmosphere
- **Scroll Animations**: Sections animate in as you scroll

### 🎯 Interactive Elements
- **Smooth Scrolling**: Navigation and scroll indicators
- **Hover Effects**: Enhanced interactions on all clickable elements
- **CTA Buttons**: Pulsing call-to-action buttons with click feedback
- **Chaos Meter**: Live chaos level indicator (fixed position)
- **Notifications**: Toast notifications for user feedback

### 🎁 Easter Eggs
- **Konami Code**: Enter ↑↑↓↓←→←→BA for maximum chaos mode
- **Random Animations**: Leader avatars randomly start rolling
- **Dynamic Content**: News updates and leaderboard changes

## 🚀 Quick Start

1. **Clone or Download**
   ```bash
   git clone [your-repo-url]
   cd trade-clash-website
   ```

2. **Open in Browser**
   ```bash
   # Simple HTTP server (Python 3)
   python -m http.server 8000
   
   # Or with Node.js
   npx serve .
   
   # Or just open index.html directly
   open index.html
   ```

3. **View the Site**
   Navigate to `http://localhost:8000` or open `index.html` directly

## 📁 Project Structure

```
trade-clash-website/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and animations
├── script.js           # Interactive JavaScript functionality
└── README.md           # This file
```

## 🎨 Design System

### Colors
- **Primary Background**: `#011415`
- **Secondary Background**: `#051616`
- **Tertiary Background**: `#0f1e1e`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#ffffffa8`
- **Text Disabled**: `#ffffff4d`
- **Accent Gradient**: `#ffffff` to `#ffffffcc`

### Typography
- **Display Font**: DIN Alternate (Bold, 700)
- **Body Font**: Inter (Regular 400, Medium 500, Semi-bold 600)
- **Font Sizes**: 13px to 96px (responsive scaling)

### Animations
- **Duration**: 0.3s to 8s depending on effect
- **Easing**: `ease`, `ease-out`, `ease-in-out`
- **Transforms**: Translate, scale, rotate combinations
- **Opacity**: Fade effects throughout

## 🎮 Interactive Features

### Navigation
- Fixed header with backdrop blur
- Smooth scrolling to sections
- Active state management

### Leaderboard Rolling
- Updates every 4 seconds
- 10 different player profiles
- Smooth transition animations
- Profit indicators with directional arrows

### Leader Avatars
- 10 leader avatars in a grid
- Hover effects with random rotation
- Some avatars randomly start rolling
- Responsive grid layout

### News Feed
- 4 news cards with live updates
- 8 different news scenarios
- Cards update randomly every 3 seconds
- Smooth transition effects

### Chaos Meter
- Fixed position indicator
- Live updating chaos percentage (75-100%)
- Color-coded levels (green → yellow → red)
- Hover effects for interaction

## 📱 Responsive Design

### Desktop (1200px+)
- Full layout with all features
- Large hero title (96px)
- 5-column leader grid

### Tablet (768px - 1200px)
- Adjusted padding and spacing
- Medium hero title (72px)
- Maintains functionality

### Mobile (< 768px)
- Single column layout
- Small hero title (48px)
- 2-column leader grid
- Stacked news cards

## 🎯 Performance

### Optimizations
- CSS animations over JavaScript where possible
- Efficient event listeners
- Minimal DOM manipulation
- Responsive images and fonts

### Loading
- External fonts loaded with `preconnect`
- CSS variables for consistent theming
- Optimized animation timing

## 🌟 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS Features**: Grid, Flexbox, CSS Variables, Animations
- **JavaScript**: ES6+ features, Intersection Observer API

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --text-primary: #ffffff;
    --bg-primary: #011415;
    /* ... other variables */
}
```

### Animations
Modify animation keyframes and durations:
```css
@keyframes rollContinuous {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

### Content
Update leaderboard players and news in `script.js`:
```javascript
const players = [
    { name: 'YourPlayer', profit: '+1000% ROI', trend: 'up' }
];
```

## 🎮 Trade Clash Game

This is a landing page for Trade Clash, a trade war simulator featuring:
- 16 AI world leaders making economic decisions
- Real-world news integration
- Economic model simulation
- Prediction market gameplay
- Profit from economic chaos

## 📄 License

This project is for demonstration purposes. Trade Clash is © 2025 Seroto Labs.

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

### Netlify
1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Deploy automatically

### Vercel
1. Import GitHub repository
2. Deploy with zero configuration
3. Automatic deployments on push

---

**Trade Clash**: AI overlords tank the economy. You bank the chaos. 🔥 