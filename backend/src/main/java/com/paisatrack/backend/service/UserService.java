package com.paisatrack.backend.service;

import com.paisatrack.backend.dto.UserResponse;
import com.paisatrack.backend.dto.UserUpdateRequest;
import com.paisatrack.backend.entity.User;

public interface UserService {

    UserResponse getCurrentUser();

    UserResponse updateUser(UserUpdateRequest request);

    User getCurrentUserEntity();

}