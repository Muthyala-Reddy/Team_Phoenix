package com.demo.spring.services;



import com.demo.spring.exceptions.TicketFoundException;
import com.demo.spring.exceptions.TicketNotFoundException;
import com.demo.spring.entity.Ticket;
import com.demo.spring.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    private TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository){
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets(){
        return this.ticketRepository.findAll();
    }

    public Ticket getOneTicket(Integer id){
        Optional<Ticket> ticketOp=ticketRepository.findById(id);
        if(ticketOp.isPresent()){
            return ticketOp.get();
        }else{
            throw new TicketNotFoundException("Ticket with the Id "+ id + " Not Found ");
        }
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
        if (t.getUpdatedAt() != null) {
            target.setUpdatedAt(t.getUpdatedAt());
        }
        if (t.getStatus() != null) {
            target.setStatus(t.getStatus());
        }
        if (t.getPriority() != null) {
            target.setPriority(t.getPriority());
        }
        if (t.getUpdatedAt() == null && t.getStatus() == null && t.getPriority() == null) {
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
