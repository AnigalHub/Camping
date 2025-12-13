<template>
  <div class="content-wrapper-home">
    <div class="wrapper">
      <v-container class="pt-8" min-height="100vh">
        <PersonCard v-if="!isDesktop"/>
        <MainBlocks />
        <div class="d-flex align-stretch justify-space-between responsive-blocks">
          <div class="trips-block">
            <UpcomingTrips class="h-100" />
          </div>
          <div class="expense-block">
            <ExpenseTracker class="h-100" />
          </div>
        </div>
        <AvailableGlades />
        <CampManagement />
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount} from "vue";

import PersonCard from "./PersonCard/PersonCard.vue";
import MainBlocks from "./MainBlocks/MainBlocks.vue";
import UpcomingTrips from "./UpcomingTrips/UpcomingTrips.vue";
import ExpenseTracker from "./ExpenseTracker/ExpenseTracker.vue";
import AvailableGlades from "./AvailableGlades/AvailableGlades.vue";
import CampManagement from "./CampManagement/CampManagement.vue";

const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value >= 1125);

function onResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(async () => {
    window.addEventListener("resize", onResize);
}); 

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.content-wrapper-home {
  background: var(--background-color-page);
  min-height: 100vh;
  height: auto;
  padding-bottom: 20px;
}

.trips-block {
  width: 75%;
}

.responsive-blocks{
  gap: 32px;
  padding-top: 32px;
}


.expense-block {
  width: 25%;
}

/* Адаптив для маленьких экранов */
@media screen and (min-width: 850px) and (max-width: 1300px) {
  .trips-block {
    width: 70%;
  }

  .expense-block {
    width: 30%;
  }
}
@media screen and (max-width: 850px) {
  .responsive-blocks{
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
  }

  .trips-block {
    width: 100%;
  }

  .expense-block {
    width: 100%;
  }
}
</style>
