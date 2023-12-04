let contentScrollPosition = 0;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Views rendering
function showWaitingGif() {
    eraseContent();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='images/Loading_icon.gif' /></div>'"));
}
function eraseHeader() {
    $("#header").empty();
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
function UpdateHeader( nom,  fonction) {
 let loggedUser = API.retrieveLoggedUser();
    eraseHeader()

    $("#header").append(   
        $(`
        
            <span title="Liste des photos" id="listPhotosCmd">
                <img src="images/PhotoCloudLogo.png" class="appLogo">
            </span>
            <span class="viewTitle"> ${nom}
       
            </span>
        `+(nom=="Liste des photos"?`
            <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>`:``) +
         (loggedUser==null ?`
            <div class="headerMenusContainer">
                 <span>&nbsp;
                </span> <!--filler-->
         `:`
            <div class="headerMenusContainer">
                <span>&nbsp;
                </span> <!--filler-->
                <i title="Modifier votre profil">
                    <div class="UserAvatarSmall" userid="${loggedUser.Id}" id="editProfilCmd"
                    style="background-image:url('${loggedUser.Avatar}')"
                    title="'${loggedUser.name}'"></div>
                </i>`) + `


                <div class="dropdown ms-auto">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="cmdIcon fa fa-ellipsis-vertical"></i>
                </div>
                <div class="dropdown-menu noselect">`
                + ((loggedUser!=null && loggedUser.type==1)?`
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
            </span>`:(loggedUser!=null && loggedUser.type==0)?`
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
        </span>`:`<span class="dropdown-item" id="loginCmd">
        <i class="menuIcon fa fa-sign-out mx-2"></i>
        connection
    </span>
                    
                    
                    `)+`
                    <div class="dropdown-divider"></div>

                    <div class="dropdown-item" id="aboutCmd">
                        <i class="menuIcon fa fa-info-circle mx-2"></i> À propos...
                    </div>
                </div>
            </div>
                
        

               
             </div>
        </div>
        <script>document.getElementById("loginCmd").addEventListener("click", renderLogin);</script>
        <script>document.getElementById("aboutCmd").addEventListener("click", renderAbout);</script>
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
function renderLogin(login = {loginMessage:undefined, Email:undefined, EmailError:undefined, passwordError:undefined}) {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    UpdateHeader("Connection", "login");
    $("#content").append($(`
        <div class="content" style="text-align:center">` +
            (login.loginMessage!=undefined?`<h3>${login.loginMessage}</h3>`:``) +
            `<form class="form" id="loginForm">
                <input type='email'
                    name='Email'
                    class="form-control"
                    required
                    RequireMessage = 'Veuillez entrer votre courriel'
                    InvalidMessage = 'Courriel invalide'
                    placeholder="adresse de courriel"` +
                    (login.Email!=undefined?`value='${login.Email}'`:``) + `>` +
                    (login.EmailError!=undefined?`<span style='color:red'>${login.EmailError}</span>`:``) + 
                `<input type='password'
                    name='Password'
                    placeholder='Mot de passe'
                    class="form-control"
                    required
                    RequireMessage = 'Veuillez entrer votre mot de passe'>` +
                (login.passwordError!=undefined?`<span style='color:red'>${login.passwordError}</span>`:``) + 
            `<input type='submit' name='submit' value="Entrer" class="form-control btn-primary">
            </form>
            <div class="form">
                <hr>
                <button class="form-control btn-info" id="createProfilCmd">Nouveau compte</button>
            </div>

        </div>
        <script>document.getElementById("createProfilCmd").addEventListener("click", renderCreateProfil);</script>`));
        $("#loginForm").submit(function(e){
            e.preventDefault();
            API.login($("input[name=Email]").val(), $("input[name=Password]").val()).then((data)=>{
                if(data == false){
                    switch(API.currentStatus){
                        case 481:
                            renderLogin({EmailError:API.currentHttpError})
                            break;
                        case 482:
                            renderLogin({passwordError:API.currentHttpError})
                            break;
                        default:
                            renderLogin({loginMessage:"Le serveur ne répond pas"})
                    }
                }
                else if(data == "Le serveur ne répond pas"){
                    renderLogin({loginMessage:data});
                }
                else{
    
                }
            });
        });

}

function loadContent(page){
    switch(page){
        case "about":
            renderAbout();
            break;
        case "login":
            renderLogin();
            break;
    }
    
}

function renderCreateProfil() {
    noTimeout(); // ne pas limiter le temps d’inactivité
    eraseContent(); // effacer le conteneur #content
    UpdateHeader("Inscription", "createProfil"); // mettre à jour l’entête et menu
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append(`
    <form class="form" id="createProfilForm"'>
        <fieldset>
            <legend>Adresse ce courriel</legend>
            <input type="email"
            class="form-control Email"
            name="Email"
            id="Email"
            placeholder="Courriel"
            required
            RequireMessage = 'Veuillez entrer votre courriel'
            InvalidMessage = 'Courriel invalide'
            CustomErrorMessage ="Ce courriel est déjà utilisé"/>
            <input class="form-control MatchedInput"
            type="text"
            matchedInputId="Email"
            name="matchedEmail"
            id="matchedEmail"
            placeholder="Vérification"
            required
            RequireMessage = 'Veuillez entrez de nouveau votre courriel'
            InvalidMessage="Les courriels ne correspondent pas" />
        </fieldset>
        <fieldset>
            <legend>Mot de passe</legend>
            <input type="password"
            class="form-control"
            name="Password"
            id="Password"
            placeholder="Mot de passe"
            required
            RequireMessage = 'Veuillez entrer un mot de passe'
            InvalidMessage = 'Mot de passe trop court'/>
            <input class="form-control MatchedInput"
            type="password"
            matchedInputId="Password"
            name="matchedPassword"
            id="matchedPassword"
            placeholder="Vérification" required
            InvalidMessage="Ne correspond pas au mot de passe" />
        </fieldset>
        <fieldset>
            <legend>Nom</legend>
            <input type="text"
            class="form-control Alpha"
            name="Name"
            id="Name"
            placeholder="Nom"
            required
            RequireMessage = 'Veuillez entrer votre nom'
            InvalidMessage = 'Nom invalide'/>
        </fieldset>
        <fieldset>
            <legend>Avatar</legend>
            <div class='imageUploader'
            newImage='true'
            controlId='Avatar'
            imageSrc='images/no-avatar.png'
            waitingImage='images/Loading_icon.gif'>
            </div>
        </fieldset>
        <input type='submit' name='submit' id='saveUserCmd' value="Enregistrer" class="form-control btn-primary">
    </form>
    <div class="cancel">
        <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>`);
    $('#loginCmd').on('click', renderLogin); // call back sur clic
    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderLogin); // call back sur clic
     // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
     // call back la soumission du formulaire
    $('#createProfilForm').on("submit",function(event) {
        
    event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
    let profil = getFormData($('#createProfilForm'));
    delete profil.matchedPassword;
    delete profil.matchedEmail;
    
    showWaitingGif(); // afficher GIF d’attente
    createProfil(profil); // commander la création au service API
    });
    }

