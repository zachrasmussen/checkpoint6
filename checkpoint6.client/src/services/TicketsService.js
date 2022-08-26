const { AppState } = require("../AppState");
const { logger } = require("../utils/Logger");
const { api } = require("./AxiosService");



class TicketsService {
    async create(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('Create Tickets', res.data)
        AppState.ticketCreator.push(res.data)
    }

    async getTicketsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Get Tickets', res.data)
        AppState.ticketCreator = res.data
    }

    async getTicketsByEventByAccount() {
        const res = await api.get('account/tickets')
        logger.log('Get Event Tickets', res.data)
        AppState.ticketEvent = res.data
    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/')
        logger.log('Remove Ticket', res.data)
        AppState.ticketCreator = AppState.ticketCreator.filter(t => t.id != ticketId)
        AppState.ticketEvent = AppState.ticketEvent.filter(t => t.id != ticketId)
    }
}

export const ticketsService = new TicketsService()