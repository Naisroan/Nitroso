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