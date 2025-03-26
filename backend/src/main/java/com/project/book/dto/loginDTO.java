package com.project.book.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class loginDTO {

    @NotBlank
    private String userName;

    @NotBlank
    private String password;
}
