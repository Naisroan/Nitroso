const showLoader = (show = true) => {

    let height = "0px";
    let opacity = "0";
    let loader = $(".loader");
    
    if (show) {

        height = "100%";
        opacity = "1";

        if (!loader.hasClass("pe-auto")) {
            loader.addClass("pe-auto");
        }

    } else {

        if (!loader.hasClass("pe-none")) {
            loader.addClass("pe-none");
        }
    }
        
    loader.animate({
        height: height, 
        opacity: opacity, 
    }, "slow");
};

const showInstrucciones = (show = true) => {

    let height = "0px";
    let opacity = "0";
    let loader = $(".instrucciones");
    
    if (show) {

        height = "100%";
        opacity = "1";

        if (!loader.hasClass("pe-auto")) {
            loader.addClass("pe-auto");
        }

    } else {

        if (!loader.hasClass("pe-none")) {
            loader.addClass("pe-none");
        }
    }
        
    loader.animate({
        height: height, 
        opacity: opacity, 
    }, "slow");
};

const createSkyBox = textures => {

    let materialArray = [];

    let txtFt = new THREE.TextureLoader().load(textures.front);
    let txtBk = new THREE.TextureLoader().load(textures.back);
    let txtUp = new THREE.TextureLoader().load(textures.up);
    let txtDn = new THREE.TextureLoader().load(textures.down);
    let txtRt = new THREE.TextureLoader().load(textures.right);
    let txtLt = new THREE.TextureLoader().load(textures.left);

    materialArray.push(new THREE.MeshBasicMaterial({ map: txtFt, fog: true, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: txtBk, fog: true, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: txtUp, fog: true, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: txtDn, fog: true, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: txtRt, fog: true, side: THREE.BackSide }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: txtLt, fog: true, side: THREE.BackSide }));

    let skyBoxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    let skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    let skybox = new THREE.Mesh(skyBoxGeo, skyMaterial);

    return skybox;
};

const cloneWithAnimations = (object, arrayMixers) => {

    let objectClone = SkeletonUtils.clone(object);

    if (object.animations) {

        objectClone.animations = object.animations;
    
        let mixer = new THREE.AnimationMixer(objectClone);
    
        for (let a of object.animations) {
    
            let action = mixer.clipAction(a);
            action.play();
        }

        if (arrayMixers) {
            
            arrayMixers.push(mixer);
        }
    }
    
    return objectClone;
};

const createParticles = (spritesPath, spriteFileName, spriteSize = 5, count = 2000) => {

    let texLoader = new THREE.TextureLoader();
    let texture = texLoader.load(spritesPath + spriteFileName);
    texture.premultiplyAlpha = true;
    // texture.needsUpdate = true;

    var particleCount = count,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            // color: 0x000000,
            size: spriteSize,
            map: texture,
            transparent: true,

            // blending: THREE.AdditiveBlending

            // blending: THREE.CustomBlending,
            // blendSrc: THREE.SrcColorFactor,
            // blendDst: THREE.OneFactor,
            // blendEquation: THREE.MaxEquation

            blending: THREE.CustomBlending,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.DstAlphaFactor,
            blendEquation: THREE.MaxEquation
        });

    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250, // Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250, // Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250, // Math.random() * 500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);
        
        particle.velocity = new THREE.Vector3(
            0,              // x
            -Math.random(), // y: random vel
            0);  

        // add it to the geometry
        particles.vertices.push(particle);
    }

    let system = new THREE.Points(particles, pMaterial);
    system.particlesCount = particleCount;
    // system.sortParticles = true;

    return system;
};