
$(function () {
    //get all vehicles from WCF server
    GetAllVehicles();

    //Click Create Vehicle button
    $("#btn-create").click(function () {
        $("#hiden-value-error").hide();
        var vehicle = {
            plate: $("#create-plate").val().toUpperCase(),
            make: $("#create-make").val(),
            mode: $("#create-mode").val(),
            driver: $("#create-driver").val(),
        }
        if (vehicle.plate == "") {
            $("#hiden-value-error").show();
        }
        else {
            $('#VehicleModal').modal({
                show: 'false'
            }); 
            CreateVehicle(vehicle);
        }
    });

    //Click Update button in edit popup modal
    $("#btn-update").click(function () {
        var vehicle = {
            id: $("#update-id").val(),
            plate: $("#update-plate").val().toUpperCase(),
            make: $("#update-make").val(),
            mode: $("#update-mode").val(),
            driver: $("#update-driver").val(),
        }
        if (vehicle.plate == "") {
            $("#hiden-value-update-error").show();
        }
        else {
            $('#update-VehicleModal').modal({
                show: 'false'
            });
            EditVehicle(vehicle);
        }
    });

    //Click Edit button
    $(document).on("click", ".editVehicle", function () {
        var id = $(this).attr("prop-id");
        $("#hiden-value-update-error").hide();
        GetCurrentVehicle(id);
        //debugger;
    });

    //Click Delete button
    $(document).on("click", ".deleteVehicle", function () {
        var r = confirm("Are you sure to delete the vehicle?");
        if (r == true) {
            var id = $(this).attr("prop-id");
            DeleteVehicle(id);
        }
    });
});

//Get all vehicles from WCF server
function GetAllVehicles() {
    $.ajax({
        url: "/FleetManagementWCFService.svc/GetAllVehicles",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $.each(data.d, function (k, v) {
                var id = v.Id;
                var plate = v.Plate;
                var make = v.Make;
                var mode = v.Mode;
                var driver = v.DriverName;
                // Append data to view table
                $("#list-vehicles").append("<tr><td>" + plate + "</td><td>" + make + "</td><td>" + mode +
                    "</td><td>" + driver + "</td><td><button prop-id='" + id + "' class='btn editVehicle'>Edit</button><button prop-id='" +
                    id + "' class='btn deleteVehicle' style='margin-left:15px'>Delete</button></td></tr>")
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

//Sent vehicle information to WCF server to create vechicle
function CreateVehicle(v) {

    $.ajax({
        url: "/FleetManagementWCFService.svc/CreateVehicle",
        data: JSON.stringify({
            vehicle: {
                Plate: v.plate,
                Make: v.make,
                Mode: v.mode,
                DriverName: v.driver
            }
        }),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

//Sent vehicle id to WCF server and get back all information match this vehicle id
function GetCurrentVehicle(vid) {
    $.ajax({
        url: "/FleetManagementWCFService.svc/GetCurrentVehicle",
        data: JSON.stringify({ id: vid }),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var res = data.d;
            var id = res.Id;
            var plate = res.Plate;
            var make = res.Make;
            var mode = res.Mode;
            var driver = res.DriverName;
            $("#update-VehicleModal").modal("show");
            $("#update-id").val(id);
            $("#update-plate").val(plate);
            $("#update-make").val(make);
            $("#update-mode").val(mode);
            $("#update-driver").val(driver);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

////Sent vehicle information to WCF server to edit vehicle information
function EditVehicle(v) {
    $.ajax({
        url: "/FleetManagementWCFService.svc/EditVehicle",
        data: JSON.stringify({
            vehicle: {
                Id: v.id,
                Plate: v.plate,
                Make: v.make,
                Mode: v.mode,
                DriverName: v.driver
            }
        }),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

//Sent vehicle id to WCF server to delete this vehicle
function DeleteVehicle(vid) {
    $.ajax({
        url: "/FleetManagementWCFService.svc/DeleteVehicle",
        data: JSON.stringify({ id:vid }),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

