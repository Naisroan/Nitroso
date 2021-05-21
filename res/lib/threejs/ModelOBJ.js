class Model {

    constructor(path, objName, mtlName, name, options) {

        this.path = path;
        this.objName = objName;
        this.mtlName = mtlName;
        this.name = name;
        this.options = options;

        this.onSuccess = null;
        this.onProgress = null;
        this.onError = null;
        this.isLoaded = false;

        this.mixers = [];
    }

    load (onSuccess, onError, onProgress) {

        let mtlLoader = new THREE.MTLLoader();
        let objLoader = new THREE.OBJLoader();

        mtlLoader.setPath(this.path);
        objLoader.setPath(this.path);

        mtlLoader.load(this.mtlName, (materials) => {

            objLoader.setMaterials(materials);

            objLoader.load(this.objName, (object) => {

                this.isLoaded = true;
                onSuccess(this.name, object, this.options);
            });
            
        }, onProgress, onError);
    }

    loadFBX (onSuccess, onError, onProgress) {

        let loader = new THREE.FBXLoader();

        loader.load(this.path + this.objName)
    }
}