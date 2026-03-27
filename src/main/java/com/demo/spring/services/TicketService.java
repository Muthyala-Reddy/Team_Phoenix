package com.demo.spring.services;

import com.demo.spring.exceptions.TicketFoundException;
import com.demo.spring.exceptions.TicketNotFoundException;
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

    public Ticket saveTicket(Ticket t){
        if(ticketRepository.existsById(t.getId())) {
            throw new TicketFoundException("Ticket already is there!!");
        }else{
            return ticketRepository.save(t);
        }
    }

    public Ticket updateTicket(Integer id, Ticket t) {
        Ticket target = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("No Ticket found associated with id!!"));
        if (t.getUpdated_at() != null) {
            target.setUpdated_at(t.getUpdated_at());
        }
        if (t.getStatus() != null) {
            target.setStatus(t.getStatus());
        }
        if (t.getPriority() != null) {
            target.setPriority(t.getPriority());
        }
        if (t.getUpdated_at() == null && t.getStatus() == null && t.getPriority() == null) {
            throw new IllegalArgumentException("No fields provided to update!");
        }
        return ticketRepository.save(target);
    }
    public void deleteTicket(Integer id){
        if(ticketRepository.existsById(id)){
            ticketRepository.deleteById(id);
        }else{
            throw new TicketNotFoundException("No ticket to delete");
        }
    }



}
