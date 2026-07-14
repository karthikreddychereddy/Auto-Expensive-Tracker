package com.paisatrack.backend.dto;

import lombok.Data;

@Data
public class CategoryRequest {

    private String name;

    private String description;

    private String color;

    private String icon;
}