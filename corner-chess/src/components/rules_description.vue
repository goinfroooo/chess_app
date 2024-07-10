<template>

<div id="rules_content" class="bg-dark py-4 ">
    

<section id="quick_start" class="rules_section">

    <div class="container-fluid container-lg ">
        <div class="card h-100 w-100 bg-light rounded-0 rounded-top-3">
            <div class="card-body">
                <div class="row gy-4 gy-md-0">
                    <h1 id="quickstart_title" class="card-title fw-bold section_title">Commencer à jouer</h1>
                    <div class="card-img card-img-top d-flex justify-content-center">
                        <img class="rounded-5 img-fluid mx-auto mb-3" src="../assets/img/corner_board_illustration.png" alt="board illustration" >
                    </div>

                    <div id="game_goal">
                        <h2 id="game_goal_title" class="fw-bold subtitle">But du jeu</h2>
                        <p>Vous disposez comme votre adversaire de 16 pièces sur le plateau de jeu.
                            Chacun votre tour vous déplacer une de vos propre pièce.<br>
                            Chaque pièce se déplace différemment sur le plateau. 
                            Pour comprendre le déplacement de chaque pièce, vous pouvez consulter la partie <a class="fw-bold" href="#piece_displacement">Déplacement des pièces</a>
                            <br>Lorsque la case d'arrivée de votre pièce contient une pièce adverse, vous la capturez.
                            Elle est alors retirer du plateau. Le but du jeu est de capturez le roi adverse.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="piece_displacement" class="rules_section">
    <div class="container-fluid container-lg ">
        <div class="card h-100 w-100 bg-light rounded-0">
            <div class="card-body">
                <div class="row gy-4 gy-md-0">
                    <h1 id="deplacement_piece_title" class="card-title fw-bold section_title" >Déplacement des pièces</h1>
                    <section id= pawn_displacement>
                        <h2 id="pawn_title" class="card-title subtitle">Le pion</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>Le pion peut se déplacer d'une seule case à la fois.
                                Il peut se déplacer le long des lignes ou des colonnes
                            </p>
                            <img src="../assets/img/pawn_displacement.png" >
                            <p>Si une pièce alliée ou adverse bloque son avancée, il ne peut pas se déplacer.
                                En revanche si une pièce adverse se situe sur sa diagonale, il peut la capturer.
                            </p>
                            <img src="../assets/img/pawn_capture.png" >
                            <p>Les pions ne peuvent qu'avancer. Lorsqu'ils atteignent le bord du plateau, ils sont bloqués.</p>
                            <img src="../assets/img/pawn_blocked.png" >
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>Les pions sont l'âme du corner chess.
                                Contrairement aux échecs classiques ils peuvent se déplacer suivant 2 directions,
                                ce qui les rends polyvalent et dangereux.
                                En revanche lorsqu'ils s'éloignent du centre de l'échiquier,
                                ils deviennent progressivement plus vulnérable. (en attente du système de promotion.)
                            </p>
                        </div>
                    </section>

                    <section id= knight_displacement>
                        <h2 id="knight_title" class="card-title subtitle">Le cavalier</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>Le cavalier est une pièce flexible, qui se déplace en formant un L.</p>
                            <img src="../assets/img/knight_displacement.png" >
                            <p>Sa particularité vient de sa capacité à sauter par dessus les pièces,
                                alliées comme adverse.
                            </p>
                            <img src="../assets/img/knight_jump.png" >
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>Le cavalier est une pièce unique dans le corner chess. 
                                Grace à sa grande mobilité il est possible de la développer très rapidement,
                                afin de venir attaquer rapidement les pièces adverses. 
                                Elle est également très utile pour controler des cases
                                qui seraient normalement inaccessible avec d'autres pièces.
                            </p>
                        </div>
                    </section>

                    <section id= bishop_displacement>
                        <h2 id="bishop_title" class="card-title subtitle">Le fou</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>Le fou peu se déplacer en diagonale, sur une ou plusieurs cases</p>
                            <img src="../assets/img/bishop_displacement.png" >
                            <p>Si une pièce alliée bloque son avancée, elle ne peut pas la dépasser.
                                En revanche s'il s'agit d'une pièce adverse, elle peut la capturer.
                            </p>
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>Au corner chess, le fou est une pièce extrement puissante. 
                                Grace à l'orientation du plateau, il peut controller rapidement des cases
                                importantes dans le camp adverse. C'est une pièce longue portée redoutable,
                                particulièrement en début de partie.
                            </p>
                        </div>
                    </section>

                    <section id= rook_displacement>
                        <h2 id="rook_title" class="card-title subtitle">La tour</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>La tour peut se déplacer le long des lignes et des colonnes</p>
                            <img src="../assets/img/rook_displacement.png" >
                            <p>Si une pièce alliée bloque son avancée, elle ne peut pas la dépasser.
                                En revanche s'il s'agit d'une pièce adverse, elle peut la capturer.
                            </p>
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>Au début de la partie les tours sont placées à coté du roi et sont bloquées par les autres pièces.
                                Ce sont des pièces puissantes, qui sont capables d'attaquer à longue distance, 
                                Et qui peuvent atteindre toutes les cases du plateau. 
                                Leur potentiel s'exprime pleinement en fin de partie, lorsque le plateau comporte moins de pièces.
                            </p>
                        </div>
                    </section>

                    <section id= queen_displacement>
                        <h2 id="queen_title" class="card-title subtitle">La dame</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>La dame peut se déplacer le long des lignes et des colonnes, mais également en diagonale</p>
                            <img src="../assets/img/queen_displacement.png" >
                            <p>Si une pièce alliée bloque son avancée, elle ne peut pas la dépasser.
                                En revanche s'il s'agit d'une pièce adverse, elle peut la capturer.
                            </p>
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>La dame est la pièce la plus puissante de votre arsenal. 
                                Sa grande mobilité la rends particulièrement efficace en attaque.
                                Son potentiel est total en milieu de jeu, 
                                lorsque le plateau a commencé à se vider et que des ouvertures apparaissent.
                            </p>
                        </div>
                    </section>

                    <section id= king_displacement>
                        <h2 id="king_title" class="card-title subtitle">Le roi</h2>
                        <div class="border border-3 border-dark-subtle rounded-3 p-3">
                            <h4 class="text-decoration-underline">Déplacement</h4>
                            <p>Le roi peut se déplacer d'une seule case, dans n'importe quelle direction du plateau.</p>
                            <img src="../assets/img/king_displacement.png" >
                            <p>Si une pièce alliée bloque son avancée, elle ne peut pas la dépasser.
                                En revanche s'il s'agit d'une pièce adverse, elle peut la capturer.
                            </p>
                            <h4 class="text-decoration-underline">Astuces</h4>
                            <p>Le roi est la pièce la plus importante. Le but étant de s'emparer du roi adverse,
                                il est nécessaire de protéger le votre à tout prix !
                                Toutefois en fin de partie, lorsque la plupart des menaces ont été éliminés,
                                sa mobilité peut vous permettre de décrocher un avantage décisif !
                            </p>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    </div>
