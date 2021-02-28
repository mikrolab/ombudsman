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
      // alert('Form Submitted..');
    }
  });
  // $("#myfile").change(function(){
  //   $("#file-name").text(this.files[0].name);
  // });
  // $("#mysign").change(function(){
  //   $("#sign-name").text(this.files[0].name);
  // });
  // $("#mysignature").change(function(){
  //   $("#signature-name").text(this.files[0].name);
  // });
  $('#myfile').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#myfile')[0].files[0].name;
    $(this).prev('label').text(file);
  });
  $('#mysign').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#mysign')[0].files[0].name;
    $(this).prev('label').text(file);
  });
  $('#mysignature').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#mysignature')[0].files[0].name;
    $(this).prev('label').text(file);
  });
});
