# Labyrinthe


PROCÉDURE initialiserJeu(taille, niveau)
    labyrinthe ← data[taille][niveau]  # récupérer les cases du labyrinthe
    joueur ← trouverCaseAvecEntrée(labyrinthe)  # position initiale du joueur
    afficherLabyrinthe(labyrinthe, joueur)
FIN PROCÉDURE

PROCÉDURE afficherLabyrinthe(labyrinthe, joueur)
    POUR chaque case DANS labyrinthe FAIRE
        créerDivPourCase(case)
        si case.position = joueur.position ALORS
            colorerDivCommeJoueur()
        si case.entrance ALORS
            colorerDivCommeEntrée()
        si case.exit ALORS
            colorerDivCommeSortie()
    FIN POUR
FIN PROCÉDURE

PROCÉDURE deplacerJoueur(direction)
    caseActuelle ← caseDuJoueur(joueur)
    
    # vérifier le mur correspondant à la direction
    SI direction = "haut" ET caseActuelle.walls[0] = false ALORS
        joueur.positionY ← joueur.positionY - 1
    SINON SI direction = "droite" ET caseActuelle.walls[1] = false ALORS
        joueur.positionX ← joueur.positionX + 1
    SINON SI direction = "bas" ET caseActuelle.walls[2] = false ALORS
        joueur.positionY ← joueur.positionY + 1
    SINON SI direction = "gauche" ET caseActuelle.walls[3] = false ALORS
        joueur.positionX ← joueur.positionX - 1
    FIN SI

    afficherLabyrinthe(labyrinthe, joueur)

    SI joueur.position = caseAvecSortie(labyrinthe) ALORS
        afficherMessage("Victoire !")
    FIN SI
FIN PROCÉDURE

PROCÉDURE jouerLabyrinthe(taille, niveau)
    initialiserJeu(taille, niveau)

    TANT QUE joueur.position ≠ caseAvecSortie(labyrinthe)
        direction ← lireInputUtilisateur()
        deplacerJoueur(direction)
    FIN TANT QUE
FIN PROCÉDURE
