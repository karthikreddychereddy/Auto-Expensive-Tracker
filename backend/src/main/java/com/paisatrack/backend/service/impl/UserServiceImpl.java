package com.paisatrack.backend.service.impl;

import com.paisatrack.backend.dto.UserResponse;
import com.paisatrack.backend.dto.UserUpdateRequest;
import com.paisatrack.backend.entity.User;
import com.paisatrack.backend.repository.UserRepository;
import com.paisatrack.backend.service.UserService;
import com.paisatrack.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;


    private User getLoggedInUser(){

        String email =
                SecurityUtil.getCurrentUserEmail();


        return userRepository.findByEmail(email)

                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );

    }



    @Override
    public UserResponse getCurrentUser() {


        User user = getLoggedInUser();


        return mapToResponse(user);

    }

    @Override
        public User getCurrentUserEntity() {

        return getLoggedInUser();

        }
    @Override
    public UserResponse updateUser(
            UserUpdateRequest request
    ) {


        User user = getLoggedInUser();


        user.setFirstName(
                request.getFirstName()
        );


        user.setLastName(
                request.getLastName()
        );


        user.setPhoneNumber(
                request.getPhoneNumber()
        );


        user.setProfileImage(
                request.getProfileImage()
        );


        user.setCurrency(
                request.getCurrency()
        );


        user.setLanguage(
                request.getLanguage()
        );


        User updated =
                userRepository.save(user);



        return mapToResponse(updated);

    }



    private UserResponse mapToResponse(User user){


        return new UserResponse(

                user.getId(),

                user.getFirstName(),

                user.getLastName(),

                user.getEmail(),

                user.getPhoneNumber(),

                user.getProfileImage(),

                user.getCurrency(),

                user.getLanguage(),

                user.getRole()

        );

    }

}