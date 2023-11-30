let contentScrollPosition = 0;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Views rendering
function showWaitingGif() {
    eraseContent();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='images/Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
function updateHeader( nom,  fonction, loggedUser=null) {
    $("#header").empty();

    $("#header").append(   
        $(`
        div id="header">
        <span title="Liste des photos" id="`+fonction+`cmd">
        <img src="images/PhotoCloudLogo.png" class="appLogo">
         </span>
        <span class="viewTitle"> `+nom+`
       
        </span>
        `+ (nom=="Liste des photos"?`<div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>`:``) +
         (loggedUser==null ?`<div class="headerMenusContainer">
         <span>&nbsp;</span> <!--filler-->
         `:`<div class="headerMenusContainer">
         <span>&nbsp;</span> <!--filler-->
         <i title="Modifier votre profil">
         <div class="UserAvatarSmall" userid="${loggedUser.Id}" id="editProfilCmd"
         style="background-image:url('${loggedUser.Avatar}')"
         title="'${loggedUser.name}'"></div>
         </i>`) + `
         <div class="dropdown ms-auto dropdownLayout">
         <div data-bs-toggle="dropdown" aria-expanded="false">
         <i class="cmdIcon fa fa-ellipsis-vertical"></i>
         </div>         
        `+ (loggedUser.type==1?`<div class="dropdown-menu noselect">
        <span class="dropdown-item" id="manageUserCm">
        <i class="menuIcon fas fa-user-cog mx-2"></i>
        Gestion des usagers
        </span>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="logoutCmd">
        <i class="menuIcon fa fa-sign-out mx-2"></i>
        Déconnexion
        </span>
        <span class="dropdown-item" id="editProfilMenuCmd">
        <i class="menuIcon fa fa-user-edit mx-2"></i>
        Modifier votre profil
        </span>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="listPhotosMenuCmd">
        <i class="menuIcon fa fa-image mx-2"></i>
        Liste des photos
        </span>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="sortByDateCmd">
        <i class="menuIcon fa fa-check mx-2"></i>
        <i class="menuIcon fa fa-calendar mx-2"></i>
        Photos par date de création
        </span>
        <span class="dropdown-item" id="sortByOwnersCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-users mx-2"></i>
        Photos par créateur
        </span>
        <span class="dropdown-item" id="sortByLikesCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-user mx-2"></i>
        Photos les plus aiméés
        </span>
        <span class="dropdown-item" id="ownerOnlyCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-user mx-2"></i>
        Mes photos
        </span>
        <div class>`
        :loggedUser.type==0?`
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="logoutCmd">
        <i class="menuIcon fa fa-sign-out mx-2"></i>
        Déconnexion
        </span>
        <span class="dropdown-item" id="editProfilMenuCmd">
        <i class="menuIcon fa fa-user-edit mx-2"></i>
        Modifier votre profil
        </span>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="listPhotosMenuCmd">
        <i class="menuIcon fa fa-image mx-2"></i>
        Liste des photos
        </span>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="sortByDateCmd">
        <i class="menuIcon fa fa-check mx-2"></i>
        <i class="menuIcon fa fa-calendar mx-2"></i>
        Photos par date de création
        </span>
        <span class="dropdown-item" id="sortByOwnersCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-users mx-2"></i>
        Photos par créateur
        </span>
        <span class="dropdown-item" id="sortByLikesCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-user mx-2"></i>
        Photos les plus aiméés
        </span>
        <span class="dropdown-item" id="ownerOnlyCmd">
        <i class="menuIcon fa fa-fw mx-2"></i>
        <i class="menuIcon fa fa-user mx-2"></i>
        Mes photos
        </span>
        <div class>`
        :`<span class="dropdown-item" id="loginCmd">
        <i class="menuIcon fa fa-sign-out mx-2"></i>
        connection
        </span>
        <div class="dropdown-divider"></div>
        `) + `
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" id="aboutCmd">
        <i class="menuIcon fa fa-info-circle mx-2"></i>
        À propos...
        </span>
        </div>

        </div>
        </div>
        </div>
        `))
        
}
function renderAbout() {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    UpdateHeader("À propos...", "about");

    $("#content").append(
        $(`
            <div class="aboutContainer">
                <h2>Gestionnaire de photos</h2>
                <hr>
                <p>
                    Petite application de gestion de photos multiusagers à titre de démonstration
                    d'interface utilisateur monopage réactive.
                </p>
                <p>
                    Auteur: Nicolas Chourot
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2023
                </p>
            </div>
        `))
}
function renderLogin(loginMessage, Email, EmailError, passwordError) {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    UpdateHeader("Connection...", "login");
    $("#content").append($(`
        <div class="content" style="text-align:center">
            <h3>${loginMessage}</h3>
            <form class="form" id="loginForm">
                <input type='email'
                    name='Email'
                    class="form-control"
                    required
                    RequireMessage = 'Veuillez entrer votre courriel'
                    InvalidMessage = 'Courriel invalide'
                    placeholder="adresse de courriel"
                    value='${Email}'>.
                <span style='color:red'>${EmailError}</span>
                <input type='password'
                    name='Password'
                    placeholder='Mot de passe'
                    class="form-control"
                    required
                    RequireMessage = 'Veuillez entrer votre mot de passe'>
                <span style='color:red'>${passwordError}</span>
                <input type='submit' name='submit' value="Entrer" class="form-control btn-primary">
            </form>
            <div class="form">
                <hr>
                <button class="form-control btn-info" id="createProfilCmd">Nouveau compte</button>
            </div>
        </div>`))
}

function addContent(){
    renderAbout();
}
