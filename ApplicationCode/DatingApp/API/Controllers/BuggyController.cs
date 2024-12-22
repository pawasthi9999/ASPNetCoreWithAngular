using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController(DataContext context) :BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "Secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = context.Users.Find(-1);
            if(thing == null) { return NotFound(); }
            return thing;
        }

        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            //try
            //{
            //    //var thing = context.Users.Find(-1);
            //    //var thingToReturn = thing.ToString();
            //    //return thing;
            //    var thing = context.Users.Find(-1) ?? throw new Exception("A bad thing has happened");
            //    return thing;
            //}
            //catch (System.Exception ex)
            //{
            //    return StatusCode(500, "Computer says no!");
            //}
            var thing = context.Users.Find(-1) ?? throw new Exception("A bad thing has happened");
            return thing;


        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }

    }
}
