﻿using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] //account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) { return BadRequest("Username is taken"); }

            return Ok();
            //using var hmac = new HMACSHA512();
            //var user = new AppUser() { 
            //    UserName = registerDto.Username.ToLower(), 
            //    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)), 
            //    PasswordSalt = hmac.Key 
            //};
            //context.Users.Add(user);
            //await context.SaveChangesAsync();
            //return new UserDto { Username = registerDto.Username, Token = tokenService.CreateToken(user) };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid Username");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++) { 
                if(computeHash[i] != user.PasswordHash[i]) { return Unauthorized("Invalid Password"); }
            }

            return new UserDto() { Username=user.UserName, Token=tokenService.CreateToken(user) };
        }

        private async Task<bool> UserExists(string userName)
        {
            return await context.Users.AnyAsync(u => u.UserName.ToLower() == userName.ToLower());
        }
    }
}
