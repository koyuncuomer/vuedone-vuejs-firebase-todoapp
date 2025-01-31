import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/Register.vue";
import LoginView from "@/views/Login.vue";
import TodosView from "@/views/Todos.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

const requireAuth = (to, from, next) => {
    const checkAuth = new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });

    checkAuth.then((user) => {
        if (!user) {
            next("/login");
        } else {
            next();
        }
    });
};

const requireNoAuth = (to, from, next) => {
    const checkAuth = new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });

    checkAuth.then((user) => {
        if (user) {
            next("/todos");
        } else {
            next();
        }
    });
};

const routes = [
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
        beforeEnter: requireNoAuth,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        beforeEnter: requireNoAuth,
    },
    {
        path: "/todos",
        name: "Todos",
        component: TodosView,
        beforeEnter: requireAuth,
    },
    //{ path: "/", redirect: "/login" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
