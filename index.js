
// --------------------------------------------------
// GLOBALES
// --------------------------------------------------
let auMenu = null;
let auBtnOnHover = null;
let auBtnOnClick = null;
let ranger = null;

// --------------------------------------------------
// LOAD
// --------------------------------------------------
$(() => {

    auMenu = document.getElementById("auMenu");
    auBtnOnHover = document.getElementById("auBtnHover");
    auBtnOnClick = document.getElementById("auBtnClick");
    ranger = $("#rgVolumen");

    let volumen = localStorage.getItem("volumen") != null ? parseFloat(localStorage.getItem("volumen")) : 0.05;

    // volumen inicial
    ranger.val(volumen * 100);
    $("#spVolumen").text(volumen * 100);
    setVolume(volumen);

    $(".botones img").on("mouseenter", () => {
        auBtnOnHover.play();
    });

    $(".botones img").on("click", () => {
        auBtnOnClick.play();
    });

    $(".scene").on("mouseenter", () => {
        auBtnOnHover.play();
    });

    ranger.on("input change", (e) => {
        
        let val = ranger.val();
        $("#spVolumen").text(val);
        auMenu.volume = val * 0.001;
    });

    $(".btnVerRegistro").on("click", () =>{

        let frmLogin = $("#form-login");
        let frmRegistro = $("#form-registro");

        if(frmLogin.hasClass("d-none")) {
            
            frmLogin.removeClass("d-none");
            frmRegistro.addClass("d-none");

        } else {
            
            frmLogin.addClass("d-none");
            frmRegistro.removeClass("d-none");
        }
    });

    setTimeout(() => {

        showLoader(false);
        auMenu.play();

    }, 3000);
});

// --------------------------------------------------
// EVENTOS
// --------------------------------------------------
const onBtnContinuarClick = () => {

    let nick1 = $("#txtNickJugador1").val();
    let pass1 = $("#txtPassJugador1").val();
    
    let nick2 = $("#txtNickJugador2").val();
    let pass2 = $("#txtPassJugador2").val();

    let modo = parseInt($("#slCantJugadores").val());
    let dificultad = $("#slDificultad").val();

    localStorage.setItem("modo", modo);
    localStorage.setItem("dificultad", dificultad);

    localStorage.setItem("player_1", nick1);
    localStorage.setItem("player_2", nick2);

    localStorage.setItem("volumen", ranger.val() * 0.001);

    $("#alert").text("");

    if (nick1 === "") {
        $("#alert").text("Ingrese el nick del jugador 1");
        return;
    }

    if (pass1 === "") {
        $("#alert").text("Ingrese la contraseña del jugador 1");
        return;
    }

    if (modo == 2) {

        if (nick2 === "") {
            $("#alert").text("Ingrese el nick del jugador 1");
            return;
        }
    
        if (pass2 === "") {
            $("#alert").text("Ingrese la contraseña del jugador 1");
            return;
        }

        if (nick1 == nick2) {
            $("#alert").text("No puede ser los mismos nicks");
            return;
        }
    }

    let usuario1 = {
        nick: nick1,
        password: pass1
    };

    let usuario2 = {
        nick: nick2,
        password: pass2
    };

    // validamos si exists por nick
    usuario_exists_by_nick(usuario1).done((result) => {

        if (isNaN(result)) {
            $("#alert").text(result);
            return;
        }

        localStorage.setItem("player_1_id", parseInt(result));

        let existe = parseInt(result);

        if (!existe) {

            // si no existe el nick, lo creamos
            usuario_create(usuario1).done((result) => {
    
                if (result == "" || parseInt(result) <= 0) {
                    $("#alert").text(result);
                    return;
                }

                localStorage.setItem("player_1_id", parseInt(result));

                if (modo != 2) {

                    $("#multijugador").addClass("d-none");
                    $("#niveles").removeClass("d-none");
                    
                    return;
                }

                // ahora con el usuario 2
                usuario_exists_by_nick(usuario2).done((result) => {

                    if (isNaN(result)) {
                        $("#alert").text(result);
                        return;
                    }

                    localStorage.setItem("player_2_id", parseInt(result));

                    let existe = parseInt(result);

                    if (!existe) {

                        // si no existe el nick, lo creamos
                        usuario_create(usuario2).done((result) => {
                
                            if (result == "" || parseInt(result) <= 0) {
                                $("#alert").text(result);
                                return;
                            }

                            localStorage.setItem("player_2_id", parseInt(result));
                    
                            $("#multijugador").addClass("d-none");
                            $("#niveles").removeClass("d-none");
                        })
                        .fail((jqXHR) => {
                    
                            $("#alert").text(jqXHR.responseText);
                            return;
                        });

                    } else {

                        // si existe, validamos que el usuario y contra coincidan
                        usuario_exists(usuario2).done((result) => {

                            if (isNaN(result)) {
                                $("#alert").text(result);
                                return;
                            }

                            localStorage.setItem("player_2_id", parseInt(result));

                            let existe = parseInt(result);

                            if (!existe) {

                                $("#alert").text("La contraseña del jugador 1 no coincide");
                                return;
                            }
                    
                            $("#multijugador").addClass("d-none");
                            $("#niveles").removeClass("d-none");
                        })
                        .fail((jqXHR) => {
                    
                            $("#alert").text(jqXHR.responseText);
                            return;
                        });
                    }
                })
                .fail((jqXHR) => {

                    $("#alert").text(jqXHR.responseText);
                    return;
                });
            })
            .fail((jqXHR) => {
        
                $("#alert").text(jqXHR.responseText);
                return;
            });

        } else {

            // si existe, validamos que el usuario y contra coincidan
            usuario_exists(usuario1).done((result) => {

                if (isNaN(result)) {
                    $("#alert").text(result);
                    return;
                }

                localStorage.setItem("player_1_id", parseInt(result));

                let existe = parseInt(result);

                if (!existe) {

                    $("#alert").text("La contraseña del jugador 1 no coincide");
                    return;
                }
                
                if (modo != 2) {

                    $("#multijugador").addClass("d-none");
                    $("#niveles").removeClass("d-none");
                    
                    return;
                }

                // ahora con el usuario 2
                usuario_exists_by_nick(usuario2).done((result) => {

                    if (isNaN(result)) {
                        $("#alert").text(result);
                        return;
                    }

                    localStorage.setItem("player_2_id", parseInt(result));

                    let existe = parseInt(result);

                    if (!existe) {

                        // si no existe el nick, lo creamos
                        usuario_create(usuario2).done((result) => {
                
                            if (result == "" || parseInt(result) <= 0) {
                                $("#alert").text(result);
                                return;
                            }

                            localStorage.setItem("player_2_id", parseInt(result));
                    
                            $("#multijugador").addClass("d-none");
                            $("#niveles").removeClass("d-none");
                        })
                        .fail((jqXHR) => {
                    
                            $("#alert").text(jqXHR.responseText);
                            return;
                        });

                    } else {

                        // si existe, validamos que el usuario y contra coincidan
                        usuario_exists(usuario2).done((result) => {

                            if (isNaN(result)) {
                                $("#alert").text(result);
                                return;
                            }

                            localStorage.setItem("player_2_id", parseInt(result));

                            let existe = parseInt(result);

                            if (!existe) {

                                $("#alert").text("La contraseña del jugador 2 no coincide");
                                return;
                            }
                    
                            $("#multijugador").addClass("d-none");
                            $("#niveles").removeClass("d-none");
                        })
                        .fail((jqXHR) => {
                    
                            $("#alert").text(jqXHR.responseText);
                            return;
                        });
                    }
                })
                .fail((jqXHR) => {

                    $("#alert").text(jqXHR.responseText);
                    return;
                });
            })
            .fail((jqXHR) => {
        
                $("#alert").text(jqXHR.responseText);
                return;
            });
        }
    })
    .fail((jqXHR) => {

        $("#alert").text(jqXHR.responseText);
        return;
    });
};

