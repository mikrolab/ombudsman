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
        form_data.append('first_name', $(this).find("input[name='fname']").val());
        form_data.append('middle_name', $(this).find("input[name='fpatronymic']").val());
        form_data.append('last_name', $(this).find("input[name='fsurname']").val());
        form_data.append('address', $(this).find("textarea[name='fcity']").val());
        form_data.append('apartment_number', $(this).find("input[name='faddress']").val());
        form_data.append('email', $(this).find("input[name='fmail']").val());
        form_data.append('phone', $(this).find("input[name='fphone']").val());
        form_data.append('message', $(this).find("textarea[name='fmessage']").val());
        // if ($("#mysign").val() != '') {
        //   form_data.append('file_with_eds', $("#mysign").prop('files')[0]);
        // }
        if ($("#myfile").val() != '') {
          // form_data.append('additional_files', $("#myfile").prop('files')[0]);
          var totalfiles = $("#myfile").prop('files').length;
          for (var index = 0; index < totalfiles; index++) {
            form_data.append("additional_files[]", $("#myfile").prop('files')[index]);
          }
        }
        form_data.append('file_with_eds', $("#mysignature").prop('files')[0]);
        $('#validateBtn').attr('disabled', 'disabled');
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
            setTimeout(function () {
              $("html").css("overflow-y", "hidden");
              $(".notification").css("display", "block");
              var d = new Date();
              var hours = d.getHours();
              var minutes = d.getMinutes();
              var month = d.getMonth() + 1;
              var day = d.getDate();
              var output = (day < 10 ? '0' : '') + day + '.' +
                (month < 10 ? '0' : '') + month + '.' +
                + d.getFullYear() + ' ' + (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
              $("#date").html(output);
            }, 500)
            setTimeout(function () {
              if ($(".notification").css("display") == "block") {
                $(".notification").css("display", "none");
                $("html").css("overflow-y", "auto");
              }
            }, 15000)
          },
          error: function () {
            $('#validateBtn').attr('disabled', 'false');
          },
        });
      });
    }
  });

  var pageName = null;
  const pathName = window.location.pathname
  const pathIndex = window.location.pathname.lastIndexOf('/') + 1
  pageName = pathName.substring(pathIndex)
  console.log(pageName)
  switch (pageName) {
    case '':
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
      break;
    case 'rus.html':
      $('#myfile').change(function () {
        var i = $(this).prev('label').clone();
        $(this).prev('label').text('Файл выбран');
      });
      $('#mysign').change(function () {
        var i = $(this).prev('label').clone();
        $(this).prev('label').text('Файл выбран');
      });
      $('#mysignature').change(function () {
        var i = $(this).prev('label').clone();
        $(this).prev('label').text('Файл выбран');
      });
      break;
    case 'cri.html':
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
      break;
  }
  var fontIncrease = 0;
  $('#plus').click(function () {
    $(".font").css('font-size', '+=5');
    $(".font").css('line-height', '+=5' + 'px');
    $('.appeal__form-signature').find('label').css('height', '+=40' + 'px');
    $('.appeal__form-additon').find('label').css('height', '+=20' + 'px');
    $('.appeal__form-input').css('height', '+=10' + 'px');
    fontIncrease++;
    if (fontIncrease == 1) {
      $('#minus').css('display', 'block');
    }
    if (fontIncrease == 2) {
      $('#plus').css('display', 'none');
    }
  })
  $('#minus').click(function () {
    $(".font").css('font-size', '-=5');
    $(".font").css('line-height', '-=5' + 'px');
    $('.appeal__form-signature').find('label').css('height', '-=40' + 'px');
    $('.appeal__form-additon').find('label').css('height', '-=20' + 'px');
    $('.appeal__form-input').css('height', '-=10' + 'px');
    fontIncrease--;
    if (fontIncrease == 0) {
      $('#minus').css('display', 'none');
    }
    if (fontIncrease != 0) {
      $('#plus').css('display', 'block');
    }
  })
});


$("#close__notification").click(function () {
  $(".notification").css("display", "none");
  $("html").css("overflow-y", "auto");
})