<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy, where, writeBatch } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '@/firebase';
import { useRouter } from 'vue-router';
import { VDateInput } from 'vuetify/labs/VDateInput'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter();

const todosCollection = collection(db, 'todos');

const newTodoContent = ref('');
const newTodoDeadline = ref(null);
const todos = ref([]);
const user = ref();
const showConfirmDialog = ref(false);
const confirmDialogMessage = ref('Are you sure you want to delete this todo?');
const todoToDelete = ref(null);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;

      const todosQuery = query(
        todosCollection,
        where("userId", "==", firebaseUser.uid),
        where("archive", "==", false),
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
  if (newTodoContent.value.trim()) {
    addDoc(todosCollection, {
      content: newTodoContent.value,
      deadline: newTodoDeadline.value,
      done: false,
      date: Date.now(),
      archive: false,
      userId: user.value.uid
    });
    newTodoContent.value = '';
    newTodoDeadline.value = null;
  }
};

const deleteTodo = () => {
  if (todoToDelete.value) {
    deleteDoc(doc(todosCollection, todoToDelete.value));
    todoToDelete.value = null;
  }
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollection, id), {
    //done: !todos.value[index].done,
    done: todos.value[index].done,
  });
};

const toggleArchive = (id) => {
  updateDoc(doc(todosCollection, id), {
    archive: true
  });
};

const archiveAllCompleted = async () => {
  const completedTodos = todos.value.filter(todo => todo.done);
  const batch = writeBatch(db);
  completedTodos.forEach(todo => {
    const todoRef = doc(todosCollection, todo.id);
    batch.update(todoRef, { archive: true });
  });
  await batch.commit();
};

const logout = async () => {
  try {
    await signOut(auth);
    router.push('/login')
  } catch (error) {
    console.error("Çıkış hatası:", error.message);
  }
};

const goToArchive = () => {
  router.push('/archive')
};
const goToTodos = () => {
  router.push('/todos')
};

const calculateRemainingDays = (deadline) => {
  if (!deadline) return null

  const today = new Date()
  const deadlineDate = deadline.toDate()

  today.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  const diffTime = deadlineDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

const askDeleteTodo = (id) => {
  todoToDelete.value = id;
  showConfirmDialog.value = true;
};

</script>

<template>
  <v-card class="mx-auto" color="grey-darken-3" max-width="750">
    <v-layout>
      <v-app-bar color="black">
        <template v-slot:prepend>
          <v-btn @click="goToTodos">Home</v-btn>
          <v-btn @click="goToArchive">Archive</v-btn>
        </template>
        <v-app-bar-title class="text-center">VueDone Home</v-app-bar-title>
        <template v-slot:append>
          <v-btn @click="archiveAllCompleted">Archive All Completed</v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col cols="9">
              <v-text-field v-model="newTodoContent" label="Add a new todo" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-date-input v-model="newTodoDeadline" label="End date" prepend-icon="" variant="outlined"
                show-adjacent-months first-day-of-week="1" clearable
                @click:clear="newTodoDeadline = null"></v-date-input>
            </v-col>
            <v-col cols="12">
              <v-btn color="success" @click="addTodo" block>Add</v-btn>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col v-for="(todo, index) in todos" :key="index" cols="12">
              <v-card color="grey-darken-2" class="d-flex">
                <div style="width: 5%;" class="d-flex align-center justify-center">
                  <v-checkbox v-model="todo.done" @change="toggleDone(todo.id)" hide-details
                    color="green-lighten-3"></v-checkbox>
                </div>
                <div style="width: 95%">
                  <v-card-title :class="{ 'line-through-green': todo.done }">
                    {{ todo.content }}
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="red" @click="askDeleteTodo(todo.id)">Delete</v-btn>
                    <v-btn color="blue-lighten-1" @click="toggleArchive(todo.id)" v-if="todo.done">Archive</v-btn>
                    <v-spacer></v-spacer>
                    <div v-if="todo.deadline && !todo.done">
                      <v-chip color="orange">
                        Deadline: {{ todo.deadline?.toDate().toDateString() }}
                      </v-chip>
                      <v-chip color="orange" class="ml-1">
                        Remaining: {{ calculateRemainingDays(todo.deadline) }} days
                      </v-chip>
                    </div>
                    <v-btn :icon="todo.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="todo.show = !todo.show"
                      v-if="todo.content.length > 50"></v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="todo.show">
                      <v-card-text :class="{ 'line-through-green': todo.done }">
                        {{ todo.content }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <ConfirmDialog v-model:show="showConfirmDialog" :message="confirmDialogMessage" @confirm="deleteTodo" />
      </v-main>

      <v-footer app class="footer" color="black" height="40">
        <v-container>
          <span>&copy; {{ new Date().getFullYear() }} VueDone.</span>
        </v-container>
        <v-btn @click="logout" color="black">{{ user?.displayName }} | Logout</v-btn>
      </v-footer>

    </v-layout>
  </v-card>
</template>

<style scoped>
.line-through-green {
  text-decoration: line-through;
  color: #A5D6A7;
}
</style>