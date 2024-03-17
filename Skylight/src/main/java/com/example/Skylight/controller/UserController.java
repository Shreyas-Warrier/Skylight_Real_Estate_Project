package com.example.Skylight.controller;

import com.example.Skylight.model.Property;
import com.example.Skylight.model.User;
import com.example.Skylight.service.PropertyService;
import com.example.Skylight.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
@PropertySource("classpath:config.properties")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PropertyService propertyService;

    private final String rapidApiKey;

    private final RestTemplate restTemplate;

    public UserController(RestTemplate restTemplate, @Value("${rapid.api.key}") String rapidApiKey) {
        this.restTemplate = restTemplate;
        this.rapidApiKey = rapidApiKey;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }
        userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.loginUser(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> passwordData) {
        String newPassword = passwordData.get("password");
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be empty");
        }
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setPassword(newPassword);
        userService.updateUser(id, user);
        return ResponseEntity.ok("Password updated successfully");
    }

    @GetMapping("/{userId}/properties")
    public ResponseEntity<List<Property>> getUserProperties(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            List<Property> properties = user.getInterestedProperties();
            return ResponseEntity.ok(properties);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("User logged out successfully");
    }
    @Transactional
    @GetMapping("/{UserId}/properties/buy")
    public ResponseEntity<String> buyProperty(@PathVariable Long UserId, @RequestParam String propertyId) {
        User user = userService.getUserById(UserId);
        if (user != null) {
            // Fetch property details directly here
            String propertyUrl = "https://bayut.p.rapidapi.com/properties/detail?externalID=" + propertyId;

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", rapidApiKey);
            headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> propertyResponse = restTemplate.exchange(propertyUrl, HttpMethod.GET, entity, String.class);
            if (propertyResponse.getStatusCode() == HttpStatus.OK) {
                Property property = parseAndMapProperty(propertyResponse.getBody());
                property.setInterested_user(user);
                user.getInterestedProperties().add(property);
                propertyService.saveProperty(property);
                userService.updateUser(user.getId(), user);
                return ResponseEntity.ok("Property bought successfully");
            }
        }
        return ResponseEntity.badRequest().body("Failed to buy property");
    }

    private Property parseAndMapProperty(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        Property property = new Property();

        try {
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            //Extracting property details from JSON and setting them in the Property object

            JsonNode purposeNode = jsonNode.get("purpose");
            if (purposeNode != null) {
                property.setPurpose(purposeNode.asText());
            }

            JsonNode externalIdNode = jsonNode.get("externalID");
            if (externalIdNode != null) {
                property.setExternalId(externalIdNode.asText());
            }

            JsonNode priceNode = jsonNode.get("price");
            if (priceNode != null) {
                property.setPrice(priceNode.asDouble());
            }

            JsonNode roomsNode = jsonNode.get("rooms");
            if (roomsNode != null) {
                property.setRooms(roomsNode.asInt());
            }

            JsonNode bathsNode = jsonNode.get("baths");
            if (bathsNode != null) {
                property.setBaths(bathsNode.asInt());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return property;
    }

}