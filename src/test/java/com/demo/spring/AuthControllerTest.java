package com.demo.spring;
import com.demo.spring.entity.Users;
import com.demo.spring.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // ✅ success
    @Test
    void login_success() throws Exception {
        Users req = new Users();
        req.setUsername("user1");
        req.setPassword("pass1");

        Users dbUser = new Users();
        dbUser.setUsername("user1");
        dbUser.setPassword("pass1");

        when(userRepository.findByUsername("user1"))
                .thenReturn(Optional.of(dbUser));

        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk());
    }

    // ✅ wrong password
    @Test
    void login_wrongPassword() throws Exception {
        Users req = new Users();
        req.setUsername("user1");
        req.setPassword("wrong");

        Users dbUser = new Users();
        dbUser.setUsername("user1");
        dbUser.setPassword("pass1");

        when(userRepository.findByUsername("user1"))
                .thenReturn(Optional.of(dbUser));

        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized());
    }



}