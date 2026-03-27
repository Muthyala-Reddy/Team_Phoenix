package com.demo.spring.repositories;

import com.demo.spring.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket,Integer>
{
}
