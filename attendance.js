var Empurl = 'employee.json';

empArr = [];

$(document).ready(function () {
  ShowAllData();

  CalcAttendance();
});

function ShowAllData() {
  $.ajax({
    type: 'get',
    url: Empurl,
    success: function (res) {
      empArr = res;
      console.log(empArr);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function CalcAttendance() {
  console.log(empArr);
  $('#btnConfirm').on('click', function () {
    var AttendanceCode = $('#txtAttendanceCode').val();

    for (let i = 0; i < empArr.length; i++) {
      if (
        empArr[i].attendanceCode === AttendanceCode &&
        empArr[i].flag === 'old'
      ) {
        var today = new Date();
        var time =
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds();
        console.log(time);
        var empObj = empArr[i];
        empObj.attendanceTime = time;
        if (time >= '9:0:0' && time <= '9:15:0') {
          empObj.attendance = empObj.attendance + 1;
          console.log('attendance : ', empObj.attendance);
        } else if (time >= '9:15:0' && time <= '9:30:0') {
          empObj.late = empObj.late + 1;
          console.log('late : ', empObj.late);
        } else {
          empObj.absent = empObj.absent + 1;
          console.log('absent : ', empObj.absent);
        }
        console.log('empObj : ', empObj);
        // $('#empName').append(empObj.FirstName + ' ' + empObj.LastName);
        // $('#attendTime').append(empObj.attendanceTime);
        alert(
          'User Name is ' +
            empObj.firstname +
            ' ' +
            empObj.lastname +
            '\nattendance Time is : ' +
            empObj.attendanceTime
        );
        empArr.splice(i, 1, empObj);
        saveJson(empArr);
        return;
      }
    }
    alert('NO Employee With this code');
    console.log(AttendanceCode);
  });
}

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
