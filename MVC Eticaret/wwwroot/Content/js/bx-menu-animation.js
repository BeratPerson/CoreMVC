$(document).ready(function () {
    $(".menu-link-animation-tada").mouseenter(function (e) {
        e.currentTarget.children[0].className += " bx-tada";
    });

    $(".menu-link-animation-tada").mouseleave(function (e) {
        swap = e.currentTarget.children[0].className.replace(' bx-tada', '');
        e.currentTarget.children[0].className = swap;
    });

    $(".menu-link-animation-fade-left").mouseenter(function (e) {
        e.currentTarget.children[0].className += " bx-fade-left";
    });

    $(".menu-link-animation-fade-left").mouseleave(function (e) {
        swap = e.currentTarget.children[0].className.replace(' bx-fade-left', '');
        e.currentTarget.children[0].className = swap;
    });
});

