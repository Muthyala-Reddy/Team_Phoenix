package com.demo.spring;

import com.demo.spring.entity.Ticket;
import com.demo.spring.repositories.TicketRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.List;

@DataJpaTest
class TicketRepositoryTests {

    @Autowired
    private TicketRepository ticketRepository;

    @Test
    void testFindAll() {
        List<Ticket> ticketList = ticketRepository.findAll();
        Assertions.assertEquals(0, ticketList.size());
    }
}
