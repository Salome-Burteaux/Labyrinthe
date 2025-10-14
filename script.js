function createLabyrinthe() {
    let labyrinthe = document.getElementById('labyrinthe');
    let tailleX = 3;
    let tailleY = 3;

    // Configuration du conteneur du labyrinthe
    labyrinthe.style.display = 'grid';
    labyrinthe.style.gridTemplateColumns = `repeat(${tailleX}, 40px)`;
    labyrinthe.style.gridTemplateRows = `repeat(${tailleY}, 40px)`;
    labyrinthe.style.gap = '0px';

    cases.forEach(cell => {
        const div = document.createElement('div');
        div.classList.add('case');
        div.style.width = '40px';
        div.style.height = '40px';
        div.style.boxSizing = 'border-box';

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


createLabyrinthe(data["3"]["ex-0"]);




