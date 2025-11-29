<template>
  <v-dialog v-model="isDialogOpen" max-width="600" persistent class="modal-block">
    <v-card :class="[classCss]">
      <v-card-title v-if="!hideHeader" class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component
          :is="component"
          v-bind="props"
          @submit="handleSubmit"
          @close="handleClose"
          @cancel="handleCancel"
        />
      </v-card-text>
      <v-card-actions v-if="!hideFooter" class="justify-end">
        <v-spacer></v-spacer>
        <v-btn v-if="!okOnly" text @click="handleCancel">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch, defineComponent } from 'vue';

/**
 * vue-компонент модального окна, переписанный под Vuetify
 */
export default defineComponent({
  name: 'Modal',
  props: {
    classCss: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
      default: '',
    },
    submitHandler: {
      type: Function,
      default: null,
    },
    closeHandler: {
      type: Function,
      default: null,
    },
    cancelHandler: {
      type: Function,
      default: null,
    },
    resolve: {
      type: Function,
      default: () => {},
    },
    reject: {
      type: Function,
      default: () => {},
    },
    component: {
      type: Object,
      default: () => null,
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    okOnly: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const isDialogOpen = ref(props.value);

    // Отслеживаем внешнее свойство 'value'
    watch(() => props.value, (val) => {
      isDialogOpen.value = val;
    });
    // при изменении внутреннего флага эмитим событие
    watch(isDialogOpen, (val) => {
      emit('update:value', val);
    });

    const handleClose = () => {
      isDialogOpen.value = false;
      if (props.closeHandler) props.closeHandler();
    };

    const handleCancel = () => {
      isDialogOpen.value = false;
      if (props.cancelHandler) props.cancelHandler();
    };

    const handleSubmit = () => {
      if (props.submitHandler) props.submitHandler();
      isDialogOpen.value = false;
    };

    return {
      isDialogOpen,
      handleClose,
      handleCancel,
      handleSubmit,
    };
  },
});
</script>

<style>
 .v-btn--icon {
  box-shadow: none !important;
  background: transparent !important;
} 

.modal-block .v-card{
  background: var(--background-modal) !important;
  overflow: hidden !important;
  border-radius: 12px !important;
}
</style>
