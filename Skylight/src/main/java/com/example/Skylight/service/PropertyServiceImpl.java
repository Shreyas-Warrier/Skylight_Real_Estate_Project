package com.example.Skylight.service;

import com.example.Skylight.model.Property;
import com.example.Skylight.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServiceImpl implements  PropertyService
{
    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<Property> getAllProperties()
    {
        return propertyRepository.findAll();
    }

    @Override
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }
}
