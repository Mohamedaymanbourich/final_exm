import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Recipes from '@/views/recipes.vue';
import RecipeDetail from '@/views/RecipesDetails.vue';
import AddRecipe from '@/views/AddRecipe.vue';
import EditRecipe from '@/views/EditRecipe.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Register.vue';
import UserProfile from '@/views/Profile.vue';
import { projectAuth } from '@/firebase/config';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/edit-recipe/:id',
    name: 'EditRecipe',
    component: EditRecipe
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const user = projectAuth.currentUser;
      if (user) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      const user = projectAuth.currentUser;
      if (user) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
