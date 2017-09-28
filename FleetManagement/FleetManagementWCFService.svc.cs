using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using FleetManagement.Data;
using FleetManagement.Models;
namespace FleetManagement

{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class FleetManagementWCFService
    {
#region Vehicle

        /// <summary>
        /// This function will return all the vehicles in the database
        /// </summary>
        /// <returns></returns>
        [OperationContract]
        [WebGet]
        public List<VehicleModel> GetAllVehicles()
        {
            using (var db = new FleetManagementDb())
            {
                var result = db.spGetAllVehicles()
                    .Select(a => new VehicleModel
                    {
                        Id = a.Id,
                        DriverName = a.Driver,
                        Make = a.Make,
                        Mode = a.Mode,
                        Plate = a.Rego,
                        Year = (DateTime)a.CreateDate
                    }).OrderByDescending(a => a.Year).ToList();
                return result;
            }

        }

        /// <summary>
        /// This function will receive a model named vehicle and save all the information in vehicle to DB
        /// </summary>
        /// <param name="vehicle"> a model named vehicle</param>
        /// <returns> return sucess if saved to DB</returns>
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
        public string CreateVehicle(VehicleModel vehicle)
        {
            using (var db = new FleetManagementDb())
            {
                db.spCreateVehicle(vehicle.Plate,vehicle.Make,vehicle.Mode,vehicle.Year=DateTime.Now,vehicle.DriverName);
                return "success";
            }
            
        }

        /// <summary>
        /// This function will receive a model named vehicle and find this vehicle in Db to update vehicle's information
        /// </summary>
        /// <param name="vehicle"> a model named vehicle</param>
        /// <returns> return sucess if saved to DB</returns>
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
        public string EditVehicle(VehicleModel vehicle)
        {
            using (var db = new FleetManagementDb())
            {
                db.spEditVehicle(vehicle.Id, vehicle.Plate, vehicle.Make, vehicle.Mode, vehicle.Year = DateTime.Now, vehicle.DriverName);
                return "success";
            }

        }

        /// <summary>
        /// get current vehicle's information
        /// </summary>
        /// <param name="id"> vehicle id</param>
        /// <returns> return vehicle's information</returns>
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
        public VehicleModel GetCurrentVehicle(int id)
        {
            using (var db = new FleetManagementDb())
            {
                var result = db.spGetCurrentVehicle(id).Select(a => new VehicleModel
                {
                    Id = a.Id,
                    DriverName = a.Driver,
                    Make = a.Make,
                    Mode = a.Mode,
                    Plate = a.Rego,
                    Year = (DateTime)a.CreateDate
                }).FirstOrDefault();
                return result;
            }

        }

        /// <summary>
        /// delete vehicle
        /// </summary>
        /// <param name="id"> vehicle id</param>
        /// <returns>return success if saved to db</returns>
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
        public string DeleteVehicle(int id)
        {
            using (var db = new FleetManagementDb())
            {
                db.spDeleteVehicle(id);
                return "success";
            }

        }
    }
}
#endregion