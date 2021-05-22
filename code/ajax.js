const usuario_create = (data) => {

    return $.ajax({ 
        url: "/api/NitrosoController.php",
        data: { action: "usuario_create", nodo: JSON.stringify(data) },
        type: 'post'
    });
};

const usuario_exists = (data) => {

    return $.ajax({ 
        url: "/api/NitrosoController.php",
        data: { action: "usuario_exists", nodo: JSON.stringify(data) },
        type: 'post'
    });
};

const usuario_exists_by_nick = (data) => {

    return $.ajax({ 
        url: "/api/NitrosoController.php",
        data: { action: "usuario_exists_by_nick", nodo: JSON.stringify(data) },
        type: 'post'
    });
};

const puntuacion_create = (data) => {

    return $.ajax({ 
        url: "/api/NitrosoController.php",
        data: { action: "puntuacion_create", nodo: JSON.stringify(data) },
        type: 'post'
    });
};

const puntuacion_selectall = () => {

    return $.ajax({ 
        url: "/api/NitrosoController.php",
        data: { action: "puntuacion_selectall", nodo: {} },
        type: 'post'
    });
};