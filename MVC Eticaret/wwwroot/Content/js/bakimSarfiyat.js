var list = [];
function Kaydet() {
    var sorun = 0;
    var makisemkod = document.getElementById("makisem_isim").value;
    var makisemisim = document.getElementById("makisem_kod").value;
    var somkod = document.getElementById("som_isim").value;
    var somisim = document.getElementById("som_kod").value;
    var prokod = document.getElementById("pro_adi").value;
    var proisim = document.getElementById("pro_kodu").value;
    if (makisemkod == "") {
        HataYazdir('Bir Bakım Sarfiyat Stoğu Ekleyiniz!');
        sorun++;
    }
    else if (prokod == "") {
        HataYazdir('Bir Proje Seçiniz!');
        sorun++;
    }
    else if (somkod == "") {
        HataYazdir('Bir Sarfiyat Sorumluluk Merkezi Seçiniz!');
        sorun++;
    }
    else {
        var j = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == "") {
                j++;
            }
        }
        if (list.length == j || list.length == 0) {
            HataYazdir('Bir Stok Ekleyiniz!');
            sorun++;
        }
        if (sorun == 0) {

            var Bakiim_Sarfiyat_Stok_Ekle = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i] != null) {
                    Bakiim_Sarfiyat_Stok_Ekle.push({
                        Stok_Kod: list[i].stokKodu,
                        Stok_Isim: list[i].stokAdi,
                        Birim_Kod: list[i].birimKodu,
                        Birim_Isim: list[i].birimAdi,
                        Stok_Miktar: list[i].Miktar,
                        Stok_Aciklama: list[i].Aciklama
                    });
                }
            }
            var Bakim_Sarfiyat_Ekle = {
                makisem_isim: makisemisim,
                makisem_kod: makisemkod,
                som_isim: somisim,
                som_kod: somkod,
                pro_adi: proisim,
                pro_kodu: prokod,
                Bakiim_Sarfiyat_Stok_Ekle_Listesi: Bakiim_Sarfiyat_Stok_Ekle
            };
            var valdata = $("#bakimSarfiyatform").serialize();
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '/BakimSarfiyat/YeniBakimSarfiyatOlustur',
                data: JSON.stringify(Bakim_Sarfiyat_Ekle),
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
                                url: '/BakimSarfiyat/YeniBakimSarfiyatOlusturUser',
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
function makisem_kod_OnChange() {
    var tip = document.getElementById("makisem_kod").value;
    var Id = $("#makisem_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#makisem_isim").html(s);
}
function makisem_isim_OnChange() {
    var tip = document.getElementById("makisem_isim").value;
    var Id = $("#makisem_isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#makisem_kod").html(s);
}
function pro_kodu_OnChange() {
    var tip = document.getElementById("pro_kodu").value;
    var Id = $("#pro_kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#pro_adi").html(s);
}
function pro_adi_OnChange() {
    var tip = document.getElementById("pro_adi").value;
    var Id = $("#pro_adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#pro_kodu").html(s);
}
function som_kod_OnChange() {
    var tip = document.getElementById("som_kod").value;
    var Id = $("#som_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#som_isim").html(s);
}
function som_isim_OnChange() {
    var tip = document.getElementById("som_isim").value;
    var Id = $("#som_isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#som_kod").html(s);
}
function sto_kod_OnChange() {
    var tip = document.getElementById("sto_kod").value;
    var Id = $("#sto_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#sto_isim").html(s);
    BirimAdiGet(Id);
}
function sto_isim_OnChange() {
    var tip = document.getElementById("sto_isim").value;
    var Id = $("#sto_isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#sto_kod").html(s);
    BirimAdiGet(tip);
}
function BirimAdiGet(e) {
    $.ajax({
        type: "GET",
        url: "/BakimSarfiyat/getBirim?stokod=" + e,
        data: "{}",
        success: function (data) {
            $("#birim_isim").html('');
            var htmlKod = '';
            var htmlAd = '';
            for (var i = 0; i < data.length; i++) {
                htmlKod += '<option value="' + data[i].BirimId + '">' + data[i].BirimAdi + '</option>';
                htmlAd += '<option value="' + data[i].BirimAdi + '">' + data[i].BirimId + '</option>';
            }
            $("#birim_isim").html(htmlAd);
            $("#birim_kod").html(htmlKod);
        }
    });
}
function birim_kod_OnChange() {
    var tip = document.getElementById("birim_kod").value;
    var Id = $("#birim_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#birim_isim").html(s);
}
function birim_isim_OnChange() {
    var tip = document.getElementById("birim_isim").value;
    var Id = $("#birim_isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#birim_kod").html(s);
}
function tabloolustur() {
    var sayac = (list.length) + 1;
    var stokKodu = document.getElementById("sto_isim").value;
    var stokAdi = document.getElementById("sto_kod").value;
    var birimKodu = document.getElementById("birim_kod").value;
    var birimAdi = document.getElementById("birim_isim").value;
    var Miktar = document.getElementById("bsrf_Miktar").value;
    var Aciklama = document.getElementById("bsrf_aciklama").value;
    if (stokKodu == "") {
        HataYazdir('Bir Stok Seçiniz!');
    }
    else if (birimKodu == "") {
        HataYazdir('Bir Birim Seçiniz!');
    }
    else if (Miktar == 0) {
        HataYazdir('Bir Miktar Belirleyiniz!');
    }
    else {
        list.push({
            sayac: sayac,
            stokKodu: stokKodu,
            stokAdi: stokAdi,
            birimKodu: birimKodu,
            birimAdi: birimAdi,
            Miktar: Miktar,
            Aciklama: Aciklama
        });
        $("#bsrf_Miktar").val("");
        $("#bsrf_aciklama").val("");
        //stokIsim = '<option value="">Lütfen Stok Adı Seçiniz.</option>';
        //stokKod = '<option value=""></option>';
        //$("#sto_isim").html(stokIsim);
        //$("#sto_kod").html(stokKod);
        //$("#bsrf_Miktar").val("");
        //birimIsim = '<option value=""></option>';
        //birimKod = '<option value=""></option>';
        //$("#birim_isim").html(birimIsim);
        //$("#birim_kod").html(birimKod);
    }


    htmlDoldur();
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
function htmlDoldur() {
    if (list.length != 0) {
        var html = '<thead><tr><th>Stok Kodu</th><th>Stok Adı</th><th>Birim Kodu</th><th>Birim Adı</th><th>Miktar</th><th>Açıklama</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].stokKodu + '</td> ';
                html += '<td>' + list[i].stokAdi + '</td>';
                html += '<td>' + list[i].birimKodu + '</td>';
                html += '<td>' + list[i].birimAdi + '</td>';
                html += '<td>' + list[i].Miktar + '</td>';
                html += '<td>' + list[i].Aciklama + '</td>';
                html += '<td><a class="btn btn-danger" onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#stokTable').html(html)
    }
}
function ClearDate() {
    $('#Baslangic').val('')
}