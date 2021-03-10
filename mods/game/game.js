// constantes
const _SCENE = new THREE.Scene();
const _CAMERA = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
const _RENDERER = new THREE.WebGLRenderer();

// globales
let isPause = false;

// load
$(() => {

    let device = $('#wrapper .container');
    _RENDERER.setSize(device.width(), device.height());
    device.append(_RENDERER.domElement);

    // iniciamos configuraciones
    inicializarEventosTeclas();

    // quitamos la barra de carga
    setTimeout(() => {

        showLoader(false);
    }, 2000);
});

// configuraciones
const inicializarEventosTeclas = () => {

    pause(false);

    $(window).on("keydown", (e) => {

        // tecla P
        if (e.keyCode == 80) {
            pause(!isPause);
        }
    });
};

// functions
const pause = (show = true) => {

    let height = "0px";
    let opacity = "0";
    let pauseContainer = $(".pause");
    
    if (show) {

        height = "100%";
        opacity = "1";

        if (!pauseContainer.hasClass("pe-auto")) {
            pauseContainer.addClass("pe-auto");
        }

    } else {

        if (!pauseContainer.hasClass("pe-none")) {
            pauseContainer.addClass("pe-none");
        }
    }
        
    pauseContainer.animate({
        height: height, 
        opacity: opacity, 
    }, 300);

    isPause = show;
};