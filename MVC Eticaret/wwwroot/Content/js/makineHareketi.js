var list = [];
function Kaydet() {
    var sorun = 0;
    var mkh_mak_kodu = document.getElementById("mkh_mak_adi").value;
    var mkh_mak_adi = document.getElementById("mkh_mak_kodu").value;
    if (mkh_mak_kodu == "") {
        HataYazdir('Bir Makine Seçiniz!');
        sorun++;
    }
    else if (list.length == 0) {
        HataYazdir('Bir Makine Hareketi Sorun Detayı Ekleyiniz!');
        sorun++;
    }
    if (sorun == 0) {

        var Makine_Hareketi_Sorun_Ekle = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Makine_Hareketi_Sorun_Ekle.push({
                    mkh_Mak_srn_kodu: list[i].mkh_Mak_srn_kodu,
                    mkh_Mak_srn_adi: list[i].mkh_Mak_srn_adi,
                    mkh_Aciklama: list[i].mkh_Aciklama,
                    mkh_Yetkiliop_Kodu: list[i].mkh_Yetkiliop_Kodu,
                    mkh_Yetkiliop_Adi: list[i].mkh_Yetkiliop_Adi,
                    mkh_Bakimelm_Kodu: list[i].mkh_Bakimelm_Kodu,
                    mkh_Bakimelm_Adi: list[i].mkh_Bakimelm_Adi,
                    Durma_Tarihi: list[i].Durma_Tarihi,
                    Kalkma_Tarihi: list[i].Kalkma_Tarihi
                })
            }
        }
        var Makine_Hareketi_Ekle_Ekle = {
            mkh_mak_adi: mkh_mak_adi,
            mkh_mak_kodu: mkh_mak_kodu,
            Makine_Hareketi_Sorun_Ekle_Listesi: Makine_Hareketi_Sorun_Ekle
        };
        var valdata = $("#makineHareketiform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/MakineHareketi/YeniMakineHareketiOlustur',
            data: JSON.stringify(Makine_Hareketi_Ekle_Ekle),
            success: function (data) {
                if (data.status === 'False') {
                    $('#BasarisizKayit').show();
                    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                }
                else if (data.status === 'True') {
                    if (valdata != "") {
                        $.ajax({
                            contentType: 'application/x-www-form-urlencoded;; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: '/MakineHareketi/YeniMakineHareketiOlusturUser',
                            data: valdata,
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
function mkh_mak_kodu_OnChange() {
    var tip = document.getElementById("mkh_mak_kodu").value;
    var Id = $("#mkh_mak_kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_mak_adi").html(s);
}
function mkh_mak_adi_OnChange() {
    var tip = document.getElementById("mkh_mak_adi").value;
    var Id = $("#mkh_mak_adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_mak_kodu").html(s);
}
function mks_kod_OnChange() {
    var tip = document.getElementById("mks_kod").value;
    var Id = $("#mks_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mks_ismi").html(s);
}
function mks_ismi_OnChange() {
    var tip = document.getElementById("mks_ismi").value;
    var Id = $("#mks_ismi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mks_kod").html(s);
}
function mkh_Yetkiliop_Kodu_OnChange() {
    var tip = document.getElementById("mkh_Yetkiliop_Kodu").value;
    var Id = $("#mkh_Yetkiliop_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_Yetkiliop_Adi").html(s);
}
function mkh_Yetkiliop_Adi_OnChange() {
    var tip = document.getElementById("mkh_Yetkiliop_Adi").value;
    var Id = $("#mkh_Yetkiliop_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_Yetkiliop_Kodu").html(s);
}
function mkh_Bakimelm_Kodu_OnChange() {
    var tip = document.getElementById("mkh_Bakimelm_Kodu").value;
    var Id = $("#mkh_Bakimelm_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_Bakimelm_Adi").html(s);
}
function mkh_Bakimelm_Adi_OnChange() {
    var tip = document.getElementById("mkh_Bakimelm_Adi").value;
    var Id = $("#mkh_Bakimelm_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#mkh_Bakimelm_Kodu").html(s);
}
function tabloolustur() {
    var sayac = (list.length) + 1;
    var mkh_Mak_srn_kodu = document.getElementById("mks_ismi").value;
    var mkh_Mak_srn_adi = document.getElementById("mks_kod").value;
    var mkh_Aciklama = document.getElementById("mkh_Aciklama").value;
    var mkh_Yetkiliop_Kodu = document.getElementById("mkh_Yetkiliop_Adi").value;
    var mkh_Yetkiliop_Adi = document.getElementById("mkh_Yetkiliop_Kodu").value;
    var mkh_Bakimelm_Kodu = document.getElementById("mkh_Bakimelm_Adi").value;
    var mkh_Bakimelm_Adi = document.getElementById("mkh_Bakimelm_Kodu").value;
    var Durma_Tarihi = document.getElementById("Durma_Tarihi").value;

    var Kalkma_Tarihi = document.getElementById("Kalkma_Tarihi").value;
    if (Kalkma_Tarihi == "") {
        Kalkma_Tarihi = "1899-12-30T00:00";
    }

    if (mkh_Mak_srn_kodu == "") {
        HataYazdir('Bir Makine Sorun Seçiniz!');
    }
    else if (mkh_Yetkiliop_Kodu == "") {
        HataYazdir('Bir Yetkili Personel Seçiniz!');
    }
    else if (mkh_Bakimelm_Kodu == "") {
        HataYazdir('Bir Görevli Personel Seçiniz!');
    }
    else if (Durma_Tarihi == "") {
        HataYazdir('Durma Tarihini Belirleyiniz!');
    }
    else {
        list.push({
            sayac: sayac,
            mkh_Mak_srn_kodu: mkh_Mak_srn_kodu,
            mkh_Mak_srn_adi: mkh_Mak_srn_adi,
            mkh_Aciklama: mkh_Aciklama,
            mkh_Yetkiliop_Kodu: mkh_Yetkiliop_Kodu,
            mkh_Yetkiliop_Adi: mkh_Yetkiliop_Adi,
            mkh_Bakimelm_Kodu: mkh_Bakimelm_Kodu,
            mkh_Bakimelm_Adi: mkh_Bakimelm_Adi,
            Durma_Tarihi: Durma_Tarihi,
            Kalkma_Tarihi: Kalkma_Tarihi
        })
    }
    htmlDoldur();
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
function htmlDoldur() {
    if (list.length != 0) {
        var html = '<thead><tr><th>Makine Sorunu Kodu</th><th>Makine Sorunu Adı</th><th>Açıklama</th><th>Yetkili Personel Kodu</th><th>Yetkili Personel Adı</th><th>Görevli Personel Kodu</th><th>Görevli Personel Adı</th><th>Durma Tarihi</th><th>Kalkma Tarihi</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].mkh_Mak_srn_kodu + '</td> ';
                html += '<td>' + list[i].mkh_Mak_srn_adi + '</td>';
                html += '<td>' + list[i].mkh_Aciklama + '</td>';
                html += '<td>' + list[i].mkh_Yetkiliop_Kodu + '</td>';
                html += '<td>' + list[i].mkh_Yetkiliop_Adi + '</td>';
                html += '<td>' + list[i].mkh_Bakimelm_Kodu + '</td> ';
                html += '<td>' + list[i].mkh_Bakimelm_Adi + '</td>';
                html += '<td>' + list[i].Durma_Tarihi.substring(0, 10) + '</td>';
                if (list[i].Kalkma_Tarihi == "1899-12-30T00:00") {
                    html += '<td></td>';
                }
                else {
                    html += '<td>' + list[i].Kalkma_Tarihi.substring(0, 10) + '</td>';
                }
                html += '<td><a onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#makineHareketiTable').html(html);
    }
}
function TarihKontrol() {
    var xBitis = document.getElementById("Kalkma_Tarihi").value;
    var xBaslangic = document.getElementById("Durma_Tarihi").value;
    if (xBaslangic != "" && xBitis != "") {
        if (xBaslangic > xBitis) {
            $('#ErrorDate').show();
            $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
            var x = $('#Durma_Tarihi').val();
            $('#Kalkma_Tarihi').val(x);
        }
    }
}
function setGuidKapatma(guid) {
    $('#guid').val(guid);
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
function ClearDate() {
    $('#Kalkma_Tarihi').val('')
    $('#Baslangic').val('')
}