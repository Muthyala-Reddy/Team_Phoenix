package com.demo.spring;


import com.demo.spring.entity.Ticket;
import com.demo.spring.repositories.TicketRepository;
import com.demo.spring.services.TicketService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import  static org.mockito.Mockito.*;

@SpringBootTest
class TicketServiceTests {
    @MockitoBean
    TicketRepository ticketRepository;

    @Autowired
    TicketService ticketService;

    @Test
    void testTicketServiceForOneTicket() {
        when(ticketRepository.findById(1)).thenReturn(Optional.of(
                new Ticket(
                        1, "A", "B", "C", "D",
                        LocalDateTime.parse("2026-03-27T12:34:21"),
                        LocalDateTime.parse("2026-03-27T12:34:21")
                )
        ));

        Ticket ticket = ticketService.getOneTicket(1);
        Assertions.assertEquals("C", ticket.getStatus());
    }

    @Test
    void testGetAllTickets() {
        List<Ticket> tickets = List.of(new Ticket(), new Ticket());
        when(ticketRepository.findAll()).thenReturn(tickets);
        List<Ticket> result = ticketService.getAllTickets();
        Assertions.assertEquals(2, result.size());
        verify(ticketRepository).findAll();
    }

    @Test
    void testSaveTicket_success() {
        Ticket ticket = new Ticket();
        ticket.setId(10);
        when(ticketRepository.existsById(10)).thenReturn(false);
        when(ticketRepository.save(ticket)).thenReturn(ticket);
        Ticket saved = ticketService.saveTicket(ticket);
        Assertions.assertNotNull(saved);
        verify(ticketRepository).existsById(10);
        verify(ticketRepository).save(ticket);
    }

    @Test
    void testUpdateTicket_success() {
        Integer id = 1;

        Ticket existing = new Ticket();
        existing.setId(id);
        existing.setStatus("OPEN");

        Ticket update = new Ticket();
        update.setStatus("CLOSED");

        when(ticketRepository.findById(id)).thenReturn(Optional.of(existing));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(existing);

        Ticket result = ticketService.updateTicket(id, update);

        Assertions.assertEquals("CLOSED", result.getStatus());
        verify(ticketRepository).findById(id);
        verify(ticketRepository).save(existing);
    }

    @Test
    void testDeleteTicket_success() {
        Integer id = 1;

        when(ticketRepository.existsById(id)).thenReturn(true);
        doNothing().when(ticketRepository).deleteById(id);

        ticketService.deleteTicket(id);

        verify(ticketRepository).existsById(id);
        verify(ticketRepository).deleteById(id);
    }




}
