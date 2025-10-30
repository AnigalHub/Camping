<template>
  <div class="content_wrapper_home">
    <div class="wrapper">
      <v-container class="pt-10" min-height="100vh">
        <MainBlocks />
        <div class="d-flex align-stretch justify-space-between pt-8 ga-8">
          <div style="width: 75%">
            <UpcomingTrips class="h-100" />
          </div>
          <div style="width: 25%">
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
import MainBlocks from "./MainBlocks/MainBlocks.vue";
import UpcomingTrips from "./UpcomingTrips/UpcomingTrips.vue";
import ExpenseTracker from "./ExpenseTracker/ExpenseTracker.vue";
import AvailableGlades from "./AvailableGlades/AvailableGlades.vue";
import CampManagement from "./CampManagement/CampManagement.vue";
</script>
<style>
.v-list-item-title {
  font-weight: 800 !important;
  letter-spacing: 0.009375em;
  font-size: 1.15rem !important;
  font-family: "Poiret One", sans-serif;
  color: #455e25;
  margin-top: 6px;
}

.v-list-item__prepend {
  display: block !important;
  margin-right: 5px;
  color: #233b06;
}
</style>

<style scoped>
.content_wrapper_home {
  background: #edeef0;
  min-height: 100vh;
  height: auto;
  padding-bottom: 60px;
}
</style>
