var list = [];
window.onload = function () {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#Teslim_Tarihi').val(today);

    $('.js-example-basic-single').select2();
    $("#Musteri_Adi").select2({ width: '100%' });
    $("#Proje_Adi").select2({ width: '100%' });
    $("#Sor_Mer_Adi").select2({ width: '100%' });
    $("#Odm_Plan_Adi").select2({ width: '100%' });
    $("#Depo_Adi").select2({ width: '100%' });
    $("#Musteri_Kodu").select2({ width: '100%' });
    $("#Proje_Kodu").select2({ width: '100%' });
    $("#Sor_Mer_Kodu").select2({ width: '100%' });
    $("#Odm_Plan_Kodu").select2({ width: '100%' });
    $("#Depo_Kodu").select2({ width: '100%' });
    
    $("#Hareket_Tipi_Kodu").select2({ width: '100%' });
    $("#Stok_Kod").select2({ width: '100%' });
    $("#Stok_Adi").select2({ width: '100%' });
};
function Kaydet() {
    var fileData = new FormData();
    var sorun = 0;
    var Musteri_Kodu = document.getElementById("Musteri_Adi").value;
    var Proje_Kodu = document.getElementById("Proje_Adi").value;
    var Sor_Mer_Kodu = document.getElementById("Sor_Mer_Adi").value;
    var Odm_Plan_Kodu = document.getElementById("Odm_Plan_Adi").value;
    var Depo_Kodu = document.getElementById("Depo_Adi").value;
    if (Musteri_Kodu == "") {
        HataYazdir('Bir Müşteri Seçiniz!');
        sorun++;
    }
    else if (Proje_Kodu == "") {
        HataYazdir('Bir Proje Seçiniz!');
        sorun++;
    }
    else if (Sor_Mer_Kodu == "") {
        HataYazdir('Bir Sorumluluk Merkezi  Seçiniz!');
        sorun++;
    }
    else if (Odm_Plan_Kodu == "") {
        HataYazdir('Bir Ödeme Planı Seçiniz!');
        sorun++;
    }
    else if (Depo_Kodu == "") {
        HataYazdir('Bir Depo Seçiniz!');
        sorun++;
    }
    else if (list.length == 0) {
        HataYazdir('Bir Sipariş Detayı Ekleyiniz!');
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

        var Proforma_Siparis_Stok_Ekle = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Proforma_Siparis_Stok_Ekle.push({
                    Har_Kod: list[i].Hareket_Tipi_Kodu,
                    Stok_Kod: list[i].Stok_Kod,
                    Miktar: list[i].Miktar,
                    Birim_Fiyat: list[i].Birim_Fiyat,
                    Aciklama1: list[i].Aciklama1,
                    Aciklama2: list[i].Aciklama2,
                    Teslim_Tarihi: list[i].Teslim_Tarihi
                })
            }
        }
        var Siparis_Ekle = {
            Musteri_Kodu: Musteri_Kodu,
            Proje_Kodu: Proje_Kodu,
            Sor_Mer_Kodu: Sor_Mer_Kodu,
            Odm_Plan_Kodu: Odm_Plan_Kodu,
            Depo_Kodu: Depo_Kodu,
            Proforma_Siparis_Stok_Ekle_Listesi: Proforma_Siparis_Stok_Ekle
        };

        //Dinamik Alanları aşağıdaki kodlar ile listeleyebilirsiniz.
        //var values = {};
        //$.each($('#talepform').serializeArray(), function (i, field) {
        //    values[field.name] = field.value;
        //    if (field.value == "" || field.value == null) {
        //        HataYazdir(field.name + " alanı boş geçilemez");
        //    }
        //});
        var valdata = $("#siparisform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Siparis/YeniVerilenSiparisOlustur',
            data: JSON.stringify(Siparis_Ekle),
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
                            url: '/Siparis/YeniVerilenSiparisOlusturUser',
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
                                            url: '/Siparis/YeniVerilenSiparisOlusturFile',
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
                            url: '/Siparis/YeniVerilenSiparisOlusturFile',
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
function Musteri_Kodu_OnChange() {
    var tip = document.getElementById("Musteri_Kodu").value;
    var Id = $("#Musteri_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Musteri_Adi").html(s);
}
function Musteri_Adi_OnChange() {
    var tip = document.getElementById("Musteri_Adi").value;
    var Id = $("#Musteri_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Musteri_Kodu").html(s);
}
function Proje_Kodu_OnChange() {
    var tip = document.getElementById("Proje_Kodu").value;
    var Id = $("#Proje_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Proje_Adi").html(s);
}
function Proje_Adi_OnChange() {
    var tip = document.getElementById("Proje_Adi").value;
    var Id = $("#Proje_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Proje_Kodu").html(s);
}
function Sor_Mer_Kodu_OnChange() {
    var tip = document.getElementById("Sor_Mer_Kodu").value;
    var Id = $("#Sor_Mer_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sor_Mer_Adi").html(s);
}
function Sor_Mer_Adi_OnChange() {
    var tip = document.getElementById("Sor_Mer_Adi").value;
    var Id = $("#Sor_Mer_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Sor_Mer_Kodu").html(s);
}
function Odm_Plan_Kodu_OnChange() {
    var tip = document.getElementById("Odm_Plan_Kodu").value;
    var Id = $("#Odm_Plan_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Odm_Plan_Adi").html(s);
}
function Odm_Plan_Adi_OnChange() {
    var tip = document.getElementById("Odm_Plan_Adi").value;
    var Id = $("#Odm_Plan_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Odm_Plan_Kodu").html(s);
}
function Depo_Kodu_OnChange() {
    var tip = document.getElementById("Depo_Kodu").value;
    var Id = $("#Depo_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Depo_Adi").html(s);
}
function Depo_Adi_OnChange() {
    var tip = document.getElementById("Depo_Adi").value;
    var Id = $("#Depo_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Depo_Kodu").html(s);
}
function Hareket_Tipi_Kodu_OnChange() {
    var tip = document.getElementById("Hareket_Tipi_Kodu").value;
    if (tip == "0" || tip == "1" || tip == "2" || tip == "3") {
        $.ajax({
            type: "GET",
            url: "/Siparis/getirStokKoduCinsineGore?tip=" + tip,
            data: "{}",
            success: function (data) {
                $("#Stok_Kod").html('');
                var s = '<option value="0">Lütfen Adı Seçin</option>';
                var s2 = '<option value="0">Lütfen Kodu Seçin</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                    s2 += '<option value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
                }
                $("#Stok_Adi").html(s);
                $("#Stok_Kod").html(s2);
            }
        });
    }
    else {
        var s = '<option value="0"></option>';
        var s2 = '<option value="0"></option>';
        $("#Stok_Adi").html(s);
        $("#Stok_Kod").html(s2);
    }
}
function Stok_Kod_OnChange() {
    var tip = document.getElementById("Stok_Kod").value;
    var Id = $("#Stok_Kod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Stok_Adi").html(s);
}
function Stok_Adi_OnChange() {
    var tip = document.getElementById("Stok_Adi").value;
    var Id = $("#Stok_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Stok_Kod").html(s);
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
function tabloolustur() {
    var sayac = (list.length) + 1;
    var Hareket_Tipi_Kodu = document.getElementById("Hareket_Tipi_Kodu").value;
    var Hareket_Tipi_Adi = $("#Hareket_Tipi_Kodu option:selected").text();
    var Stok_Kod = document.getElementById("Stok_Adi").value;
    var Stok_Adi = document.getElementById("Stok_Kod").value;
    var Miktar = document.getElementById("Miktar").value;
    var Birim_Fiyat = document.getElementById("Birim_Fiyat").value;
    var Aciklama1 = document.getElementById("Aciklama1").value;
    var Aciklama2 = document.getElementById("Aciklama2").value;
    var Teslim_Tarihi = document.getElementById("Teslim_Tarihi").value;

    if (Hareket_Tipi_Kodu == "-1") {
        HataYazdir('Bir Hareket Tipi Seçiniz!');
    }
    else if (Stok_Kod == "0") {
        HataYazdir('Bir Kodu Seçiniz!');
    }
    else if (Birim_Fiyat == "") {
        HataYazdir('Birim Fiyatı Belirleyiniz!');
    }
    else if (Hareket_Tipi_Kodu == "0" && Miktar == "") {
        HataYazdir('Bir Miktar Belirleyiniz!');
    }
    else if (Teslim_Tarihi == "") {
        HataYazdir('Bir Tarih Belirleyiniz!');
    }
    else {
        list.push({
            sayac: sayac,
            Hareket_Tipi_Kodu: Hareket_Tipi_Kodu,
            Hareket_Tipi_Adi: Hareket_Tipi_Adi,
            Stok_Kod: Stok_Kod,
            Stok_Adi: Stok_Adi,
            Miktar: Miktar,
            Birim_Fiyat: Birim_Fiyat,
            Aciklama1: Aciklama1,
            Aciklama2: Aciklama2,
            Teslim_Tarihi: Teslim_Tarihi
        });
        document.getElementById("Aciklama1").value = '';
        document.getElementById("Aciklama2").value = '';
        document.getElementById("Miktar").value = null;
        document.getElementById("Birim_Fiyat").value = null;
        Swal.fire({
            title: 'Stok Detayları',
            text: 'Stok Detayının Tabloya Eklenmesi Başarılı',
            icon: 'success',
            timer: 3000,
            buttons: false,
        });
    }
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (list.length != 0) {
        html += '<thead><tr><th>Cinsi</th><th>Kodu</th><th>Adı</th><th>Miktarı</th><th>Birim Fiyatı</th><th>Açıklama 1</th><th>Açıklama 2</th><th>Teslim Tarihi</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].Hareket_Tipi_Adi + '</td> ';
                html += '<td>' + list[i].Stok_Kod + '</td>';
                html += '<td>' + list[i].Stok_Adi + '</td>';
                html += '<td>' + list[i].Miktar + '</td>';
                html += '<td>' + list[i].Birim_Fiyat + '</td>';
                html += '<td>' + list[i].Aciklama1 + '</td> ';
                html += '<td>' + list[i].Aciklama2 + '</td>';
                html += '<td>' + list[i].Teslim_Tarihi.substring(0, 10) + '</td>';
                html += '<td><a onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#siparisTable').html(html);
    }
    else {
        $('#siparisTable').html(html);
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