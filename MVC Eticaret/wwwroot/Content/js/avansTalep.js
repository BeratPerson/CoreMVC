window.onload = function () {
    $('#AvansTable').DataTable({
        "oLanguage": {
            "sInfo": "Görüntülenen _START_ Sayfa _END_ Toplam Kayıt _TOTAL_",
        }
    });
};
function Kaydet() {
    var sorun = 0;
    var pat_avansayi = $("#pat_avansayi").val();
    var pat_avanstutari = $("#pat_avanstutari").val();
    //var pat_aciklamasi = $("#pat_aciklamasi").val();

    var valdata = $("#signupform").serialize();
    if (pat_avansayi == "") {
        HataYazdir("Bir Ay Seçiniz!");
        sorun++;
    }
    else if (pat_avanstutari == "") {
        HataYazdir("Bir Tutar Giriniz!");
        sorun++;
    }
    //else if (pat_aciklamasi == 0) {
    //    HataYazdir("Bir Açıklama Ekleyiniz!");
    //}

    if ($("#fileInput").get(0) != null) {
        var files = $("#fileInput").get(0).files;
        if (files.length == 0) {
            HataYazdir("Bir Dosya Seçiniz!");
            sorun++;
        }
    }

    if (sorun == 0) {
        $.ajax({
            url: "/Avans/YeniAvansTalepEt",
            type: "POST",
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: valdata,
            success: function (data) {
                if (data.status === 'True') {

                    var files = $("#fileInput").get(0).files;
                    var fileData = new FormData();

                    for (var i = 0; i < files.length; i++) {
                        fileData.append("fileInput", files[i]);
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/Avans/YeniAvansOlusturFile',
                        dataType: "json",
                        contentType: false,
                        processData: false,
                        data: fileData,
                        success: function (data) {
                            if (data.status === 'False') {
                                $('#BasarisizKayit').show();
                                $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                            }
                            else if (data.status === 'True') {
                                window.location.href = data.Url
                            }
                        },
                        error: function (xhr, status, error) {
                            console.log(status);
                        }
                    });
                }
            },
            error: function (data) {
                $('#ErrorDate').show();
            },

        });
    }
}
function AvansKayit() {
    var guid = $("#hidden").val();
    var aciklama = $("#aciklama").val();
    var aciklama2 = $("#aciklama2").val();
    $.ajax({
        type: "POST",
        url: "/Avans/AvansOnayla?guid=" + guid + '&aciklama=' + aciklama + '&aciklama2=' + aciklama2,
        data: "{}",
        success: function (data) {

        }
    });
    OnayYazdir("Kayıt başarılı bir şekilde onaylanmıştır.")
    $('#AvansOnayModel').modal('toggle');
    location.reload();
}
function AvansRetet() {
    var guid = $("#hidden2").val();
    var aciklama = $("#aciklama3").val();
    var aciklama2 = $("#aciklama4").val();
    $.ajax({
        type: "POST",
        url: "/Avans/AvansRetet?guid=" + guid + '&aciklama=' + aciklama + '&aciklama2=' + aciklama2,
        data: "{}",
        success: function (data) {
            RedYazdir("Kayıt başarılı bir şekilde reddedilmiştir.")
        }
    });
    RedYazdir("Kayıt başarılı bir şekilde reddedilmiştir.")
    $('#AvansRetModel').modal('toggle');
    location.reload();
}
function setGuid(guid) {
    console.log(guid);
    $('#hidden').val(guid);
    $('#hidden2').val(guid);
}
function RedYazdir(mesaj) {
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    var html = "";
    html += '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
    html += '<strong class="text-color-danger">' + mesaj + '</strong>';
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';

    $('#MesajYaz').html(html);
}
function OnayYazdir(mesaj) {
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    var html = "";
    html += '<div class="alert alert-success alert-dismissible fade show" role="alert">';
    html += '<strong class="text-color-success">' + mesaj + '</strong>';
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';

    $('#MesajYaz').html(html);
}
function HataYazdir(mesaj) {
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    var html = "";
    html += '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
    html += '<strong class="text-color-danger">' + mesaj + '</strong>';
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';

    $('#BasarisizKayit').html(html);
}
function HatalariYazdir(mesaj) {
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    console.log(mesaj);
    console.log("uzunluk " + mesaj.length);
    var html = "";
    for (var i = 0; i < mesaj.length; i++) {
        html += '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
        html += '<strong class="text-color-danger">' + mesaj[i] + '</strong>';
        html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        html += '<span aria-hidden="true">&times;</span>';
        html += '</button>';
        html += '</div>';
    }

    $('#BasarisizKayit').html(html);
}