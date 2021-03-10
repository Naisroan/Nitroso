$(() => {

    $("#rgVolumen").on("input change", (e) => {
        
        let ranger = $(e.currentTarget);
        $("#spVolumen").text(ranger.val());
    });
});