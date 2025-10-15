function createLabyrinthe(cases) {
    let labyrinthe = document.getElementById('labyrinthe');
    labyrinthe.innerHTML = ""; // vider avant d'afficher un nouveau labyrinthe

     // On calcule la taille du labyrinthe en cherchant les max des coordonnées
    let maxX = Math.max(...cases.map(c => c.posX));
    let maxY = Math.max(...cases.map(c => c.posY));

    let tailleX = maxX + 1; // +1 car les coordonnées commencent à 0
    let tailleY = maxY + 1;
    

    // Configuration du conteneur du labyrinthe
    labyrinthe.style.gridTemplateColumns = `repeat(${tailleX}, 40px)`;
    labyrinthe.style.gridTemplateRows = `repeat(${tailleY}, 40px)`;


    cases.forEach(cell => {
        const div = document.createElement('div');
        div.classList.add('case');
        div.style.width = '40px';
        div.style.height = '40px';

        // murs 
        const walls = cell.walls;
        div.style.borderTop = walls[0] ? '2px solid rgb(145, 255, 0)' : 'none';
        div.style.borderRight = walls[1] ? '2px solid rgb(145, 255, 0)' : 'none';
        div.style.borderBottom = walls[2] ? '2px solid rgb(145, 255, 0)' : 'none';
        div.style.borderLeft = walls[3] ? '2px solid rgb(145, 255, 0)' : 'none';   

        // couleur pour entrée sortie
        if(cell.entrance) div.style.backgroundColor = 'lightgreen';
        if(cell.exit) div.style.backgroundColor = 'lightcoral';

        labyrinthe.appendChild(div);
    });
}

// document.addEventListener("DOMContentLoaded", () => {
//     createLabyrinthe(data["10"]["ex-0"]);
// });


// VERSION ITÉRATIVE DE L'ALGO DFS
// Renvoie le chemin de l'entrée à la sortie sous forme de liste de cases, ou null si pas de chemin
//
// Mini-labyrinthe 5x5
// walls: [haut, droite, bas, gauche] true = mur


// Création visuelle
function createLabyrinthe(cases) {
  const container = document.getElementById('labyrinthe');
  container.innerHTML = '';
  cases.forEach(c => {
    const div = document.createElement('div');
    div.classList.add('case');
    if(c.entrance) div.classList.add('entrance');
    if(c.exit) div.classList.add('exit');
    div.dataset.x = c.posX;
    div.dataset.y = c.posY;
    container.appendChild(div);
  });
}

// DFS itératif
function findPathDFS(cases){
  const entrance = cases.find(c => c.entrance);
  const exit = cases.find(c => c.exit);
  if(!entrance || !exit) return null;

  const stack = [entrance];
  const visited = new Set();
  const parent = new Map();

  function getNeighbours(cell){
    const neighbours = [];
    const dirs = [
      {dx:0, dy:-1, wallIndex:0, opp:2}, // haut
      {dx:1, dy:0, wallIndex:1, opp:3},  // droite
      {dx:0, dy:1, wallIndex:2, opp:0},  // bas
      {dx:-1, dy:0, wallIndex:3, opp:1}, // gauche
    ];
    dirs.forEach(d=>{
      const nx = cell.posX + d.dx;
      const ny = cell.posY + d.dy;
      const n = cases.find(c=>c.posX===nx && c.posY===ny);
      if(n && !cell.walls[d.wallIndex] && !n.walls[d.opp]) neighbours.push(n);
    });
    console.log(`Voisins de (${cell.posX},${cell.posY}) :`, neighbours.map(c=>`(${c.posX},${c.posY})`));
    return neighbours;
  }

  while(stack.length>0){
    const v = stack.pop();
    const id = `${v.posX},${v.posY}`;
    if(visited.has(id)) {
      console.log(`Case déjà visitée: (${v.posX},${v.posY})`);
      continue;
    }

    console.log(`Visite de la case: (${v.posX},${v.posY})`);
    visited.add(id);

    if(v.posX === exit.posX && v.posY === exit.posY){
      console.log("Sortie trouvée !");
      const path = [];
      let current = v;
      while(current){
        path.unshift(current);
        current = parent.get(current);
      }
      console.log("Chemin retrouvé :", path.map(c=>`(${c.posX},${c.posY})`));
      return path;
    }

    const neighbours = getNeighbours(v);
    if(neighbours.length === 0) console.log(`Aucun voisin accessible pour (${v.posX},${v.posY})`);

    neighbours.forEach(n=>{
      const nid = `${n.posX},${n.posY}`;
      if(!visited.has(nid)){
        parent.set(n,v);
        stack.push(n);
        console.log(`Ajout à la pile: (${n.posX},${n.posY})`);
      }
    });
  }

  console.log("Pile vide, aucun chemin trouvé !");
  return null;
}

