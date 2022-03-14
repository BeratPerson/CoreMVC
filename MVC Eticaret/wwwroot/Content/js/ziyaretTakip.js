window.onload = function () {
    $('#ZiyaretTable').DataTable();

    $("#CarAdi").select2({ width: '100%' });
    $("#CarKod").select2({ width: '100%' });
    $("#AdrAdi").select2({ width: '100%' });
    $("#AdrKod").select2({ width: '100%' });
    $("#FirAdi").select2({ width: '100%' });
    $("#FirKod").select2({ width: '100%' });
    $("#SubAdi").select2({ width: '100%' });
    $("#SubKod").select2({ width: '100%' });
    $("#PerAdi").select2({ width: '100%' });
    $("#PerKod").select2({ width: '100%' });
    $("#SomAdi").select2({ width: '100%' });
    $("#SomKod").select2({ width: '100%' });
    $("#ProAdi").select2({ width: '100%' });
    $("#ProKod").select2({ width: '100%' });
};
function Kaydet() {
    var sorun = 0;
    var CarKod = document.getElementById("CarAdi").value;
    var CarAdi = document.getElementById("CarKod").value;
    var AdrKod = document.getElementById("AdrAdi").value;
    var AdrAdi = document.getElementById("AdrKod").value;
    var FirKod = document.getElementById("FirAdi").value;
    var FirAdi = document.getElementById("FirKod").value;
    var SubKod = document.getElementById("SubAdi").value;
    var SubAdi = document.getElementById("SubKod").value;
    var PerKod = document.getElementById("PerAdi").value;
    var PerAdi = document.getElementById("PerKod").value;
    var SomKod = document.getElementById("SomAdi").value;
    var SomAdi = document.getElementById("SomKod").value;
    var ProKod = document.getElementById("ProAdi").value;
    var ProAdi = document.getElementById("ProKod").value;
    var Aciklama = document.getElementById("Aciklama").value;
    var Yetkili_Ismi = document.getElementById("Yetkili").value;
    var Baslama_Tarihi = document.getElementById("Baslama_Tarihi").value;
    var Bitis_Tarihi = document.getElementById("Bitis_Tarihi").value;
    if (CarKod == "") {
        HataYazdir('Bir Cari Hesabı Seçiniz!');
        sorun++;
    }
    else if (AdrKod == "") {
        HataYazdir('Bir Adres Seçiniz!');
        sorun++;
    }
    else if (FirKod == "") {
        HataYazdir('Bir Firma Seçiniz!');
        sorun++;
    }
    else if (SubKod == "") {
        HataYazdir('Bir Şube Seçiniz!');
        sorun++;
    }
    else if (PerKod == "") {
        HataYazdir('Bir Personel Seçiniz!');
        sorun++;
    }
    else if (SomKod == "") {
        HataYazdir('Bir Sorumluluk Merkezi Seçiniz!');
        sorun++;
    }
    else if (ProKod == "") {
        HataYazdir('Bir Proje Seçiniz!');
        sorun++;
    }
    else if (Baslama_Tarihi == "") {
        HataYazdir('Bir Başlangıç Seçiniz!');
        sorun++;
    }
    else if (Yetkili_Ismi.length > 30) {
        HataYazdir('Yetkili 30 karakteri geçmemelidir!');
        sorun++;
    }
    if (sorun == 0) {
        var Ziyaret_Hareketleri_Ekle = {
            CarKod: CarAdi,
            CarAdi: CarKod,
            AdrKod: AdrAdi,
            AdrAdi: AdrKod,
            FirKod: FirAdi,
            FirAdi: FirKod,
            SubKod: SubAdi,
            SubAdi: SubKod,
            PerKod: PerAdi,
            PerAdi: PerKod,
            SomKod: SomAdi,
            SomAdi: SomKod,
            ProKod: ProAdi,
            ProAdi: ProKod,
            Aciklama: Aciklama,
            Baslama_Tarihi: Baslama_Tarihi,
            Bitis_Tarihi: Bitis_Tarihi,
            Yetkili_Ismi: Yetkili_Ismi
        };
        var valdata = $("#ziyaretform").serialize();
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Ziyaret/YeniZiyaretOlustur',
            data: JSON.stringify(Ziyaret_Hareketleri_Ekle),
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
                            url: '/Ziyaret/YeniZiyaretOlusturUser',
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
function FirKod_OnChange() {
    var tip = document.getElementById("FirKod").value;
    var Id = $("#FirKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#FirAdi").html(s);
    SubeGet(Id);
}
function FirAdi_OnChange() {
    var tip = document.getElementById("FirAdi").value;
    var Id = $("#FirAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#FirKod").html(s);
    SubeGet(tip);
}
function SubKod_OnChange() {
    var tip = document.getElementById("SubKod").value;
    var Id = $("#SubKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#SubAdi").html(s);
}
function SubAdi_OnChange() {
    var tip = document.getElementById("SubAdi").value;
    var Id = $("#SubAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#SubKod").html(s);
}
function CarKod_OnChange() {
    var tip = document.getElementById("CarKod").value;
    var Id = $("#CarKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#CarAdi").html(s);
    CariAdresGet(Id);
}
function CarAdi_OnChange() {
    var tip = document.getElementById("CarAdi").value;
    var Id = $("#CarAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#CarKod").html(s);
    CariAdresGet(tip);
}
function AdrKod_OnChange() {
    var tip = document.getElementById("AdrKod").value;
    var Id = $("#AdrKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#AdrAdi").html(s);
}
function AdrAdi_OnChange() {
    var tip = document.getElementById("AdrAdi").value;
    var Id = $("#AdrAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#AdrKod").html(s);
}
function PerKod_OnChange() {
    var tip = document.getElementById("PerKod").value;
    var Id = $("#PerKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#PerAdi").html(s);
}
function PerAdi_OnChange() {
    var tip = document.getElementById("PerAdi").value;
    var Id = $("#PerAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#PerKod").html(s);
}
function ProKod_OnChange() {
    var tip = document.getElementById("ProKod").value;
    var Id = $("#ProKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#ProAdi").html(s);
}
function ProAdi_OnChange() {
    var tip = document.getElementById("ProAdi").value;
    var Id = $("#ProAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#ProKod").html(s);
}
function SomKod_OnChange() {
    var tip = document.getElementById("SomKod").value;
    var Id = $("#SomKod option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#SomAdi").html(s);
}
function SomAdi_OnChange() {
    var tip = document.getElementById("SomAdi").value;
    var Id = $("#SomAdi option:selected").html();
    s = '<option value="' + Id + '">' + tip + '</option>';
    $("#SomKod").html(s);
}
function SubeGet(e) {
    $.ajax({
        type: "GET",
        url: "/Ziyaret/getSubeler?FirmaSira=" + e,
        data: "{}",
        success: function (data) {
            $("#SubAdi").html('');
            var htmlKod = '';
            var htmlAd = '';
            for (var i = 0; i < data.length; i++) {
                htmlKod += '<option value="' + data[i].Sube_Kod + '">' + data[i].Sube_Ad + '</option>';
                htmlAd += '<option value="' + data[i].Sube_Ad + '">' + data[i].Sube_Kod + '</option>';
            }
            $("#SubAdi").html(htmlAd);
            $("#SubKod").html(htmlKod);
        }
    });
}
function CariAdresGet(e) {
    $.ajax({
        type: "GET",
        url: "/Ziyaret/getCariHesapAdresleri?CariHesapKodu=" + e,
        data: "{}",
        success: function (data) {
            $("#AdrAdi").html('');
            var htmlKod = '';
            var htmlAd = '';
            for (var i = 0; i < data.length; i++) {
                htmlKod += '<option value="' + data[i].Adres_Kod + '">' + data[i].Adres_Ad + '</option>';
                htmlAd += '<option value="' + data[i].Adres_Ad + '">' + data[i].Adres_Kod + '</option>';
            }
            $("#AdrAdi").html(htmlAd);
            $("#AdrKod").html(htmlKod);
        }
    });
}
function ZiyaretOnayla(e) {
    Swal.fire({
        title: 'Ziyareti Onaylıyor Musunuz ?',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `İptal`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Ziyaret Onaylandı', '', 'success')
            $.ajax({
                type: "POST",
                url: "/Ziyaret/ZiyaretOnayla?guid=" + e.id,
                data: "{}",
                success: function (data) {
                }
            });
            location.reload();
        } else if (result.isDenied) {
            Swal.fire('İşlem iptal Edildi', '', 'danger')
        }
    })
}
function ClearDate() {
    $('#Bitis_Tarihi').val('')
}
function TarihKontrol() {
    var xBitis = document.getElementById("Bitis_Tarihi").value;
    var xBaslangic = document.getElementById("Baslama_Tarihi").value;
    if (xBaslangic != "" && xBitis != "") {
        if (xBaslangic > xBitis) {
            $('#ErrorDate').show();
            $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
            var x = $('#Baslama_Tarihi').val();
            $('#Bitis_Tarihi').val(x);
            HataYazdir('Lütfen Bitiş Tarihini, Başlangıç Tarihinden erken girmeyiniz!');
        }
    }
}
function HataYazdir(mesaj) {
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing');
    console.log("Yukarı çıktı");
    var html = "";
    html += '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
    html += '<strong class="text-color-danger">' + mesaj + '</strong>';
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';
    console.log(html);
    $('#BasarisizKayit').html(html);
}
function setGuidKapatma(guid) {
    $('#guid').val(guid);
    console.log($('#guid').val());
}