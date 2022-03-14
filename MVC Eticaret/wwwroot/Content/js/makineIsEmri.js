function Kaydet() {
    var sorun = 0;
    var makineKod = document.getElementById("Makinalar_Kodu").value;
    var makineAdi = document.getElementById("Makinalar_Ismi").value;
    var makineSorunKod = document.getElementById("Makina_Sorunlari_Kodu").value;
    var makineSorunAdi = document.getElementById("Makina_Sorunlari_Ismi").value;
    var PerBasKod = document.getElementById("Cari_Persomel_Tanimlari_Baslangic_Kodu").value;
    var PerBasAdi = document.getElementById("Cari_Persomel_Tanimlari_Baslangic_Ismi").value;
    var PerBasTarih = document.getElementById("Is_Emri_Baslangic_Tarihi").value;
    var PerBitTarih = document.getElementById("Is_Emri_Bitis_Tarihi").value;
    var makineAciklama = document.getElementById("Makina_Aciklama").value;
    var PerBitKod = document.getElementById("Cari_Persomel_Tanimlari_Bitis_Kodu").value;
    var PerBitAdi = document.getElementById("Cari_Persomel_Tanimlari_Bitis_Ismi").value;
    var Aciklama1 = document.getElementById("Aciklama1").value;
    var Aciklama2 = document.getElementById("Aciklama2").value;
    var Aciklama3 = document.getElementById("Aciklama3").value;

    if (makineAdi == "") {
        HataYazdir('Bir Makine Seçiniz!');
        sorun++;
    }
    else if (makineSorunAdi == "") {
        HataYazdir('Bir Makine Sorunu Seçiniz!');
        sorun++;
    }
    else if (PerBasAdi == "") {
        HataYazdir('Bir İş Emri Açan Personel Seçiniz!');
        sorun++;
    }
    else if (PerBasTarih == "") {
        HataYazdir('Bir İş Emri Açma Tarihi Seçiniz!');
        sorun++;
    }
    if (PerBitTarih != "" && PerBitAdi == "") {
        HataYazdir('Bir İş Emri Kapatan Personel Seçiniz!');
        sorun++;
    }
    if (PerBitTarih == "" && PerBitAdi != "") {
        HataYazdir('Bir İş Emri Kapatma Tarihi Seçiniz!');
        sorun++;
    }
    if (sorun == 0) {

        var Makine_Is_Emri_Ekle = {
            Makinalar_Kodu: makineKod,
            Makinalar_Ismi: makineAdi,
            Makina_Sorunlari_Kodu: makineSorunKod,
            Makina_Sorunlari_Ismi: makineSorunAdi,
            Cari_Persomel_Tanimlari_Baslangic_Kodu: PerBasKod,
            Cari_Persomel_Tanimlari_Baslangic_Ismi: PerBasAdi,
            Cari_Persomel_Tanimlari_Bitis_Kodu: PerBitKod,
            Cari_Persomel_Tanimlari_Bitis_Ismi: PerBitAdi,
            Makina_Aciklama: makineAciklama,
            Is_Emri_Baslangic_Tarihi: PerBasTarih,
            Is_Emri_Bitis_Tarihi: PerBitTarih,
            MakineAciklama1: Aciklama1,
            MakineAciklama2: Aciklama2,
            MakineAciklama3: Aciklama3
        };
        var valdata = $("#makineIsEmriform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/MakineIsEmri/YeniMakineIsEmriOlustur',
            data: JSON.stringify(Makine_Is_Emri_Ekle),
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
                            url: '/MakineIsEmri/YeniMakineIsEmriOlusturUser',
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
function makina_Is_Emri_Kod_OnChange() {
    var tip = document.getElementById("Makina_Is_Emri_Kodu").value;
    var Id = $("#Makina_Is_Emri_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makina_Is_Emri_Adi").html(s);
}
function makina_Is_Emri_Isim_OnChange() {
    var tip = document.getElementById("Makina_Is_Emri_Adi").value;
    var Id = $("#Makina_Is_Emri_Adi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makina_Is_Emri_Kodu").html(s);
}
function makinalar_Kod_OnChange() {
    var tip = document.getElementById("Makinalar_Kodu").value;
    var Id = $("#Makinalar_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makinalar_Ismi").html(s);
}
function makinalar_Isim_OnChange() {
    var tip = document.getElementById("Makinalar_Ismi").value;
    var Id = $("#Makinalar_Ismi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makinalar_Kodu").html(s);
}
function makina_Sorunlari_Kod_OnChange() {
    var tip = document.getElementById("Makina_Sorunlari_Kodu").value;
    var Id = $("#Makina_Sorunlari_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makina_Sorunlari_Ismi").html(s);
}
function makina_Sorunlari_Ismi_OnChange() {
    var tip = document.getElementById("Makina_Sorunlari_Ismi").value;
    var Id = $("#Makina_Sorunlari_Ismi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Makina_Sorunlari_Kodu").html(s);
}
function Cari_Persomel_Tanimlari_Baslangic_Kodu_OnChange() {
    var tip = document.getElementById("Cari_Persomel_Tanimlari_Baslangic_Kodu").value;
    var Id = $("#Cari_Persomel_Tanimlari_Baslangic_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Cari_Persomel_Tanimlari_Baslangic_Ismi").html(s);
}
function Cari_Persomel_Tanimlari_Baslangic_Ismi_OnChange() {
    var tip = document.getElementById("Cari_Persomel_Tanimlari_Baslangic_Ismi").value;
    var Id = $("#Cari_Persomel_Tanimlari_Baslangic_Ismi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Cari_Persomel_Tanimlari_Baslangic_Kodu").html(s);
}
function Cari_Persomel_Tanimlari_Bitis_Kodu_OnChange() {
    var tip = document.getElementById("Cari_Persomel_Tanimlari_Bitis_Kodu").value;
    var Id = $("#Cari_Persomel_Tanimlari_Bitis_Kodu option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Cari_Persomel_Tanimlari_Bitis_Ismi").html(s);
}
function Cari_Persomel_Tanimlari_Bitis_Ismi_OnChange() {
    var tip = document.getElementById("Cari_Persomel_Tanimlari_Bitis_Ismi").value;
    var Id = $("#Cari_Persomel_Tanimlari_Bitis_Ismi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#Cari_Persomel_Tanimlari_Bitis_Kodu").html(s);
}
function TarihKontrol() {
    var xBitis = document.getElementById("Is_Emri_Bitis_Tarihi").value;
    var xBaslangic = document.getElementById("Is_Emri_Baslangic_Tarihi").value;
    if (xBaslangic != "" && xBitis != "") {
        if (xBaslangic > xBitis) {
            $('#ErrorDate').show();
            $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
            var x = $('#Is_Emri_Baslangic_Tarihi').val();
            $('#Is_Emri_Bitis_Tarihi').val(x);
        }
    }
}
function setGuidKapatma(guid) {
    $('#guid').val(guid);
}
function ClearDate() {
    $('#Is_Emri_Bitis_Tarihi').val('')
    $('#Baslangic').val('')
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