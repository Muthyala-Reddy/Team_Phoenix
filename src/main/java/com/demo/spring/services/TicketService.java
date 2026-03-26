package com.demo.spring.services;

import com.demo.spring.Exceptions.TicketFoundException;
import com.demo.spring.repositories.TicketRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    private TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
    }

}
