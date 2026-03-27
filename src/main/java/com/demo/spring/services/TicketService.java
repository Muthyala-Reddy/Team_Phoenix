package com.demo.spring.services;

import com.demo.spring.Exceptions.TicketFoundException;
import com.demo.spring.Exceptions.TicketNotFoundException;
import com.demo.spring.entity.Role;
import com.demo.spring.entity.Ticket;
import com.demo.spring.entity.Users;
import com.demo.spring.repositories.TicketRepository;
import com.demo.spring.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public List<Ticket> getAllTickets() {
        return this.ticketRepository.findAll();
    }

    public Ticket getOneTicket(Integer id) {
        Optional<Ticket> ticketOp = ticketRepository.findById(id);
        if (ticketOp.isPresent()) {
            return ticketOp.get();
        } else {
            throw new TicketNotFoundException("Ticket with the Id " + id + " Not Found ");
        }
    }

    public Ticket saveTicket(Ticket t) {
        if (ticketRepository.existsById(t.getId())) {
            throw new TicketFoundException("Ticket already is there!!");
        } else {
            Users loggedIn = getLoggedInUser();
            t.setCreatedBy(loggedIn.getUsername());

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

    public void deleteTicket(Integer id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
        } else {
            throw new TicketNotFoundException("No ticket to delete");
        }
    }

    public List<Ticket> getUser() {
        Users loggedInUser = getLoggedInUser();
        return ticketRepository.findByCreatedBy(loggedInUser.getUsername());
    }

    public List<Ticket> getAdmin() {
        Users loggedInUser = getLoggedInUser();

        if (loggedInUser.getRole() != Role.ADMIN) {
            throw new RuntimeException("Access denied: Admin only");
        }
        return ticketRepository.findAll();
    }

    private Users getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Logged in user not found in DB"));
    }
}