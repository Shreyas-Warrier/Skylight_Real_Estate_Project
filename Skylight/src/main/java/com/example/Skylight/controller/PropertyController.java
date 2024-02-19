package com.example.Skylight.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Properties;

@RestController
@PropertySource("classpath:config.properties")
public class PropertyController {

    private final RestTemplate restTemplate;
    private final String rapidApiKey;

    @Autowired
    public PropertyController(RestTemplate restTemplate, @Value("${rapid.api.key}") String rapidApiKey) {
        this.restTemplate = restTemplate;
        this.rapidApiKey = rapidApiKey;
    }

    @GetMapping("/api/properties")
    public ResponseEntity<String> getProperties(@RequestParam String type) {
        String url = "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=" + type + "&hitsPerPage=6";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", rapidApiKey);
        headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response;
    }
}
