var emp='employee.json';
empAttenanceCode = [];
$(function(){
  $('#adminLi').css('display', 'none');
  $('#attedLi').css('display', 'none');
  $('#profLi').css('display', 'none');
    $('#buttonregister').click(function (e){
        e.preventDefault();
      var firstname=$('#inputfirseName').val();
      var lasttname=$('#inputlastName').val();
      var address=$('#inputaddress').val();
      var email=$('#inputemail').val();
      var age=$('#inputage').val();
      var username=$('#txtUserName').val();
      var password=$('#txtPass').val();
      var confirmPass = $('#txtConfirmPass').val();
      $.ajax({
        type: 'get',
        url: emp,
        success: function (res) {
          empAttenanceCode = res;
        },
        error: function (err) {
          console.log(err);
        },
      });
      Code = Math.floor(Math.random() * 1000000 + 1);
      for (let i = 0; i < empAttenanceCode.length; i++) {
        if (Code == empAttenanceCode[i].attendanceCode) {
          Code = Math.floor(Math.random() * 1000000 + 1);
        }
      }

      var regData = {
        firstname:firstname ,
        lastname :lasttname,
        address: address,
        email: email,
        age: age,
        username: username,
        password: password,
        flag: 'New',
        role: 'Employee',
        attendanceCode: Code.toString(),
      attendanceTime: 'Time',
      attendance: 0,
      absent: 0,
      late: 0,
      };
      $.ajax({
        type:'get',
        url:emp,
        async:false,
        data:regData,
        datatype:'json',
        success:function(data){
            console.log('success'+data);
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (
         firstname  == '' ||
          lasttname == '' ||
          address == '' ||
           email== '' ||
          username == '' ||
           age === '' ||
           password== '' ||
          confirmPass == ''
        ) {
          $('#valid').css('display', 'block');
          $('#valid').empty();
          $('#valid').append('PLZ enter All of Data !!');
        }
        else if (!email.match(mailformat)) {
          $('#valid').css('display', 'block');
          $('#valid').empty();
          $('#valid').append('Please enter Email in correct Formate !!');
         } else if (password !== confirmPass) {
          $('#valid').css('display', 'block');
          $('#valid').empty();
          $('#valid').append('Password and confirm password are not equal !!');
        
         }
           else {
          data.push(regData);
          saveJson(data);
        }
        },
        error:function(err){
        console.log(err);
        }
      });
    });

  var formLogin = $('#loginform');
  var validation = Array.prototype.filter.call(formLogin, function (form) {
    form.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          var loginUser = $('#txtUserName1').val().toLowerCase();
          var loginPass = $('#txtPass1').val();
          loginAuth(loginUser, loginPass);
        }
        form.classList.add('was-validated');
      },
      false
    );
  });
});

function saveJson(jsonDataToSave) {
    var data = new Blob([JSON.stringify(jsonDataToSave)], {
      type: 'application/json',
    });
    var link = document.createElement('a');
    link.href = window.webkitURL.createObjectURL(data);
    link.setAttribute('download', 'employee');
    document.getElementsByTagName('body')[0].appendChild(link);
    link.click();
  } 



  function loginAuth(loginUser, loginPass) {
    $.ajax({
      type: 'GET',
      url: emp,
      async: false,
      dataType: 'json',
      success: function (response) {
          console.log(loginUser);
        if (jQuery.isEmptyObject(response)) {
          alert('Your Auth Is Wrong!!');
        } else {
          for (let i = 0; i < response.length; i++) {
            if (loginUser.toLowerCase() == response[i].username.toLowerCase() && 
            loginPass == response[i].password && response[i].flag == 'old') {
              handelAuthNav(response[i], true);
              return;
             }
             else if (response[i].flag == 'New') {
              alert('Not active yet or Not register');
              return;
            }
            
          }
  
        
         }
        if (jQuery.isEmptyObject(response)) {
          alert('Your Auth Is Wrong!!');
        } else {
          for (let i = 0; i < response.length; i++) {
            if (
              loginUser.toLowerCase() == response[i].username.toLowerCase() &&
              loginPass == response[i].password &&
              response[i].flag == 'old'
            ) {
              handelAuthNav(response[i], true);
              return;
            }
            
          }
          alert('Not active yet or Not register');
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus, errorThrown);
      },
    });
  }
  
  function handelAuthNav(response, isLogin) {
    if (isLogin) {
      var data = {
        userName: response.username,
        Email: response.email,
        flag: response.flag,
        role: response.role,
        attendanceCode: response.attendanceCode,
      FirstName: response.firstname,
      LastName: response.lastname,
      };
      if (data.role == 'admin') {
        $('#adminLi').css('display', 'block');
        $('#attedLi').css('display', 'block');
        $('#profLi').css('display', 'none');
        window.location.replace('ADMI.html');
      } else if (data.role == 'subadmin') {
        $('#adminLi').css('display', 'none');
        $('#attedLi').css('display', 'block');
        $('#profLi').css('display', 'block');
        window.location.replace('attendance.html');
      } else if (data.role == 'Employee') {
        $('#adminLi').css('display', 'none');
        $('#attedLi').css('display', 'none');
        $('#profLi').css('display', 'block');
        window.location.replace('profile.html');
      }
      sessionStorage.setItem('userData', JSON.stringify(data));
      sessionStorage.setItem('userName', data.FirstName + ' ' + data.LastName);
    sessionStorage.setItem('attendCode', data.attendanceCode);
    }
    console.log(data);
  }
  













