package com.project.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RoleDTO {

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String name;

    @NotBlank
    @NotNull
    @Size(max = 255)
    private String description;

}
