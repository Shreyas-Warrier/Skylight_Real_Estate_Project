package com.example.Skylight.service;

import com.example.Skylight.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);

    User loginUser(String username, String password);

    User registerUser(User user);
    void deleteUser(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByEmail(String email);
}
