<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from 'vue-router';
import handleAuthError from '@/utils/authErrorHandler';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errMsg = ref();

const submitRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errMsg.value = 'Passwords do not match!';
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await updateProfile(userCredential.user, {
      displayName: name.value
    });
    router.push('/todos')
  } catch (error) {
    errMsg.value = handleAuthError(error.code);
  }
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
          <p class="text-red" v-if="errMsg">{{ errMsg }} </p>
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
