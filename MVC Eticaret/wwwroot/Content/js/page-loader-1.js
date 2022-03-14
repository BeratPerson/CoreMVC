$(document).ready(function () {
    $("#pageLoader").removeClass('d-flex');
    $("#pageLoader").removeClass('justify-content-center');
    $("#pageLoader").addClass('d-none');
});

function OpenLoader() {
    $("#pageLoader").addClass('d-flex');
    $("#pageLoader").addClass('justify-content-center');
    $("#pageLoader").removeClass('d-none');
}