<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="col-3 bg-white card elevation-2 rounded selectable mt-5">
      <div class="p-1">
        <img class="img-fluid" :src="event.coverImg" alt="" />
        <div class="my-3">
          <h3 class="text-dark px-3">{{ event.name }}</h3>
          <h6 class="px-3">{{ event.creator.name }}</h6>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { router } from '../router'
import { AppState } from '../AppState'

export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
</style>