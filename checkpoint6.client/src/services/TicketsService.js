import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";



class TicketsService {
    async create(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('Create Tickets', res.data)
        AppState.eventTickets.push(res.data)
    }

    async getTicketsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Get Tickets', res.data)
        AppState.eventTickets = res.data
    }

    async getMyTickets(eventId) {
        const res = await api.get('api/account/tickets')
        logger.log('Get My Tickets', res.data)
        AppState.myTickets = res.data
    }

    async getTicketsByEventByAccount() {
        const res = await api.get('account/tickets')
        logger.log('Get Event Tickets', res.data)
        AppState.ticketEvent = res.data
    }

    async deleteTicket(id) {
        const res = await api.delete('api/account/tickets')
        if (res.data) {
            AppState.tickets = AppState.tickets.filter(t => t.tickets !== id)
        }
    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/')
        logger.log('Remove Ticket', res.data)
        AppState.ticketCreator = AppState.ticketCreator.filter(t => t.id != ticketId)
        AppState.ticketEvent = AppState.ticketEvent.filter(t => ticketId != t.id)
    }
}

export const ticketsService = new TicketsService()