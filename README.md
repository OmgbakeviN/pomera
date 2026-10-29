# POMERA — Démo de portfolio 3D

Concept de site fictif pour une marque de pommes, avec **ton modèle Blender original** et une animation au défilement.

## Lancer le projet

Prérequis : Node.js 20.19+ (ou Node.js 22+).

```bash
npm install
npm run dev
```

Ouvrir l'URL affichée par Vite (généralement http://localhost:5173).

Pour construire la version de production :

```bash
npm run build
npm run preview
```

## Structure

- `public/models/Pomme_3D.glb` — **ton fichier 3D original**, inchangé.
- `src/components/AppleScene.jsx` — rendu WebGL avec React Three Fiber et déplacement 3D avec GSAP ScrollTrigger.
- `src/App.jsx` — sections Hero, histoire, savoir-faire, engagements, contact ; navigation et apparitions au scroll.
- `src/styles.css` — design responsive, couleurs et typographie.

## Personnalisation rapide

- **Marque et textes** : `src/App.jsx` (Pomera est une marque fictive).
- **Couleurs** : variables CSS au début de `src/styles.css`.
- **Trajectoire de la pomme** : tableaux `desktopFrames` et `mobileFrames` dans `src/components/AppleScene.jsx`. Chaque image-clé contient `x`, `y`, `scale` et `rotation`.
- **Remplacer le modèle** : remplacer le fichier `public/models/Pomme_3D.glb` (conserver son nom ou modifier `MODEL_URL`).
- **Contact** : l'adresse `bonjour@pomera.example` est volontairement fictive. La remplacer par un vrai email avant publication.

## Technologies

React + Vite, Three.js, React Three Fiber, Drei, GSAP ScrollTrigger, Lucide icons.

L'animation suit le scroll dans les deux sens. Elle est adaptée aux petits écrans et limitée pour les visiteurs ayant activé « réduire les animations » dans leur système.

> Site de démonstration pour portfolio. Les déclarations de la marque sont fictives et ne constituent pas des engagements commerciaux.
