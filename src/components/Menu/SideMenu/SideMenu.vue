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
        @click="goRoute(item.route)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

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

const localDrawer = ref(props.drawer);

watch(() => props.drawer, val => localDrawer.value = val);
watch(localDrawer, val => emit('update:drawer', val));

const isWideScreen = ref(window.innerWidth >= 1100);
const drawerWidth = computed(() => (isWideScreen.value ? 260 : 240));

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1100;
  if(isWideScreen.value) localDrawer.value = true;
};

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
</style>