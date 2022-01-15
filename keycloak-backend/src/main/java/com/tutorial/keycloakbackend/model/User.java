package com.tutorial.keycloakbackend.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {

    private static final long serialVersionUID = -1L;

    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}
