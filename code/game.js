// constantes
const FOV = 75;
const NEAR = 0.1;
const FAR = 10000;
const _LIMITE_FPS = 1 / 60;
const _COLOR_HEX_CLEAR_COLOR = 0xF4BF75;
const MODELS_PATH = "/res/models/";
const TEXTURES_PATH = "/res/textures/";
const SPRITES_PATH = "/res/sprites/";

// limites de spawn de decoraciones
const SPAWN_PROP_LIMIT_POS_Z_POS = 130;
const SPAWN_PROP_LIMIT_POS_Z_NEG = -500;
const SPAWN_PROP_LIMIT_POS_X_POS = 200;
const SPAWN_PROP_LIMIT_POS_X_NEG = -200;

// limites de spawn de obstaculos
const SPAWN_OBS_LIMIT_POS_Z_NEG = -500;
const SPAWN_OBS_LIMIT_POS_Z_POS = 100;
const SPAWN_OBS_LIMIT_POS_X_POS = 80;
const SPAWN_OBS_LIMIT_POS_X_NEG = -80;

// limites carretara
const LIMIT_HIGHWAY_POS_X = 85;
const LIMIT_HIGHWAY_POS_Z_POS = 50;
const LIMIT_HIGHWAY_POS_Z_NEG = -150;

// zona muerta de controles
const CONTROL_THRESHOLD = 8689 / 32767.0;

// sonidos
let auAmbient = null;
let auChoque = null;
let auBuff = null;

// globales
let _SCENE = new THREE.Scene();
let _CLOCK = new THREE.Clock();
let _RENDERER = new THREE.WebGLRenderer({ presicion: "mediump" });
let _CAMERA = null;
let _MESSAGE = null;

let spawnProps = true;
let spawnObstacles = false;

let velocidad = 0.3;
let factorMovimientoJugador = 50;

let sceneIndex = 0; // 0 - bosque, 1 - desierto, 2 - nieve

