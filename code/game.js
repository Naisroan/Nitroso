// constantes
const FOV = 75;
const NEAR = 0.1;
const FAR = 10000;
const _LIMITE_FPS = 1 / 60;
const _COLOR_HEX_CLEAR_COLOR = 0xF4BF75;
const MODELS_PATH = "/res/models/";
const TEXTURES_PATH = "/res/textures/";

// globales
let _SCENE = new THREE.Scene();
let _CLOCK = new THREE.Clock();
let _RENDERER = new THREE.WebGLRenderer({ presicion: "mediump" });
let _CAMERA = null;
let _MESSAGE = null;

let isPause = false;
let timeElapsed = 0;
let isLoadedModels = false;
let keys = [];
let ilumination = {
    ambient: new THREE.AmbientLight(new THREE.Color(1.0, 1.0, 1.0), 1.0),
    directional: new THREE.DirectionalLight(new THREE.Color(1,1, 1), 1.0),
    hemisphere: new THREE.HemisphereLight(new THREE.Color(0.50, 0.87, 0.94), new THREE.Color(0.65, 0.77, 0.83), 1.0)
};
let models = [

    // PISTA
    new Model(
        // path del modelo
        MODELS_PATH + "pistav3/",
        // nombre del modelo con su extension
        "pista_bosque.fbx",
        // nombre del objeto
        "pista_bosque",
        // posicion        
        new THREE.Vector3(0, 0, 0),
        // rotacion
        new THREE.Vector3(0, 0, 0),
        // escala
        new THREE.Vector3(1, 1, 1)
    ),

    // CARRO
    new Model(MODELS_PATH + "tests/", "carro.fbx", "player_carro_1", new THREE.Vector3(-3, 0, 6), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "tests/", "llantasv3.fbx", "player_llantas", new THREE.Vector3(3, 0, -6), new THREE.Vector3(0, 1.5708, 0), new THREE.Vector3(1, 1, 1)),
    
    // OBSTACULOS
    new Model(MODELS_PATH + "obs/bosque/", "OBS_Dog.fbx", "obs_dog", new THREE.Vector3(0, 0, -30), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "obs/bosque/", "cono.fbx", "obs_cono_1", new THREE.Vector3(-40, 0, -45), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "obs/bosque/", "cono.fbx", "obs_cono_2", new THREE.Vector3(0, 0, -60), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "obs/bosque/", "cono.fbx", "obs_cono_3", new THREE.Vector3(-70, 0, -55), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "obs/bosque/", "cono.fbx", "obs_cono_4", new THREE.Vector3(70, 0, -80), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "obs/bosque/", "oil.fbx", "obs_oil", new THREE.Vector3(40, 0, -45), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.2, 0.2, 0.2)),
    new Model(MODELS_PATH + "obs/bosque/", "tronco.fbx", "obs_tronco_1", new THREE.Vector3(-30, 0, -60), new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 5, 5)),

    // DECORACIONES
    new Model(MODELS_PATH + "obs/bosque/", "arbol1.fbx", "env_tree_1", new THREE.Vector3(-120, 0, -30), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "obs/bosque/", "arbol2.fbx", "env_tree_2", new THREE.Vector3(120, 0, -30), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "obs/bosque/", "pino1.fbx", "env_pino_1", new THREE.Vector3(125, 0, -80), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "obs/bosque/", "pino2.fbx", "env_pino_2", new THREE.Vector3(130, 0, -160), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "obs/bosque/", "pino3.fbx", "env_pino_3", new THREE.Vector3(-125, 0, -80), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "obs/bosque/", "pino4.fbx", "env_pino_4", new THREE.Vector3(-130, 0, -160), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),

    // BUFFS
    new Model(MODELS_PATH + "buffs/", "caja_rota2.fbx", "buff_1", new THREE.Vector3(-35, 5, 25), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "buffs/", "caja_rota2.fbx", "buff_2", new THREE.Vector3(35, 5, 25), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
];

// load
$(() => {

    // iniciamos configuraciones
    init();

    // cargamos modelos
    loadModels();
});

