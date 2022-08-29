<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-12 card elevation-2 p-3 m-3">
        <img class="img-fluid" :src="event.coverImg" alt="" />
        <div class="d-flex justify-content-center">
          <div>
            <h2>{{ event.name }}</h2>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div>
            <h5>
              {{
                new Date(event.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </h5>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <p>
            {{ event.description }}
          </p>
        </div>
        <div class="d-flex justify-content-center">
          <p>Type: {{ event.type }}</p>
        </div>
        <div class="d-flex justify-content-center">
          <p>
            Capacity Remaining: <b>{{ event.capacity }}</b>
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <button
            v-if="event.isCanceled"
            class="btn btn-danger"
            disabled
            @click="ticket"
          >
            Cancled
          </button>

          <button
            v-else-if="event.capacity == 0"
            class="btn btn-danger"
            disabled
            @click="ticket"
          >
            Sold Out
          </button>
          <!-- Instead of disabling....make this a new button that on the @click will remove the ticket....you will need to pass the ticket id -->
          <button
            v-else-if="isAttending"
            class="btn btn-warning"
            disabled
            @click="ticket"
          >
            Already Attending
          </button>

          <!-- <button
            v-else-if="isAttending"
            class="btn btn-warning"
            @click="removeTicket"
          >
            Remove Ticket
          </button> -->

          <button v-else class="btn btn-primary" @click="ticket">
            Attend Event
          </button>
          <!-- <h2 v-if="event.isCanceled">Event is cancled</h2> -->

          <button
            v-if="event.creatorId == account.id"
            class="btn btn-warning"
            @click="cancelEvent"
          >
            Do You want to cancel this event?
          </button>
        </div>
      </div>
      <!-- SECTION this is to show the people attending the event -->
      <div class="col-12 my-3">
        <div class="row">
          <h4 class="text-center my-3">See Who's Attending!</h4>
          <div
            v-for="t in eventTickets"
            :key="t.id"
            class="col-1 d-flex justify-content-evenly my-2"
          >
            <img
              class="img-fluid profile-picture rounded-circle elevation-2"
              :src="t.profile.picture"
              :title="t.profile.name"
            />
          </div>
        </div>
      </div>
    </div>

    <CommentForm />
    <div class="row bg-dark mb-5 p-3">
      <div class="col-12">
        <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { ticketsService } from '../services/TicketsService'
import { commentsService } from '../services/CommentsService'

export default {
  setup() {
    const route = useRoute()
    async function getEventsById() {
      try {
        await eventsService.getById(route.params.eventId)
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

    async function getTicketsByEvent() {
      try {
        await ticketsService.getTicketsByEvent(route.params.eventId)
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

    onMounted(() => {
      getEventsById();
      getCommentsByEventId();
      getTicketsByEvent()
      // getTicketCreator()
    })
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      eventTickets: computed(() => AppState.eventTickets),
      ticketCreators: computed(() => AppState.ticketCreators),
      account: computed(() => AppState.account),
      isAttending: computed(() => {
        if (AppState.eventTickets.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      removeTicket: computed((ticketId) => {
        if (AppState.eventTickets.find(t => AppState.account.id == t.accountId)) {
          return true
        }
        return false
      }),

      async deleteTicket(id) {
        try {
          const yes = await Pop.confirm("Delete this ticket?");
          if (!yes) {
            return;
          }
          await ticketsService.deleteTicket(id);
        } catch (error) {
          logger.error("[Deleting Ticket]", error);
          Pop.error(error);
        }
      },

      async ticket() {
        try {
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id,
          }
          logger.log('tickets', newTicket)
          await ticketsService.create(newTicket)
        } catch (error) {
          Pop.error(error)
        }
      },

      async cancelEvent() {
        try {
          await eventsService.cancelEvent(route.params.eventId)
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

    }
  },
}


</script>

<style lang = "scss" scoped >
.profile-picture {
  height: 55px;
  width: 55px;
}

/* .container:hover{
  cursor:pointer
} */
</style>