function deconnection(message = undefined){
    API.eraseLoggedUser();
    API.logout();
    renderLogin({loginMessage:message=!PointerEvent?message:undefined});
}

async function deleteProfil(profil) {
    if(profil==null){
        let loggedUser = API.retrieveLoggedUser();
        if (loggedUser) {
            if (await API.unsubscribeAccount(loggedUser.Id)) {
                deconnection("Votre compte a été effacé.")
            } else
                renderProfil({error:"Un problème est survenu."});
        }
    }
    else{
        if (await API.unsubscribeAccount(profil.Id)) {
            renderUsager();
        } else
            renderUsager({message:"Un problème est survenu."});
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