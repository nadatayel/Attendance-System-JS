var Empurl = 'employee.json';

$(document).ready(function () {
  $('#empData').append(sessionStorage.getItem('userName'));

  ViewMonthlyReport();
});

function ViewMonthlyReport() {
  let attendCode = sessionStorage.getItem('attendCode');
  $.ajax({
    url: Empurl,
    type: 'get',
    success: function (res) {
      $.each(res, function (i, emp) {
        if (emp.attendanceCode === attendCode) {
          $('#dailyreport').append(emp.attendanceTime);
          $('#monthUl').append(
            '<li> attendance :' +
              emp.attendance +
              '</li><li> late : ' +
              emp.late +
              '</li><li> Absence : ' +
              emp.absent +
              '</li>'
          );
          if (emp.role == 'subAdmin') {
            $('#attedLi').css('display', 'block');
          } else {
            $('#attedLi').css('display', 'none');
          }
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}
