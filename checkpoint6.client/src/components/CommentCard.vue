<template>
  <div class="col-2">
    <img
      class="img-fluid"
      :src="comment.creatorId.picture"
      alt=""
      :title="comment.creatorId.name"
    />
  </div>
</template>


<script>
export default {
  props: { comment: { type: Object, required: true } },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>
