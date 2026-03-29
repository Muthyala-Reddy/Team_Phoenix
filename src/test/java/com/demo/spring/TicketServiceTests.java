package com.demo.spring;


import com.demo.spring.entity.Ticket;
import com.demo.spring.exceptions.TicketNotFoundException;
import com.demo.spring.repositories.TicketRepository;
import com.demo.spring.services.TicketService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
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
        when(ticketRepository.findById(1L)).thenReturn(Optional.of(
                new Ticket(
                        1L, "A", "B", "C", "D",
                        LocalDateTime.parse("2026-03-27T12:34:21"),
                        LocalDateTime.parse("2026-03-27T12:34:21")
                )
        ));

        Ticket ticket = ticketService.getOneTicket(1L);
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

        when(ticketRepository.save(ticket)).thenReturn(ticket);

        Ticket saved = ticketService.saveTicket("user1", ticket);

        Assertions.assertNotNull(saved);
        verify(ticketRepository).save(ticket);
    }

    @Test
    void testUpdateTicket_success() {
        Long id = 1L;

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
        Long id = 1L;

        when(ticketRepository.existsById(id)).thenReturn(true);
        doNothing().when(ticketRepository).deleteById(id);

        ticketService.deleteTicket(id);

        verify(ticketRepository).existsById(id);
        verify(ticketRepository).deleteById(id);
    }


    @Test
    void testGetUserTickets() {
        String username = "user1";

        Ticket t1 = new Ticket();
        t1.setCreatedBy(username);

        Ticket t2 = new Ticket();
        t2.setCreatedBy(username);

        when(ticketRepository.findByCreatedBy(username))
                .thenReturn(List.of(t1, t2));

        List<Ticket> result = ticketService.getUserTickets(username);

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals(username, result.get(0).getCreatedBy());
        verify(ticketRepository).findByCreatedBy(username);
    }

    @Test
    void testGetTicketsByCategory() {
        String category = "IT";

        Ticket t1 = new Ticket();
        t1.setCategory(category);

        when(ticketRepository.findByCategory(category))
                .thenReturn(List.of(t1));

        List<Ticket> result = ticketService.getTicketsByCategory(category);

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals(category, result.get(0).getCategory());
        verify(ticketRepository).findByCategory(category);
    }

    @Test
    void testUpdateTicket_ticketNotFound_exception() {
        when(ticketRepository.findById(99L)).thenReturn(Optional.empty());

        Executable executable =
                () -> ticketService.updateTicket(99L, new Ticket());

        Assertions.assertThrows(TicketNotFoundException.class, executable);

        verify(ticketRepository).findById(99L);
    }

    @Test
    void testUpdateTicket_noFieldsToUpdate_exception() {
        Ticket existing = new Ticket();
        existing.setId(1L);

        when(ticketRepository.findById(1L)).thenReturn(Optional.of(existing));

        Executable executable =
                () -> ticketService.updateTicket(1L, new Ticket());

        Assertions.assertThrows(IllegalArgumentException.class, executable);

        verify(ticketRepository).findById(1L);
        verify(ticketRepository, never()).save(any());
    }

    @Test
    void testDeleteTicket_ticketNotFound_exception() {
        when(ticketRepository.existsById(5L)).thenReturn(false);

        Executable executable =
                () -> ticketService.deleteTicket(5L);

        Assertions.assertThrows(TicketNotFoundException.class, executable);

        verify(ticketRepository).existsById(5L);
        verify(ticketRepository, never()).deleteById(any());
    }





}
