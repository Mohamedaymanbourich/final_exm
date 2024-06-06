<template>
    <div class="recipes">
      <h1>Liste des Recettes</h1>
      <div class="search-filter">
        <input type="text" v-model="searchQuery" placeholder="Rechercher des recettes..." />
        <select v-model="selectedFilter">
          <option value="">Tous les régimes</option>
          <option value="Omnivore">Omnivore</option>
          <option value="Végétarien">Végétarien</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescétarien">Pescétarien</option>
          <option value="Flexitarien">Flexitarien</option>
          <option value="Fruitarien">Fruitarien</option>
          <option value="Crudivore">Crudivore</option>
          <option value="Paleo">Paleo</option>
          <option value="Cétogène">Cétogène</option>
          <option value="Sans gluten">Sans gluten</option>
        </select>
      </div>
      <div v-if="loading" class="loading">Chargement des recettes...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else class="recipes-grid">
        <div v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-card">
          <img :src="recipe.image" :alt="recipe.nom" />
          <div class="recipe-info">
            <h3>{{ recipe.nom }}</h3>
            <p>{{ recipe.description }}</p>
            <router-link :to="`/recipe/${recipe.id}`">Voir la recette</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase/config';
  
  export default {
    name: 'Recipes',
    data() {
      return {
        searchQuery: '',
        selectedFilter: '',
        recipes: [],
        loading: true,
        error: null,
      };
    },
    computed: {
      filteredRecipes() {
        return this.recipes.filter(recipe => {
          const matchesQuery = recipe.nom ? recipe.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) : false;
          const matchesFilter = this.selectedFilter ? recipe.regime === this.selectedFilter : true;
          return matchesQuery && matchesFilter;
        });
      }
    },
    async mounted() {
      try {
        this.loading = true;
        const snapshot = await db.collection('recipes').get();
        this.recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Set the filter if category is passed in query params
        const category = this.$route.query.category;
        if (category) {
          this.selectedFilter = category;
        }
        
        this.loading = false;
      } catch (error) {
        this.error = 'Erreur de chargement des recettes';
        console.error('Error fetching recipes:', error);
        this.loading = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .recipes {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
    font-weight: bold;
  }
  
  .search-filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .search-filter input,
  .search-filter select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .search-filter input:focus,
  .search-filter select:focus {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .recipes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
  
  .recipe-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: calc(33.333% - 1.5rem);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  .recipe-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .recipe-info {
    padding: 1rem;
    text-align: center;
  }
  
  .recipe-info h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .recipe-info p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .recipe-info a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color:#ff9900;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .recipe-info a:hover {
    background-color:#ff9900;
  }
  
  .loading {
    text-align: center;
    font-size: 1.5rem;
  }
  
  .error {
    text-align: center;
    font-size: 1.2rem;
    color: red;
  }
  </style>
  