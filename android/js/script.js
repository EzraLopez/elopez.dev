let closingButtonClicked = false;
let atTheRootPage = true;

function closeVisibleModal() {
    const visibleCloseButtons = $('[data-dismiss=modal]:visible');
    if (visibleCloseButtons.length > 0)
        visibleCloseButtons[0].click();
}

$(document).keyup(function (e) {
    if (e.keyCode === 27) { // escape key
        closeVisibleModal();
    }
});

window.onpopstate = function (event) {
    if (history.state == null) {
        if (!closingButtonClicked) {
            closingButtonClicked = false;
            atTheRootPage = true;
            closeVisibleModal();
        }

        history.replaceState(null, null);
    }
};

(function ($) {
    $(".portfolio-link").click(function () {
        history.pushState({page: 1}, null);
        atTheRootPage = false;
        closingButtonClicked = false;
    });

    $("[data-dismiss=modal]").click(function () {
        if (!atTheRootPage) {
            closingButtonClicked = true;
            history.back();
        } else
            closingButtonClicked = false;
    });

    // Pauses YouTube video when puzzle 15 modal is closed
    // Source: http://stackoverflow.com/a/8668741/6138589
    $(".yt-close-modal").click(function() {
        let div = document.getElementsByClassName("video-container")[0];
        let iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });
})(jQuery);

