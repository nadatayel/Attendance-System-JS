let empurl = 'employee.json';
let empArr = [];

$(document).ready(function () {
  ShowAllData();
  console.log(empArr);

  approveEmp();
  DeleteEmp();

  showAllEmployees();

  ShowFullReport();

  ShowLateReport();

  ShowExcuseReport();
});

function ShowAllData() {
  $.ajax({
    url: empurl,
    type: 'get',
    success: function (res) {
      empArr = res;
      console.log(empArr);

      $.each(res, function (i, emp) {
        if (emp.flag == 'New') {
          $('#empBody').append(
            '<tr class="a" data-value="' +
              i +
              '"><td>' +
              emp.firstname +
              '</td><td>' +
              emp.lastname +
              '</td><td>' +
              emp.username +
              '</td><td>' +
              emp.email +
              '</td><td>' +
              emp.flag +
              '</td><td>' +
              " <input type='button' value='Approve' id='btnapprove' class='btn btn-success'> " +
              '</td><td>' +
              " <input type='button' value='Delete' id='btndelete' class='btn btn-danger'> " +
              '</td></tr>'
          );
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function approveEmp() {
  console.log(empArr);
  $('#empBody').on('click', '#btnapprove', function () {
    x = $(this).parent().parent().data('value');
    console.log(empArr[x].flag);
    var empObj = empArr[x];
    empObj.flag = 'old';
    console.log(empObj);
    empArr.splice(x, 1, empObj);
    console.log(empArr);
    saveJson(empArr);
  });
}

function DeleteEmp() {
  $('#empBody').on('click', '#btndelete', function () {
    y = $(this).parent().parent().data('value');
    console.log(empArr[y].flag);
    var empObj = empArr[y];
    // empObj.flag = 'old';
    console.log(empObj);
    empArr.splice(y, 1);
    console.log(empArr);
    saveJson(empArr);
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
function showAllEmployees() {
  $.ajax({
    url: empurl,
    type: 'get',
    success: function (res) {
      $.each(res, function (i, emp) {
        if (emp.flag == 'old' && emp.role != 'admin') {
          $('#tbody1').append(
            '<tr class="a" data-value="' +
              i +
              '"><td>' +
              emp.firstname +
              ' ' +
              emp.lastname +
              '</td><td>' +
              emp.role +
              '</td><td>' +
              emp.attendance +
              '</td><td>' +
              emp.late +
              '</td><td>' +
              emp.absent +
              '</td></tr>'
          );
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function ShowFullReport() {
  $.ajax({
    url: empurl,
    type: 'get',
    success: function (res) {
      $.each(res, function (i, emp) {
        if (emp.flag == 'old' && emp.role != 'admin') {
          $('#tbody2').append(
            '<tr class="a" data-value="' +
              i +
              '"><td>' +
              emp.firstname +
              ' ' +
              emp.lastname +
              '</td><td>' +
              emp.role +
              '</td><td>' +
              emp.attendanceTime +
              '</td><td>' +
              emp.attendance +
              '</td><td>' +
              emp.late +
              '</td><td>' +
              emp.absent +
              '</td></tr>'
          );
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function ShowLateReport() {
  $.ajax({
    url: empurl,
    type: 'get',
    success: function (res) {
      $.each(res, function (i, emp) {
        if (emp.flag == 'old' && emp.role != 'admin') {
          $('#tbody3').append(
            '<tr class="a" data-value="' +
              i +
              '"><td>' +
              emp.firstname +
              ' ' +
              emp.lastname +
              '</td><td>' +
              emp.role +
              '</td><td>' +
              emp.late +
              '</td></tr>'
          );
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function ShowExcuseReport() {
  $.ajax({
    url: empurl,
    type: 'get',
    success: function (res) {
      $.each(res, function (i, emp) {
        if (emp.flag == 'old' && emp.role != 'admin') {
          $('#tbody4').append(
            '<tr class="a" data-value="' +
              i +
              '"><td>' +
              emp.firstname +
              ' ' +
              emp.lastname +
              '</td><td>' +
              emp.role +
              '</td><td>' +
              emp.absent +
              '</td></tr>'
          );
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}
