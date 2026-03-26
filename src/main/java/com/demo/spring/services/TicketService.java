package com.demo.spring.services;



import com.demo.spring.entity.Ticket;
import com.demo.spring.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets(){
        return this.ticketRepository.findAll();
    }

}
