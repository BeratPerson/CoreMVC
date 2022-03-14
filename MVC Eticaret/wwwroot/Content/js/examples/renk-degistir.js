function TemaSettings() {
    var url = '/TemaOption/TemaSettings';
    $.getJSON(url, function (data) {
        for (var item in data.result) {
           

            document.styleSheets[0].addRule('ul.nav-main li .nav-children', 'background:' + data.result[item].left_menu_hoverColor + '!important; ');
            document.styleSheets[0].addRule('html.modern ul.nav-main li.nav-expanded>a', 'background:' + data.result[item].left_menu_hoverColor + '!important; ');
            document.getElementById("logo").src = data.result[item].mainLogo;
            document.querySelector("body").style.cssText = " font-size: " + data.result[item].body_fontSize + "!important;;";
            document.querySelector("body").style.cssText = " font-family: " + data.result[item].body_fontType + "!important;";
            document.querySelector("#alan1").style.cssText = "border:3px solid " + data.result[item].left_menu_borderColor + " ; background-color:" + data.result[item].left_menu_boxColor + ";";
            document.querySelector("#alan2").style.cssText = "border:3px solid " + data.result[item].top_header_borderColor + "; background-color:" + data.result[item].top_header_boxColor + ";";
            document.querySelector("#alan3").style.cssText = "border:3px solid " + data.result[item].top_card_borderColor + "; background-color:" + data.result[item].top_card_bodyColor + ";";
            document.querySelector("#baslik1").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik2").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik3").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik4").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik5").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik6").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#baslik7").style.cssText = " color:" + data.result[item].left_menu_textColor + "!important; " + " font-size: " + data.result[item].left_menu_fontSize + "!important;" + " font-family: " + data.result[item].left_menu_fontFamily + "!important;";
            document.querySelector("#toggle").style.cssText = "background-color:" + data.result[item].logo_bodyColor + ";";
            document.querySelector("#alan2header").style.cssText = "background-color:" + data.result[item].logo_bodyColor + ";";
            document.styleSheets[0].addRule('html.modern .header.header-nav-menu .logo::after', 'background:' + data.result[item].logo_bodyColor + '!important; ');


            $(".btn-success")
                .mouseover(function () {
                    $(this).css("background-color", data.result[item].btn_success_hover);
                })
                .mouseout(function () {
                    $(this).css("background-color", data.result[item].btnSuccses);

                });
            $(".btn-primary")
                .mouseover(function () {
                    $(this).css("background-color", data.result[item].btn_primary_hover);
                })
                .mouseout(function () {
                    $(this).css("background-color", data.result[item].btnPrimary);

                });
            $(".btn-danger")
                .mouseover(function () {
                    $(this).css("background-color", data.result[item].btn_danger_hover);
                })
                .mouseout(function () {
                    $(this).css("background-color", data.result[item].btnDanger);

                });
            $(".btn-info")
                .mouseover(function () {
                    $(this).css("background-color", data.result[item].btn_info_hover);
                })
                .mouseout(function () {
                    $(this).css("background-color", data.result[item].btnInfo);

                });









        }
    });
}