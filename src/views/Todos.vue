<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, where } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '@/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();

const todosCollection = collection(db, 'todos');

const newTodo = ref('');
const todos = ref([]);
const user = ref();

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;

      const todosQuery = query(
        todosCollection,
        where("userId", "==", firebaseUser.uid),
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

const addTodo = () => {
  if (newTodo.value.trim()) {
    addDoc(todosCollection, {
      content: newTodo.value,
      done: false,
      date: Date.now(),
      userId: user.value.uid
    });
    newTodo.value = '';
  }
};

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollection, id));
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollection, id), {
    done: !todos.value[index].done,
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
</script>

<template>
  <v-card class="mx-auto" color="grey-darken-3" max-width="650">
    <v-layout>
      <v-app-bar color="black">
        <v-app-bar-title>VueDone | {{ user?.displayName }}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout">Logout</v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row class="align-center">
            <v-col cols="10">
              <v-text-field v-model="newTodo" label="Add a new todo"></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
              <v-btn color="success" @click="addTodo" block>Add</v-btn>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col v-for="(todo, index) in todos" :key="index" cols="12">
              <v-card color="grey-darken-2">
                <v-card-title :class="{ 'line-through-green': todo.done }">
                  {{ todo.content }}
                </v-card-title>
                <v-card-actions>
                  <v-btn color="blue-lighten-1" @click="toggleDone(todo.id)">{{ todo.done ? 'Undo' :
                    'Done' }}</v-btn>
                  <v-btn color="red" @click="deleteTodo(todo.id)">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.line-through-green {
  text-decoration: line-through;
  color: #A5D6A7;
}
</style>