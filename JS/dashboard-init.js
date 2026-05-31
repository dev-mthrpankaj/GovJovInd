window.setTimeout(function(){
    var loading = document.getElementById("dashboardLoading"),
        guest = document.getElementById("dashboardGuest"),
        content = document.getElementById("dashboardContent");
    if (loading && !loading.hidden && content && content.hidden) {
        loading.hidden = true;
        if (guest) guest.hidden = false;
    }
}, 8000);
