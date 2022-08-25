import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class CommentsService {
    async create(body) {
        const event = await dbContext.Comments.create(body)
        await event.populate('creator', 'name picture')
        return event
    }

    async getComments(id) {
        const comment = await dbContext.Comments.find({ eventId: id }).populate('creator', 'name picture')
        return comment
    }
    async delete(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator', 'name picture')
        // @ts-ignore
        if (comment.creatorId.toString() != userId) {
            throw new BadRequest("You don't have permission to delete that")
        }

        // @ts-ignore
        await comment.delete()
        // @ts-ignore
        return `comment ${comment.name} was deleted`
    }
}

export const commentsService = new CommentsService()