let isStart = false;
let isPause = false;
let isGameOver = false;

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
    new Model(MODELS_PATH + "pistav3/", "pista_bosque.fbx", "pista"),

    // CARRO
    new Model(MODELS_PATH + "tests/", "carro.fbx", "player_carro_1", new THREE.Vector3(-3, 0, 6), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "tests/", "llantasv3.fbx", "player_llantas", new THREE.Vector3(3, 0, -6), new THREE.Vector3(0, 1.5708, 0), new THREE.Vector3(1, 1, 1)),
    
    // OBSTACULOS - BOSQUE
    new Model(MODELS_PATH + "obs/bosque/", "cono.fbx", "sc0_obs_cono_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
    new Model(MODELS_PATH + "obs/bosque/", "oil.fbx", "sc0_obs_oil_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.2, 0.2, 0.2)),
    new Model(MODELS_PATH + "obs/bosque/", "tronco.fbx", "sc0_obs_tronco_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 5, 5)),
    
    // OBSTACULOS - PLAYA
    new Model(MODELS_PATH + "obs/playa/", "obstaculo_desierto_fosil.fbx", "sc1_obs_fosil_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "obs/playa/", "obstaculo_desierto_roca.fbx", "sc1_obs_rocadesierto_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    
    // OBSTACULOS - NIEVE
    new Model(MODELS_PATH + "obs/nieve/", "obstaculo_nieve_roca.fbx", "sc2_obs_rocanieve_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "obs/nieve/", "obstaculo_nieve_snowman_2.fbx", "sc2_obs_snowman_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),

    // DECORACIONES - BOSQUE
    new Model(MODELS_PATH + "props/bosque/", "arbol1.fbx", "sc0_env_tree_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "props/bosque/", "arbol2.fbx", "sc0_env_tree_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "props/bosque/", "pino1.fbx", "sc0_env_pino_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "props/bosque/", "pino2.fbx", "sc0_env_pino_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "props/bosque/", "pino3.fbx", "sc0_env_pino_3", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),
    new Model(MODELS_PATH + "props/bosque/", "pino4.fbx", "sc0_env_pino_4", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 10)),

    // DECORACIONES - PLAYA
    new Model(MODELS_PATH + "props/playa/", "cactus1.fbx", "sc1_env_cactus_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/playa/", "cactus2.fbx", "sc1_env_cactus_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/playa/", "cactus3.fbx", "sc1_env_cactus_3", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/playa/", "montaña1.fbx", "sc1_env_mont_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.6, 0.6)),
    new Model(MODELS_PATH + "props/playa/", "montaña2.fbx", "sc1_env_mont_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.6, 0.6)),
    
    // DECORACIONES - NIEVE
    new Model(MODELS_PATH + "props/nieve/", "pino_nieve_1.fbx", "sc2_env_pinonieve_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/nieve/", "roca_nieve_1.fbx", "sc2_env_rocanieve_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/nieve/", "tronco_nieve_1.fbx", "sc2_env_tronconieve_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),
    new Model(MODELS_PATH + "props/nieve/", "tronco_nieve_2.fbx", "sc2_env_tronconieve_2", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1)),

    // BUFFS
    new Model(MODELS_PATH + "buffs/", "caja_rota2.fbx", "buff_1", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.3, 0.3)),
];

// aqui van los objetos cargados a partir del modelo
let objetos = [];

// variables que obtienen un objeto 3d para acceder rapidamente a ellos
let carro = null;
let carro2 = null;
let pista = null;
let pistaMaterials = [];
let particulas = null;
let particulasMaterials = [];

let gamepad1 = null;
let gamepad2 = null;

let modo = 1;
let dificultad = 1;
let player_1_id = 0;
let player_2_id = 0;
let player_1_nick = "";
let player_2_nick = "";
let volumen = 1;

const getPistaTextureByIndex = idx => pistaMaterials[idx];
const getParticleTextureByIndex = idx => particulasMaterials[idx];

// load
window.onload = () => {

    // iniciamos configuraciones
    init();

    // cargamos modelos
    loadModels();
};

// funcion que se llama en cada frame
const update = (deltaTime) => {

    // actualizar los valores de los gamepads
    actualizarValoresGamepads();

    // movemos los carros con algún periferico (teclado / control)
    move(deltaTime);

    // (carro1) verificamos que no haya chocado, si no es asi, aumentamos su score
    if (!carro.isCrashed) {
        carro.score += velocidad;
    }

    // (carro2) verificamos que no haya chocado, si no es asi, aumentamos su score
    if (modo == 2) {

        if (!carro2.isCrashed) {
            carro2.score += velocidad;
        }
    }

    // movemos obstaculos
    moveObstacles(deltaTime);

    // cambiamos el color de la niebla
    // _SCENE.fog.color = ilumination.hemisphere.groundColor;
};

// funcion que se manda a llamar una unica vez al cargar todos los modelos
const onLoadedAllModels = () => {

    let llantas = objetos.find(o => o.name === "player_llantas");
    let llantas2 = null;

    carro = objetos.find(o => o.name === "player_carro_1");
    carro2 = null;

    if (carro && llantas) {

        carro.add(llantas);
        carro.isCrashed = false;
        carro.isBuff = false;
        carro.score = 0;
        carro.position.set(0, 0, 0);
        _SCENE.add(carro);

        if (modo == 2) {

            llantas2 = cloneWithAnimations(llantas, modelMixers);
            carro2 = cloneWithAnimations(carro, modelMixers);
            
            carro2.add(llantas2);

            carro2.isCrashed = false;
            carro2.isBuff = false;
            carro2.score = false;
            
            _SCENE.add(carro2);

            carro.position.set(-24, 0, 0);
            carro2.position.set(24, 0, 0);
        }
    }

    pista = objetos.find(o => o.name === "pista");

    if (pista) {

        pista.children[0].material.map = getPistaTextureByIndex(sceneIndex);
        pista.children[0].material.needsUpdate = true;

        _SCENE.add(pista);
    }

    // llamamos al loop del juego
    loop();

    // iniciamos el spawn de props
    setInterval(() => {

        if (spawnProps) {
            spawnRandomProp();
        }

    }, 800);

    // iniciamos el spawn de obs
    setInterval(() => {

        if (!isPause && isStart && spawnObstacles) {
            spawnRandomObstacle();
        }

    }, 1000);

    isLoadedModels = true;

    // quitamos la barra de carga
    setTimeout(() => {
        showInstrucciones(false);
    }, 3500);
};

// funcion que se manda a llamar una unica vez al cargar el dom
const init = () => {

    // obtenemos configuracion del modo de juego
    dificultad = localStorage.getItem("dificultad") != null ? parseInt(localStorage.getItem("dificultad")) : 1;
    modo = localStorage.getItem("modo") != null ? parseInt(localStorage.getItem("modo")) : 1;
    player_1_nick = localStorage.getItem("player_1") != null ? localStorage.getItem("player_1") : "player_1";
    player_2_nick = localStorage.getItem("player_2") != null ? localStorage.getItem("player_2") : "player_2";
    player_1_id = localStorage.getItem("player_1_id") != null ? parseInt(localStorage.getItem("player_1_id")) : 0;
    player_2_id = localStorage.getItem("player_2_id") != null ? parseInt(localStorage.getItem("player_2_id")) : 0;
    sceneIndex = localStorage.getItem("scene") != null ? parseInt(localStorage.getItem("scene")) : 0;
    volumen = localStorage.getItem("volumen") != null ? parseFloat(localStorage.getItem("volumen")) : 1;

    if (dificultad == 1) {
        velocidad = 0.3;
    } else if (dificultad == 2) {
        velocidad = 0.5;
    } else if (dificultad == 3) {
        velocidad = 0.7;
    }
    
    if (modo == 2) {
        $("#pjugador2").removeClass("d-none");
    }

    $("#jugador-uno").text(player_1_nick);
    $("#jugador-dos").text(player_2_nick);

    // obtenemos sonidos
    auAmbient = document.getElementById("auAmbient");
    auChoque = document.getElementById("auChoque");
    auBuff = document.getElementById("auBuff");

    auAmbient.volume = volumen;
    auChoque.volume = volumen;
    auChoque.volume = volumen;
    
    let isXboxControllerSupport = 'ongamepadconnected' in window;

    // creamos un timer que se ejecuta cada x segundos para actualizar los valores de los gamepads
    // setInterval(() => {

    //     actualizarValoresGamepads();

    // }, 50);

    if (!isXboxControllerSupport) {

        window.addEventListener("gamepadconnected", (result) => {

            if (!isLoadedModels)
                return;

            if (result === undefined || result === null)
                return;

            if (!result.gamepad)
                return;

            if (result.gamepad.index == 0 && gamepad1 == null)
                gamepad1 = result.gamepad;

            if (result.gamepad.index == 1 && gamepad2 == null)
                gamepad2 = result.gamepad;

            if (!isStart) {
                start();
            }
        });
    
        window.addEventListener("gamepaddisconnected", (result) => {
            
            debugger;
            
            if (result === undefined || result === null)
                return;

            if (!result.gamepad)
                return;
        });
    }

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
    _SCENE.fog.color = ilumination.hemisphere.groundColor;

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

    // cargamos texturas de las pistas
    let texLoader = new THREE.TextureLoader();

    pistaMaterials.push(texLoader.load(TEXTURES_PATH + "/pista/texturaPistaBosque.png"));
    pistaMaterials.push(texLoader.load(TEXTURES_PATH + "/pista/texturaPistaDesierto.png"));
    pistaMaterials.push(texLoader.load(TEXTURES_PATH + "/pista/texturaPistaNieve.png"));

    for (let i = 0; i < pistaMaterials.length; i++) {
        pistaMaterials[i].wrapS = THREE.RepeatWrapping;
        pistaMaterials[i].wrapT = THREE.RepeatWrapping;
    }

    // particulas
    particulas = createParticles(SPRITES_PATH, "par_water_01.png", 1, 3000);
    
    particulasMaterials.push(texLoader.load(SPRITES_PATH + "par_water_01.png"));
    particulasMaterials.push(texLoader.load(SPRITES_PATH + "par_sand_01.png"));
    particulasMaterials.push(texLoader.load(SPRITES_PATH + "par_snow_01.png"));

    for (let i = 0; i < particulasMaterials.length; i++) {
        pistaMaterials[i].premultiplyAlpha = true;
    }

    // 
    _SCENE.add(particulas);

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

    // limitamos los FPS
    if (timeElapsed > _LIMITE_FPS) {

        if (!isPause && isStart) {
        
            // si no esta en pausa, aplicamos logica del juego
            update(deltaTime);
        }

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

// funcion que se ejecuta al momento que indica el jugador
const start = () => {

    if (!isLoadedModels) {
        return;
    }
    
    $("#start-text").text("INICIANDO, ¡PREPARENSE!");

    setTimeout(() => {

        $("#start").addClass("popo");

        auAmbient.loop = true;
        auAmbient.play();
        spawnObstacles = true;
        isStart = true;


    }, 3000);
};

// funcion que se llama en el loop del juego, es para actualizar las animaciones
const animate = (deltaTime) => {

    if (!modelMixers) {
        return;
    }

    for (let mixer of modelMixers) {

        mixer.update(deltaTime);
    }

    // movemos objetos
    moveProps(deltaTime);

    // movemos pista
    if (pista !== undefined && pista !== null) {

        pista.children[0].material.map.offset.y -= velocidad * deltaTime;
    }

    // animacion de carro estrellado
    if (carro.isCrashed && carro.position.y <= 100 && carro.position.z <= 100) {

        carro.position.z += 5;
        carro.position.y += 2;
        carro.rotateX(10);
    }

    // animacion de carro estrellado
    if (modo == 2 && carro2.isCrashed && carro2.position.y <= 100 && carro2.position.z <= 100) {

        carro2.position.z += 5;
        carro2.position.y += 2;
        carro2.rotateX(10);
    }

    // particulas
    particulas.rotation.y += 0.01;
    let particleIndex = particulas.particlesCount;

    while (particleIndex--) {
  
        // pista.children[0].material.map = getPistaTextureByIndex(sceneIndex);
        let particle = particulas.geometry.vertices[particleIndex];
        particulas.material.map = getParticleTextureByIndex(sceneIndex);
  
        if (particle.y < -250) {
            particle.y = 250;
            particle.velocity.y = 0;
        }
    
        particle.velocity.y -= Math.random() * 0.1;
        particle.add(particle.velocity);
    }
  
    particulas.geometry.uvsNeedUpdate = true;
    particulas.geometry.verticesNeedUpdate = true;
};

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

    // añadimos el objeto al arreglo de objetos
    objetos.push(model);
    // _SCENE.add(model);

    // verificamos si ya se cargaron todos los modelos
    for (let m of models) {

        if (!m.isLoaded) {

            isLoadedModels = false;
            return;
        }
    }

    // configuramos objetos 3d
    onLoadedAllModels();
};

// funcion que se manda a llamar al cargar un modelo y da error
const onErrorLoadModel = (error) => {

    showText(error);
    console.log(error);
};

// funcion que se manda a llamar al estar cargando un modelo
const onProgressModel = (progress) => {

    // console.log(progress);
};

// funcion que recorre el arreglo de modelos y va cargando uno a uno
const loadModels = () => {

    for (let m of models) {

        m.load(onLoadedModel, onErrorLoadModel, onProgressModel);
    }
};

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

        // le creamos una caja de colision
        // let obsBox = new THREE.Box3().setFromObject(obs);
        // let carroBox = new THREE.Box3().setFromObject(obs);

        // var collision = obsBox.intersectsBox(carroBox);

        // // secondBB = new THREE.Box3().setFromObject(carro);
         
        // if(collision){
         
        // console.log("si hay colision");
           
        // }
        
        // creamos una instancia nueva del objeto obtenido aleatoriamente
        obs = objs[rndm].clone();

    } else {

        let buffObject = objetos.find(o => o.name.includes("buff_1"));
        obs = cloneWithAnimations(buffObject, modelMixers);
    }

    // establecemos su posicion
    obs.position.set(rndmPosX, 0, SPAWN_OBS_LIMIT_POS_Z_NEG);

    obs.isCrashed = false;

    // agregamos a la escena
    _SCENE.add(obs);
};

