$(document).ready(function() {
    // Variable Declarations
    var isNavOpen = false,
        transitionTime = 400,
        $htmlBody = $("html, body"),
        $windowWidth = $(window).width();

    updateWindowWidth();
    updateActiveNavItem();
    toggleSlideshow(false);

    // Logs the $windowWidth variable to the console
    function updateWindowWidth() {
        $windowWidth = $(window).width();
        console.log("Width: "+ $windowWidth + "px");
    }

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
    // offset is the pixel value to offset the scroll by
    function scrollNav($selector, offset) {
        var $href = $($selector).children("a").attr("href");

        $($selector).each(function() {
            $htmlBody.animate({
                scrollTop: $($href).offset().top - offset
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
        scrollNav(this, 60);
    });

    // Closes the mobile nav when the overlay is clicked on
    $("#navOverlay").click(function() {
        closeNav();
    });

    $("#desktopNav li").click(function() {
        scrollNav(this, 100);
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

    // // Quick links click events
    // $("#contact .internal li").click(function() {
    //     var offset = 0;

    //     if ($windowWidth >= 1000) {
    //         offset = 100;
    //     } else {
    //         offset = 60;
    //     }

    //     scrollNav(this, offset);
    // });

    // Does stuff on window resize
    $(window).on("resize", function() {
        // Updates the $windowWidth variable
        updateWindowWidth();

        // Run this block of code if the window width is greater or equal to 1000px
        if ($windowWidth >= 1000) {

            // Closes the mobileNav if the viewport changes breakpoints
            closeNav();
            toggleSlideshow(true);
        } else {
            toggleSlideshow(false);
        }
    });

    // Updates the active navigation item
    function updateActiveNavItem() {
        var $windowPos = $(window).scrollTop() + 101;

        $("#desktopNav li a[href^=\"#\"]").each(function() {
            var $currentLink = $(this);

            if ($($currentLink.attr("href")).length > 0) {
                var refEl = $($currentLink.attr("href"));

                if (refEl.position().top <= $windowPos && (refEl.position().top + refEl.height() + $("#desktopNav").height()) > $windowPos) {
                    $("#desktopNav li a").parent().removeClass("is-active-nav-item");
                    $currentLink.parent().addClass("is-active-nav-item");
                } else {
                    $currentLink.parent().removeClass("is-active-nav-item");
                }
            }
        });
    }

    // Does stuff on scrolling
    $(window).on("scroll", function() {
        updateActiveNavItem();
    });

    function toggleSlideshow(bool) {
        if (bool || $windowWidth >= 1000) {
            $("#slides").show();
        } else {
            $("#slides").hide();
        }
    }

    $("#slides").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });
});