<template></template>

<script>
import { ref } from '@vue/reactivity';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';

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