// eventos
const update = (deltaTime) => {

    let pista = _SCENE.getObjectByName("pista_bosque");
    let carro = _SCENE.getObjectByName("player_carro_1");
    let carro2 = _SCENE.getObjectByName("player_carro_2");

    if (pista !== undefined && pista !== null) {

        pista.children[0].material.map.offset.y -= 0.1 * deltaTime;
    }

    if (keys["W"]) {
        carro.translateZ(-30 * deltaTime);
    }

    if (keys["S"]) {
        carro.translateZ(30 * deltaTime);
    }

    if (keys["A"]) {
        // _CAMERA.translateX(-10 * deltaTime);
        carro.position.x -= 30 * deltaTime;
    }

    if (keys["D"]) {
        // _CAMERA.translateX(10 * deltaTime);
        carro.position.x += 30 * deltaTime;
    }

    if (keys["T"]) {
        carro2.translateZ(-30 * deltaTime);
    }

    if (keys["G"]) {
        carro2.translateZ(30 * deltaTime);
    }

    if (keys["F"]) {
        carro2.position.x -= 30 * deltaTime;
    }

    if (keys["H"]) {
        carro2.position.x += 30 * deltaTime;
    }

    if (keys["Q"]) {
        _CAMERA.translateY(10 * deltaTime);
    }

    if (keys["E"]) {
        _CAMERA.translateY(-10 * deltaTime);
    }

    if (keys["Z"]) {
        _CAMERA.rotateX(10 * deltaTime);
    }

    if (keys["X"]) {
        _CAMERA.rotateX(-10 * deltaTime);
    }

    // fog
    if (keys["U"]) {
        _SCENE.fog.near += 1;
    }

    if (keys["J"]) {
        _SCENE.fog.near -= 1;
    }

    if (keys["I"]) {
        _SCENE.fog.far += 1;
    }

    if (keys["K"]) {
        _SCENE.fog.far -= 1;
    }

    _SCENE.fog.color = ilumination.hemisphere.groundColor;
};

// funcion que se manda a llamar una unica vez al cargar todos los modelos
const onLoadedAllModels = () => {

    let carro = _SCENE.getObjectByName("player_carro_1");
    let carro2 = null;
    let llantas = _SCENE.getObjectByName("player_llantas");

    if (carro && llantas) {

        carro.add(llantas);

        carro2 = carro.clone();
        carro2.name = "player_carro_2";

        carro.position.set(-24, 0, 0);
        carro2.position.set(24, 0, 0);

        _SCENE.add(carro2);
    }
};

// funcion que se manda a llamar una unica vez al cargar el dom
const init = () => {

    // obtenemos el area donde renderizará
    let device = $('#wrapper .game');
    let deviceWidth = device.width();
    let devicHeight = device.height();

    // configuramos area/render
    _RENDERER.shadowMap.enabled = true;
    _RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
    _RENDERER.setPixelRatio(deviceWidth / devicHeight);
    _RENDERER.setSize(deviceWidth, devicHeight);

    device.append(_RENDERER.domElement);

    // configuramos escena
    // _SCENE.fog = new THREE.Fog(0xcce0ff, 93, 976);
    _SCENE.fog = new THREE.Fog(0xcce0ff, 195, 490);

    // obtenemos contenedor de mensajes
    _MESSAGE = $("#texto");

    // configuramos camara
    _CAMERA = new THREE.PerspectiveCamera(FOV, deviceWidth / devicHeight, NEAR, FAR);
    _CAMERA.position.y = 50;
    _CAMERA.position.z = 60;
    _CAMERA.lookAt(0, 0, 0);

    // configuramos iluminacion
    ilumination.directional.position.set(-172, 100, 61);
    
    // sombra
    ilumination.directional.castShadow = true;

    ilumination.directional.shadow.mapSize.width = 2048;
    ilumination.directional.shadow.mapSize.height = 2048;

    ilumination.directional.shadow.bias = -0.001;

    ilumination.directional.shadow.camera.near = 0.1;
    ilumination.directional.shadow.camera.far = 1000.0;

    ilumination.directional.shadow.camera.left = 500;
    ilumination.directional.shadow.camera.right = -500;
    ilumination.directional.shadow.camera.top = 500;
    ilumination.directional.shadow.camera.bottom = -500;

    // luz emisferia
    // ilumination.hemisphere.color.setHSL( 0.6, 1, 0.6 );
    // ilumination.hemisphere.groundColor.setHSL( 0.095, 1, 0.75 );
    ilumination.hemisphere.position.set(0, 50, 0);

    _SCENE.add(ilumination.ambient);
    _SCENE.add(ilumination.directional);
    // _SCENE.add(ilumination.hemisphere);

    // añadimos un grid de apoyo
    /*
    let grid = new THREE.GridHelper(50, 10, 0xFFFFFF, 0xFFFFFF);
    grid.position.y = -1;

    _SCENE.add(grid);
    */

    // creamos skybox
    let skyBox = createSkyBox({
        up: TEXTURES_PATH + "skybox_test/DaylightBox_Top.bmp",
        down: TEXTURES_PATH + "skybox_test/DaylightBox_Bottom.bmp",
        right: TEXTURES_PATH + "skybox_test/DaylightBox_Left.bmp",
        left: TEXTURES_PATH + "skybox_test/DaylightBox_Right.bmp",
        front: TEXTURES_PATH + "skybox_test/DaylightBox_Front.bmp",
        back: TEXTURES_PATH + "skybox_test/DaylightBox_Back.bmp",
    });

    skyBox.name = "sky";
    _SCENE.add(skyBox);

    // establecemos eventos de teclas
    inicializarEventosTeclas();
};