// funcion que verifica la colision entre dos objetos
const isCollision = (obj, obj2) => {

    let objBox = new THREE.Box3().setFromObject(obj);
    let obj2Box = new THREE.Box3().setFromObject(obj2);
    
    return objBox.intersectsBox(obj2Box);
};

// funcion que se ejecuta al colisionar un carro con algún objeto (ya sea obs o buff)
const onCollision = (obj, collidedObject) => {

    if (collidedObject.name.includes("buff")) {
        
        buffCar(obj);
        killObs(collidedObject);
        // console.log("BUFF!!!");

    } else if (collidedObject.name.includes("obs")) {
        
        // si no tiene un buff activado lo manda a volar jiji
        if (!obj.isBuff) {
            killCar(obj);
        }

        killObs(collidedObject);
        // console.log("BUUM!!!");

    } else if (collidedObject.name.includes("env")) {
        
        console.log("CRASHHH!!!");

    } else {
        
        console.log("???");
    }
};

// funcion que se ejecuta al colisionar un carro con un obs
const killCar = (car) => {

    auChoque.play();
    car.isCrashed = true;

    if (modo == 1 ? (true) : (carro2.isCrashed)) {

        if (!isGameOver) {
            
            isGameOver = true;

            setTimeout(() => {
        
                gameOver();
        
            }, 1500);
        }
    }
};

