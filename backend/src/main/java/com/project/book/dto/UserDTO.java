package com.project.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {

    @NotBlank
    @Size(min = 3, max = 255)
    private String userName;

    @NotBlank
    @Size(min = 3, max = 255)
    private String password;

    @NotBlank
    @Size(min = 3, max = 255)
    private String email;
}
