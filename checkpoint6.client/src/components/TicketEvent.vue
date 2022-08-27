<template>
  <div class="bg-dark p-2 rounded">
    <i @click="deleteComment(comment.id)" class="mdi mdi-delete selectable"></i>
    <i @click="removeTicket(comment.id)" class="mdi mdi-delete-forever"></i>
    <img class="img-fluid" :src="ticket.event.coverImg" alt="" />
    <h4 class="text-center">{{ ticket.event.name }}</h4>
  </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    async function getMyTickets(id) {
      const res = await api.get('api/account/tickets')
      logger.log('Get Tickets By Event', res.data)
      AppState.activeEvent = res.data
    }
    return {
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
      async removeTicket() {
        try {
          await ticketsService.removeTicket(props.ticket.id)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
