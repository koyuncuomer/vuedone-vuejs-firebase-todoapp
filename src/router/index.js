import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/Register.vue";
import LoginView from "@/views/Login.vue";
import TodosView from "@/views/Todos.vue";

const routes = [
    { path: "/register", name: "Register", component: RegisterView },
    { path: "/login", name: "Login", component: LoginView },
    { path: "/todos", name: "Todos", component: TodosView },
    { path: "/", redirect: "/login" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
