package com.demo.spring.controllers;

import com.demo.spring.entity.Ticket;
import com.demo.spring.services.TicketService;
import com.demo.spring.util.ResponseMessage;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketRestController {

    private final TicketService ticketService;

    public TicketRestController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping(path = "/admin/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Ticket>> findAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }
    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> getOneTicket(@PathVariable Long id){
        return ResponseEntity.ok(ticketService.getOneTicket(id));
    }

    @PostMapping(path = "/create",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> createTicket( @RequestParam String username,@RequestBody Ticket t) {
        t.setCreatedBy(username);
        return ResponseEntity.ok(ticketService.saveTicket(username,t));
    }

    @PutMapping(
            path = "/update/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id,
            @RequestBody Ticket t
    ) {
        return ResponseEntity.ok(ticketService.updateTicket(id, t));
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.ok(new ResponseMessage("ticket deleted"));
    }

    @GetMapping(path = "/User", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Ticket>> getLoginUser(
            @RequestParam String username
    ) {
        return ResponseEntity.ok(ticketService.getUserTickets(username));
    }

    @GetMapping(
            path = "/admin/category/{category}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<Ticket>> getTicketsByCategory(
            @PathVariable String category
    ) {
        return ResponseEntity.ok(ticketService.getTicketsByCategory(category));
    }
}