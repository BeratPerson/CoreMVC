var listnew = [];
window.onload = function () {
    $('.js-example-basic-single').select2();
    $("#chtipi").select2({ width: '100%' });
    $("#ch_kod").select2({ width: '100%' });
    $('#ch_isim').select2({ width: '100%' });
    $('#teslim_turu').select2({ width: '100%' });
    $('#odeme_plani').select2({ width: '100%' });
    $('#sorumlu').select2({ width: '100%' });
    $('#proje_kodu').select2({ width: '100%' });
    $('#som_merkezi').select2({ width: '100%' });
    $('#teklif_kodu').select2({ width: '100%' });
    $('#cins').select2({ width: '100%' });
    $('#Sto_kodu').select2({ width: '100%' });
    $('#Sto_Isim').select2({ width: '100%' });
    $('#Sto_Proje').select2({ width: '100%' });
    $('#Sto_Sorumluluk_Merkezi').select2({ width: '100%' });

    var defaultstokkod = $("#defaultstokkod").val();
    var defaultstokadi = $("#defaultstokadi").val();
    var defaultchkod = $("#defaultchkod").val();
    var chtip = $("#chtipi").val();
    var cins = $("#cins").val();
    if (chtip == 0 || chtip == 1) {
        $.ajax({
            type: "GET",
            url: "/VerilenTeklif/GetDataCari?id=" + document.getElementById("chtipi").value,
            success: function (data) {
                var s = '<option value="0">Lütfen Cari Adını Seçin</option>';
                var s2 = '<option value="0">Lütfen Cari Kodunu Seçin</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Id == defaultchkod) {
                        s += '<option selected="selected" value="' + data[i].Id + '">' + data[i].Adi + '</option>';
                        s2 += '<option selected="selected" value="' + data[i].Adi + '">' + data[i].Id + ' - ' + data[i].Adi + '</option>';
                    }
                    s += '<option value="' + data[i].Id + '">' + data[i].Adi + '</option>';
                    s2 += '<option value="' + data[i].Adi + '">' + data[i].Id + ' - ' + data[i].Adi + '</option>';
                }
                $("#ch_isim").html(s);
                $("#ch_kod").html(s2);
            }
        });
    }
    if (cins == 0 || cins == 1 || cins == 2 || cins == 3) {
        $.ajax({
            type: "GET",
            url: "/VerilenTeklif/GetDataStok?tip=" + document.getElementById("cins").value,
            success: function (data) {
                var s = '<option value="0">Lütfen İsimi Seçin</option>';
                var s2 = '<option value="0">Lütfen Kodu Seçin</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].StokKod == defaultstokkod + ' - ' + defaultstokadi) {
                        s += '<option selected="selected" value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                        s2 += '<option selected="selected" value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
                    }
                    s += '<option value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                    s2 += '<option value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
                }
                $("#Sto_Isim").html(s);
                $("#Sto_kodu").html(s2);
            }
        });
    }
};
function Duzenle() {
    var sorun = 0;
    var chtipi = document.getElementById("chtipi").value;
    var ch_kod = document.getElementById("ch_kod").value;
    var ch_isim = document.getElementById("ch_isim").value;
    var teslim_turu = document.getElementById("teslim_turu").value;
    var odeme_plani = document.getElementById("odeme_plani").value;
    var sorumlu = document.getElementById("sorumlu").value;
    var proje_kodu = document.getElementById("proje_kodu").value;
    var som_merkezi = document.getElementById("som_merkezi").value;
    var EvrakSeri = document.getElementById("EvrakSeri").value;
    var EvrakSira = document.getElementById("EvrakSira").value;


    if (chtipi == "") {
        HataYazdir('Bir Cari Tipini Seçiniz!');
        sorun++;
    }
    else if (ch_kod == "" || ch_kod == "0") {
        HataYazdir('Lütfen Cari Kodu Seçiniz!', 'error');
        sorun++;
    }
    else if (odeme_plani == "") {
        HataYazdir('Bir Ödeme Planı Seçiniz!', 'error');
        sorun++;
    }
    else if (sorumlu == "") {
        HataYazdir('Lütfen Sorumlu Seçiniz!', 'error');
        sorun++;
    }

    if (sorun == 0) {
        var Verilen_Teklif_Detay_Duzenle = [];
        for (var i = 0; i < listnew.length; i++) {
            if (listnew[i] != null) {
                Verilen_Teklif_Detay_Duzenle.push({
                    Guid: listnew[i].Guid,
                    cins: listnew[i].cins,
                    Sto_kodu: listnew[i].Sto_kodu,
                    Sto_Isim: listnew[i].Sto_Isim,
                    Miktar: listnew[i].Miktar,
                    Birim_Fiyat: listnew[i].Birim_Fiyat,
                    Aciklama: listnew[i].Aciklama
                })
            }
        }

        var Verilen_Teklif_Duzenle = {
            chtipi: chtipi,
            ch_kod: ch_kod,
            ch_isim: ch_isim,
            odeme_plani_kodu: odeme_plani,
            sorumlu: sorumlu,
            teslim_turu_kodu: teslim_turu,
            proje_kodu: proje_kodu,
            som_merkezi: som_merkezi,
            Verilen_Teklif_Detay_Duzenle: Verilen_Teklif_Detay_Duzenle,
            EvrakSeri: EvrakSeri,
            EvrakSira: EvrakSira
        };
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/VerilenTeklif/VerilenTeklifDuzenleme',
            data: JSON.stringify(Verilen_Teklif_Duzenle),
            success: function (data) {
                if (data.status === 'False') {
                    $('#BasarisizKayit').show();
                    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                }
                else {
                    window.location.href = data.Url;
                }
            }
        });
    }
}
function chtipi_change() {
    $.ajax({
        type: "GET",
        url: "/VerilenTeklif/GetDataCari?id=" + document.getElementById("chtipi").value,
        success: function (data) {
            var s = '<option value="0">Lütfen Cari Adını Seçin</option>';
            var s2 = '<option value="0">Lütfen Cari Kodunu Seçin</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Id + '</option>';
                s2 += '<option value="' + data[i].Adi + '">' + data[i].Id + ' - ' + data[i].Adi + '</option>';
            }
            $("#ch_isim").html(s);
            $("#ch_kod").html(s2);
        }
    });
}
function ckod_OnChange() {
    var tip = document.getElementById("ch_kod").value;
    var Id = $("#ch_kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#ch_isim").html(s);
}
function cAdi_OnChange() {
    var tip = document.getElementById("ch_isim").value;
    var Id = $("#ch_isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#ch_kod").html(s);
}
function StokGetData() {
    $.ajax({
        type: "GET",
        url: "/VerilenTeklif/GetDataStok?tip=" + document.getElementById("cins").value,
        success: function (data) {
            var s = '<option value="0">Lütfen İsimi Seçin</option>';
            var s2 = '<option value="0">Lütfen Kodu Seçin</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                s2 += '<option value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
            }
            $("#Sto_Isim").html(s);
            $("#Sto_kodu").html(s2);
        }
    });
}
function Sto_kodu_OnChange() {
    var tip = document.getElementById("Sto_kodu").value;
    var Id = $("#Sto_kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sto_Isim").html(s);
}
function Sto_Isim_OnChange() {
    var tip = document.getElementById("Sto_Isim").value;
    var Id = $("#Sto_Isim option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sto_kodu").html(s);
}
function sil(id) {
    console.log(listnew[id].Guid)
    delete listnew[id]
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (listnew.length != 0) {
        html += '<thead><tr><th>Hareket Adı</th><th>Stok Kodu</th><th>Stok Adı</th><th>Miktarı</th><th>Birim Fiyatı</th><th>Aciklama</th><th style="text-align: center;">işlemler</th></tr></thead><tbody>';
        for (var i = 0; i < listnew.length; i++) {
            if (listnew[i] != null) {
                html += '<tr>';
                html += '<td>' + listnew[i].cins_adi + '</td>';
                html += '<td>' + listnew[i].Sto_kodu + '</td>';
                html += '<td>' + listnew[i].Sto_Isim + '</td>';
                html += '<td>' + listnew[i].Miktar + '</td>';
                html += '<td>' + listnew[i].Birim_Fiyat + '</td>';
                html += '<td>' + listnew[i].Aciklama + '</td>';
                html += '<td><a style="margin-right:15px;" class="btn btn-success" onclick="duzenle(' + listnew[i].sayac + ')">Düzenle</a>';
                html += '<a class="btn btn-danger" onclick="sil(' + listnew[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#verilenteklifdetay').html(html);
    }
    else {
        $('#verilenteklifdetay').html(html);
    }
}
function duzenle(id) {
    $('#buttonolustur').hide();
    $('#buttonduzenle').show();
    $('#Aciklama').val(listnew[id].Aciklama);
    $('#Miktar').val(listnew[id].Miktar);
    $('#Birim_Fiyat').val(listnew[id].Birim_Fiyat);
    $('#duzenleid').val(listnew[id].sayac);
    var scins = '';
    if (listnew[id].cins == 0) {
        scins += '<option value="-1">Lütfen Cinsini Seçin</option>';
        scins += '<option selected="selected" value="0">Stok</option>';
        scins += '<option value="1">Hizmet</option> ';
        scins += '<option value="2">Masraf</option> ';
        scins += '<option value="3">Demirbaş</option> ';
    }
    else if (listnew[id].cins == 1) {
        scins += '<option value="-1">Lütfen Cinsini Seçin</option>';
        scins += '<option value="0">Stok</option>';
        scins += '<option selected="selected" value="1">Hizmet</option> ';
        scins += '<option value="2">Masraf</option> ';
        scins += '<option value="3">Demirbaş</option> ';
    }
    else if (listnew[id].cins == 2) {
        scins += '<option value="-1">Lütfen Cinsini Seçin</option>';
        scins += '<option value="0">Stok</option>';
        scins += '<option value="1">Hizmet</option> ';
        scins += '<option selected="selected" value="2">Masraf</option> ';
        scins += '<option value="3">Demirbaş</option> ';
    }
    else if (listnew[id].cins == 3) {
        scins += '<option value="-1">Lütfen Cinsini Seçin</option>';
        scins += '<option value="0">Stok</option>';
        scins += '<option value="1">Hizmet</option> ';
        scins += '<option value="2">Masraf</option> ';
        scins += '<option selected="selected" value="3">Demirbaş</option> ';
    }
    $("#cins").html(scins);
    $.ajax({
        type: "GET",
        url: "/VerilenTeklif/GetDataStok?tip=" + listnew[id].cins,
        success: function (data) {
            var s = '<option value="0">Lütfen İsimi Seçin</option>';
            var s2 = '<option value="0">Lütfen Kodu Seçin</option>';
            for (var i = 0; i < data.length; i++) {
                if (data[i].StokKod == listnew[id].Sto_kodu + " - " + listnew[id].Sto_Isim) {
                    s += '<option selected="selected" value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                    s2 += '<option selected="selected" value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
                }
                else {
                    s += '<option value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                    s2 += '<option value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
                }
            }
            $("#Sto_Isim").html(s);
            $("#Sto_kodu").html(s2);
        }
    });
}
function tabloduzenle() {
    var sayac = (document.getElementById("duzenleid").value);
    var Hareket = document.getElementById("cins").value;
    var HareketAdi = $("#cins option:selected").text();
    var Stok_Kod = document.getElementById("Sto_Isim").value;
    var Stok_Adi = document.getElementById("Sto_kodu").value;
    var Miktar = document.getElementById("Miktar").value;
    var Birim_Fiyat = document.getElementById("Birim_Fiyat").value;
    var Aciklama = document.getElementById("Aciklama").value;

    if (Hareket == "") {
        HataYazdir('Bir Hareket Seçiniz!');
    }
    else if (Stok_Kod == "Lütfen Kodu Seçin") {
        HataYazdir('Bir Stok Seçiniz!');
    }

    else if (Miktar == "" || Miktar == "0" || Miktar == null || parseInt(Miktar) <= 0) {
        HataYazdir('Miktar Belirleyiniz!');
    }

    listnew[sayac].Aciklama = Aciklama;
    listnew[sayac].Miktar = Miktar;
    listnew[sayac].Birim_Fiyat = Birim_Fiyat;
    listnew[sayac].cins = Hareket;
    listnew[sayac].cins_adi = HareketAdi;
    listnew[sayac].Sto_Isim = Stok_Adi;
    listnew[sayac].Sto_kodu = Stok_Kod;

    $('#buttonolustur').show();
    $('#buttonduzenle').hide();
    $('#Aciklama').val('');
    $('#Miktar').val('');
    $('#Birim_Fiyat').val('');
    $('#duzenleid').val(-1);

    htmlDoldur();
}
function tabloolustur() {
    var sayac = listnew.length;
    var Hareket = document.getElementById("cins").value;
    var HareketAdi = $("#cins option:selected").text();
    var Stok_Kod = document.getElementById("Sto_Isim").value;
    var Stok_Adi = document.getElementById("Sto_kodu").value;
    var Miktar = document.getElementById("Miktar").value;
    var Birim_Fiyat = document.getElementById("Birim_Fiyat").value;
    var Aciklama = document.getElementById("Aciklama").value;
    if (Hareket == "") {
        HataYazdir('Bir Hareket Seçiniz!');
    }
    else if (Stok_Kod == "") {
        HataYazdir('Bir Stok Seçiniz!');
    }
    else if (Miktar == "" || Miktar == "0" || Miktar == null || parseInt(Miktar) <= 0) {
        HataYazdir('Miktar Belirleyiniz!');
    }
    else {
        listnew.push({
            sayac: sayac,
            Guid: '',
            cins: Hareket,
            cins_adi: HareketAdi,
            Sto_kodu: Stok_Kod,
            Sto_Isim: Stok_Adi,
            Miktar: Miktar,
            Birim_Fiyat: Birim_Fiyat,
            Aciklama: Aciklama
        });
        document.getElementById("Miktar").value = null;
        document.getElementById("Birim_Fiyat").value = null;
    }
    htmlDoldur();
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