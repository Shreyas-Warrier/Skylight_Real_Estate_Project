package com.example.Skylight.service;
import com.example.Skylight.model.Property;

import java.util.List;

public interface PropertyService
{
    List<Property> getAllProperties();

    Property saveProperty(Property property);
}
