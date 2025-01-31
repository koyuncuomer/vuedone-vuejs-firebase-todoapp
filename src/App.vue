<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/todos');
    } else {
      router.push('/login');
    }
  });
});
</script>

<template>
  <RouterView />
</template>
