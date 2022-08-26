<template>
  <div class="row bg-dark p-3">
    <form action="" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="" class="form-label"></label>
        <input
          type="text"
          v-model="editable.body"
          class="form-control"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder=""
        />
        <p id="helpId" class="form-text text-muted">Help text</p>
      </div>
      <button class="btn btn-primary">Add Comment</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async handleSubmit() {
        try {
          editable.value.eventId = route.params.eventId
          await commentsService.create(editable.value)
          editable.value = {}
          Pop.success('comment added')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>
</style>