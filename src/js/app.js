$(document).ready(function() {
    // Variable Declarations
    var isNavOpen = false,
        transitionTime = 300;

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

        isNavOpen = false;
    }

    function openNav() {
        $("#hamburgerToggle").addClass("is-active-hamburger");
        document.getElementById("mobileNav").style.width = "160px";

        isNavOpen = true;
    }
});