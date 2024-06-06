<template>
  <div class="home">
    <!-- Header -->
    <header class="app-header">
  <img src="@/assets/logo.jpg" alt="App Logo" class="logo" />
  <nav>
    <router-link to="/home">Accueil</router-link>
    <router-link to="/recipes">Recettes</router-link>
    <router-link to="/add-recipe">Ajouter une Recette</router-link>
    <router-link v-if="!user" to="/">Connexion</router-link>
    <router-link v-else to="/profile">Mon Profil</router-link>
    <router-link to="/signup">Inscription</router-link>
  </nav>
</header>

    <!-- Banner -->
    <div class="banner">
      <h1>Découvrez et partagez vos recettes préférées</h1>
    </div>

    <!-- Section de Présentation -->
    <section class="presentation">
      <h2>Bienvenue sur notre plateforme de recettes</h2>
      <p>Explorez une variété de recettes en fonction de votre régime alimentaire et partagez les vôtres avec notre communauté.</p>
    </section>

    <!-- Section de Catégories -->
    <section class="categories">
      <h2>Catégories</h2>
      <div class="categories-grid">
        <button @click="goToCategory('Omnivore')">Omnivore</button>
        <button @click="goToCategory('Végétarien')">Végétarien</button>
        <button @click="goToCategory('Vegan')">Vegan</button>
        <button @click="goToCategory('Pescétarien')">Pescétarien</button>
        <button @click="goToCategory('Flexitarien')">Flexitarien</button>
        <button @click="goToCategory('Fruitarien')">Fruitarien</button>
        <button @click="goToCategory('Crudivore')">Crudivore</button>
        <button @click="goToCategory('Paleo')">Paleo</button>
        <button @click="goToCategory('Cétogène')">Cétogène</button>
        <button @click="goToCategory('Sans gluten')">Sans gluten</button>
      </div>
    </section>

    <!-- Liste de Recettes Populaires -->
    <section class="popular-recipes">
      <h2>Recettes Populaires</h2>
      <div class="recipes-grid">
        <div v-if="loading" class="loading">Chargement des recettes...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else v-for="recipe in popularRecipes" :key="recipe.id" class="recipe-card">
          <img :src="recipe.image" :alt="recipe.nom" />
          <h3>{{ recipe.nom }}</h3>
          <p>{{ recipe.description }}</p>
          <router-link :to="`/recipe/${recipe.id}`">Voir la recette</router-link>
        </div>
      </div>
    </section>

    <!-- Section Profil Utilisateur -->
    <section v-if="user" class="user-profile">
      <h2>Mon Profil</h2>
      <div v-if="loadingProfile" class="loading">Chargement du profil...</div>
      <div v-else-if="profileError" class="error">{{ profileError }}</div>
      <div v-else>
        <router-link to="/profile">Voir mon profil complet</router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 Votre Nom. Tous droits réservés.</p>
      <nav>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/mentions-legales">Mentions légales</router-link>
        <router-link to="/social-media">Réseaux sociaux</router-link>
      </nav>
    </footer>
  </div>
</template>

<script>
import { db, projectAuth } from '@/firebase/config';

export default {
  name: 'Home',
  data() {
    return {
      popularRecipes: [],
      loading: true,
      error: null,
      user: null,
      userProfile: {},
      loadingProfile: true,
      profileError: null,
    };
  },
  methods: {
    goToCategory(category) {
      this.$router.push({ path: '/recipes', query: { category } });
    }
  },
  async mounted() {
    try {
      // Fetch recipes
      console.log('Fetching recipes...');
      const snapshot = await db.collection('recipes').limit(5).get();
      this.popularRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched recipes:', this.popularRecipes);

      // Observe user auth state
      projectAuth.onAuthStateChanged(async (user) => {
        this.user = user;
        if (user) {
          console.log('Fetching user profile...');
          const userDoc = await db.collection('users').doc(user.uid).get();
          this.userProfile = userDoc.data();
          console.log('Fetched user profile:', this.userProfile);
        } else {
          this.profileError = 'Utilisateur non connecté';
        }
        this.loadingProfile = false;
      });
    } catch (err) {
      this.error = 'Erreur de chargement des recettes';
      this.profileError = 'Erreur de chargement du profil';
      console.error('Error fetching data:', err);
    } finally {
      this.loading = false;
      this.loadingProfile = false;
    }
  },
};
</script>

<style scoped>
/* Styles pour le composant Home.vue */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: rgb(4, 1, 1);
}

.logo {
  height: 50px;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ff9900;
}

.banner {
  text-align: center;
  background-color: #ff8400;
  color: white;
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.banner h1 {
  font-size: 2.5rem;
  margin: 0;
}

.presentation {
  text-align: center;
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.presentation h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.presentation p {
  font-size: 1.2rem;
  color: #666;
}

.categories {
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.categories h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.categories-grid button {
  padding: 1rem;
  border: none;
  background-color: #ff8800;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 200px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.categories-grid button:hover {
  background-color: #b36200;
  transform: translateY(-2px);
}

.popular-recipes {
  padding: 2rem;
}

.popular-recipes h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.recipes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.recipe-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: calc(33.333% - 1rem);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-card h3 {
  margin: 0.5rem 0;
  padding: 0 1rem;
  color: #ffd900;
}

.recipe-card p {
  padding: 0 1rem;
  color: #666;
}

.recipe-card a {
  display: block;
  text-align: center;
  padding: 1rem;
  background-color: #ff9900;
  color: white;
  text-decoration: none;
  border-radius: 0 0 8px 8px;
}

.recipe-card a:hover {
  background-color: #b30c00;
}

.user-profile {
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 2rem;
  text-align: center;
}

.user-profile h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.user-profile p {
  font-size: 1.2rem;
  color: #666;
}

.user-profile img {
  max-width: 150px;
  border-radius: 50%;
  margin-top: 1rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  margin-top: 2rem;
}

footer nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

footer nav a:hover {
  color: #ff9900;
}
</style>