document.addEventListener('DOMContentLoaded', ()=>{
  // Choisir le labyrinthe à utiliser
  const mazeData = data["3"]["ex-0"];

  // Créer la grille visuelle
  createLabyrinthe(mazeData);

  // Lancer le DFS itératif
  const path = findPathDFS(mazeData);
  if(path){
    const lab = document.getElementById('labyrinthe');
    path.forEach(c=>{
      const div = lab.querySelector(`.case[data-x='${c.posX}'][data-y='${c.posY}']`);
      if(div && !div.classList.contains('entrance') && !div.classList.contains('exit')){
        div.style.backgroundColor = 'yellow';
      }
    });
  } else {
    console.log("Aucun chemin trouvé !");
  }
});



// PROCÉDURE initialiserJeu(taille, niveau)
//     labyrinthe ← data[taille][niveau]  # récupérer les cases du labyrinthe
//     joueur ← trouverCaseAvecEntrée(labyrinthe)  # position initiale du joueur
//     afficherLabyrinthe(labyrinthe, joueur)
// FIN PROCÉDURE

// PROCÉDURE afficherLabyrinthe(labyrinthe, joueur)
//     POUR chaque case DANS labyrinthe FAIRE
//         créerDivPourCase(case)
//         si case.position = joueur.position ALORS
//             colorerDivCommeJoueur()
//         si case.entrance ALORS
//             colorerDivCommeEntrée()
//         si case.exit ALORS
//             colorerDivCommeSortie()
//     FIN POUR
// FIN PROCÉDURE

// PROCÉDURE deplacerJoueur(direction)
//     caseActuelle ← caseDuJoueur(joueur)
    
//     # vérifier le mur correspondant à la direction
//     SI direction = "haut" ET caseActuelle.walls[0] = false ALORS
//         joueur.positionY ← joueur.positionY - 1
//     SINON SI direction = "droite" ET caseActuelle.walls[1] = false ALORS
//         joueur.positionX ← joueur.positionX + 1
//     SINON SI direction = "bas" ET caseActuelle.walls[2] = false ALORS
//         joueur.positionY ← joueur.positionY + 1
//     SINON SI direction = "gauche" ET caseActuelle.walls[3] = false ALORS
//         joueur.positionX ← joueur.positionX - 1
//     FIN SI

//     afficherLabyrinthe(labyrinthe, joueur)

//     SI joueur.position = caseAvecSortie(labyrinthe) ALORS
//         afficherMessage("Victoire !")
//     FIN SI
// FIN PROCÉDURE

// PROCÉDURE jouerLabyrinthe(taille, niveau)
//     initialiserJeu(taille, niveau)

//     TANT QUE joueur.position ≠ caseAvecSortie(labyrinthe)
//         direction ← lireInputUtilisateur()
//         deplacerJoueur(direction)
//     FIN TANT QUE
// FIN PROCÉDURE


// Version itérative
// fonction DFS_iteratif(départ):
//     créer une pile vide
//     empiler le point de départ
//     créer un ensemble "visités" vide

//     tant que la pile n'est pas vide:
//         (x, y) ← dépiler le sommet

//         si (x, y) est un mur ou déjà visité:
//             continuer

//         marquer (x, y) comme visité
//         afficher "Visite de (x, y)"

//         si (x, y) est la sortie:
//             arrêter et dire "trouvé"

//         empiler les voisins (haut, bas, gauche, droite)



// Version récurisive 
// fonction DFS_recursif(x, y, visités):
//     si (x, y) est hors du labyrinthe ou un mur ou déjà visité:
//         retourner faux

//     marquer (x, y) comme visité
//     afficher "Visite de (x, y)"

//     si (x, y) est la sortie:
//         afficher "trouvé"
//         retourner vrai

//     si DFS_recursif(x-1, y, visités): retourner vrai   // haut
//     si DFS_recursif(x, y+1, visités): retourner vrai   // droite
//     si DFS_recursif(x+1, y, visités): retourner vrai   // bas
//     si DFS_recursif(x, y-1, visités): retourner vrai   // gauche

//     retourner faux