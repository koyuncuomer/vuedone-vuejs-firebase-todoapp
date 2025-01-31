<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from 'vue-router';
import handleAuthError from '@/utils/authErrorHandler';

const router = useRouter();

const email = ref('');
const password = ref('');
const errMsg = ref();

const submitLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/todos')
  } catch (error) {
    errMsg.value = handleAuthError(error.code);
  }
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
          <p class="text-red" v-if="errMsg">{{ errMsg }} </p>
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