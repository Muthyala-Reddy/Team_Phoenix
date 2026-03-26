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
public class TicketRestController {

    private TicketService ticketService;

    public TicketRestController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping(path = "/",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Ticket>> findAllTickets(){
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> getOneTicket(@PathVariable Integer id){
        return ResponseEntity.ok(ticketService.getOneTicket(id));
    }

    @PostMapping(path = "/create",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket t){
        return ResponseEntity.ok(ticketService.saveTicket(t));
    }

    @PutMapping(path = "/update/{id}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ticket> updateTicket(@PathVariable Integer id, @RequestBody Ticket t){
        Ticket newUpdatedTicket=ticketService.updateTicket(id, t);
        return ResponseEntity.ok(newUpdatedTicket);
    }

    @DeleteMapping(path = "/delete/{id}",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> deleteTicket(@PathVariable Integer id){
        ticketService.deleteTicket(id);
        return ResponseEntity.ok(new ResponseMessage("ticket deleted"));
    }

<<<<<<< HEAD
//    Authentication purposewe created these two functions
=======
//    Authentication purpose we created these two functions
>>>>>>> 94f12d2ab325b93c99810364efb771a4569980c8
//    @GetMapping(path = "/User",produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<Ticket>> getLoginUser(){
//        return ResponseEntity.ok(ticketService.getUser());
//    }
//
//    @GetMapping(path = "/Admin",produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<Ticket>> getLoginAdmin(){
//        return ResponseEntity.ok(ticketService.getAdmin());
//    }




}