// ciclo general del juego
const loop = () => {

    // obtenemos deltatime
    let deltaTime = _CLOCK.getDelta();
    timeElapsed += deltaTime;
    
    // establecemos color al canvas
    _RENDERER.setClearColor(ilumination.hemisphere.color);

    if (!isPause) {
    
        // si no esta en pausa, aplicamos logica del juego
        update(deltaTime);
    }

    // limitamos los FPS
    if (timeElapsed > _LIMITE_FPS) {

        // actualizamos animaciones
        animate(deltaTime);

        // dibujamos
        _RENDERER.render(_SCENE, _CAMERA);

        // reseteamos timeElapsed
        timeElapsed = timeElapsed % _LIMITE_FPS;
    }

    // loopeamos
    window.requestAnimationFrame(() => loop());
};

// funcion que se llama en el loop del juego, es para actualizar las animaciones
const animate = (deltaTime) => {

    if (!modelMixers) {
        return;
    }

    for (let mixer of modelMixers) {

        mixer.update(deltaTime);
    }
};

// inicializamos y configuramos los eventos del teclado
const inicializarEventosTeclas = () => {

    pause(false);

    $(window).on("keydown", (e) => {

        // tecla P
        if (e.keyCode == 80) {
            pause(!isPause);
        }
    });

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
};

// funcion de evento al presionar una tecla
function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

// funcion de evento al dejar de presionar una tecla
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

// funcion que se manda a llamar al cargar un modelo
const onLoadedModel = (name, model, options) => {

    // configuramos el objeto 3d
    model.name = name;

    // aplicamos las opciones si existen
    if (options !== undefined || options !== null) {

        if (options.scale !== undefined || options.scale !== null) {
    
            model.scale.set(options.scale.x, options.scale.y, options.scale.z);
        }

        if (options.position !== undefined || options.position !== null) {
    
            model.position.set(options.position.x, options.position.y, options.position.z);
        }

        if (options.rotation !== undefined || options.rotation !== null) {
    
            model.rotation.set(options.rotation.x, options.rotation.y, options.rotation.z);
        }
    }

    // añadimos el objeto 3d a la escena
    _SCENE.add(model);

    // verificamos si ya se cargaron todos los modelos
    for (let m of models) {

        if (!m.isLoaded) {

            isLoadedModels = false;
            return;
        }
    }

    isLoadedModels = true;

    // configuramos objetos 3d
    onLoadedAllModels();

    // llamamos al loop del juego
    loop();

    // quitamos la barra de carga
    showLoader(false);
};

const onErrorLoadModel = (error) => {

    showText(error);
    console.log(error);
};

const onProgressModel = (progress) => {

    // console.log(progress);
};

const loadModels = () => {

    for (let m of models) {

        m.load(onLoadedModel, onErrorLoadModel, onProgressModel);
    }
};

<<<<<<< Updated upstream
// functions
=======
// funcion que se llama en un setInterval (establecida en la funcion onLoadedAllModels)
const spawnRandomProp = () => {

    // obtenemos el nombre clave del escenario
    let nameScene = getSceneBaseNameByIndex(sceneIndex);

    // filtramos objetos ya instanciados que tengan la categoria env
    let objs = objetos.filter(o => o.name.includes(nameScene + "_env_"));

    // obtenemos un numero aleatorio del 0 al tamaño del arreglo
    let rndm = Math.floor(Math.random() * objs.length);
    
    // creamos una instancia nueva del objeto obtenido aleatoriamente
    let prop = objs[rndm].clone();
    let prop2 = null;

    // obtenemos una posicion entera random en el rango de x dependiendo de las constantes (150 - 200)
    // Math.random() * (max - min) + min;
    let rndmPosX = Math.floor(Math.random() * (SPAWN_PROP_LIMIT_POS_X_POS - 150) + 150);

    // establecemos la posicion en base a la posicion x aleatoria obtenida y a la constante Z de los limites
    prop.position.set(rndmPosX, 0, SPAWN_PROP_LIMIT_POS_Z_NEG);

    // ya tenemos la decoracion para que spawnee del lado derecho, ahora hay que hacer lo mismo del lado izquierdo
    // clonamos la decoracion e invertimos la posicion x para que también salga del otro lado (izquierdo)
    prop2 = prop.clone();
    prop2.position.x = -prop2.position.x;

     // le restamos 7 en z para que aparezca un poco mas atras y no se va tan simetrico el spawneo en ambos extremos
    prop2.position.z = prop2.position.z - 7;

    // agregamos las dos decoraciones
    _SCENE.add(prop);
    _SCENE.add(prop2);

};

