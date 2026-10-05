# prof-dil

Petite bibliothèque qui transforme des balises courtes en leçon mise en forme (cartes, badges, progression, arbres, QCM, formules). Elle sert au « prof IA » d'Abdallah : le modèle écrit quelques lignes de balises dans un visuel, la bibliothèque dessine la page. Police système, thème clair ou sombre, téléphone compris. Aucune dépendance, KaTeX chargé à la demande pour les formules.

## Utilisation dans un visuel

```html
<script src="https://cdn.jsdelivr.net/gh/<compte>/prof-dil@1/dil.min.js"></script>
<script type="text/dil">
  <h size="xl">Chapitre 3 · L'entropie</h>
  <card tone="acc"><badge>Étape 2 sur 4</badge><h size="2xl">La pièce 90 / 10</h><progress label="Chapitre" value="50"/></card>
  <p>Texte avec <b>gras</b> et une formule <m>-\log_2 p</m>.</p>
  <f label="surprise moyenne">H \approx 0{,}47\ \text{bit}</f>
  <qcm q="Pourquoi moins d'1 bit ?"><o>Très prévisible</o><o>Erreur de calcul</o></qcm>
</script>
```

Le balisage est du XML : fermer chaque balise (`<hr/>`), écrire `\lt` au lieu de `<` dans les formules.

## Balises

| Balise | Attributs | Rendu |
|---|---|---|
| `h` | `size` sm, md, lg, xl, 2xl ; `tone` ; `center` | titre |
| `p` | `center`, `small`, `sec` | paragraphe |
| `b` `i` `sec` `small` `code` `hl tone` | | texte en ligne |
| `m` | | formule en ligne (TeX) |
| `f` | `label` | formule centrée en grand (TeX) |
| `card` | `tone` acc, ok, bad, warn, vio, neutral ; `title` ; `center` | carte bordée |
| `note` | `tone`, `title` | encadré coloré |
| `retiens` | `title` (défaut « À retenir ») | encadré vert |
| `badge` | `tone` | pastille de texte |
| `progress` | `value` 0 à 100, `label`, `text`, `tone` | barre de progression |
| `row` (`between`) / `col` (`center`) / `grid` (`min`) | | mise en page |
| `tile` | `label`, `value`, `tone` | chiffre clé |
| `dot` | `color` ou `tone`, `letter`, `label`, `sub`, `size` | pastille ronde |
| `steps` | enfants quelconques (`<s>…</s>`) | étapes numérotées reliées |
| `list` | `type` bullet ou number ; enfants `<li>` | liste |
| `table` | `<tr><th/><td/></tr>` | tableau |
| `tree` | `q`, `conclusion` ; `<branch label tone><leaf>…</leaf></branch>` | arbre oui / non |
| `bars` | `max` ; `<bar label value text tone color/>` | barres horizontales |
| `qcm` | `q`, `prefix` (« Je choisis : »), `button`, `heure` ; enfants `<o send="…">` | QCM, bouton qui envoie la réponse |
| `ask` | `q`, `placeholder`, `prefix`, `multiline`, `heure` | réponse libre envoyée au chat |
| `buttons` | enfants `<btn send="…" heure>` | boutons qui envoient un message |
| `reprise` | `titre`, `depuis`, `voie1`, `voie1text`, `voie2`, `temps`, `acquis` et `consolider` (listes séparées par ·), `point`, `aujourdhui` (plan : « 1. … · 2. … »), `durees` (« 30 min\|1 h\|2 h » ou « 30,60,120 ») | écran de reprise : étiquettes de notions, plan numéroté, boutons qui envoient la durée ET l'heure locale |
| `checkpoint` | `pos`, `start` (hh:mm), `seance`, `voie1`, `voie2`, `acquis`, `consolider` | point d'étape avec temps écoulé calculé |
| `raw` | | HTML libre (dernier recours) |

L'attribut `heure` ajoute l'heure locale de l'élève au message envoyé : le modèle n'a plus besoin de la demander.
