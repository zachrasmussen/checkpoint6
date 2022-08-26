<template>
  <!-- Button trigger modal -->

  <!--NOTE Modal -->
  <div
    class="modal fade"
    id="create-event"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <form
            @submit.prevent="handleSubmit"
            class="row bg-white p-4 elevation-2"
          >
            <div class="col-12">Create Event</div>
            <div class="col-6">
              <label for="" class="form-label">Name</label>
              <input
                type="text"
                v-model="editable.name"
                class="form-control"
                name="title"
                id="title"
              />
            </div>
            <div class="col-6">
              <label for="" class="form-label">Cover Image</label>
              <input
                type="url"
                v-model="editable.coverImg"
                class="form-control"
                name="title"
                id="title"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="col-6">
              <label for="" class="form-label">Location</label>
              <input
                type="text"
                v-model="editable.location"
                class="form-control"
                name="title"
                id="title"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="col-6">
              <label for="" class="form-label">Capacity</label>
              <input
                type="number"
                v-model="editable.capacity"
                class="form-control"
                name="title"
                id="title"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="col-6">
              <label for="" class="form-label">Start Date</label>
              <input
                type="date"
                v-model="editable.startDate"
                class="form-control"
                name="title"
                id="title"
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div class="col-6">
              <label for="" class="form-label">Category</label>
              <select
                v-model="editable.type"
                name=""
                id=""
                class="form-control"
              >
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <label for="Description"></label>
            <textarea
              name="description"
              v-model="editable.description"
              id="title"
              cols="10"
              rows="10"
            ></textarea>
            <button class="col-6 btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {

      editable,
      async handleSubmit() {
        try {
          logger.log('creating event', editable.value)
          const tEvent = await eventsService.createEvent(editable.value)
          Modal.getOrCreateInstance("#create-event").hide()
          Pop.toast('Event Created!')
          router.push({ name: 'EventDetails', params: { eventId: tEvent.id } })
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