const onBtnVolverClick = () => {

    $("#txtNickJugador1").val("");
    $("#txtPassJugador1").val("");

    $("#txtNickJugador2").val("");
    $("#txtPassJugador2").val("");
    
    $("#slCantJugadores").val("1");
    $("#slDificultad").val("1");

    $("#alert").text("");

    $("#multijugador").removeClass("d-none");
    $("#niveles").addClass("d-none");
    $("#jugador-dos").addClass("d-none");
};

const onCantJugadoresChange = () => {

    let modo = parseInt($("#slCantJugadores").val());

    $("#jugador-dos").addClass("d-none");

    if (modo == 2) {
        $("#jugador-dos").removeClass("d-none");
    }
};

const setVolume = (volume) => {

    let rangeValue = volume * 1000;

    auMenu.volume = volume;
    ranger.val(rangeValue);

    $("#spVolumen").text(rangeValue);
};

const setScene = (idx) => {

    localStorage.setItem("scene", idx);
    
    auBtnOnClick.pause();
    setVolume(0);
    showLoader(true);

    setTimeout(() => {
        window.location = "/mods/game/game.php";
    }, 2000);
};

const onBtnScoreClick = () => {

    fillScores();
};

// --------------------------------------------------
// METODOS
// --------------------------------------------------

const fillScores = () => {

    let contenedor = $("#scores");

    puntuacion_selectall().done((result) => {

        // console.log(result);
        if (result == "") {

            container.html("");
            return;
        }

        let rows = JSON.parse(result);

        rows.forEach((value, idx) => {
        
            let element = `
                <tr>
                    <td>${value.nick}</td>
                    <td>${value.dificultad == 1 ? "FÁCIL" : value.dificultad == 2 ? "NORMAL" : "NITROSA" }</td>
                    <td>${value.score}</td>
                    <td>${value.fecha_alta}</td>
                </tr>
            `;

            contenedor.append(element);
        });
    })
    .fail((jqXHR) => {

        console.log(jqXHR.responseText);
        return;
    });
};

// --------------------------------------------------
// API FACEBOOK LOGIN (ya no utilizada)
// --------------------------------------------------

function checkLoginState() {

    debugger;

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Called with the results from FB.getLoginStatus().
function statusChangeCallback(response) {

    debugger;

    console.log('statusChangeCallback');
    console.log(response);          

    // Logged into your webpage and Facebook.
    if (response.status === 'connected') {

        onLoginWithFacebook();

    } else {

        // Not logged into your webpage or we are unable to tell.
        // document.getElementById('status').innerHTML = 'Please log ' +
        //     'into this webpage.';
    }
}

function onLoginWithFacebook() {

    debugger;

    console.log('Welcome!  Fetching your information.... ');

    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
    });
}