const gameOver = () => {

    isPause = true;
    isStart = false;

    let carroScore = carro.score.toFixed(2);
    let carro2Score = modo == 2 ? carro2.score.toFixed(2) : 0;

    $("#gameover").removeClass("popo");
    $("#jugador-uno-score").text(carroScore);
    $("#jugador-dos-score").text(carro2Score);

    let score1 = {
        id_usuario: player_1_id,
        score: carroScore,
        dificultad: dificultad
    };

    puntuacion_create(score1).done((result) => {

        if (result == "" || parseInt(result) <= 0) {
            console.log(result);
            return;
        }
    })
    .fail((jqXHR) => {

        console.log(jqXHR.responseText);
        return;
    });

    if (modo == 2) {

        let score2 = {
            id_usuario: player_2_id,
            score: carro2Score,
            dificultad: dificultad
        };

        puntuacion_create(score2).done((result) => {

            if (result == "" || parseInt(result) <= 0) {
                console.log(result);
                return;
            }
        })
        .fail((jqXHR) => {

            console.log(jqXHR.responseText);
            return;
        });
    }
};

// funcion que se ejecuta al colisionar un carro con un buff
const buffCar = (car) => {

    if (car.isBuff) {
        return;
    }

    auBuff.play();
    car.isBuff = true;
    velocidad = velocidad + 0.2;

    setTimeout(() => {

        car.isBuff = false;
        velocidad = velocidad - 0.2;

    }, 5000);
};

