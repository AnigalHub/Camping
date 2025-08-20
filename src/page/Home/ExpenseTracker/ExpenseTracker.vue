<template>
  <v-card
    class="d-flex flex-column justify-space-between card"
    elevation="4"
    rounded="xl"
    @click="goRoute"
  >
    <div class="d-flex align-start text-start card-header">
      <v-icon color="#debe7e" size="33">mdi-cash-multiple</v-icon>
      <h2>Учет расходов</h2>
    </div>
    <div class="m-5 card-text">
      Учитывайте все аспекты содержания лагеря — аренду, уборку,
      обслуживание территории и любые иные услуги.
    </div>
    <v-btn class="btn-home">Добавить траты</v-btn>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goRoute = () => router.push({ name: "AdditionalCosts" });
</script>

<style scoped>
.card {
  cursor: pointer;
  padding: 15px !important;
  border: 1.5px solid #fff;
  border-radius: 15px !important;
  background: linear-gradient(165deg, #fffffff5, #ffffffeb) !important;
  transition: transform .3s ease, filter .3s ease, box-shadow .3s ease;
}

.card-header {
  gap: 12px;
}

.card:hover {
  filter: contrast(110%);
  transform: scale(1.025);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

h2 {
  width: 90%;
  margin: -5px 0 10px;
  font-family: var(--font-family-title);
  font-size: 1.45rem;
  color: #494c54;
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

.card-text {
  font-family: var(--font-family-text);
  font-size: 0.93rem;
  color: #505050;
  line-height: 1.45;
}

/* ------- КНОПКА ------- */

.btn-home {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 5px;
  width: 180px;
  font-weight: 600;
}

/* --- Адаптивность --- */
@media (max-width: 850px) {
  .card-text {
    margin: 20px 15px;
  }

  .btn-home {
    width: 55%;
    align-self: flex-end;
  }
}

@media (max-width: 600px) {
  .btn-home {
    width: 100%;
    align-self: stretch;
  }
}

@media (max-width: 960px) {
  h2 {
    font-size: 1.3rem;
  }
}

</style>
