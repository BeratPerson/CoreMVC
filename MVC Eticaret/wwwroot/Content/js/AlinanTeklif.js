var list = [];
window.onload = function () {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    var dd = now.getDate();
    var mm = now.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = now.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("Teslim_Tarihi").setAttribute("min", today);
    $('#Teslim_Tarihi').val(today);
    $('.js-example-basic-single').select2();
    $("#teklif_Kodu").select2({ width: '100%' });
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
    var teklif_kodu = document.getElementById("teklif_kodu").value;
    var chtipi = $("#chtipi option:selected").val();
    var ch_kod = document.getElementById("ch_kod").value;
    var ch_isim = document.getElementById("ch_isim").value;
    var Teslim_Tarihi = document.getElementById("Teslim_Tarihi").value;
    var odeme_plani = document.getElementById("odeme_plani").value;
    var sorumlu = document.getElementById("sorumlu").value;
    var proje_kodu = document.getElementById("proje_kodu").value;
    var som_merkezi = document.getElementById("som_merkezi").value;

    if (teklif_kodu == "") {
        HataYazdir('Lütfen Teklif Kodu Seçiniz!', 'error');
        sorun++;
    }
    else if (chtipi == "") {
        HataYazdir('Lütfen Cari Tipini Seçiniz!', 'error');
        sorun++;
    }
    else if (ch_kod == "" || ch_kod == "0") {
        HataYazdir('Lütfen Cari Kodu Seçiniz!', 'error');
        sorun++;
    }
    else if (Teslim_Tarihi == "") {
        HataYazdir('Lütfen Teslim Tarihi Seçiniz!', 'error');
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

    if ($("#fileInput").get(0) != null && $("#fileInput").get(0) != "") {
        var files = $("#fileInput").get(0).files;
        
    }

    //if ($("#fileInput").get(0) != null) {
    //    var files = $("#fileInput").get(0).files;
    //    if (files.length == 0) {
    //        HataYazdir("Bir Dosya Seçiniz!");
    //        sorun++;
    //    }
    //}

    if (sorun == 0) {
        /*liste içerisindeki veriler teklif formuna tekrar aktarılıyor*/
        var Teklif_Formu = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Teklif_Formu.push({
                    Hareket_Tipi_Kodu: list[i].Hareket_Tipi_Kodu,
                    Hareket_Tipi_Adi: list[i].Hareket_Tipi_Adi,
                    Stok_Kod: list[i].Stok_Kod,
                    Stok_Adi: list[i].Stok_Adi,
                    Miktar: list[i].Miktar,
                    Birim_Fiyat: list[i].Birim_Fiyat,
                    aciklama: list[i].aciklama,
                    Sto_Proje: list[i].Sto_Proje,
                    Sto_Sorumluluk_Merkezi: list[i].Sto_Sorumluluk_Merkezi,
                })
            }
        }
        var Teklif_Formu_Ekle = {
            teklif_kodu: teklif_kodu,
            chtipi: chtipi,
            ch_kod: ch_isim,
            ch_isim: ch_kod,
            Teslim_Tarihi: Teslim_Tarihi,
            Odm_Plan_Adi: odeme_plani,
            sorumlu: sorumlu,
            proje_kodu: proje_kodu,
            som_merkezi: som_merkezi,
            Teklif_Formu
        };
        if (list.length <= 0) {
            HataYazdir("Lütfen Sok Ekleyiniz", 'error');
            return;
        }

        var valdata = $("#AlinanTeklifUser").serialize();

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Teklif/Insert',
            data: JSON.stringify(Teklif_Formu_Ekle),
            success: function (data) {
                if (data.status == "True") {
                    if (valdata != null && valdata != "") {
                        $.ajax({
                            contentType: 'application/x-www-form-urlencoded;; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: '/Teklif/AlinanTeklifUser',
                            data: valdata + "&Record_uid=" + data.guid,
                            success: function (data) {
                                if (data == false) {
                                    HataYazdir('User Data Eklenirken Hata Oluştu ! Lütfen Daha Sonra Tekrar Deneyiniz', 'error')
                                }
                                if (data == true) {
                                    if ($("#fileInput").get(0) != null && $("#fileInput").get(0) != "" && $("#fileInput").get(0).files.length > 0) {
                                        var files = $("#fileInput").get(0).files;

                                        for (var i = 0; i < files.length; i++) {
                                            fileData.append("fileInput", files[i]);
                                        }
                                        $.ajax({
                                            processData: false,
                                            contentType: false,
                                            dataType: "json",
                                            type: 'POST',
                                            url: '/Teklif/AlinanTeklifFile',
                                            data: fileData,
                                            success: function (data) {
                                                if (data == false) {
                                                    HataYazdir('Dosya Yüklenirken Hata Oluştu ! Lütfen Daha Sonra Tekrar Deneyiniz', 'error')

                                                }
                                                else if (data == true) {

                                                    HataYazdir('Kayıt Başarılı Anasayfaya Yönlendiriliyorsunuz', 'success')

                                                    var timer = setTimeout(function () {
                                                        window.location = '/Teklif/'
                                                    }, 3000);
                                                   
                                                }
                                            },
                                            error: function (xhr, status, error) {

                                            }
                                        });
                                    }
                                    else {
                                        window.location = '/Teklif/'
                                    }
                                }

                            },
                            error: function (xhr, status, error) {

                            }

                        });

                    }


                    else if ($("#fileInput").get(0) != null && $("#fileInput").get(0) != "" && $("#fileInput").get(0).files.length > 0 ) {
                            var files = $("#fileInput").get(0).files;

                            for (var i = 0; i < files.length; i++) {
                                fileData.append("fileInput", files[i]);
                            }
                            $.ajax({
                                processData: false,
                                contentType: false,
                                dataType: "json",
                                type: 'POST',
                                url: '/Teklif/AlinanTeklifFile',
                                data: fileData,
                                success: function (data) {
                                    if (data == false) {
                                        HataYazdir('Dosya Yüklenirken Hata Oluştu ! Lütfen Daha Sonra Tekrar Deneyiniz', 'error')

                                    }
                                    else if (data == true) {

                                        window.location = '/Teklif/'
                                    }
                                },
                                error: function (xhr, status, error) {

                                }
                            });

                    }
                }


                else {
                    HataYazdir("Kayıt Esnasında Bir Hata Oluştu Lütfen Tekrar Deneyiniz", 'error');
                }
            }

        });
    }
}

