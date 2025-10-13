# Hero Layout Variants - Preview Guide

This folder contains two alternative hero/header layouts for your portfolio while keeping all other elements (colors, animations, projects, etc.) exactly the same.

---

## 📂 Files Created

- **`index_variantA.html`** — Minimal centered hero (name + role + CTA only)
- **`index_variantB.html`** — Two-column hero with circular headshot
- **`index.html`** — Original homepage (unchanged, kept as backup)

---

## 🔍 How to Preview Each Variant

### Option 1: Direct File Opening
1. Navigate to `/Users/luisluna/Desktop/Portfolio/`
2. Double-click either:
   - `index_variantA.html` (minimal hero)
   - `index_variantB.html` (hero with headshot)

### Option 2: Browser URL Bar
Copy and paste into your browser:

**Variant A (Minimal):**
```
file:///Users/luisluna/Desktop/Portfolio/index_variantA.html
```

**Variant B (Headshot):**
```
file:///Users/luisluna/Desktop/Portfolio/index_variantB.html
```

### Option 3: Use Preview Toolbar
- Both variant pages have a **preview toolbar** in the top-right corner
- Click "Preview A" or "Preview B" to switch between layouts instantly
- The toolbar only appears on variant pages, not on the original `index.html`

---

## ✨ What's Different in Each Variant?

### Variant A — Minimal Hero
- ✓ Vertically centered, single-column layout
- ✓ Name (Instrument Serif) + Role only
- ✓ One centered "View My Work" CTA button
- ✓ No greeting line or tagline
- ✓ Clean, minimal aesthetic

### Variant B — Hero with Headshot
- ✓ Two-column grid layout (headshot + text)
- ✓ 200px circular headshot placeholder on left
- ✓ Name + Role + CTA stacked on right
- ✓ Modern, professional composition
- ✓ Stacks vertically on mobile

### What Stays the Same?
- ✓ All animations, particle effects, and gradients
- ✓ All colors, fonts, and CSS variables
- ✓ Projects, About, Contact sections
- ✓ All interactive hover effects
- ✓ Mobile responsiveness

---

## 🔄 How to Replace Your Homepage with a Chosen Variant

Once you've decided which hero layout you prefer, follow these steps:

### Step 1: Backup Your Current Homepage (Optional)
```bash
cd /Users/luisluna/Desktop/Portfolio
cp index.html index_original_backup.html
```

### Step 2A: Use Variant A as Your Main Homepage
```bash
cp index_variantA.html index.html
```

### Step 2B: Use Variant B as Your Main Homepage
```bash
cp index_variantB.html index.html
```

### Step 3: Remove Preview Toolbar (Optional)
If you choose a variant as your main page, you may want to remove the preview toolbar:

1. Open `index.html` in a text editor
2. Find and delete these lines (around line 36-41):
```html
<!-- Preview Toolbar - only appears on variant pages -->
<div class="preview-toolbar">
    <a href="index_variantA.html" class="active">Preview A</a>
    <a href="index_variantB.html">Preview B</a>
</div>
```
3. Save the file

---

## 🎨 Customization Tips

### To Add Your Real Headshot (Variant B)
1. Open `index_variantB.html`
2. Find the `.hero-headshot` div (around line 147)
3. Replace the SVG placeholder with:
```html
<div class="hero-headshot">
    <img src="your-photo.jpg" alt="Danielle Luna headshot" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### To Adjust Headshot Size (Variant B)
In the `<style>` section of `index_variantB.html`, change:
```css
.hero-headshot {
    width: 200px;  /* Change this value */
    height: 200px; /* Change this value */
}
```

### To Restore Original Hero Layout
Simply open `index.html` — your original homepage is untouched!

---

## 📱 Mobile Responsiveness

Both variants are fully responsive:
- **Variant A**: Stays centered, scales typography
- **Variant B**: Stacks vertically (headshot on top, text below)
- Preview toolbar shrinks on mobile for better visibility

---

## 🆘 Troubleshooting

**Issue:** Preview toolbar appears on my main `index.html`  
**Solution:** The toolbar only appears on variant files. If you copied a variant to `index.html`, follow Step 3 above to remove it.

**Issue:** Animations or effects not working  
**Solution:** Make sure `style.css` and `script.js` are in the same folder as the HTML files.

**Issue:** Headshot looks distorted (Variant B)  
**Solution:** Use a square image (1:1 ratio) for best results, or adjust CSS `object-fit` property.

---

## 🗑️ Cleanup

Once you've chosen your preferred layout, you can delete the unused files:

```bash
# If you chose Variant A and don't need B:
rm index_variantB.html

# If you chose Variant B and don't need A:
rm index_variantA.html

# You can also delete this README after reading:
rm HERO_VARIANTS_README.md
```

---

**Questions?** All variants use the exact same CSS and JavaScript as your original homepage, so any future style updates will automatically apply to all versions.

**Enjoy previewing!** 🎉




