let modelMixers = [];

class Model {

    constructor(path, fbxName, name, position, rotation, scale) {

        this.path = path;
        this.fbxName = fbxName;
        this.name = name;
        this.options = {
            position: position ? position : new THREE.Vector3(0, 0, 0),
            scale: scale ? scale : new THREE.Vector3(1, 1, 1),
            rotation: rotation ? rotation : new THREE.Vector3(0, 0, 0)
        };

        this.onSuccess = null;
        this.onProgress = null;
        this.onError = null;
        this.isLoaded = false;

        this.mixer = null;
    }

    load (onSuccess, onError, onProgress) {

        let loader = new THREE.FBXLoader();
        let fbxPath = this.path + this.fbxName;

        loader.load(fbxPath, (fbx) => {

            fbx.castShadow = true;
            fbx.receiveShadow = true;

            fbx.traverse(function(child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            if (fbx.animations !== undefined && fbx.animations !== null) {

                fbx.mixer = new THREE.AnimationMixer(fbx);
                this.mixer = fbx.mixer;
                modelMixers.push(this.mixer);

                for (let a of fbx.animations) {
    
                    let action = this.mixer.clipAction(a);

                    // this.animationsActions.push(action);

                    // action.setLoop(THREE.LoopOnce); // se lopea una vez
                    // action.setLoop(THREE.LoopPingPong); // se lopea de derecha izquierda, izquierda derecha
                    // action.setLoop(THREE.LoopRepeat);

                    action.play();
                }
            }

            this.isLoaded = true;

            onSuccess(this.name, fbx, this.options);

        }, onProgress, onError);
    }
}