function chtipi_change() {
    $.ajax({
        type: "GET",
        url: "/Teklif/GetDataCari?id=" + document.getElementById("chtipi").value,
        data: "{}",
        success: function (data) {
            var s = '<option value="0">Lütfen Cari Adını Seçin</option>';
            var s2 = '<option value="0">Lütfen Cari Kodunu Seçin</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Id + '-' + data[i].Adi + '</option>';
                s2 += '<option value="' + data[i].Adi + '">' + data[i].Id + '</option>';
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
        url: "/Teklif/GetDataStok?tip=" + document.getElementById("cins").value,
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



function tabloolustur() {
    var sayac = (list.length) + 1;
    var Hareket_Tipi_Kodu = document.getElementById("cins").value;
    var Hareket_Tipi_Adi = $("#cins option:selected").text();
    var Stok_Kod = document.getElementById("Sto_Isim").value;
    var Stok_Adi = document.getElementById("Sto_kodu").value;
    var Miktar = document.getElementById("Miktar").value;
    var Birim_Fiyat = document.getElementById("Birim_Fiyat").value;
    var aciklama = document.getElementById("aciklama").value;
    var Sto_Proje = document.getElementById("Sto_Proje").value;
    var Sto_Sorumluluk_Merkezi = document.getElementById("Sto_Sorumluluk_Merkezi").value;
    var Miktar = document.getElementById("Miktar").value;
    //var Aciklama2 = document.getElementById("Aciklama2").value;
    //var Teslim_Tarihi = document.getElementById("Teslim_Tarihi").value;

    if (Hareket_Tipi_Kodu == "-1") {
        HataYazdir('Lütfen Cinsi Seçiniz!','error');
    }
    else if (Stok_Kod == "0") {
        HataYazdir('Lütfen Kodu Seçiniz!', 'error');
    }
    else if (Sto_Proje == "" || Sto_Proje == null) {
        HataYazdir('Lütfen Proje Seçiniz!', 'error');
    }
    else if (Sto_Sorumluluk_Merkezi == "" || Sto_Sorumluluk_Merkezi == null) {
        HataYazdir('Lütfen Sorumluluk Merkezi Seçiniz!', 'error');
    }

    else if (Miktar == "" || Miktar == null || Miktar == "0") {
        HataYazdir('Lütfen Miktar Giriniz!', 'error');
    }
    else if (Birim_Fiyat == "" || Birim_Fiyat == null || Birim_Fiyat == "0") {
        HataYazdir('Lütfen Birim Fiyatı Belirleyiniz!', 'error');
    }
    else if (Hareket_Tipi_Kodu == "0" && Miktar == "") {
        HataYazdir('Lütfen Bir Miktar Belirleyiniz!', 'error');
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
            aciklama: aciklama,
            Sto_Proje: Sto_Proje,
            Sto_Sorumluluk_Merkezi: Sto_Sorumluluk_Merkezi
        });
    }
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (list.length != 0) {
        html += '<thead><tr><th>Cinsi</th><th>Kodu</th><th>Adı</th><th>Miktarı</th><th>Birim Fiyatı</th><th>Açıklama </th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].Hareket_Tipi_Adi + '</td> ';
                html += '<td>' + list[i].Stok_Kod + '</td>';
                html += '<td>' + list[i].Stok_Adi + '</td>';
                html += '<td>' + list[i].Miktar + '</td>';
                html += '<td>' + list[i].Birim_Fiyat + '</td>';
                html += '<td>' + list[i].aciklama + '</td> ';
                html += '<td><a class="btn btn-danger" onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#TeklifTable').html(html);
    }
    else {
        $('#TeklifTable').html(html);
    }
}
function HataYazdir(mesaj, icon) {
    Swal.fire({
        title: mesaj,
        icon: icon,
        showCancelButton: false,
        confirmButtonText: 'Tamam',


    });
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
