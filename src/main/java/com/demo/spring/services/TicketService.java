package com.demo.spring.services;

import com.demo.spring.entity.Ticket;
import com.demo.spring.exceptions.TicketNotFoundException;
import com.demo.spring.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }


    public Ticket saveTicket(String username,Ticket t) {
        t.setCreatedBy(username);
        if (t.getCreatedAt() == null) {
            t.setCreatedAt(LocalDateTime.now());
        }
        t.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(t);
    }


    public Ticket getOneTicket(Long id){
        Optional<Ticket> ticketOp=ticketRepository.findById(id);
        if(ticketOp.isPresent()){
            return ticketOp.get();
        }else{
            throw new TicketNotFoundException("Ticket with the Id "+ id + " Not Found ");
        }
    }

    public Ticket updateTicket(Long id, Ticket t) {
        Ticket target = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new TicketNotFoundException("No Ticket found with id")
                );
        if (t.getStatus() != null) {
            target.setStatus(t.getStatus());
        }
        if (t.getPriority() != null) {
            target.setPriority(t.getPriority());
        }
        if(t.getUpdatedAt() == null && t.getStatus() == null && t.getPriority() == null){
            throw new IllegalArgumentException("No fields to update");
        }

        target.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(target);
    }

    public void deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new TicketNotFoundException("No ticket to delete");
        }
        ticketRepository.deleteById(id);
    }

    public List<Ticket> getUserTickets(String username) {
        return ticketRepository.findByCreatedBy(username);
    }

    public List<Ticket> getTicketsByCategory(String category) {
        return ticketRepository.findByCategory(category);
    }
}