<template>
    <header class="bg-light py-4">
        <nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand text-uppercase fw-bold text-brand ms-4">
                    <span class="bg-primary bg-gradient p-1 rounded-3 text-light">Corner</span> Chess
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <router-link to="/Rules" class="nav-link">Régles</router-link>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link " href="#profil">Profil</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link " data-bs-toggle="modal" data-bs-target="#modal_connexion">Connexion</a>
                        </li>

                    </ul>
                    
                </div>
            </div>
        </nav>
        <div class="modal" id="modal_connexion" tabindex="-1">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title fw-bold">Connexion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form method="post" action="./contact_form_treatment.php" id="contact_form">
                            <div class="mb-3">
                                <label for="contact_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="connexion_email" name="connexion_email" placeholder="prenom.nom@email.com">
                            </div>
                            <div class="mb-3">
                                <label for="connexion_password" class="form-label">Mot de passe</label>
                                <input type="password" class="form-control" id="connexion_password" name="connexion_password" placeholder="">
                            </div>

                            
                            
                        <input class="btn btn-primary w-100" type="button" value = "Connexion" onclick="submit_contact_form()">
                        
                        </form>
                        <p>Pas encore inscrit ? Inscrivez vous <a href="../../inscription.html">ici</a></p>
                    
                        </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                        </div>
                    </div>
    </header>
</template>

<script setup>


</script>

<style scoped>


</style>