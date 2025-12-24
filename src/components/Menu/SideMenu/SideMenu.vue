<template>
  <v-navigation-drawer
    v-model="localDrawer"
    class="custom-drawer"
    :permanent="isWideScreen"
    :width="drawerWidth"
    :temporary="!isWideScreen"
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
const emit = defineEmits(['update:drawer']);
const router = useRouter();
const route = useRoute();

const menus = [
  { icon: "mdi-account-multiple-plus-outline", title: "Регистрация клиентов", route: "AddClients" },
  { icon: "mdi-human-male-female-child", title: "Список клиентов", route: "ListClients" },
  { icon: "mdi-calendar-clock-outline", title: "Ближайшие выезды", route: "Trips" },
  { icon: "mdi-grass", title: "Свободные поляны", route: "MapObjects" },
  { icon: "mdi-tent", title: "Аренда глэмпинга", route: "Glamping" },
  { icon: "mdi-cash-multiple", title: "Учет расходов", route: "AdditionalCosts" },
  { icon: "mdi-cog", title: "Настройки, тарифы", route: "SettingsCompany" },
];

const localDrawer = ref(props.drawer);

watch(() => props.drawer, val => localDrawer.value = val);
watch(localDrawer, val => emit('update:drawer', val));

const isWideScreen = ref(window.innerWidth >= 1100);
const drawerWidth = computed(() => (isWideScreen.value ? 260 : 240));

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1100;
  if (isWideScreen.value) localDrawer.value = true;
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

<style>
.v-list-item-title {
  font-weight: 800 !important;
  letter-spacing: .009375em;
  font-size: 1.15rem !important;
  font-family: var(--font-family-title);
  color: #455e25;
  margin-top: 6px;
}

.v-list-item__prepend {
  display: block !important;
  margin-right: 5px;
  color: #233b06;
}

.v-navigation-drawer {
  top: 50px !important;
  height: 100% !important;
}

.active-item .v-list-item__prepend {
  color: #4d672c !important;
}

.active-item .v-list-item__prepend .v-icon {
  opacity: 1 !important;
}
</style>
<style scoped>
.active-item {
  background: #eee !important;
  color: #4d672c !important;
  -webkit-text-stroke: .05px #4d672c;
  border: 1.5px solid #eee !important;
}

.active-item .v-list-item__prepend .v-icon {
  color: #fff !important;
}
</style>