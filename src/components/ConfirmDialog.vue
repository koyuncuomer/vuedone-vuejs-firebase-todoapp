<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['update:show', 'confirm']);

const closeDialog = () => {
  emit('update:show', false);
};

const confirmAction = () => {
  emit('confirm');
  closeDialog();
};
</script>

<template>
  <v-dialog v-model="props.show" max-width="400">
    <v-card class="mx-auto" color="grey-darken-3">
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>Are you sure you want to delete this todo?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="closeDialog">Cancel</v-btn>
        <v-btn color="red" @click="confirmAction">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>