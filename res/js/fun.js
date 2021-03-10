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