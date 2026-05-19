# Screenshots

Place les 5 captures d'écran ici, en respectant exactement ces noms de fichiers pour qu'ils apparaissent automatiquement dans le README principal :

| Nom du fichier | Écran à capturer |
| --- | --- |
| `01-home.png` | Onglet **Home** — vue d'ensemble (logo, stats 5000/20/30/20, témoignages) |
| `02-formations.png` | Onglet **Formation** — liste avec barre de recherche visible |
| `03-detail.png` | Détail d'une formation — l'image hero + cartes Description/Prérequis |
| `04-profil.png` | Onglet **Profil** — connecté, email Supabase visible + compétences |
| `05-login.png` | Écran **Login** ou **Signup** — avec le logo InfoPlus en haut |

## Comment capturer

**Sur ton téléphone Android** : maintiens `Volume bas + Power` ensemble. La capture va dans Photos → Captures d'écran.

**Sur ton téléphone iPhone** : `Power + Volume haut` ensemble.

**Sur émulateur** : il y a un bouton "screenshot" (icône appareil photo) dans le panneau latéral.

**Sur web (Chrome DevTools)** : F12 → Toggle device toolbar (Ctrl+Shift+M) → choisis "iPhone" → clic droit → "Capture screenshot".

Transfère-les sur ton PC dans ce dossier, renomme-les selon le tableau ci-dessus, puis :

```bash
git add docs/screenshots/
git commit -m "Add app screenshots to README"
git push
```

Les images apparaîtront automatiquement sur la page GitHub du projet.
