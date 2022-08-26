<template>
  <div class="col-2">
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
    <img class="img-fluid" src="comm" alt="" />
  </div>
</template>


<script>
export default {
  props: { comment: { type: Object, required: true } },
  setup() {
    return {};
  },
  async deleteComment(id) {
    try {
      const yes = await Pop.confirm("Delete this comment?");
      if (!yes) {
        return;
      }
      await commentsService.deleteComment(id);
    } catch (error) {
      logger.error("[Deleting Comment]", error);
      Pop.error(error);
    }
  },
};


</script>


<style lang="scss" scoped>
</style>
