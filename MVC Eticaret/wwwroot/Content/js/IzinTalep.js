window.onload = function () {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#BaslangicTarih').val(today);

    $('.js-example-basic-single').select2();
    $("#EGN_Kod").select2({ width: '100%' });
    $("#EGN_Adi").select2({ width: '100%' });
    $("#Tip_Adi").select2({ width: '100%' });
    $("#Tip_Kod").select2({ width: '100%' });
    $("#Per_Adi").select2({ width: '100%' });
    $("#Per_Kod").select2({ width: '100%' });
};
function Kaydet() {
    var fileData = new FormData();
    var sorun = 0;
    var Per_Kod = document.getElementById("Per_Kod").value;
    var Per_Adi = document.getElementById("Per_Adi").value;
    var Tip_Kod = document.getElementById("Tip_Kod").value;
    var Tip_Adi = document.getElementById("Tip_Adi").value;
    var EGN_Kod = document.getElementById("EGN_Kod").value;
    var EGN_Adi = document.getElementById("EGN_Adi").value;
    var Gun = document.getElementById("IzinGunu").value;
    var Amac = document.getElementById("Amac").value;
    var BaslangicTarih = document.getElementById("BaslangicTarih").value;
    var BitisTarih = document.getElementById("Bitis_Tarihi").value;
    if (Per_Adi == "") {
        HataYazdir('Bir Müşteri Seçiniz!');
        sorun++;
    }
    else if (Tip_Adi == "") {
        HataYazdir('Bir İzin Tipi Seçiniz!');
        sorun++;
    }
    else if (EGN_Adi == "") {
        HataYazdir('Bir Eksik Gün Nedeni Seçiniz!');
        sorun++;
    }
    else if (Gun == "0") {
        HataYazdir('Tarihlerinizi kontrol ediniz Giriniz!');
        sorun++;
    }
    else if (BaslangicTarih == "") {
        HataYazdir('Başlangıç Tarihi Seçiniz!');
    }
    else if (BitisTarih == "") {
        HataYazdir('Bitiş Tarihi Seçiniz!');
        sorun++;
    }
    if ($("#fileInput").get(0) != null) {
        var files = $("#fileInput").get(0).files;
        if (files.length == 0) {
            HataYazdir("Bir Dosya Seçiniz!");
            sorun++;
        }
        for (var i = 0; i < files.length; i++) {
            fileData.append("fileInput", files[i]);
        }
    }
    if (sorun == 0) {
        var Izin_Talep_Ekle = {
            Per_Kod: Per_Adi,
            //Per_Adi: Per_Kod,
            Tip_Kod: Tip_Adi,
            //Tip_Adi: Tip_Kod,
            EGN_Kod: EGN_Adi,
            //EGN_Adi: EGN_Kod,
            Gun: Gun,
            //Yol_Gun: Yol_Gun,
            Amac: Amac,
            BaslangicTarih: BaslangicTarih,
            BitisTarih: BitisTarih
        };
        var valdata = $("#izinTalepform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Izin/YeniIzinTalepOlustur',
            data: JSON.stringify(Izin_Talep_Ekle),
            success: function (data) {

                if (data.status === 'False') {
                    HataYazdir('Bir Sorun Oluştu! Lütfen işleminizi daha sonra tekrar deneyiniz.');
                }
                else if (data.status === 'True') {
                    if (valdata != "") {
                        $.ajax({
                            contentType: 'application/x-www-form-urlencoded;; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: '/Izin/YeniIzinTalepOlusturUser',
                            data: valdata,
                            success: function (data) {
                                if (data.status === 'False') {
                                    $('#BasarisizKayit').show();
                                    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                                }
                                else if (data.status === 'True') {
                                    if ($("#fileInput").get(0) != null) {
                                    var files = $("#fileInput").get(0).files;

                                    for (var i = 0; i < files.length; i++) {
                                        fileData.append("fileInput", files[i]);
                                    }
                                    $.ajax({
                                        processData: false,
                                        contentType: false,
                                        dataType: 'json',
                                        type: 'POST',
                                        url: '/Izin/YeniIzinTalepOlusturFile',
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
                                            HataYazdir('Bir Sorun Oluştu! Lütfen işleminizi daha sonra tekrar deneyiniz.');
                                        }
                                    });
                                    }
                                    else {
                                        window.location.href = data.Url
                                    }
                                }
                            },
                            error: function (xhr, status, error) {
                                HataYazdir('Bir Sorun Oluştu! Lütfen işleminizi daha sonra tekrar deneyiniz.');
                            }

                        });
                    }
                    else if ($("#fileInput").get(0) != null) {
                        var files = $("#fileInput").get(0).files;
                        var fileData = new FormData();

                        for (var i = 0; i < files.length; i++) {
                            fileData.append("fileInput", files[i]);
                        }
                        $.ajax({
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            type: 'POST',
                            url: '/Izin/YeniIzinTalepOlusturFile',
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
                                HataYazdir('Bir Sorun Oluştu! Lütfen işleminizi daha sonra tekrar deneyiniz.');
                            }
                        });
                    }
                    else {
                        window.location.href = data.Url;
                    }
                }
            }
        });
    }
}
function Per_Kod_OnChange() {
    var tip = document.getElementById("Per_Kod").value;
    var Id = $("#Per_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Per_Adi").html(s);
}
function Per_Adi_OnChange() {
    var tip = document.getElementById("Per_Adi").value;
    var Id = $("#Per_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Per_Kod").html(s);
}
function Tip_Kod_OnChange() {
    var tip = document.getElementById("Tip_Kod").value;
    var Id = $("#Tip_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Tip_Adi").html(s);
}
function Tip_Adi_OnChange() {
    var tip = document.getElementById("Tip_Adi").value;
    var Id = $("#Tip_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Tip_Kod").html(s);
}
function EGN_Kod_OnChange() {
    var tip = document.getElementById("EGN_Kod").value;
    var Id = $("#EGN_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#EGN_Adi").html(s);
}
function EGN_Adi_OnChange() {
    var tip = document.getElementById("EGN_Adi").value;
    var Id = $("#EGN_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#EGN_Kod").html(s);
}
function BitisKontrol_OnChange() {
    if (document.getElementById("Bitis_Tarihi").value != "") {
        TarihKontrol();
        var BaslangicTarih = new Date(document.getElementById("BaslangicTarih").value);
        var BitisTarih = new Date(document.getElementById("Bitis_Tarihi").value);
        var zamanFark = Math.abs(BitisTarih.getTime() - BaslangicTarih.getTime());
        var gunFark = Math.ceil(zamanFark / (1000 * 3600 * 24));
        $('#gunDiv').show();
        $('#gunSayisi').html("Kullanacağınız izin gün sayısı : " + gunFark);
        $('#IzinGunu').val(gunFark);
    }
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
function TarihKontrol() {
    if (document.getElementById("Bitis_Tarihi").value != "") {
        var xBitis = document.getElementById("Bitis_Tarihi").value;
        var xBaslangic = document.getElementById("BaslangicTarih").value;
        if (xBaslangic != "" && xBitis != "") {
            if (xBaslangic > xBitis) {
                $('#ErrorDate').show();
                $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                var x = $('#BaslangicTarih').val();
                $('#Bitis_Tarihi').val(x);
            }
        }
    }
}
function setGuidIzinOnaylama(guid) {
    $('#guid').val(guid);
}