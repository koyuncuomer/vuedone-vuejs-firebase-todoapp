<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const submitLogin = () => {
  console.log('Email:', email.value, 'Password:', password.value);
};
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" width="400" color="grey-darken-3">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitLogin">
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-btn color="primary" block type="submit">Login</v-btn>
        </v-form>
        <v-divider class="my-4"></v-divider>
        <p class="text-center text-white">
          Don't have an account? <RouterLink to="/register" class="text-primary">Register</RouterLink>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>