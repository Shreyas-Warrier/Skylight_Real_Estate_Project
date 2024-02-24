package com.example.Skylight.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<String> getProperties(
            @RequestParam String purpose,
            @RequestParam(defaultValue = "yearly") String rentFrequency,
            @RequestParam(defaultValue = "0") String minPrice,
            @RequestParam(defaultValue = "1000000") String maxPrice,
            @RequestParam(defaultValue = "0") String roomsMin,
            @RequestParam(defaultValue = "0") String bathsMin,
            @RequestParam(defaultValue = "price-desc") String sort,
            @RequestParam(defaultValue = "35000") String areaMax,
            @RequestParam(defaultValue = "5002") String locationExternalIDs,
            @RequestParam(defaultValue = "4") String categoryExternalID,
            @RequestParam(required = false) Integer hitsPerPage
    ) {
        String url = "https://bayut.p.rapidapi.com/properties/list?" +
                "locationExternalIDs=" + locationExternalIDs +
                "&purpose=" + purpose +
                "&categoryExternalID=" + categoryExternalID +
                "&bathsMin=" + bathsMin +
                "&rentFrequency=" + rentFrequency +
                "&priceMin=" + minPrice +
                "&priceMax=" + maxPrice +
                "&roomsMin=" + roomsMin +
                "&sort=" + sort +
                "&areaMax=" + areaMax;

        if(hitsPerPage != null)
            url += "&hitsPerPage=" + hitsPerPage;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", rapidApiKey);
        headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }

    @GetMapping("/api/properties/{id}")
    public ResponseEntity<String> getPropertyById(@PathVariable String id) {
        String url = "https://bayut.p.rapidapi.com/properties/detail?externalID=" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", rapidApiKey);
        headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }
}