</section>

<section id="specific_rules" class="rules_section">
    <div class="container-fluid container-lg ">
        <div class="card h-100 w-100 bg-light rounded-0 rounded-bottom-3">
            <div class="card-body">
                <div class="row gy-4 gy-md-0">
                    <h1 id="specific_rules_title" class="card-title section_title" >Règles spéciales</h1>
                    <ul class="text-decoration-none">
                        <li>Si un joueur mais en échec le roi adverse, c'est à dire qu'il menace de le capturer au prochain coup,
                            le joueur est obligé de défendre son roi en le déplaçant, en interposant une pièce, ou bien en capturant l'attaquant.
                        </li>
                        <li>Si aucun coup ne le permets, le joueur est dit mat. Dans ce cas le joueur qui a mis
                            le roi en échec remporte la partie par échec et mat.
                        </li>
                        <li>
                            Si le roi n'est pas mis en échecs, mais qu'aucun coup légal ne peut être joué, 
                            la partie est déclarée nulle par pat.
                        </li>
                        
                    </ul>

                    <h2 class="card-title">Petits conseils : </h2>
                    <ul class="">
                        <li>Les déplacements de la plupart des pièces restent identiques : les tactiques de base s'appliquent donc</li>
                        <li>Dans cette version les pions sont très puissants car ils peuvent changer de direction. 
                            En revanche ils controlent moins de case que dans les échecs normaux. Profitez en !
                        </li>
                        <li>Contrairement aux échecs classiques, lorsqu'un pion atteint le bord d'une ligne, il n'est pas promu</li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
</div>

</template>

<script setup lang="ts">

</script>

<style scoped>

</style>