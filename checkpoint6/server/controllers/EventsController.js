import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import BaseController from "../utils/BaseController"




export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getComments)
            .get('/:id/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.editEvent)
            .delete('/:id', this.archive)


    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            let event = await eventsService.editEvent(req.params.id, req.body, req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async archive(req, res, next) {
        try {
            const message = await eventsService.archive(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next) {
        try {
            const comment = await commentsService.getComments(req.params.id)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const eventTicket = await ticketsService.getEventTickets(req.params.id)
            return res.send(eventTicket)
        } catch (error) {
            next(error)
        }
    }

}