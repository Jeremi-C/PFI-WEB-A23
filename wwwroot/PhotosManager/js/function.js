function deconnection(){
    API.eraseLoggedUser();
    renderLogin();
}

function deleteProfil(){
    API.unsubscribeAccount(API.retrieveLoggedUser().Id).then((data) =>
    {
        if(data)deconnection();
        else renderProfil();
    });
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
    API.register(profil);
    renderLogin({loginMessage:"Votre compte a été créé. Veuillez prendre vos courriels pour reccupérer votre code de vérification qui vous sera demandé lors de votre prochaine connexion"});

}