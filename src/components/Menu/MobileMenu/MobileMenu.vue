<template>
  <nav class="mobile-menu" role="navigation" aria-label="Mobile bottom menu">
    <button v-for="(btn, i) in allButtons" :key="i" class="menu-btn" @click="goRoute(btn.route)"
      :aria-label="btn.label">
      <!-- если есть изображение — показываем картинку -->
      <img v-if="btn.img" :src="btn.img" alt="home icon" class="img-icon" />
      <div v-else class="icons">
        <v-icon>{{ btn.icon }}</v-icon>
      </div>
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const allButtons = [
  { icon: "mdi-account-plus-outline", label: "Регистрация", route: "AddClients" },
  { icon: "mdi-account-group-outline", label: "Список клиентов", route: "ListClients" },

  { img: "/favicon.png", route: "Home" },

  { icon: "mdi-calendar-clock-outline", label: "Ближайшие выезды", route: "Trips" },
  { icon: "mdi-dots-grid", label: "Прочее", route: "Trips" },
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
  background: white;
  padding: 8px 5px;
  border-radius: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.menu-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #455e25;
}

.icons {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #edeef070;
  box-shadow: 0 2px 6px rgb(0 0 0 / 14%), inset 0 1px 1px rgb(255 255 255 / 46%);
  color: #f0ad29;
}

i {
  margin-top: 8px;
  padding: 10px;
  font-size: 35px;
  height: 35px;
  width: 35px;
}

.img-icon {
  width: 50px;
  height: 50px;
  transform: scale(1.8);
  object-fit: contain;
}

.img-icon:hover{
  transform: scale(1.8) rotate(45deg);
}
</style>
