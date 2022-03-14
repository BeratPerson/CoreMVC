var list = [];
window.onload = function () {
    $('.js-example-basic-single').select2();
    $("#Zimmet_Yeri_Giris_Kod").select2({ width: '100%' });
    $("#Zimmet_Yeri_Giris_Adi").select2({ width: '100%' });
    $("#Zimmet_Yeri_Cikis_Kod").select2({ width: '100%' });
    $("#Zimmet_Yeri_Cikis_Adi").select2({ width: '100%' });
    $("#Zimmet_Alan_Per_Kod").select2({ width: '100%' });
    $("#Zimmet_Alan_Per_Adi").select2({ width: '100%' });
    $("#Zimmet_Veren_Per_Kod").select2({ width: '100%' });
    $("#Zimmet_Veren_Per_Adi").select2({ width: '100%' });
    $("#Proje_Kod").select2({ width: '100%' });
    $("#Proje_Adi").select2({ width: '100%' });
    $("#Sor_Mer_Kod").select2({ width: '100%' });
    $("#Sor_Mer_Adi").select2({ width: '100%' });
    $("#Demirbas_Kod").select2({ width: '100%' });
    $("#Demirbas_Ad").select2({ width: '100%' });
    $("#Durum_Kodu").select2({ width: '100%' });
    $("#Durum_Adi").select2({ width: '100%' });
    $("#Durum").select2({ width: '100%' });
};
function Kaydet() {
    var fileData = new FormData();
    var sorun = 0;
    var Zimmet_Yeri_Giris_Kod = document.getElementById("Zimmet_Yeri_Giris_Adi").value;
    var Zimmet_Yeri_Cikis_Kod = document.getElementById("Zimmet_Yeri_Cikis_Adi").value;
    var Zimmet_Alan_Per_Kod = document.getElementById("Zimmet_Alan_Per_Adi").value;
    var Zimmet_Veren_Per_Kod = document.getElementById("Zimmet_Veren_Per_Adi").value;
    var Proje_Kod = document.getElementById("Proje_Adi").value;
    var Sor_Mer_Kod = document.getElementById("Sor_Mer_Adi").value;
    var Zimmet_Aciklama = document.getElementById("Zimmet_Aciklama").value;
    if (Zimmet_Yeri_Giris_Kod == "") {
        HataYazdir('Bir Zimmet Yeri Giriş Seçiniz!');
        sorun++;
    }
    else if (Zimmet_Alan_Per_Kod == "") {
        HataYazdir('Bir Zimmet Alan Personel Seçiniz!');
        sorun++;
    }
    else if (list.length == 0) {
        HataYazdir('Bir Zimmet Hareketi Detayı Ekleyiniz!');
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

        var Zimmet_Stok_Ekle_Listesi = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Zimmet_Stok_Ekle_Listesi.push({
                    Demirbas_Kod: list[i].Demirbas_Kod,
                    Demirbas_Ad: list[i].Demirbas_Ad,
                    Stok_Aciklama: list[i].Stok_Aciklama,
                    Miktar: list[i].Miktar,
                    Durum: list[i].Durum_Kodu
                })
            }
        }
        var Zimmet_Ekle = {
            Zimmet_Yeri_Giris_Kod: Zimmet_Yeri_Giris_Kod,
            Zimmet_Yeri_Cikis_Kod: Zimmet_Yeri_Cikis_Kod,
            Zimmet_Alan_Per_Kod: Zimmet_Alan_Per_Kod,
            Zimmet_Veren_Per_Kod: Zimmet_Veren_Per_Kod,
            Proje_Kod: Proje_Kod,
            Sor_Mer_Kod: Sor_Mer_Kod,
            Zimmet_Aciklama: Zimmet_Aciklama,
            Zimmet_Stok_Ekle_Listesi: Zimmet_Stok_Ekle_Listesi
        };
        //Dinamik Alanları aşağıdaki kodlar ile listeleyebilirsiniz.
        //var values = {};
        //$.each($('#talepform').serializeArray(), function (i, field) {
        //    values[field.name] = field.value;
        //    if (field.value == "" || field.value == null) {
        //        HataYazdir(field.name + " alanı boş geçilemez");
        //    }
        //});
        var valdata = $("#zimmetform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/ZimmetHareketi/YeniZimmetOlustur',
            data: JSON.stringify(Zimmet_Ekle),
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
                            url: '/ZimmetHareketi/YeniZimmetOlusturUser',
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
                                            dataType: "json",
                                            type: 'POST',
                                            url: '/ZimmetHareketi/YeniZimmetOlusturFile',
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
                            url: '/ZimmetHareketi/YeniZimmetOlusturFile',
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
function Zimmet_Yeri_Giris_Kod_OnChange() {
    var tip = document.getElementById("Zimmet_Yeri_Giris_Kod").value;
    var Id = $("#Zimmet_Yeri_Giris_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Yeri_Giris_Adi").html(s);
}
function Zimmet_Yeri_Giris_Adi_OnChange() {
    var tip = document.getElementById("Zimmet_Yeri_Giris_Adi").value;
    var Id = $("#Zimmet_Yeri_Giris_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Yeri_Giris_Kod").html(s);
}
function Zimmet_Yeri_Cikis_Kod_OnChange() {
    var tip = document.getElementById("Zimmet_Yeri_Cikis_Kod").value;
    var Id = $("#Zimmet_Yeri_Cikis_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Yeri_Cikis_Adi").html(s);
}
function Zimmet_Yeri_Cikis_Adi_OnChange() {
    var tip = document.getElementById("Zimmet_Yeri_Cikis_Adi").value;
    var Id = $("#Zimmet_Yeri_Cikis_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Yeri_Cikis_Kod").html(s);
}
function Zimmet_Alan_Per_Kod_OnChange() {
    var tip = document.getElementById("Zimmet_Alan_Per_Kod").value;
    var Id = $("#Zimmet_Alan_Per_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Alan_Per_Adi").html(s);
}
function Zimmet_Alan_Per_Adi_OnChange() {
    var tip = document.getElementById("Zimmet_Alan_Per_Adi").value;
    var Id = $("#Zimmet_Alan_Per_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Alan_Per_Kod").html(s);
}
function Zimmet_Veren_Per_Kod_OnChange() {
    var tip = document.getElementById("Zimmet_Veren_Per_Kod").value;
    var Id = $("#Zimmet_Veren_Per_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Veren_Per_Adi").html(s);
}
function Zimmet_Veren_Per_Adi_OnChange() {
    var tip = document.getElementById("Zimmet_Veren_Per_Adi").value;
    var Id = $("#Zimmet_Veren_Per_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Zimmet_Veren_Per_Kod").html(s);
}
function Proje_Kod_OnChange() {
    var tip = document.getElementById("Proje_Kod").value;
    var Id = $("#Proje_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Proje_Adi").html(s);
}
function Proje_Adi_OnChange() {
    var tip = document.getElementById("Proje_Adi").value;
    var Id = $("#Proje_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Proje_Kod").html(s);
}
function Sor_Mer_Kod_OnChange() {
    var tip = document.getElementById("Sor_Mer_Kod").value;
    var Id = $("#Sor_Mer_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sor_Mer_Adi").html(s);
}
function Sor_Mer_Adi_OnChange() {
    var tip = document.getElementById("Sor_Mer_Adi").value;
    var Id = $("#Sor_Mer_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sor_Mer_Kod").html(s);
}
function Demirbas_Kod_OnChange() {
    var tip = document.getElementById("Demirbas_Kod").value;
    var Id = $("#Demirbas_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Demirbas_Ad").html(s);
}
function Demirbas_Ad_OnChange() {
    var tip = document.getElementById("Demirbas_Ad").value;
    var Id = $("#Demirbas_Ad option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Demirbas_Kod").html(s);
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
function tabloolustur() {
    var sayac = (list.length) + 1;
    var Demirbas_Kod = document.getElementById("Demirbas_Ad").value;
    var Demirbas_Ad = document.getElementById("Demirbas_Kod").value;
    var Durum_Kodu = document.getElementById("Durum_Kodu").value;
    var Durum_Adi = $("#Durum_Kodu option:selected").text();
    var Miktar = document.getElementById("Miktar").value;
    var Stok_Aciklama = document.getElementById("Stok_Aciklama").value;
    if (Durum_Kodu == "") {
        HataYazdir('Bir Durum Seçiniz!');
    }
    else if (Demirbas_Kod == "") {
        HataYazdir('Bir Demirbaş Seçiniz!');
    }
    else if (Miktar == "" || Miktar == "0" || Miktar == null || parseInt(Miktar) <= 0) {
        HataYazdir('Miktar Belirleyiniz!');
    }
    else {
        list.push({
            sayac: sayac,
            Demirbas_Kod: Demirbas_Kod,
            Demirbas_Ad: Demirbas_Ad,
            Durum_Kodu: Durum_Kodu,
            Durum_Adi: Durum_Adi,
            Miktar: Miktar,
            Stok_Aciklama: Stok_Aciklama
        });
        document.getElementById("Stok_Aciklama").value = '';
        document.getElementById("Miktar").value = null;
      
    }
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (list.length != 0) {
        html += '<thead><tr><th>Durum</th><th>Demirbaş Kodu</th><th>Demirbaş Adı</th><th>Miktarı</th><th>Açıklama</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].Durum_Adi + '</td> ';
                html += '<td>' + list[i].Demirbas_Kod + '</td>';
                html += '<td>' + list[i].Demirbas_Ad + '</td>';
                html += '<td>' + list[i].Miktar + '</td>';
                html += '<td>' + list[i].Stok_Aciklama + '</td>';
                html += '<td><a onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#zimmetTable').html(html);
    }
    else {
        $('#zimmetTable').html(html);
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
function Duzenle() {
    var sorun = 0;

    var Demirbas_Kod = document.getElementById("Demirbas_Ad").value;
    var Demirbas_Ad = document.getElementById("Demirbas_Kod").value;
    var Stok_Aciklama = document.getElementById("Stok_Aciklama").value;
    var Miktar = document.getElementById("Miktar").value;
    var Durum = document.getElementById("Durum").value;
    var Zimmet_Yeri_Giris_Adi = document.getElementById("Zimmet_Yeri_Giris_Kod").value;
    var Zimmet_Yeri_Giris_Kod = document.getElementById("Zimmet_Yeri_Giris_Adi").value;
    var Zimmet_Yeri_Cikis_Kod = document.getElementById("Zimmet_Yeri_Cikis_Adi").value;
    var Zimmet_Yeri_Cikis_Adi = document.getElementById("Zimmet_Yeri_Cikis_Kod").value;
    var Zimmet_Alan_Per_Kod = document.getElementById("Zimmet_Alan_Per_Adi").value;
    var Zimmet_Alan_Per_Adi = document.getElementById("Zimmet_Alan_Per_Kod").value;
    var Zimmet_Veren_Per_Kod = document.getElementById("Zimmet_Veren_Per_Adi").value;
    var Zimmet_Veren_Per_Adi = document.getElementById("Zimmet_Veren_Per_Kod").value;
    var Proje_Kod = document.getElementById("Proje_Adi").value;
    var Proje_Adi = document.getElementById("Proje_Kod").value;
    var Sor_Mer_Kod = document.getElementById("Sor_Mer_Adi").value;
    var Sor_Mer_Adi = document.getElementById("Sor_Mer_Kod").value;
    var Zimmet_Aciklama = document.getElementById("Zimmet_Aciklama").value;
    var Guid = document.getElementById("Guid").value;
    var Zimmetten_Dusme_Tarihi = document.getElementById("Zimmetten_Dusme_Tarihi").value;

    if (Zimmet_Yeri_Giris_Kod == "") {
        HataYazdir('Bir Zimmet Yeri Giriş Seçiniz!');
        sorun++;
    }
    else if (Zimmet_Alan_Per_Kod == "") {
        HataYazdir('Bir Zimmet Alan Personel Seçiniz!');
        sorun++;
    }
    else if (Demirbas_Kod == "") {
        HataYazdir('Bir Demirbaş Seçiniz!');
        sorun++;
    }
    else if (Durum < 0 || Durum > 1) {
        HataYazdir('Bir Durum Seçiniz!');
        sorun++;
    }
    else if (Miktar == null || Miktar == 0 || Miktar == "" || Miktar < 0) {
        HataYazdir('Bir Miktar Belirleyiniz!');
        sorun++;
    }

    if (sorun == 0) {

        var Zimmet_Duzenle = {
            Zimmet_Yeri_Giris_Kod: Zimmet_Yeri_Giris_Kod,
            Zimmet_Yeri_Giris_Adi: Zimmet_Yeri_Giris_Adi,
            Zimmet_Yeri_Cikis_Kod: Zimmet_Yeri_Cikis_Kod,
            Zimmet_Yeri_Cikis_Adi: Zimmet_Yeri_Cikis_Adi,
            Zimmet_Alan_Per_Kod: Zimmet_Alan_Per_Kod,
            Zimmet_Alan_Per_Adi: Zimmet_Alan_Per_Adi,
            Zimmet_Veren_Per_Kod: Zimmet_Veren_Per_Kod,
            Zimmet_Veren_Per_Adi: Zimmet_Veren_Per_Adi,
            Proje_Kod: Proje_Kod,
            Proje_Adi: Proje_Adi,
            Sor_Mer_Kod: Sor_Mer_Kod,
            Sor_Mer_Adi: Sor_Mer_Adi,
            Zimmet_Aciklama: Zimmet_Aciklama,
            Demirbas_Kod: Demirbas_Kod,
            Demirbas_Ad: Demirbas_Ad,
            Stok_Aciklama: Stok_Aciklama,
            Miktar: Miktar,
            Durum: Durum,
            Zimmetten_Dusme_Tarihi: Zimmetten_Dusme_Tarihi,
            Guid: Guid
        };
        console.log(Zimmet_Duzenle);
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/ZimmetHareketi/ZimmetDuzenleme',
            data: JSON.stringify(Zimmet_Duzenle),
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