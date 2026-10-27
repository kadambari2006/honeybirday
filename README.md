# 🎂 A Magical Birthday Website for My Honey, Rathika 💗

A romantic, playful, mobile-first birthday experience created exclusively for Rathika ("Honey", "Rathi").

---

## ✨ Features Included

1. **Magical Opening Screen**:
   - Dreamy pastel sky with interactive floating hearts, stars, and butterflies.
   - 3D gift box / envelope with ribbon and wax bow.
   - Big animated button: *"Open Your Surprise, Honey 🦋"*.
   - Confetti shower and reveal of Honey's personalized birthday celebration.

2. **Interactive Birthday Cake 🎂**:
   - Tiered cake with strawberry toppings, frosting drips, sprinkles, and "Honey 💗 Rathi" emblem.
   - Lit candles with animated glowing & flickering flames.
   - *"Blow the Candles 💨"* button with sequential breeze blowout, smoke curl animation, and sound effects.
   - Sweet granted wish note and *"Light Them Again 🕯️"* replay option.
   - Quick jump button: *"More Birthday Magic ✨"*.

3. **"Why You Are So Special to Me" 💌**:
   - 4 individually expandable cards:
     - 🍯 **MY HONEY**: The Name That Makes Me Smile
     - 🦋 **MY INDEPENDENT GIRL**: Never Stop Being YOU
     - 🌷 **MY RATHI**: A Little Reminder for You
     - ✨ **YOUR SMILE**: Keep That Happiness Alive

4. **Digital Photo Scrapbook 📸**:
   - Polaroid-style photo frames with tilt angles, washi tape, stamps, and handwritten captions.
   - Interactive Lightbox with prev/next navigation when any photo is tapped.
   - Safe placeholders and easy drop-in configuration for Rathika's real photos.

5. **A Wish for Your Beautiful Future 🌈**:
   - Dreamy interactive cloud pills:
     - 🌸 **Happiness**
     - 🦋 **Your Dreams**
     - 🌷 **Your Peace**
     - ✨ **Your Success**
     - 💍 **Your Love Story** (presented in an elegant letter-style keepsake card).

6. **A Personal Letter for Honey 💌**:
   - Sealed envelope with a red wax heart seal.
   - Tap to open with animated slide-out letter and gentle typewriter reveal.
   - *"Sending You a Million Hugs 🫂"* button that fills the screen with floating hugs and hearts!

7. **Final Celebration 🎉**:
   - Floating balloons, roses, and fireworks celebration.
   - Heartfelt closing quote: *"May your life be as beautiful as your heart..."*.
   - *"Celebrate Again! 🎉"* and *"Back to the beginning ↑"*.

8. **Dual-Mood Music System 🎵**:
   - Cheerful birthday music + soft emotional piano chords.
   - Floating music control widget with play/pause and volume slider.
   - Built-in procedural Web Audio synthesizer so enchanting chimes play immediately out of the box even before custom MP3 files are placed!

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the local development server
npm run dev
```

Open: **`http://localhost:5173`**  
On your phone (connected to the same Wi-Fi): **`http://<your-ip>:5173`**

---

## 🖼️ How to Add Rathika's Actual Photos

1. Place your photo files inside `public/photos/` (e.g. `photo1.jpg`, `photo2.jpg`, etc.).
2. Open [`src/data/birthdayContent.js`](file:///c:/Users/g0526/OneDrive/Desktop/HONEY/src/data/birthdayContent.js).
3. Under `scrapbook.photos`, update the `image` paths:
   ```javascript
   image: "/photos/photo1.jpg"
   ```
4. You can also adjust captions, dates, and sticker emojis!

---

## 🎵 How to Add Custom Music

1. Put your 2 MP3 files in `public/music/`:
   - `birthday-joy.mp3` (Cheerful, upbeat birthday song)
   - `soft-piano.mp3` (Gentle piano / acoustic track)
2. The website will automatically detect and play them, crossfading between sections!

---

## ✏️ How to Customize Messages or Nicknames

All messages, captions, wishes, and quotes are organized cleanly in:
👉 [`src/data/birthdayContent.js`](file:///c:/Users/g0526/OneDrive/Desktop/HONEY/src/data/birthdayContent.js)

---

## 🌐 How to Deploy to Vercel (To Send to Her Phone)

### Option 1: Via Vercel CLI (Super Fast)
1. Run in PowerShell:
   ```bash
   npx vercel
   ```
2. Follow the 3 prompts (default settings work right away).
3. You will immediately receive a live URL like `https://honey-rathika.vercel.app`!

### Option 2: Via GitHub & Vercel Web Dashboard
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository and click **"Deploy"**.
4. Send the link to Rathika on WhatsApp / iMessage! 💗
