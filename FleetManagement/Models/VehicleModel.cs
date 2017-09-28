using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FleetManagement.Models
{
    public class VehicleModel
    {
        public int Id { get; set; }
        public string Plate { get; set; }
        public string Make { get; set; }
        public string Mode { get; set; }
        public DateTime Year { get; set; }
        public string DriverName { get; set; }
    }
	
}