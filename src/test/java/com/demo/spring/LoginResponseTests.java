package com.demo.spring;

import com.demo.spring.dto.LoginResponse;
import com.demo.spring.exceptions.TicketFoundException;
import org.junit.jupiter.api.Test;


import static com.demo.spring.entity.Role.USER;
import static org.junit.jupiter.api.Assertions.*;

class LoginResponseTests {

    @Test
    void loginResponse_shouldCreateObject() {
        LoginResponse res = new LoginResponse("user1", USER);

        assertNotNull(res);
        assertEquals("user1", res.getUsername());
        assertEquals(USER, res.getRole());
    }

    @Test
    void ticketFoundException_shouldThrow() {
        assertThrows(TicketFoundException.class, () -> {
            throw new TicketFoundException("Ticket not found");
        });
    }
}
