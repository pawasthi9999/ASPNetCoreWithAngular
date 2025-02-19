using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController //, IMapper mapper
    {
        //private readonly DataContext _context=context;
        //public UsersController(DataContext context)
        //{
        //    _context = context;
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() 
        {
            //var users = await userRepository.GetUsersAsync(); // context.Users.ToListAsync();
            //var UserstoReturn = mapper.Map<IEnumerable<MemberDto>>(users);
            //return Ok(UserstoReturn);
            var users = await userRepository.GetMembersAsync();
            return Ok(users);
        }

        //[HttpGet("{id:int}")]   //api/Users/3
        [HttpGet("{username}")]   //api/Users/3
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var user = await userRepository.GetUserByUsernameAsync(username); //context.Users.FindAsync(id);
            //if (user == null) return NotFound();
            //return mapper.Map<MemberDto>(user);
            ////return user;
            
            var user = await userRepository.GetMemberAsync(username);
            return user;

        }
    }
}
