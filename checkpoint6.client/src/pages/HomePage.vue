<template>
  <div class="container-fluid">
    <div class="row">
      <div class="masonry bg-dark">
        <div class="" v-for="e in events" :key="e.id">
          <EventCard :album="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { computed, onMounted } from '@vue/runtime-core';
import { eventsService } from '../services/EventsService';

export default {
  name: 'Home',
  setup() {
    const filterTerm = ref('')
    async function getEvents() {
      try {
        await eventsService.getAll();
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEvents();
    })
    return {
      filterTerm,
      events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true)),
    }
  }


}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
