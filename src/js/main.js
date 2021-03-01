require(`../local_modules/jquery/dist/jquery.min.js`);
require(`../local_modules/jquery-validation/dist/jquery.validate.min.js`);


$(document).ready(function () {
  $("#validateBtn").click(function () {
    var validator = $("#form__appeal").validate({
      rules: {
        fsurname: {
          required: true
        },
        fname: {
          required: true
        },
        fpatronymic: {
          required: true
        },
        fcity: {
          required: true
        },
        faddress: {
          required: true
        },
        fmail: {
          required: true,
          email: true
        },
        fmessage: {
          required: true
        }
      },
      messages: {
        fname: "Обов’язково для заповнення",
        fsurname: "Обов’язково для заповнення",
        fpatronymic: "Обов’язково для заповнення",
        fcity: "Обов’язково для заповнення",
        faddress: "Обов’язково для заповнення",
        fmail: "Обов’язково для заповнення",
        fmessage: "Обов’язково для заповнення"
      },
    });
    if (validator.form()) {
      $("#form__appeal").submit(function (e) {
        e.preventDefault();
        var form_data = {
          'first_name': $(this).find("input[name='fsurname']").val(),
          'middle_name': $(this).find("input[name='fname']").val(),
          'last_name': $(this).find("input[name='fpatronymic']").val(),
          'address': $(this).find("textarea[name='fcity']").val(),
          'apartment_number': $(this).find("input[name='faddress']").val(),
          'email': $(this).find("input[name='fmail']").val(),
          'phone': $(this).find("input[name='fphone']").val(),
          'message': $(this).find("textarea[name='fmessage']").val(),
          'file_with_eds': $(this).find("input[name='mysign']").val(),
          'additional_files': $(this).find("input[name='myfile']").val(),
          'eds': $(this).find("input[name='mysignature']").val()
        }
        $.ajax({
          type: "POST",
          url: "https://ombudsman-api.id-c.com.ua/api/feedback",
          data: form_data,
          success: function () {
            $("#form__appeal").css("opacity", "0");
            setTimeout(function () {
              $("#form__appeal").css("display", "none");
            }, 500)
            $(".form__sent").css("display", "block");
            setTimeout(function () {
              $(".form__sent").css("opacity", "1");
            }, 500)
          }
        });
      });
    }
  });
  $('#myfile').change(function () {
    var i = $(this).prev('label').clone();
    // var file = $('#myfile')[0].files[0].name;
    $(this).prev('label').text('Файл обрано');
  });
  $('#mysign').change(function () {
    var i = $(this).prev('label').clone();
    $(this).prev('label').text('Файл обрано');
  });
  $('#mysignature').change(function () {
    var i = $(this).prev('label').clone();
    $(this).prev('label').text('Файл обрано');
  });
});
