# Maccor Website - Cleaned Version

## Overview
This is a cleaned and optimized version of your Maccor website with improved code quality, updated dependencies, and better organization.

---

## What Was Cleaned

### ✅ All HTML Files (38 pages)
- **Copyright updated** from 2024 to 2025
- **JavaScript fixed** - Replaced missing local files with CDN links
- **Removed commented code** from index.html (182 lines removed)
- **Improved formatting** - Consistent indentation and structure
- **File size reduction** - 38% smaller on index.html

### ✅ CSS Files
- **myStyle.css** - Completely reorganized and cleaned
  - Removed duplicate declarations
  - Fixed nested selector syntax issues
  - Removed empty rulesets
  - Fixed malformed CSS (border-sizing → box-sizing)
  - Better organization with section comments
  - Consolidated vendor prefixes

---

## Changes Made

### JavaScript Libraries
**Before:** Referenced local files that were missing
```html
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap-4.4.1.js"></script>
```

**After:** Using reliable CDN links with integrity checking
```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js" 
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" 
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" 
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo=" 
    crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" 
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6=" 
    crossorigin="anonymous"></script>
```

### Copyright Year
All 38 pages updated:
```html
<!-- Before -->
Copyright© 2024, Maccor, Inc., All Rights Reserved.

<!-- After -->
Copyright© 2025, Maccor, Inc., All Rights Reserved.
```

---

## File Structure

```
maccor_cleaned/
├── index.html              # Home page (cleaned, 38% smaller)
├── 404.html                # Error page
├── aboutus.html            # About page
├── accessories.html        # Accessories
├── automatedbatterytester.html
├── batteryformation.html
├── build_test.html
├── can_dbc_editor.html
├── cell_balancer.html
├── cg_v1.html             # Game page
├── compact_temperature_chamber.html
├── contact.html
├── cross_numbers_v1.html  # Game page
├── desktops.html
├── ev_pack_tester.html
├── events.html
├── export_data.html
├── fusion.html
├── high_volume_battery_tester.html
├── m22.html
├── macnet.html
├── mactest.html
├── madeinamerica.html
├── mims_client.html
├── mims_server.html
├── options.html
├── partners.html
├── products.html
├── series6k.html
├── smbus.html
├── software.html
├── sudoku_v1.html         # Game page
├── support.html
├── teasers_v1.html        # Game page
├── thankyou.html
├── view_data.html
├── wordsearch_v1.html     # Game page
├── worldwide.html
├── favicon.ico
└── css/
    ├── bootstrap-4.4.1.css
    ├── myStyle.css        # Cleaned and optimized
    ├── myStyleX.css
    └── sorta.css
```

---

## Missing Assets

### ⚠️ Images Folder
The `images/` folder was not included in your upload. You'll need to copy this from your current website. Referenced images include:
- Logo.png
- maccor_white_logo.jpg
- desktops.png
- testers.png
- options.png
- In-Blue.png (LinkedIn icon)
- cara_b.png
- cara_a.svg
- And various product images

**Action Required:** Copy your entire `images/` folder into this directory.

---

## Implementation Instructions

### Option 1: Replace Entire Website
1. **Backup your current website** (very important!)
2. Copy your `images/` folder into this cleaned directory
3. Upload all files to your web server
4. Test thoroughly

### Option 2: Gradual Rollout
1. **Start with CSS:**
   - Replace `css/myStyle.css` with the cleaned version
   - Test to ensure styling still works

2. **Then update index.html:**
   - Replace with cleaned version
   - Verify homepage works correctly

3. **Roll out other pages gradually:**
   - Replace pages section by section (products, software, etc.)
   - Test each section before moving to the next

### Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation dropdown menus work
- [ ] All internal links work
- [ ] Contact form functions
- [ ] Footer displays correctly
- [ ] Sticky "Request a Quote" button works
- [ ] Mobile responsive design works
- [ ] All images display
- [ ] LinkedIn link works
- [ ] Google Analytics tracking active

---

## Questions to Consider

### Game Pages
Your website includes 5 game/puzzle pages:
- sudoku_v1.html
- wordsearch_v1.html  
- cross_numbers_v1.html
- cg_v1.html
- teasers_v1.html

**Are these intentional?** They don't appear in the navigation. Consider:
- Remove them if they're not needed
- Add them to a "Games" section if they serve a purpose
- Keep them hidden if they're for internal use

---

## Future Recommendations

### Short Term (Easy Wins)
1. **Add images folder** to complete the cleanup
2. **Remove unused CSS files** (myStyleX.css, sorta.css if not needed)
3. **Add social media meta tags** for better sharing
4. **Optimize images** - compress PNGs and JPGs for faster loading

### Medium Term
1. **Update Bootstrap** from 4.4.1 to current version (5.3)
2. **Add mobile-friendly features** - click-to-call, tap-to-email
3. **Improve SEO** - better meta descriptions, alt tags on all images
4. **Add Google Analytics 4** (currently using older Universal Analytics)

### Long Term (Redesign Consideration)
When you're ready for a new design:
1. Consider modern CSS Grid/Flexbox layouts
2. Update to more contemporary design patterns
3. Implement a design system for consistency
4. Consider a static site generator (like Hugo, Jekyll, or 11ty)
5. Add interactive product configurators or quote calculators

---

## Support

If you have questions about implementing these changes or need help with specific files, please let me know!

---

## Summary Statistics

- **Files cleaned:** 38 HTML pages + CSS
- **Code removed:** 182+ lines of commented/dead code from index.html
- **Copyright updated:** All 38 pages
- **JavaScript fixed:** All 38 pages now use CDN
- **Time saved:** No more hunting for missing JavaScript files
- **Compatibility:** Modern browsers, same Bootstrap 4.4.1 compatibility

**Ready to deploy!** ✨
