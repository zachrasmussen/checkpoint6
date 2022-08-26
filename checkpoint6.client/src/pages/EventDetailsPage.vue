<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>{{ event.title }}</h2>
      </div>
      <!-- SECTION todo add button to for tickets -->
      <div class="col-3">
        <img class="img-fluid" :src="event.coverImg" alt="" />
      </div>
      <div class="col-2">
        <!-- SECTION collab button hide if you are already a collaborator -->
        <button v-if="!ticket" class="btn btn-info" @click="ticket">
          Tickets
        </button>
        <button v-else class="btn btn-danger" @click="removeTicket">
          Remove Ticket
        </button>
      </div>
      <div class="col-7">
        <div class="row">
          <div v-for="t in ticketCreators" class="col-2">
            <img
              class="img-fluid rounded elevation-2"
              :src="t.creator.picture"
              :title="t.creator.name"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- SECTION pictures -->
    <CommentForm />
    <div class="row">
      <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  setup() {
    const route = (useRoute())
    async function getEventsById() {
      try {
        await eventsService.getById(route.params.getEventsById)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getTicketCreator() {
      try {
        await ticketsService.getTicketCreatorByEvent(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
  },
}
onMounted(() => {
  getEventsById();
  getCommentsByEventId();
  getTicketCreator()
})
return {
  event: computed(() => AppState.activeEvent),
  comments: computed(() => AppState.comments),
  ticketCreators: computed(() => AppState.ticketCreators),

  async ticket() {
    try {
      let newTicket = {
        eventId: AppState.activeEvent.id,
      }
      logger.log('tickets', newTicket)
      await ticketsService.create(newTicket)
    } catch (error) {
      Pop.error(error)
    }
  },
  async removeTicket() {
    try {
      let ticketToRemove = AppState.ticketCreators.find(t => t.accountId == AppState.account.id)
      await ticketsService.removeTicket(ticketToRemove.id)
    } catch (error) {
      Pop.error(error)
    }
  },
  components: { CommentCard, CommentForm }
};

</script>

<style lang = "scss" scoped >
</style>