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
        var form_data = new FormData;
        form_data.append('first_name', $(this).find("input[name='fsurname']").val());
        form_data.append('middle_name', $(this).find("input[name='fname']").val());
        form_data.append('last_name', $(this).find("input[name='fpatronymic']").val());
        form_data.append('address', $(this).find("textarea[name='fcity']").val());
        form_data.append('apartment_number', $(this).find("input[name='faddress']").val());
        form_data.append('email', $(this).find("input[name='fmail']").val());
        form_data.append('phone', $(this).find("input[name='fphone']").val());
        form_data.append('message', $(this).find("textarea[name='fmessage']").val());
        if ($("#mysign").val() != '') {
          form_data.append('file_with_eds', $("#mysign").prop('files')[0]);
        }
        if ($("#myfile").val() != '') {
          form_data.append('additional_files', $("#myfile").prop('files')[0]);
        }
        form_data.append('eds', $("#mysignature").prop('files')[0]);
        console.log(form_data);
        $.ajax({
          type: "POST",
          url: "https://ombudsman-api.id-c.com.ua/api/feedback",
          data: form_data,
          processData: false,
          contentType: false,
          success: function () {
            $("#form__appeal").css("opacity", "0");
            setTimeout(function () {
              $("#form__appeal").css("display", "none");
            }, 500)
            $(".form__sent").css("display", "block");
            setTimeout(function () {
              $(".form__sent").css("opacity", "1");
            }, 500)
          },
        });
      });
    }
  });
  $('#myfile').change(function () {
    var i = $(this).prev('label').clone();
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
