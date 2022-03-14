var list = [];
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
};
function Kaydet() {
    var fileData = new FormData();
    var sorun = 0;
    var chtipi = document.getElementById("chtipi").value;
    var ch_kod = document.getElementById("ch_kod").value;
    var ch_isim = document.getElementById("ch_isim").value;
    var odeme_plani = document.getElementById("odeme_plani").value;
    var sorumlu = document.getElementById("sorumlu").value;
    var proje_kodu = document.getElementById("proje_kodu").value;
    var som_merkezi = document.getElementById("som_merkezi").value;
    var teslim_turu = document.getElementById("teslim_turu").value;
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
    else if (list.length == 0) {
        HataYazdir('Bir Verilen Teklif Detayı Ekleyiniz!');
        sorun++;
    }
    if ($("#fileInput").get(0) != null) {
        var files = $("#fileInput").get(0).files;
        if (files.length == 0) {
            HataYazdir("Bir Dosya Seçiniz!");
            sorun++;
        }
    }

    if (sorun == 0) {

        var Verilen_Teklif_Detay_Ekle = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Verilen_Teklif_Detay_Ekle.push({
                    cins: list[i].Hareket,
                    Sto_kodu: list[i].Stok_Kod,
                    Sto_Isim: list[i].Stok_Adi,
                    Miktar: list[i].Miktar,
                    Birim_Fiyat: list[i].Birim_Fiyat,
                    Aciklama: list[i].Aciklama
                })
            }
        }
        var Verilen_Teklif_Ekle = {
            chtipi: chtipi,
            ch_kod: ch_kod,
            ch_isim: ch_isim,
            odeme_plani_kodu: odeme_plani,
            sorumlu: sorumlu,
            teslim_turu_kodu: teslim_turu,
            proje_kodu: proje_kodu,
            som_merkezi: som_merkezi,
            Verilen_Teklif_Detay_Ekle: Verilen_Teklif_Detay_Ekle
        };
        //Dinamik Alanları aşağıdaki kodlar ile listeleyebilirsiniz.
        //var values = {};
        //$.each($('#talepform').serializeArray(), function (i, field) {
        //    values[field.name] = field.value;
        //    if (field.value == "" || field.value == null) {
        //        HataYazdir(field.name + " alanı boş geçilemez");
        //    }
        //});
        var valdata = $("#VerilenTeklifUser").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/VerilenTeklif/YeniVerilenTeklifOlustur',
            data: JSON.stringify(Verilen_Teklif_Ekle),
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
                            url: '/VerilenTeklif/YeniVerilenTeklifOlusturUser',
                            data: valdata + "&Record_uid=" + data.guid,
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
                                            dataType: "json",
                                            type: 'POST',
                                            url: '/VerilenTeklif/YeniVerilenTeklifOlusturFile',
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

                        for (var i = 0; i < files.length; i++) {
                            fileData.append("fileInput", files[i]);
                        }
                        $.ajax({
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            type: 'POST',
                            url: '/VerilenTeklif/YeniVerilenTeklifOlusturFile',
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
};
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
    delete list[id - 1]
    htmlDoldur();
}
function tabloolustur() {
    var sayac = (list.length) + 1;
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
        list.push({
            sayac: sayac,
            Hareket: Hareket,
            HareketAdi: HareketAdi,
            Stok_Kod: Stok_Kod,
            Stok_Adi: Stok_Adi,
            Miktar: Miktar,
            Birim_Fiyat: Birim_Fiyat,
            Aciklama: Aciklama
        });
        document.getElementById("Miktar").value = null;
        document.getElementById("Birim_Fiyat").value = null;
    }
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (list.length != 0) {
        html += '<thead><tr><th>Hareket</th><th>Stok Kodu</th><th>Stok Adı</th><th>Miktarı</th><th>Birim Fiyatı</th><th>Aciklama</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].HareketAdi + '</td> ';
                html += '<td>' + list[i].Stok_Kod + '</td>';
                html += '<td>' + list[i].Stok_Adi + '</td>';
                html += '<td>' + list[i].Miktar + '</td>';
                html += '<td>' + list[i].Birim_Fiyat + '</td>';
                html += '<td>' + list[i].Aciklama + '</td>';
                html += '<td><a onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#VerilenTeklifTable').html(html);
    }
    else {
        $('#VerilenTeklifTable').html(html);
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