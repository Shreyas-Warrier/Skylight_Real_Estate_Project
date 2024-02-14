package com.example.Skylight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class PropertyController {

    private final RestTemplate restTemplate;

    @Autowired
    public PropertyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/api/properties")
    public ResponseEntity<String> getProperties(@RequestParam String type) {
        String url = "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=" + type + "&hitsPerPage=6";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "2805333c53mshfa16d043052cef2p13524fjsn7b59fac6c514");
        headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response;
    }
}