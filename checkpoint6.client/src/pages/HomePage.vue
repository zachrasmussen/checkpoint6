<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Tickets</h2>
      </div>
      <div v-for="t in ticketEvent" :key="t.id" class="col-3">
        <TicketEvent :ticket="t" />
      </div>
    </div>
    <div class="row bg-dark py-1 px-5 text-light">
      <div class="col-12">
        <h2>Popular Events</h2>
      </div>
      <div class="col-12">filter <i class="mdi mdi-filter"></i></div>
      <div
        class="col-2 btn btn-outline-light rounded-pill"
        @click="filterTerm = ''"
      >
        All
      </div>
      <div
        class="col-2 btn btn-outline-light rounded-pill"
        @click="filterTerm = 'concert'"
      >
        Concert
      </div>
      <div
        class="col-2 btn btn-outline-light rounded-pill"
        @click="filterTerm = 'convention'"
      >
        Convention
      </div>
      <div
        class="col-2 btn btn-outline-light rounded-pill"
        @click="filterTerm = 'sport'"
      >
        Sport
      </div>
      <div
        class="col-2 btn btn-outline-light rounded-pill"
        @click="filterTerm = 'digital'"
      >
        Digital
      </div>
    </div>
    <div class="masonry bg-dark">
      <div class="" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
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
      ticketEvents: computed(() => AppState.ticketEvents)
    }
  }


}
</script>

<style scoped lang="scss">
.masonry {
  columns: 200px;
  column-gap: 1em;

  div {
    display: block;
    margin-bottom: 1em;
  }
}
</style>
