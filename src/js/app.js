$(document).ready(function() {
    // Variable Declarations
    var isNavOpen = false,
        transitionTime = 400,
        $htmlBody = $("html, body");

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

    // Closes the mobile navigation
    function closeNav() {
        $("#hamburgerToggle").removeClass("is-active-hamburger");
        document.getElementById("mobileNav").style.width = "0";
        $("#navOverlay").fadeOut(transitionTime);

        $("body").removeClass("stop-scroll");

        isNavOpen = false;
    }

    // Opens the mobile navigation
    function openNav() {
        $("#hamburgerToggle").addClass("is-active-hamburger");
        document.getElementById("mobileNav").style.width = "180px";
        $("#navOverlay").fadeIn(transitionTime);

        $("body").addClass("stop-scroll");

        isNavOpen = true;
    }

    // Closes the mobile nav when the overlay is clicked on
    $("#navOverlay").click(function() {
        closeNav();
    });

    // Scrolls to the top of the page when the logo is clicked
    $("#logo").click(function() {
        $htmlBody.animate({
            scrollTop: $htmlBody.offset().top
        }, transitionTime);
    });

    // Generic function that requires a specific HTML structure to work
    // $selector must be a li element with an 'a' as a child
    function scrollNav($selector) {
        var $href = $($selector).children("a").attr("href");

        $($selector).each(function() {
            $htmlBody.animate({
                scrollTop: $($href).offset().top - 60
            }, transitionTime);
        });

        event.preventDefault();
    }

    // Navigation item click events
    $("#mobileNav li").click(function() {
        closeNav();
        scrollNav(this);
    });

    // Quick links click events
    $("#contact .internal li").click(function() {
        scrollNav(this);
    });

    // Shows the overlay depending on which product is clicked
    $(".product-item").click(function() {
        var $href = $(this).children("a").attr("href");

        $(this).each(function() {
            $($href).fadeIn(transitionTime);
        });

        event.preventDefault();
    });

    // Dismisses the product overlay
    $(".fixed-close").click(function() {
        $(this).parent().parent().fadeOut(transitionTime);

        event.preventDefault();
    });
});