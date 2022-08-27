<template>
  <div>
    <div class="col-2">
      <i
        @click="deleteComment(comment.id)"
        class="mdi mdi-delete selectable"
      ></i>
      <img
        class="img-fluid"
        :src="comment.creator.picture"
        alt=""
        :title="comment.creator.picture"
      />
      <p>{{ comment.creator.name }}</p>
    </div>
    <div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<script>
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  props: { comment: { type: Object, required: true } },
  setup() {
    return {
      async deleteComment(id) {
        try {
          const yes = await Pop.confirm("Delete this comment?");
          if (!yes) {
            return;
          }
          debugger
          await commentsService.deleteComment(id);
        } catch (error) {
          logger.error("[Deleting Comment]", error);
          Pop.error(error);
        }
      },
    };
  },

};


</script>


<style lang="scss" scoped>
</style>
