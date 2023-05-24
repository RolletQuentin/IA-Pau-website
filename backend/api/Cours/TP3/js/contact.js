function verifDataForm(e){

    /*
    * Vérification de la date
    */ 

    var date = document.getElementById("Date");
    var alertdate = document.getElementById("alert-date");
    if(date.value == "" || date.value == null){
        alertdate.textContent = "* Ce champ est obligatoire";
        date.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        dateValue = new Date(date.value);
        const nowDays = new Date(Date.now());
        var diff = dateValue - nowDays;
        var dateValide = (diff > 0) ? true : false;
        if(dateValide){
            alertdate.textContent = "";
            date.style.border = "none";
        } else {
            alertdate.textContent = "* La valeur saisie est invalide !";
            date.style.border = "3px outset red";
            if (typeof e.cancelable !== 'boolean' || e.cancelable) {
                e.preventDefault();
            }  
        }
    }
    /*
    * Vérification du Nom
    */ 

    var nom = document.getElementById("Nom");
    var alertnom = document.getElementById("alert-nom");
    if(nom.value == "" || nom.value == null){
        alertnom.textContent = "* Ce champ est obligatoire";
        nom.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertnom.textContent = "";
        nom.style.border = "none";
    }
    /*
    * Vérification du Prénom
    */ 

    var prenom = document.getElementById("Prenom");
    var alertprenom = document.getElementById("alert-prenom");
    if(prenom.value == "" || prenom.value == null){
        alertprenom.textContent = "* Ce champ est obligatoire";
        prenom.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertprenom.textContent = "";
        prenom.style.border = "none";
    }
    /*
    * Vérification du mail
    */ 

    var mail = document.getElementById("Mail");
    var alertmail = document.getElementById("alert-mail");
    if(mail.value == "" || mail.value == null){
        alertmail.textContent = "* Ce champ est obligatoire";
        mail.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertmail.textContent = "";
        mail.style.border = "none";
    }
    /*
    * Vérification du sujet
    */ 

    var sujet = document.getElementById("Sujet");
    var alertsujet = document.getElementById("alert-subject");
    if(sujet.value == "" || sujet.value == null){
        alertsujet.textContent = "* Ce champ est obligatoire";
        sujet.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertsujet.textContent = "";
        sujet.style.border = "none";
    }
    /*
    * Vérification du contenu
    */ 

    var content = document.getElementById("Contenu");
    var alertcontent = document.getElementById("alert-content");
    if(content.value == "" || content.value == null){
        alertcontent.textContent = "* Ce champ est obligatoire";
        content.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertcontent.textContent = "";
        content.style.border = "none";
    }

    /*
    * Vérification du metier
    */ 

    var job = document.getElementById("job");
    var alertjob = document.getElementById("alert-job");
    if(job.selectedIndex == null || job.selectedIndex == 0){
        alertjob.textContent = "* Ce champ est obligatoire";
        job.style.border = "3px outset red";
        if (typeof e.cancelable !== 'boolean' || e.cancelable) {
            e.preventDefault();
        }
    } else {
        alertjob.textContent = "";
        job.style.border = "none";
    }
}