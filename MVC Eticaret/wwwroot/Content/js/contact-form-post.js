function SendEmail1() {
    var data = {
        MailAddress: $('#mailAddress').val(),
        Subject: $('#recipientName').val(),
        Message: $('#messageText').val(),
    };

    $.ajax({
        url: '/Mail/SendEmail',
        type: "POST",
        data: data,
        success: function (data) {
            $('#exampleModal').modal('hide')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mesajınız başarıyla gönderilmiştir',
                showConfirmButton: false,
                timer: 2500,
            })
        },
        failure: function (errMsg) {
            alert("Mesajınız gönderilmemiştir." + errMsg);
        }
    });
}


