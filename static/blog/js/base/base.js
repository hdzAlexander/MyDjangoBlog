/**
 * Created by WYH on 17/2/8.
 */
$(document).ready(function () {
    bindClickEvent();
    console.log($("input.search"));
});

function bindClickEvent() {
    bindToTopIconClick();
    bindWindowScrollEvent();
}

function bindToTopIconClick() {
    $(".to_top_icon").click(function () {
        window.scrollTo(0, 0);
    });
}

function bindWindowScrollEvent() {
    $(window).scroll(function () {
        if (window.pageYOffset > 500) {
            $(".to_top_icon").attr("hidden", null);
        } else {
            $(".to_top_icon").attr("hidden", "hidden");
        }
    })
}