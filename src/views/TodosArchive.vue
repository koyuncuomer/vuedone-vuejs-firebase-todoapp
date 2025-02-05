<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, where } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '@/firebase';
import { useRouter } from 'vue-router';
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter();

const todosCollection = collection(db, 'todos');

const todos = ref([]);
const user = ref();
const showConfirmDialog = ref(false);
const todoToDelete = ref(null);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;

      const todosQuery = query(
        todosCollection,
        where("userId", "==", firebaseUser.uid),
        where("archive", "==", true),
        orderBy("date", "desc")
      );

      onSnapshot(todosQuery, (querySnapshot) => {
        const _todos = [];
        querySnapshot.forEach((doc) => {
          const todo = { id: doc.id, ...doc.data() };
          _todos.push(todo);
        });
        todos.value = _todos;
      });
    }
  });

  return () => unsubscribe();
});

const deleteTodo = () => {
  if (todoToDelete.value) {
    deleteDoc(doc(todosCollection, todoToDelete.value));
    todoToDelete.value = null;
  }
};

const toggleUnarchive = (id) => {
  updateDoc(doc(todosCollection, id), {
    archive: false 
  });
};

const logout = async () => {
  try {
    await signOut(auth);
    router.push('/login')
  } catch (error) {
    console.error("Çıkış hatası:", error.message);
  }
};

const goToHome = () => {
  router.push('/todos')
};

const askDeleteTodo = (id) => {
  todoToDelete.value = id;
  showConfirmDialog.value = true;
};
</script>

<template>
  <v-card class="mx-auto" color="grey-darken-3" max-width="750">
    <v-layout>
      <v-app-bar color="black">
        <v-app-bar-title>VueDone | {{ user?.displayName }}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="goToHome">Home</v-btn>
        <v-btn @click="logout">Logout</v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="(todo, index) in todos" :key="index" cols="12">
              <v-card color="grey-darken-2">
                  <v-card-title>
                    {{ todo.content }}
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="red" @click="askDeleteTodo(todo.id)">Delete</v-btn>
                    <v-btn color="blue-lighten-1" @click="toggleUnarchive(todo.id)">Unarchive</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :icon="todo.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="todo.show = !todo.show"
                      v-if="todo.content.length > 50"></v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="todo.show">
                      <v-card-text>
                        {{ todo.content }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <ConfirmDialog v-model:show="showConfirmDialog" @confirm="deleteTodo" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>