package com.demo.spring;

import com.demo.spring.entity.Ticket;
import com.demo.spring.services.TicketService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class TicketServiceApplicationTests {

	@Autowired
	MockMvc mvc;

	@MockitoBean
	TicketService ticketService;



	@Test
	void testFindAllTicketsSuccess_empty() throws Exception {
		when(ticketService.getAllTickets()).thenReturn(List.of());

		mvc.perform(get("/ticket/admin/all"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.length()").value(0));

		verify(ticketService).getAllTickets();
	}



	@Test
	void testFindAllTicketsSuccess_twoTickets() throws Exception {
		List<Ticket> list = new ArrayList<>();
		Ticket t1 = new Ticket();
		t1.setId(1L);
		Ticket t2 = new Ticket();
		t2.setId(2L);
		list.add(t1);
		list.add(t2);

		when(ticketService.getAllTickets()).thenReturn(list);

		mvc.perform(get("/ticket/admin/all"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.length()").value(2));

		verify(ticketService).getAllTickets();
	}


	@Test
	void testGetOneTicketSuccess_byId() throws Exception {
		Ticket t = new Ticket();
		t.setId(1L);
		t.setStatus("OPEN");  // optional

		when(ticketService.getOneTicket(1L)).thenReturn(t);

		mvc.perform(get("/ticket/{id}", 1))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id").value(1));   // checks single object

		verify(ticketService).getOneTicket(1L);
	}


	@Test
	void testUpdateTicketSuccess() throws Exception {
		when(ticketService.updateTicket(eq(10L), any(Ticket.class))).thenReturn(new Ticket());

		String json = "{}";

		mvc.perform(put("/ticket/update/10")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json)
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

		verify(ticketService).updateTicket(eq(10L), any(Ticket.class));
	}

	@Test
	void testDeleteTicketSuccess() throws Exception {
		doNothing().when(ticketService).deleteTicket(10L);

		mvc.perform(delete("/ticket/delete/10"))
				.andExpect(status().isOk());

		verify(ticketService).deleteTicket(10L);
	}
}
