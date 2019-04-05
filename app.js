var database = firebase.database();

function getMonthsWorked(employee)
{
	var start = moment(employee.startDate);
	var now = moment(Date.now());
	return now.diff(start, 'months');
}

function getTotalBilled(employee)
{
	return employee.rate * employee.monthsWorked;
}

// on child added
database.ref().on("child_added", function(childSnapshot){
	var employee = childSnapshot.val();
	employee.monthsWorked = getMonthsWorked(employee);
	employee.totalBilled = getTotalBilled(employee);
	var tr = $("<tr>").html(`
	<td>${employee.name}</td>
	<td>${employee.role}</td>
	<td>${employee.startDate}</td>
	<td>${employee.monthsWorked}</td>
	<td>${employee.rate.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
	<td>${employee.totalBilled.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>`);
	$("#employeeTable").append(tr);
});

// onclick addEmployee
$("#addEmployee").click(function(event)
{
	event.preventDefault();
	var name = $("#name-input").val().trim();
	var role = $("#role-input").val().trim();
	var date = $("#startDate-input").val().trim();
	var rate = $("#rate-input").val().trim();
	database.ref().push({
		name: name,
		role: role,
		startDate: date,
		rate: rate
	});
});