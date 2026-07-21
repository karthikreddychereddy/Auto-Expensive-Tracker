package com.paisatrack.backend.controller;


import com.paisatrack.backend.dto.UserResponse;
import com.paisatrack.backend.dto.UserUpdateRequest;
import com.paisatrack.backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {


    private final UserService userService;



    @GetMapping("/profile")
    public UserResponse getProfile(){

        return userService.getCurrentUser();

    }



    @PutMapping("/profile")
    public UserResponse updateProfile(
            @RequestBody UserUpdateRequest request
    ){

        return userService.updateUser(request);

    }


}