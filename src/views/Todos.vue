<script setup>
import { ref } from 'vue';

const newTodo = ref('');
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value, done: false });
    newTodo.value = '';
  }
};

const toggleDone = (index) => {
  todos.value[index].done = !todos.value[index].done;
};

const deleteTodo = (index) => {
  todos.value.splice(index, 1);
};

const logout = () => {
  console.log('Logout clicked');
};
</script>

<template>
  <v-card class="mx-auto" color="grey-darken-3" max-width="50%">
    <v-layout>
      <v-app-bar color="black">
        <v-app-bar-title>VueDone</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout">Logout</v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row class="align-center">
            <v-col cols="11">
              <v-text-field v-model="newTodo" label="Add a new todo"></v-text-field>
            </v-col>
            <v-col cols="1" class="d-flex justify-end">
              <v-btn color="success" @click="addTodo" block>Add</v-btn>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col v-for="(todo, index) in todos" :key="index" cols="12">
              <v-card color="grey-darken-2">
                <v-card-title :class="{ 'line-through-green': todo.done }">
                  {{ todo.text }}
                </v-card-title>
                <v-card-actions>
                  <v-btn color="blue-lighten-1" @click="toggleDone(index)">{{ todo.done ? 'Undo' :
                    'Done' }}</v-btn>
                  <v-btn color="red" @click="deleteTodo(index)">Delete</v-btn>
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
  color: #A5D6A7
  ;
}
</style>