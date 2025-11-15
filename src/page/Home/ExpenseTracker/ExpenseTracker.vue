<template>
  <v-card
    class="d-flex flex-column justify-space-between card"
    elevation="4"
    rounded="xl"
    @click="goRoute('AdditionalCosts')"
  >
    <div class="d-flex align-start text-start card-header">
      <v-icon color="#debe7e" size="33">mdi-cash-multiple</v-icon>
      <h2>Учет расходов</h2>
    </div>
    <div class="m-5 card-text">
      Учитывайте все аспекты содержания лагеря — аренду, уборку, обслуживание
      территории и любые иные услуги.
    </div>
    <v-btn class="btn-home">Добавить траты</v-btn>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goRoute(name) {
  if (name) router.push({ name });
}
</script>
<style scoped>
.card {
  cursor: pointer;
  border-radius: 15px !important;
  padding: 15px !important;
  border: 1.5px solid #fff;
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.96),
    rgba(255, 255, 255, 0.92)
  ) !important;
}
.card-header {
  gap: 12px;
}
.card:hover {
   filter: contrast(110%);
  /* border: 1.5px solid rgba(95, 136, 53, 0.25); */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2) !important;
}
h2 {
  font-family: var(--font-family-title);
  font-size: 1.5rem;
  color: #494c54;
  margin: -5px 0 10px;
  width: 90%;
  position: relative;
}
h2::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 50px;
  height: 3px;
  border-radius: 3px;
  background: #f0ad29;
}
/* Текст в карточке */
.card-text {
  font-family: "Poppins", sans-serif;
  font-size: 0.93rem;
  color: #505050;
  line-height: 1.45;
}
</style>
