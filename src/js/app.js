$(document).ready(function() {
    // Variable Declarations
    var isNavOpen = false,
        transitionTime = 400;

    // Toggle mobileNav
    $("#hamburgerToggle").click(function() {
        // Checks to see which state the navigation is in
        if (isNavOpen) {
            // If the nav is open
            closeNav();
        } else {
            // If the nav is closed
            openNav();
        }
    });

    function closeNav() {
        $("#hamburgerToggle").removeClass("is-active-hamburger");
        document.getElementById("mobileNav").style.width = "0";
        $("#navOverlay").fadeOut(transitionTime);

        isNavOpen = false;
    }

    function openNav() {
        $("#hamburgerToggle").addClass("is-active-hamburger");
        document.getElementById("mobileNav").style.width = "160px";
        $("#navOverlay").fadeIn(transitionTime);

        isNavOpen = true;
    }

    // Closes the mobile nav when the overlay is clicked on
    $("#navOverlay").click(function() {
        closeNav();
    });

    $("#logo").click(function() {
        $("html, body").animate({
            scrollTop: $("html, body").offset().top
        }, transitionTime);
    });
});