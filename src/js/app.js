$(document).ready(function() {
    // Variable Declarations
    var isNavOpen = false,
        transitionTime = 400,
        $htmlBody = $("html, body");

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

    // Scrolls to the top of the page when the logo is clicked
    $("#logo").click(function() {
        $htmlBody.animate({
            scrollTop: $htmlBody.offset().top
        }, transitionTime);
    });

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

    // Navigation item click events
    $("#mobileNav li").click(function() {
        closeNav();
        scrollNav(this);
    });

    // Closes the mobile nav when the overlay is clicked on
    $("#navOverlay").click(function() {
        closeNav();
    });

    // Shows the overlay depending on which product is clicked
    $(".product-item").click(function() {
        var $href = $(this).children("a").attr("href"),
            $el = $($href),
            parsedHref = $href.replace("#", "");

        $(this).each(function() {
            $el.load("ajax/modal-popups/" + parsedHref + ".html");
            $el.fadeIn(transitionTime);
        });

        event.preventDefault();
    });

    // Dismisses the product overlay.
    // This method works with AJAX and a dynamic DOM.
    $(document).on("click", ".fixed-close", function() {
        $(this).parent().parent().fadeOut(transitionTime);

        event.preventDefault();
    });

    // Quick links click events
    $("#contact .internal li").click(function() {
        scrollNav(this);
    });

    var bLazy = new Blazy();
});