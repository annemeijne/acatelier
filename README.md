# ACA — Annemeijne's Creatieve Atelier

Website voor ACA — Annemeijne's Creatieve Atelier.

Website: acatelier.nl

## Structuur

### Algemene bestanden
- `index.html` — homepage
- `style.css` — centrale vormgeving van de website
- `components.js` — laadt de centrale header en footer
- `products.js` — centrale productgegevens
- `product.html` — centraal template voor productpagina's
- `product.js` — vult het producttemplate met de juiste productgegevens
- `category.js` — bouwt en sorteert de productoverzichten
- `recommended-order.js` — bepaalt de aanbevolen volgorde van producten

### Centrale onderdelen
- `components/header.html` — header voor alle pagina's
- `components/footer.html` — footer voor alle pagina's

### Pagina's
- `over-aca/` — Over ACA
- `contact/` — Contact
- `faq/` — Veelgestelde vragen
- `creaties/` — overzicht van de creaties
- `creaties/kleding/` — kleding
- `creaties/tierlantijnen/` — tierlantijnen
- `creaties/geschreven/` — geschreven werk

### Producten

Productinformatie wordt centraal bijgehouden in `products.js`.

De productpagina's worden automatisch opgebouwd met:
- `product.html`
- `product.js`

De categorie-overzichten worden automatisch gevuld vanuit `products.js` met `category.js`.

De handmatige volgorde voor **Aanbevolen** wordt bijgehouden in `recommended-order.js`.

### Afbeeldingen
- `aca-logo.png` — standaard ACA-logo
- `aca-logo inverted.png` — licht/inverted logo voor donkere achtergronden
- Productfoto's staan in de map van het betreffende product.
