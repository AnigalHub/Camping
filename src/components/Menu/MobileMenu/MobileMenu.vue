<template>
  <nav class="mobile-menu" role="navigation" aria-label="Mobile bottom menu">
    <button v-for="(btn, i) in allButtons" :key="i" class="menu-btn" :class="{ active: isActive(btn.route) }"
      @click="goRoute(btn.route)" :aria-label="btn.label">
      <img v-if="btn.img" :src="btn.img" alt="home icon" class="img-icon" />
      <div v-else class="icons">
        <v-icon>{{ btn.icon }}</v-icon>
      </div>
    </button>
  </nav>
</template>

<script setup>
import organization from './../../../../public/data/organization.json';
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
function isActive(name) { return route.name === name; }

const allButtons = [
  { icon: "mdi-account-plus-outline", label: "Регистрация", route: "AddClients" },
  { icon: "mdi-account-group-outline", label: "Список клиентов", route: "ListClients" },
  { img: organization.img, route: "Home" },
  { icon: "mdi-calendar-clock-outline", label: "Ближайшие выезды", route: "Trips" },
  { icon: "mdi-dots-grid", label: "Прочее", route: "Other" },
];

function goRoute(name) {
  router.push({ name });
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
  z-index: 1100;
  display: flex;
  margin: 0 15px;
  justify-content: space-around;
  align-items: center;
  background: rgba(245, 250, 255, 0.8);
  backdrop-filter: blur(6px);
  border: 1px solid rgb(52 113 206 / 35%);
  border-radius: 28px;
  padding: 10px 8px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.15), 2px 2px 8px rgba(17, 44, 18, 0.14);
}

.menu-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  color: rgba(0, 0, 0, 0.55);
}

.icons {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  backdrop-filter: blur(14px);
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icons:hover{
  border: 1px solid rgba(60, 95, 150, 0.25);
}

.menu-btn.active .icons {
  border: 1px solid rgb(240 173 41 / 31%);
}

.icons:hover,
.menu-btn.active .icons {
  background: #fff;
  transform: scale(1.25);
}

.menu-btn.active .icons i {
  filter: drop-shadow(0 3px 8px rgba(200, 220, 240, 0.85));
  color: rgb(240 173 41);
}

.menu-btn.active img {
  filter: drop-shadow(0 3px 15px rgba(200, 220, 240, 0.95));
  transform: scale(1.65);
}

i {
  font-size: 30px;
  color: rgba(60, 95, 150, 0.65);
  transition: color 0.25s ease, transform 0.25s ease;
}

.img-icon {
  width: 52px;
  height: 52px;
  transform: scale(1.45);
  object-fit: contain;
  transition: transform 0.32s ease;
}

.img-icon:hover {
  transform: scale(1.52) rotate(45deg);
}
</style>
