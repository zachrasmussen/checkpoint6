import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";



class CommentsService {

    async create(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('Created Comment', res.data)
        AppState.comments.push(res.data)
    }
    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('Comments', res.data)
        AppState.comments = res.data
    }
}

export const commentsService = new CommentsService()