var database = firebase.database();
// on dom ready
$(function()
{
	// load all current employees
});

// on child added

function getMonthsWorked(employee)
{
}

function getTotalBilled(employee)
{
}

database.ref().on("child_added", function(childSnapshot){
	var employee = childSnapshot.val();
	employee.monthsWorked = getMonthsWorked(employee);
	employee.totalBilled = getTotalBilled(employee);
	console.log(employee);
	var tr = $("<tr>").html(`
	<td>${employee.name}</td>
	<td>${employee.role}</td>
	<td>${employee.startDate}</td>
	<td>${employee.monthsWorked}</td>
	<td>${employee.rate}</td>
	<td>${employee.totalBilled}</td>`);
	$("#employeeTable").append(tr);
	/*
	<tr>
	<td>Jane Doe</td>
	<td>CEO</td>
	<td>01/01/1970</td>
	<td>10</td>
	<td>200</td>
	<td>2000</td>
	</tr>
	*/
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