
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";



class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        logger.log('Got Events', res.data)
        AppState.events = res.data
    }

    async getById(id) {
        const res = await api.get('api/events/' + id)
        logger.log('Get Event By Id', res.data)
        AppState.activeEvent = res.data
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('Create Event', res.data)
        AppState.events.unshift(res.data)
        return res.data
    }

    async cancelEvent(id) {
        const res = await api.delete('api/events/' + id)
        logger.log('delete this event', res.data)
    }
}

export const eventsService = new EventsService()