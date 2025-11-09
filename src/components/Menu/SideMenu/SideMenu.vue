<template>
  <v-navigation-drawer
    v-model="localDrawer"
    class="custom-drawer"
    v-show="localDrawer || isWideScreen"
    :class="{ 'drawer-fixed': localDrawer || isWideScreen }"
    :permanent="isWideScreen"
    :width="drawerWidth"
      temporary

  >
    <v-list>
      <v-list-item
        v-for="item in menus"
        :key="item.title"
        :prepend-icon="item.icon"
        :class="{ 'active-item': isActive(item.route) }"
        @click="goRoute(item.route)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  drawer: Boolean
});

const menus = [
  {
    icon: "mdi-account-plus-outline",
    title: "Регистрация клиентов",
    route: "AddClients",
  },
  {
    icon: "mdi-account-group-outline",
    title: "Список клиентов",
    route: "ListClients",
  },
  {
    icon: "mdi-calendar-clock-outline",
    title: "Ближайшие выезды",
    route: "Trips",
  },
  { 
    icon: "mdi-tent", 
    title: "Свободные поляны", 
    route: "MapObjects" 
  },
  {
    icon: "mdi-cash-multiple",
    title: "Учет расходов",
    route: "AdditionalCosts",
  },
  { 
    icon: "mdi-cog-outline", 
    title: "Настройки", 
    route: "AdditionalCosts" 
  },
];

const emit = defineEmits(['update:drawer']);
const router = useRouter();
const route = useRoute();

const localDrawer = ref(props.drawer);

watch(() => props.drawer, val => localDrawer.value = val);
watch(localDrawer, val => emit('update:drawer', val));

const isWideScreen = ref(window.innerWidth >= 1100);
const drawerWidth = computed(() => (isWideScreen.value ? 260 : 240));

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1100;
  if(isWideScreen.value) localDrawer.value = true;
};

function isActive(routeName) {
  return route.name === routeName;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function goRoute(name) {
  router.push({ name });
}
</script>

<style scoped>
.active-item {
  background: var(--background-inactive-tab) !important;
  color: var(--color-inactive-tab) !important;
  -webkit-text-stroke: var(--text-stroke-inactive-tab);
  font-weight: 500 !important;
  border: 1.5px solid var(--border-color-inactive-tab) !important;
  border-radius: 0  10px 10px 0 !important;
}
.active-item .v-list-item-title {
  color: #6f9233 !important;
}
</style>