function createLabyrinthe(cases) {
    let labyrinthe = document.getElementById('labyrinthe');
    let tailleX = 3;
    let tailleY = 3;

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

document.addEventListener("DOMContentLoaded", () => {
    createLabyrinthe(data["3"]["ex-0"]);
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
