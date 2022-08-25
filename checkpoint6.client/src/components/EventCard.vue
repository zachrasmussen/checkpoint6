<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="bg-light border elevation-2 rounded selectable">
      <div class="p-1">
        <img class="img-fluid" :src="event.coverImg" alt="" />
        <h3 class="text-dark">{{ event.name }}</h3>
        <h6>{{ event.creator.name }}</h6>
      </div>
    </div>
  </router-link>
</template>


<script>
import { router } from '../router'


export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    return {
      goTo() {
        router.push({ name: 'EventDetails', params: { eventId: props.event.id } })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>