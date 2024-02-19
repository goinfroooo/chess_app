<template>
      <section class="test p-4">
        <div class="container">
            <div class="row ">
                <form method="post" action="./contact_form_treatment.php" id="contact_form">
                    <div class="mb-3 d-flex">
                        <div class="me-3">
                            <label for="inscription_surname" class="form-label text-white">Prénom</label>
                            <input type="text" class="form-control" id="inscription_surname" name="inscription_surname" placeholder="">
                        </div>
                        <div>
                            <label for="contact_name" class="form-label text-white">Nom</label>
                            <input type="text" class="form-control" id="inscription_name" name="inscription_name" placeholder="">
                        </div>
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_date_naissance" class="form-label text-white">Date de naissance</label>
                        <input type="date" class="form-control" id="inscription_date_naissance" name="inscription_date_naissance" placeholder="prenom.nom@email.com">
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_pseudo" class="form-label text-white">Pseudo</label>
                        <input type="text" class="form-control" id="inscription_pseudo" name="inscription_pseudo" placeholder="prenom.nom@email.com">
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_email" class="form-label text-white">Email</label>
                        <input type="email" class="form-control" id="inscription_email" name="inscription_email" placeholder="prenom.nom@email.com">
                    </div>
                    <div class="g-recaptcha" data-sitekey="your_site_key"></div>

                    <div>
                        <input type="hidden" id="captcha" name="captcha">
                    </div>
                    
                <input class="btn btn-primary w-100" type="button" value = "envoyer" onclick="submit_inscription_form()">
                
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>

//import "https://www.google.com/recaptcha/api.js" ;


const  submit_inscription_form = () => {
    // Récupérer les données du formulaire

    alert ("wesh batard");

    var form = document.getElementById('contact_form');
    var formData = new FormData(form);
    console.log (formData);
    // Envoyer les données via Fetch
    fetch('./contact_form_treatment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Si le script PHP renvoie du JSON
    .then(data => {
        // Traiter la réponse du serveur (si nécessaire)
        console.log(data);
        if (data === "Sucess") {
            alert ("Votre message a bien été envoyé")
        }
        else {
            alert ("erreur lors de l'envoie. Veuillez m'envoyez un mail directement")
        }
    })
    .catch(error => {
        // Gérer les erreurs de la requête
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert ("erreur lors de l'envoie. Veuillez m'envoyez un mail directement")
    });
}

</script>

<style scoped>

.sidebar {
    margin-top: 50px;
}

.champ {
    max-width: 20rem;
}
</style>