// funcion que se llama en un setInterval (establecida en la funcion onLoadedAllModels)
const spawnRandomObstacle = () => {

    // como los obstaculos spawnean en la pista, podemos reemplazar el spawneo de un obstaculo
    // por un buff (probabilidad de 1/10 para que sea un buff)
    let isObstacle = (Math.floor(Math.random() * 10) + 1) !== 1;
    

    // obtenemos una posicion entera random en el rango de x dependiendo de las constantes (0 - 80)
    // Math.random() * (max - min) + min;
    let rndmPosX = Math.floor(Math.random() * (SPAWN_OBS_LIMIT_POS_X_POS - 0) + 0);

    // establecemos si es negativo o positivo de forma aleatoria
    rndmPosX = (Math.floor(Math.random() * 2) + 1) === 1 ? rndmPosX : -rndmPosX;

    let obs = null;

    
    

    if (isObstacle) {

        
        // obtenemos el nombre clave del escenario
        let nameScene = getSceneBaseNameByIndex(sceneIndex);
    
        // filtramos objetos ya instanciados que tengan la categoria obs
        let objs = objetos.filter(o => o.name.includes(nameScene + "_obs_"));
    
        // obtenemos un numero aleatorio del 0 al tamaño del arreglo
        let rndm = Math.floor(Math.random() * objs.length);
        
        // creamos una instancia nueva del objeto obtenido aleatoriamente
        obs = objs[rndm].clone();


        //-------COLISION DE OBSTACULOS (PRUEBA)------------//


        firstBB = new THREE.Box3().setFromObject(obs);
        secondBB = new THREE.Box3().setFromObject(carro);
        var collision = firstBB.intersectsBox(secondBB);
         
        if(collision){
         
        console.log("si hay colision");
           
        }


       
     
    } else {

        let buffObject = objetos.find(o => o.name.includes("buff_1"));
        obs = cloneWithAnimations(buffObject, modelMixers);

        
    }

    // establecemos su posicion
    obs.position.set(rndmPosX, 0, SPAWN_OBS_LIMIT_POS_Z_NEG);

    // agregamos a la escena
    _SCENE.add(obs);
    
    
       //----------PRUEBA COLISION (CARROS)--------------//

       //let deltaTime = _CLOCK.getDelta();

       //firstBB = new THREE.Box3().setFromObject(carro2);
       //secondBB = new THREE.Box3().setFromObject(carro);
       //var collision = firstBB.intersectsBox(secondBB);
    
       //if(collision){
    
        //carro.position.x -= 30;
        //console.log("si hay colision");
      
       //}




};

// funcion que obtiene todos los props (decoraciones) y va moviendolos hacia atras
const moveProps = (deltaTime) => {

    let props = _SCENE.children.filter(o => o.name.includes("_env_"));

    for (let prop of props) {

        let sceneObject = _SCENE.getObjectById(prop.id);

        if (prop.position.z >= SPAWN_PROP_LIMIT_POS_Z_POS) {
            _SCENE.remove(sceneObject);
        }

        sceneObject.position.z += velocidad * deltaTime * 1500;
    }
};

// funcion que obtiene todos los obs (obstaculos) y va moviendolos hacia atras
const moveObstacles = (deltaTime) => {

    let obstacles = _SCENE.children.filter(o => o.name.includes("_obs_") || o.name.includes("buff"));

    for (let obs of obstacles) {

        let sceneObject = _SCENE.getObjectById(obs.id);

        if (obs.position.z >= SPAWN_OBS_LIMIT_POS_Z_POS) {


            

            let mixerIdx = modelMixers.findIndex(n => n._root.id === sceneObject.id);

            if (mixerIdx >= 0) {

                
                modelMixers.splice(mixerIdx, 1);
                
            }

            _SCENE.remove(sceneObject);
        }

        sceneObject.position.z += velocidad * deltaTime * 1500;
    }


};

// inicializamos y configuramos los eventos del teclado
const inicializarEventosTeclas = () => {

    pause(false);

    $(window).on("keydown", (e) => {

        // [TECLA P] pausamos
        if (e.keyCode == 80) {
            pause(!isPause);
        }

        // [TECLA C] cambiamos el escenario
        if (e.keyCode == 67) {

            // cambiamos el index
            sceneIndex = sceneIndex > 1 ? 0 : sceneIndex + 1;

            // cambiamos textura de la pista
            pista.children[0].material.map = getPistaTextureByIndex(sceneIndex);
        }
    });

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
};

>>>>>>> Stashed changes
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

const showText = (text) => {

    _MESSAGE.text(text);
};

const spawnProp = () => {

<<<<<<< Updated upstream
};
=======
// funcion de evento al dejar de presionar una tecla
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

>>>>>>> Stashed changes
