import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {
    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name picture')
        return event
    }

    async getAll() {
        const events = await dbContext.Events.find().sort({ createdAt: -1 }).populate('creator', 'name picture')
        return events
    }

    async getById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }

    async editEvent(eventId, eventData, userId) {
        let event = await this.getById(eventId)

        if (event.creatorId != userId) {
            throw new Forbidden("You dont own this event")

        }


        if (event.isCanceled == true) {
            throw new Forbidden('Even has been canceled')
        }
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.type = eventData.type || event.type
        event.startDate = eventData.startDate || event.startDate
        event.coverImg = eventData.coverImg || event.coverImg
        await event.save()
        return event
    }

    async archive(eventId, userId) {
        const event = await this.getById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("You don't have permission to delete that")
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return `event ${event.name} was archived`
    }
}

export const eventsService = new EventsService()
