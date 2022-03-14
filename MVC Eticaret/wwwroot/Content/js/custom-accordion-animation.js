function accordionAnimationFunc(e) {
    if (e.nextElementSibling.className == "accordion-panel") {
        e.nextElementSibling.className += " d-block";
    }
    else {
        swap = e.nextElementSibling.className.replace(' d-block', '');
        e.nextElementSibling.className = swap;
    }
}