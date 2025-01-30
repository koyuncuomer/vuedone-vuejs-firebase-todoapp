<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const submitRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }
  console.log('Name:', name.value, 'Email:', email.value, 'Password:', password.value);
};
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" width="400" color="grey-darken-3">
      <v-card-title class="text-h5 text-center">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitRegister">
          <v-text-field v-model="name" label="Full Name" required></v-text-field>
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
          <v-btn color="primary" block type="submit">Register</v-btn>
        </v-form>
        <v-divider class="my-4"></v-divider>
        <p class="text-center text-white">
          Already have an account? <RouterLink to="/login" class="text-primary">Login</RouterLink>
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
