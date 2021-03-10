let auMenu = null;
let auBtnOnHover = null;
let auBtnOnClick = null;
let ranger = null;

// load
$(() => {

    auMenu = document.getElementById("auMenu");
    auBtnOnHover = document.getElementById("auBtnHover");
    auBtnOnClick = document.getElementById("auBtnClick");
    ranger = $("#rgVolumen");

    // volumen inicial
    setVolume(0.05);

    $(".botones img").on("mouseenter", () => {
        auBtnOnHover.play();
    });

    $(".botones img").on("click", () => {
        auBtnOnClick.play();
    });

    $(".scene").on("mouseenter", () => {
        auBtnOnHover.play();
    });

    $(".scene").on("click", () => {

        auBtnOnClick.pause();
        setVolume(0);
        showLoader(true);
        setTimeout(() => {
            window.location = "/mods/game/game.php";
        }, 2000);
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

const setVolume = (volume) => {

    let rangeValue = volume * 1000;
    auMenu.volume = volume;
    ranger.val(rangeValue);
    $("#spVolumen").text(rangeValue);
};