# Trade Clash — Sealed-Lot Polymarket Auction Game

Consolidated design doc. Single source of truth.
Last updated: 2026-03-28
Status: APPROVED — ready for implementation
Branch: pivot/auction-game

---

## One-Liner

A multiplayer auction game where players bid on hidden portfolios of real-world prediction market positions — displayed on a 3D globe — and profit by outpricing each other.

---

## Visual Direction

### Aesthetic: Dark Terminal — Polished & Modern

The existing Trade Clash aesthetic (warm orange terminal) evolves into a darker, more polished modern look. Think WorldMonitor meets Bloomberg Terminal meets high-end crypto dashboard.

**Color System:**
- **Background:** Pure black (#000000) to near-black (#0A0A0A). No gray backgrounds. Black is the canvas.
- **Surfaces:** Dark glass panels with subtle borders (#111111 bg, 1px #1A1A1A border, backdrop-blur)
- **Primary accent:** Warm orange (#D97706) — used sparingly for CTAs, active states, and the most important numbers
- **Secondary accent:** Cool teal (#0F766E) — used for secondary info, links, and supporting UI
- **Positive:** Emerald green (#10B981) — profit, wins, successful bids
- **Negative:** Rose red (#EF4444) — losses, overpays, timer urgency
- **Text hierarchy:**
  - Primary text: #F9FAFB (near-white)
  - Secondary text: #9CA3AF (gray-400)
  - Tertiary/muted: #4B5563 (gray-600)

**Typography:**
- **Hanson Bold** — headlines, lot titles, player handles, key numbers. All-caps. High impact.
- **Inter / System** — body text, signals, bid history. Clean and legible.
- **Monospace** — dollar amounts, prices, position data. Financial precision feel.

**Surfaces & Effects:**
- **Glassmorphism:** rgba(10, 10, 10, 0.85) + backdrop-blur(16px) for floating panels
- **Border glow:** 1px borders that subtly glow orange on active/hover states
- **No harsh shadows.** Use subtle border-based depth instead.
- **LED indicator dots** — small colored dots for status (green = live, amber = pending, red = ended)
- **Minimal border-radius:** 8px for cards, 6px for inputs, 4px for tags. Not rounded-full — modern, not cute.

**Animation Philosophy:**
- **Fast, purposeful.** No gratuitous animation. Every motion communicates state change.
- **Timer:** smooth countdown, amber glow at 10s, red pulse at 5s — this is the heartbeat of the game
- **Reveal:** 1-2 second suspense beat (screen dims), then positions flip in one by one
- **Profit/Loss:** number counts up/down to final value. Green flash for profit, red shake for overpay.
- **Globe transitions:** smooth camera pan to lot region on street start. Not cinematic swoops — fast and functional.
- **Bid submission:** subtle pulse/confirmation animation. The player needs to know their bid was received.

**Globe:**
- Keep low-poly Earth model — it's distinctive and performant
- Darker atmosphere (reduce ambient glow, increase contrast)
- Region highlights: subtle glow in lot category color, not harsh overlays
- Active auction: pulsing region with orange ring
- Post-reveal: brief green/red flash on region

**Overall feel:** The UI should feel like a high-stakes trading floor — dense with information, zero wasted space, every element earns its pixels. Dark, confident, professional. Not playful, not cartoonish.

---

## Game Rules (Final — Locked)

### Structure
- **Atomic unit:** 1 lot auction = 3 streets + reveal (~3-5 min)
- **Room:** 2-4 players. Open seating. Join/leave between lots. Room persists.
- **Continuous play:** After reveal, ~10s cooldown, next lot auto-deals.

### Lot Composition
- **7 positions per lot** (always)
- **Position distribution by table size:**

| Players | Private (1 each) | Shared (Streets 2+3) | Hidden ("burn") |
|---------|------------------|----------------------|-----------------|
| 2       | 2                | 2                    | 3               |
| 3       | 3                | 2                    | 2               |
| 4       | 4                | 2                    | 1               |

- Always ≥1 hidden position no one sees (the "burn card" — prevents game from being solvable)

### Street 1 — "The Peek"
- **Shared info:** Category + Payout range + Position count (3 signals)
- **Private info:** Each player sees 1 different fully-revealed position (market name, side, entry, currentPrice, size). Dealt at start — you have your "hole card" from the beginning.
- **Action:** Sealed bid (or $0 to pass). 30 seconds.
- **After timer:** ALL BIDS REVEALED to all players.
- **First-place win check:** If highest bid > second-highest by ≥50%, first place wins immediately. Skip to reveal.

### Street 2 — "The Flip"
- **New shared info:** 1 position revealed to ALL players (not one dealt privately)
- **Known:** Your private position + 1 shared position + all Street 1 bids
- **Action:** Sealed bid (independent, any amount). 30 seconds.
- **After timer:** ALL BIDS REVEALED.
- **First-place win check:** If highest bid > second-highest by ≥20%, first place wins immediately. Skip to reveal.

### Street 3 — "The River"
- **New shared info:** 1 MORE position revealed to ALL players
- **Known:** Your private position + 2 shared positions + all previous bids
- **Action:** Final sealed bid. 30 seconds.
- **No first-place win check.** Normal auction — highest bid wins.

### The Reveal
- All 7 positions exposed (including burn cards no one saw)
- trueValue calculated: `sum of (currentPrice - entry) × size`
- All players' bids from ALL 3 streets shown (bid evolution narrative)
- **Winner = highest final-street bid.** Ties broken by earliest timestamp.
- **Profit = trueValue - winningBid**
- Winner scores profit. Non-winners score 0.
- Overbid = negative profit (winner's curse)
- All $0 on final street = lot unclaimed, no winner, next lot
- If won via first-place win (Streets 1 or 2), show "FIRST PLACE WIN" badge

### Bidding Rules
- **Independent bids each street.** Can go up or down freely.
- **Bids revealed between streets.** Players see all previous bids before bidding next street.
- **$0 = pass** (not permanent fold). Can bid on later streets.
- **Non-negative, unbounded.** Any amount ≥ $0.
- **Game dollars** (Phase 1). USDC in Phase 2.
- **30-second timer** per street, server-authoritative. Default $0 on timeout.

### First-Place Win Mechanic
- Rewards aggressive bidding with early victory
- Street 1: ≥50% gap required (bold play on limited info)
- Street 2: ≥20% gap required (achievable with private info)
- Street 3: no first-place win (normal auction)
- Overpay on first-place win is dramatic spectacle

### Between Lots
- ~10s cooldown, next lot auto-deals
- Players can leave (no penalty) or stay
- New players can join if under 4
- Cumulative leaderboard tracks session profit

---

## Lot Design

### Schema
```json
{
  "id": "lot-001",
  "category": "politics",
  "positionCount": 7,
  "payoutRange": [180, 420],
  "positions": [
    { "market": "Will X win?", "side": "YES", "entry": 0.40, "currentPrice": 0.65, "size": 200 },
    { "market": "Will Y pass?", "side": "YES", "entry": 0.30, "currentPrice": 0.55, "size": 300 },
    { "market": "Will Z happen?", "side": "YES", "entry": 0.35, "currentPrice": 0.50, "size": 200 },
    { "market": "Will W exceed?", "side": "YES", "entry": 0.30, "currentPrice": 0.70, "size": 100 },
    { "market": "Will V resolve?", "side": "NO", "entry": 0.60, "currentPrice": 0.40, "size": 150 },
    { "market": "Will U pass?", "side": "YES", "entry": 0.25, "currentPrice": 0.55, "size": 250 },
    { "market": "Will T clear?", "side": "YES", "entry": 0.45, "currentPrice": 0.60, "size": 180 }
  ],
  "trueValue": 327
}
```

**True value** = `sum of (currentPrice - entry) × size` across all 7 positions. Static snapshot at curation time.

**Payout range** = deliberately wide bracket (~2-3x wider than trueValue's position within it). Makes bidding non-trivial.

---

## Globe as Game Surface

The 3D globe is the game surface, not decoration.

- **Region mapping:**
  - North America → Politics
  - Europe → Macro
  - Asia → Tech / Culture
  - Middle East → Geopolitics
  - South America → Sports
  - Africa → Emerging markets
  - Oceania → Entertainment
- **Active auction:** region pulses with category color
- **Street transitions:** camera pans to lot's region
- **Post-reveal:** green glow (profit) or red (overbid)
- **Between games:** WorldMonitor-style Polymarket dashboard

---

## Dashboard (Standalone Value)

Homepage = live Polymarket intelligence dashboard on the globe.

- **Left panel:** Trending markets, prices, resolution timers
- **Center:** Interactive globe with market activity by region
- **Right panel:** Auction feed (active/upcoming/completed rooms), "Create Room" CTA

---

## Curation System

Phase 1: Admin curation tool. Phase 2: Player-created lots.

- Pull trending markets from Polymarket API
- Select 7 positions, bundle into a lot
- Auto-calculate trueValue from current prices
- Set category + payout range
- Save to database with freshness timestamps
- Target: 15+ active lots

---

## Economics

### Phase 1 (now): Game dollars. Zero risk.

### Phase 2 (USDC): Player-created lots. Players are the "house."
- House creates baseline lots (cold-start supply)
- Players create lots: select 7 positions + set payout range + stake USDC
- Bidders bid USDC. Winner pays bid → lot creator.
- Creator profit = winningBid - trueValue (when bidders overpay)
- Creator loss = trueValue - winningBid (when bidders get a deal)
- Creator identity: anonymous during play, revealed at reveal screen
- Platform takes rake on every transaction. Zero platform risk.
- Two-sided skill game: creating lots + bidding on lots

### Phase 3: Full marketplace. Creator competition, ratings, leaderboards.

---

## Technical Stack

**Keep from existing app:**
- React 18 + TypeScript + Vite + Tailwind CSS (frontend)
- FastAPI + SQLAlchemy + PostgreSQL (backend)
- Three.js + Globe.gl (3D globe)
- WebSocket infrastructure
- Zustand + TanStack Query (state)
- Wallet integration (wagmi/viem, Base L2) — for Phase 2
- Framer Motion, Recharts, Radix UI, Lucide icons

**Gut:** AI leader simulation, economic engine, leader chat, history view

---

## Phased Roadmap

### Phase 1: Core Game
- Full multiplayer auction (3 streets, 7 positions, first-place wins)
- Globe as game surface with region mapping
- WorldMonitor-style dashboard homepage
- Lot curation system (house-curated)
- 15+ lots, game dollars, polished game loop

### Phase 2: Real Money + Player Lots
- USDC settlement, creator stakes
- Player-created lots alongside house lots
- Persistent leaderboard, player accounts
- Tournament system
- Deeper Polymarket API integration

### Phase 3: Marketplace
- Creator competition, ratings, featured lots
- Auto-generated lots
- Spectator mode, streaming
- Mobile app

---

## Success Metrics

- **Primary:** Do players who finish one lot start a second?
- **Secondary:** Do players talk about the game after playing?
- **Tertiary:** Can we curate 50+ lots that feel distinct?
- **Qualitative:** "Competitive" or "skill-based," not "random"

---

## Team

**Will** — CMU graduate, technical founder.
- Trade Clash: 100K+ wallets, Coinbase Onchain Summer Gold Prize 2025
- Product Lead at IOST, Blockstreet, AWE
- Founding member of web2 AI startup → $300M+ funding

## Links
- Live product: tradeclash.xyz
- Twitter: @TradeClashAI
- Email: serotolabs@gmail.com
- Telegram: @flyingwh