// funcion que se ejecuta al colisionar un carro con un obs
const killObs = (obs) => {

    if (obs !== undefined) {
        obs.isCrashed = true;
    }
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

        if (isCollision(carro, sceneObject)) {
            onCollision(carro, sceneObject);
        }

        if (modo == 2 && isCollision(carro2, sceneObject)) {
            onCollision(carro2, sceneObject);
        }

        if (sceneObject.position.z >= SPAWN_OBS_LIMIT_POS_Z_POS) {

            let mixerIdx = modelMixers.findIndex(n => n._root.id === sceneObject.id);

            if (mixerIdx >= 0) {
                modelMixers.splice(mixerIdx, 1);
            }

            _SCENE.remove(sceneObject);
        }

        if (sceneObject.isCrashed && sceneObject.position.y <= 100) {
            sceneObject.position.y += 4;
            // sceneObject.position.z += velocidad * deltaTime * 1500;
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

const getSceneBaseNameByIndex = idx => {
    
    switch (idx) {
        
        case 0: {
            return "sc0";
        }
        
        case 1: {
            return "sc1";
        }
        
        case 2: {
            return "sc2";
        }
    }

    return "sc0";
};

// funcion de evento al presionar una tecla
function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

// funcion de evento al dejar de presionar una tecla
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

// funcion utlizada para compartir resultado en facebook
const shareScore = () => {

    let leyenda = "";

    let score1 = carro.score.toFixed(2);
    let score2 = modo == 1 ? 0 : carro2.score.toFixed(2);
    let dificultyName = dificultad == 1 ? "fácil" : (dificultad == 2 ? "normal" : "nitrosa!");

    if (modo == 1) {

        leyenda = player_1_nick + " obtuvo una puntuación de " + score1 + " en la dificultad " + dificultyName;

    } else {
    
        leyenda = `
            ${player_1_nick} y ${player_2_nick} obtuvieron una puntuación de ${score1} y ${score2} 
            correspondientemente en la dificultad ${dificultyName}
        `;
    }

    FB.ui({

        method: 'share',
        href: 'nitroso.com',
        hashtag: '#nitroso',
        quote: leyenda

    }, (response) => {
    });
};

// funcion que mueve los carros dependiendo de la tecla o botton de algún control
const move = (deltaTime) => {

    let gamepad1_x = gamepad1 == null ? 0 : gamepad1.axes[0];
    let gamepad1_y = gamepad1 == null ? 0 : gamepad1.axes[1];

    // carro 1
    if (keys["W"] || gamepad1_y < -CONTROL_THRESHOLD) {

        if (carro.position.z > LIMIT_HIGHWAY_POS_Z_NEG) {

            carro.translateZ(-factorMovimientoJugador * deltaTime);
        }
    }

    if (keys["S"] || gamepad1_y > CONTROL_THRESHOLD) {

        if (carro.position.z < LIMIT_HIGHWAY_POS_Z_POS) {

            carro.translateZ(factorMovimientoJugador * deltaTime);
        }
    }

    if (keys["A"] || gamepad1_x < -CONTROL_THRESHOLD) {

        if (carro.position.x > -LIMIT_HIGHWAY_POS_X) {

            carro.position.x -= factorMovimientoJugador * deltaTime;
        }
    }

    if (keys["D"] || gamepad1_x > CONTROL_THRESHOLD) {

        if (carro.position.x < LIMIT_HIGHWAY_POS_X) {

            carro.position.x += factorMovimientoJugador * deltaTime;
        }
    }

    // carro 2
    if (modo == 2) {

        let gamepad2_x = gamepad2 == null ? 0 : gamepad2.axes[0];
        let gamepad2_y = gamepad2 == null ? 0 : gamepad2.axes[1];

        if (keys["I"] || gamepad2_y < -CONTROL_THRESHOLD) {
    
            if (carro2.position.z > LIMIT_HIGHWAY_POS_Z_NEG) {
    
                carro2.translateZ(-factorMovimientoJugador * deltaTime);
            }
        }
    
        if (keys["K"] || gamepad2_y > CONTROL_THRESHOLD) {
    
            if (carro2.position.z < LIMIT_HIGHWAY_POS_Z_POS) {
    
                carro2.translateZ(factorMovimientoJugador * deltaTime);
            }
        }
    
        if (keys["J"] || gamepad2_x < -CONTROL_THRESHOLD) {
    
            if (carro2.position.x > -LIMIT_HIGHWAY_POS_X) {
    
                carro2.position.x -= factorMovimientoJugador * deltaTime;
            }
        }
    
        if (keys["L"] || gamepad2_x > CONTROL_THRESHOLD) {
    
            if (carro2.position.x < LIMIT_HIGHWAY_POS_X) {
    
                carro2.position.x += factorMovimientoJugador * deltaTime;
            }
        }
    }

    // console.log("Gamepad1_x: " + gamepad1_x);
    // console.log("Gamepad1_y: " + gamepad1_y);
};

// funciones de control (xbox)
function actualizarValoresGamepads() {

    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

    for (var i = 0; i < gamepads.length; i++) {

        if (!gamepads[i]) {
            continue;
        }

        if (gamepads[i].index == 0) {
            gamepad1 = gamepads[i];
            continue;
        }

        if (gamepads[i].index == 1) {
            gamepad2 = gamepads[i];
            continue;
        }
    }
}