using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace aspnetmvc6.Controllers
{
    [Route("")]
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
