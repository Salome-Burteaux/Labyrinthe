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

        // on donne un id unique basé sur les coordonnées
        div.id = `case-${cell.posX}-${cell.posY}`;

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

// ---------------------------------------------------------------------
// DFS itératif
// ---------------------------------------------------------------------
// function solveLabyrinthe(cases){
//   const entrance = cases.find(c => c.entrance);
//   const exit = cases.find(c => c.exit);
//   if(!entrance || !exit) return null;

//   const stack = [entrance];
//   const visited = new Set();
//   const parent = new Map();

//   function getNeighbours(cell){
//     const neighbours = [];
//     const dirs = [
//   {dx:-1, dy:0, wallIndex:0, opp:2}, // haut → ligne-1
//   {dx:0, dy:1, wallIndex:1, opp:3},  // droite → col+1
//   {dx:1, dy:0, wallIndex:2, opp:0},  // bas → ligne+1
//   {dx:0, dy:-1, wallIndex:3, opp:1}, // gauche → col-1
// ];

//     dirs.forEach(d=>{
//       const nx = cell.posX + d.dx;
//       const ny = cell.posY + d.dy;
//       const n = cases.find(c=>c.posX===nx && c.posY===ny);
//       if(n && !cell.walls[d.wallIndex] && !n.walls[d.opp]) neighbours.push(n);
//     });
//     console.log(`Voisins de (${cell.posX},${cell.posY}) :`, neighbours.map(c=>`(${c.posX},${c.posY})`));
//     return neighbours;
//   }

//   while(stack.length>0){
//     const v = stack.pop();
//     const id = `${v.posX},${v.posY}`;
//     if(visited.has(id)) {
//       console.log(`Case déjà visitée: (${v.posX},${v.posY})`);
//       continue;
//     }

//     console.log(`Visite de la case: (${v.posX},${v.posY})`);
//     visited.add(id);

//     if(v.posX === exit.posX && v.posY === exit.posY){
//       console.log("Sortie trouvée !");
//       const path = [];
//       let current = v;
//       while(current){
//         path.unshift(current);
//         current = parent.get(current);
//       }
//       console.log("Chemin retrouvé :", path.map(c=>`(${c.posX},${c.posY})`));
//       return path;
//     }

//     const neighbours = getNeighbours(v);
//     if(neighbours.length === 0) console.log(`Aucun voisin accessible pour (${v.posX},${v.posY})`);

//     neighbours.forEach(n=>{
//       const nid = `${n.posX},${n.posY}`;
//       if(!visited.has(nid)){
//         parent.set(n,v);
//         stack.push(n);
//         console.log(`Ajout à la pile: (${n.posX},${n.posY})`);
//       }
//     });
//   }

//   console.log("Pile vide, aucun chemin trouvé !");
//   return null;
// }

// // --- Colorier le chemin dans la grille ---
// function showPath(path) {
//   if(!path) {
//     console.log("Aucun chemin trouvé !");
//     return;
//   }

//   path.forEach(c => {
//     const div = document.getElementById(`case-${c.posX}-${c.posY}`);
//     // ne pas colorier entrée / sortie
//     if(div && !div.classList.contains('entrance') && !div.classList.contains('exit')) {
//       div.style.backgroundColor = 'yellow';
//     }
//   });
// }


// document.addEventListener('DOMContentLoaded', ()=>{
//   // Choisir le labyrinthe à utiliser
//   const mazeData = data["10"]["ex-0"];

//   // Créer la grille visuelle
//   createLabyrinthe(mazeData);

//   // Lancer le DFS itératif
//   document.getElementById('solveBtn').addEventListener('click', ()=>{
//     // récupérer le chemin pour le colorer
//     const path = solveLabyrinthe(mazeData);
//     showPath(path);
// });

//   const path = solveLabyrinthe(mazeData);
//   if(path){
//     const lab = document.getElementById('labyrinthe');
//     path.forEach(c=>{
//       const div = lab.querySelector(`.case[data-x='${c.posX}'][data-y='${c.posY}']`);
//       if(div && !div.classList.contains('entrance') && !div.classList.contains('exit')){
//         div.style.backgroundColor = 'yellow';
//       }
//     });
//   } else {
//     console.log("Aucun chemin trouvé !");
//   }
// });


// ---------------------------------------------------------------------
// --- DFS récursif ---
// ---------------------------------------------------------------------
function solveLabyrintheRecursive(cases) {
  const entrance = cases.find(c => c.entrance);
  const exit = cases.find(c => c.exit);
  if(!entrance || !exit) return null;

  const visited = new Set();

  function dfs(v) {
    const id = `${v.posX},${v.posY}`;
    if(visited.has(id)) return null;

    visited.add(id);

    if(v.posX === exit.posX && v.posY === exit.posY) {
      // on a trouvé la sortie, retourne une liste avec cette case
      return [v];
    }

    // --- trouver voisins accessibles ---
    const dirs = [
      {dx:-1, dy:0, wallIndex:0, opp:2}, // haut
      {dx:0, dy:1, wallIndex:1, opp:3},  // droite
      {dx:1, dy:0, wallIndex:2, opp:0},  // bas
      {dx:0, dy:-1, wallIndex:3, opp:1}  // gauche
    ];

    for(const d of dirs) {
      const nx = v.posX + d.dx;
      const ny = v.posY + d.dy;
      const n = cases.find(c=>c.posX===nx && c.posY===ny);
      if(n && !v.walls[d.wallIndex] && !n.walls[d.opp]) {
        const path = dfs(n); // appel récursif
        if(path) {
          // concaténer v avec le chemin retourné par l'enfant
          return [v, ...path];
        }
      }
    }

    // aucun chemin trouvé depuis cette case
    return null;
  }

  return dfs(entrance);
}

// --- Colorier le chemin dans la grille ---
function showPath(path) {
  if(!path) {
    console.log("Aucun chemin trouvé !");
    return;
  }
  path.forEach(c => {
    const div = document.getElementById(`case-${c.posX}-${c.posY}`);
    if(div && !div.classList.contains('entrance') && !div.classList.contains('exit')) {
      div.style.backgroundColor = 'yellow';
    }
  });
}

// --- Exemple d'utilisation ---
document.addEventListener('DOMContentLoaded', ()=>{
  const mazeData = data["10"]["ex-0"];
  createLabyrinthe(mazeData);

  document.getElementById('solveBtn').addEventListener('click', ()=>{
    const path = solveLabyrintheRecursive(mazeData);
    showPath(path);
  });
});

