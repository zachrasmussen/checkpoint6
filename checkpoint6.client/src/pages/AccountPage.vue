<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded-circle" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <div class="col-8 d-flex justify-content-center">
      <h2>My Tickets</h2>
    </div>
    <div v-for="t in ticket" :key="t.id" class="col-3">
      <TicketEvent :ticket="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
export default {
  name: 'Account',
  setup() {
    async function getMyTickets(id) {
      const res = await api.get('api/account/tickets')
      logger.log('Get Tickets By Event', res.data)
      AppState.events = res.data
    }
    async function getEventsById() {
      try {
        await eventsService.getById(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getMyTickets();
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
