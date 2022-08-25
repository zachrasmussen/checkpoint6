import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
    async create(newTicket) {
        const tEvent = await dbContext.Events.findById(newTicket.eventId)


        // @ts-ignore
        if (tEvent.capacity == 0) {
            throw new BadRequest("there are no more spots")
        }
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('profile', 'name picture')
        // @ts-ignore
        tEvent.capacity -= 1
        // @ts-ignore
        tEvent.save()
        return ticket
    }

    async getByAccountId(id) {
        const event = await dbContext.Tickets.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no ticket by that id')
        }
        return event
    }

    async getMyTickets(id) {
        const ticket = await dbContext.Tickets.find({ accountId: id }).populate('event')
        return ticket
    }

    async getEventTickets(eventId) {
        const eventTicket = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
        return eventTicket
    }
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('creator', 'name picture')
        // @ts-ignore
        if (comment.creatorId.toString() != userId) {
            throw new BadRequest("You don't have permission to delete that")
        }

        // @ts-ignore
        await comment.deleteTicket()
        // @ts-ignore
        return `comment ${comment.name} was deleted`
    }
}



export const ticketsService = new TicketsService()