# Ma liste de courses

Application de liste de courses pour téléphone : on tape « 2 kg de pommes à 2,30 »,
elle en déduit la quantité, l'unité, le prix **et le rayon**, puis range l'article au
bon endroit dans l'ordre d'un magasin.

Un seul fichier, aucune dépendance, aucun compte, aucune donnée envoyée nulle part :
tout reste dans le navigateur du téléphone.

## Installer sur l'iPhone

1. Ouvrir la page dans **Safari**
2. Bouton **Partager**
3. **Sur l'écran d'accueil**

Elle s'ouvre ensuite en plein écran comme une application, et **fonctionne hors ligne**
(utile dans un magasin où le réseau passe mal). Sur Android, Chrome propose
« Installer l'application ».

## Ce qu'elle sait faire

- **Saisie intelligente** — quantité, unité, prix unitaire et rayon reconnus dans la
  phrase tapée ; dictionnaire d'environ 300 produits courants
- **Rangement par rayon** — fruits & légumes, boulangerie, boucherie, crèmerie,
  épicerie, surgelés, boissons, hygiène, entretien, autres ; dans l'ordre du magasin
- **Pendant les courses** — on coche d'un tap, on supprime d'un glissement vers la
  gauche (avec « Annuler »), on filtre entre « À prendre » et « Dans le panier »
- **Budget** — prix unitaire optionnel, sous-total par rayon, total estimé en haut
- **Export** — partage iOS natif, copie, fichier `.txt`, tableur `.csv`,
  sauvegarde `.json` réimportable, impression ou PDF
- **Suggestions** — les articles ajoutés souvent reviennent en raccourcis
- **Thème clair et sombre**, suit l'appareil au premier lancement

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | toute l'application : structure, style et code |
| `manifest.webmanifest` | nom, icônes et mode plein écran pour l'installation |
| `sw.js` | mise en cache pour le fonctionnement hors ligne |
| `icons/` | icônes de l'écran d'accueil |

## Compatibilité

Écrit volontairement en JavaScript ES5 et en CSS ancien (pas de `color-mix`, pas de
`gap`, pas de `grid`, pas de `dvh`), avec repli systématique sur une valeur simple.
Chaque fonction récente est testée avant usage, et toute erreur s'affiche en rouge en
haut de l'écran plutôt que de bloquer l'application en silence.

Un détail iOS qui compte : ouvrez bien la page dans **Safari**. Un fichier `.html`
ouvert depuis l'app Fichiers ou une pièce jointe passe par l'aperçu d'iOS, qui bride
le JavaScript — la page s'affiche alors de travers et les boutons ne répondent pas.
