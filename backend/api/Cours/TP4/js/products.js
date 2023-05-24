function setVisibility(){
    var hidden = false;
    for(i = 0; i < document.getElementsByClassName("quantite").length; i++) {
        var element = document.getElementsByClassName("quantite");
        element[i].style.display = element[i].style.display == "none" ? "table-cell" : "none";
        var button = document.getElementById("hiderbutton");
        if(element[i].style.display == "none"){
            button.textContent = "Afficher les stocks";
        } else {
            button.textContent = "Cacher les stocks";
        }
        element[i].style.textalign = "center";
    }
}

function modifQuantity(id, maxx, signe){
    var element = document.getElementById(id);
    var size = parseInt(element.textContent);
    console.log(id);
    if(signe == '+'){
        size = (size >= maxx) ? size : size + 1;
        
    } else {
        size = (size > 0) ? size - 1 : 0;
    }
    element.textContent = size;
}

function openPicture(file){
    Swal.fire({
        imageUrl: file,
        imageAlt: '_'
      })
}

function addToBasket(id, idNom){
    var element = document.getElementById(id);
    var content = element.textContent;
    content.replace("quantity-", "");
    var size = parseInt(content);
    var elementNom = document.getElementById(idNom);
    var nom = elementNom.textContent;
    if(size > 0){
        window.location.replace("add_to_basket.php?id=" + nom + "&qte=" + size);
    }
}