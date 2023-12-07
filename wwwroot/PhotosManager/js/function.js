function deconnection(message = undefined){

    API.eraseLoggedUser();
  
    API.logout();
    renderLogin({loginMessage:(message=!PointerEvent?message:undefined)});

}

function deleteProfil() {
    let loggedUser = API.retrieveLoggedUser();
    if (loggedUser) {
      API.unsubscribeAccount(loggedUser.Id).then((data) => {
        if (data) {
            deconnection("Votre compte a été effacé.");
        } else{
          renderProfil({error:"Un problème est survenu."});
        }
      });
    }
}

function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}

function createProfil(profil){
    API.register(profil).then((data => {
        if(!data){
            renderCreateProfil({error:"Il y a eu un problême durant la création de profil"})
        }
        else{
            renderLogin({loginMessage:"Votre compte a été créé. Veuillez prendre vos courriels pour reccupérer votre code de vérification qui vous sera demandé lors de votre prochaine connexion"});
        }
    }));
}
