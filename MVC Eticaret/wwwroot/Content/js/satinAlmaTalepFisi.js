var list = [];
window.onload = function () {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('stl_teslim_tarihi').value = now.toISOString().slice(0, -8);
    $('.js-example-basic-single').select2();
    $("#stl_harakettipi").select2({ width: '100%' });
    $("#stl_Stok_adi").select2({ width: '100%' });
    $("#stl_Stok_kodu").select2({ width: '100%' });
    $("#stl_projekodu").select2({ width: '100%' });
    $("#stl_Sor_Merk").select2({ width: '100%' });
};
function Kaydet() {
    var sorun = 0;
    var files = $("#fileInput").get(0).files;
    var stl_projekodu = document.getElementById("stl_projekodu").value;
    var stl_Sor_Merk = document.getElementById("stl_Sor_Merk").value;
    var stl_depo_no = document.getElementById("stl_depo_no").value;
    if (stl_projekodu == "") {
        HataYazdir('Bir Proje Seçiniz!');
        sorun++;
    }
    else if (stl_Sor_Merk == "") {
        HataYazdir('Bir Sorumluluk Merkezi Seçiniz!');
        sorun++;
    }
    else if (stl_depo_no == "") {
        HataYazdir('Bir Depo Seçiniz!');
        sorun++;
    }
    else if (list.length == 0) {
        HataYazdir('Bir Talep Detayı Ekleyiniz!');
        sorun++;
    }
    else if (files.length == 0) {
        HataYazdir("Bir Dosya Seçiniz!");
    }
    if (sorun == 0) {

        var Satin_Alma_Talep_Fisi_Stok_Ekle = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                Satin_Alma_Talep_Fisi_Stok_Ekle.push({
                    Har_Kod: list[i].stl_harekettipi,
                    Stok_Kod: list[i].stl_Stok_kodu,
                    stl_miktari: list[i].stl_miktari,
                    stl_aciklama: list[i].stl_aciklama,
                    stl_aciklama2: list[i].stl_aciklama2,
                    stl_teslim_tarihi: list[i].stl_teslim_tarihi

                })
            }
        }
        var Satin_Alma_Talep_Fisi_Ekle = {
            Pro_Kod: stl_projekodu,
            Som_Kod: stl_Sor_Merk,
            Depo_Kod: stl_depo_no,
            satin_Alma_Talep_Fisi_Stok_Ekle_Listesi: Satin_Alma_Talep_Fisi_Stok_Ekle
        };

        //Dinamik Alanları aşağıdaki kodlar ile listeleyebilirsiniz.
        //var values = {};
        //$.each($('#talepform').serializeArray(), function (i, field) {
        //    values[field.name] = field.value;
        //    if (field.value == "" || field.value == null) {
        //        HataYazdir(field.name + " alanı boş geçilemez");
        //    }
        //});
        var valdata = $("#talepform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Talep/YeniTalepFisiOlustur',
            data: JSON.stringify(Satin_Alma_Talep_Fisi_Ekle),
            success: function (data) {
                if (data.status === 'False') {
                    $('#BasarisizKayit').show();
                    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                }
                else if (data.status === 'True') {
                    $.ajax({
                        contentType: 'application/x-www-form-urlencoded;; charset=utf-8',
                        dataType: 'json',
                        type: 'POST',
                        url: '/Talep/YeniTalepOlusturUser',
                        data: valdata,
                        success: function (data) {
                            if (data.status === 'False') {
                                $('#BasarisizKayit').show();
                                $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
                            }
                            else if (data.status === 'True') {
                                var files = $("#fileInput").get(0).files;
                                var fileData = new FormData();

                                for (var i = 0; i < files.length; i++) {
                                    fileData.append("fileInput", files[i]);
                                }
                                $.ajax({
                                    type: 'POST',
                                    url: '/Talep/YeniTalepOlusturFile',
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
                        }
                    });
                }
            }
        });
    }
}
function stokTipi() {
    var tip = document.getElementById("stl_harekettipi").value;
    $.ajax({
        type: "GET",
        url: "/Talep/getirStokKoduCinsineGore?tip=" + tip,
        data: "{}",
        success: function (data) {
            $("#stl_Stok_kodu").html('');
            var s = '<option value="0">Lütfen Stok Adı Seçin</option>';
            var s2 = '<option value="0">Lütfen Stok Kodu Seçin</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].StokKod + '">' + data[i].StokIsim + '</option>';
                s2 += '<option value="' + data[i].StokIsim + '">' + data[i].StokKod + '</option>';
            }
            $("#stl_Stok_adi").html(s);
            $("#stl_Stok_kodu").html(s2);
        }
    });
}
function stokKodu() {
    var tip = document.getElementById("stl_Stok_kodu").value;
    var Id = $("#stl_Stok_kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#stl_Stok_adi").html(s);
}
function stokAdi() {
    var tip = document.getElementById("stl_Stok_adi").value;
    var Id = $("#stl_Stok_adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#stl_Stok_kodu").html(s);
}
function sil(id) {
    delete list[id - 1]
    htmlDoldur();
}
function tabloolustur() {
    var sayac = (list.length) + 1;
    var stl_harekettipi = document.getElementById("stl_harekettipi").value;
    var stl_harekettipi_adi = $("#stl_harekettipi option:selected").text();
    var stl_Stok_kodu = document.getElementById("stl_Stok_adi").value;
    var stl_Stok_adi = document.getElementById("stl_Stok_kodu").value;
    var stl_miktari = document.getElementById("stl_miktari").value;
    var stl_aciklama = document.getElementById("stl_aciklama").value;
    var stl_aciklama2 = document.getElementById("stl_aciklama2").value;
    var stl_teslim_tarihi = document.getElementById("stl_teslim_tarihi").value;

    if (stl_harekettipi == "-1") {
        HataYazdir('Bir Hareket Tipi Seçiniz!');
    }
    else if (stl_Stok_kodu == "0") {
        HataYazdir('Bir Kodu Seçiniz!');
    }
    else if (stl_harekettipi == "0" && stl_miktari == "") {
        HataYazdir('Bir Miktar Belirleyiniz!');
    }
    else if (stl_teslim_tarihi == "") {
        HataYazdir('Bir Tarih Belirleyiniz!');
    }
    else {
        list.push({
            sayac: sayac,
            stl_harekettipi: stl_harekettipi,
            stl_harekettipi_adi: stl_harekettipi_adi,
            stl_Stok_kodu: stl_Stok_kodu,
            stl_Stok_adi: stl_Stok_adi,
            stl_miktari: stl_miktari,
            stl_aciklama: stl_aciklama,
            stl_aciklama2: stl_aciklama2,
            stl_teslim_tarihi: stl_teslim_tarihi
        });
    }
    htmlDoldur();
}
function htmlDoldur() {
    var html = "";
    if (list.length != 0) {
        html += '<thead><tr><th>Cinsi</th><th>Kodu</th><th>Adı</th><th>Miktarı</th><th>Açıklama 1</th><th>Açıklama 2</th><th>Teslim Tarihi</th><th>işlem</th></tr></thead><tbody>';
        for (var i = 0; i < list.length; i++) {
            if (list[i] != null) {
                html += '<tr>';
                html += '<td>' + list[i].stl_harekettipi_adi + '</td> ';
                html += '<td>' + list[i].stl_Stok_kodu + '</td>';
                html += '<td>' + list[i].stl_Stok_adi + '</td>';
                html += '<td>' + list[i].stl_miktari + '</td>';
                html += '<td>' + list[i].stl_aciklama + '</td> ';
                html += '<td>' + list[i].stl_aciklama2 + '</td>';
                html += '<td>' + list[i].stl_teslim_tarihi.substring(0, 10) + '</td>';
                html += '<td><a onclick="sil(' + list[i].sayac + ')">Sil</a></td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        $('#satinAlmaTalepFisiTable').html(html);
    }
    else {
        $('#satinAlmaTalepFisiTable').html(html);
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