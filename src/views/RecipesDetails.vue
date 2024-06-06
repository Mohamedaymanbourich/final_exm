<template>
  <div class="recipe-detail">
    <h1>{{ recipe.nom }}</h1>
    <div class="image-container">
      <img :src="recipe.image" :alt="recipe.nom" />
    </div>
    <h2>Ingrédients</h2>
    <ul class="ingredients">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.nom">
        {{ ingredient.nom }} - {{ ingredient.quantité }} {{ ingredient.unité }}
      </li>
    </ul>
    <h2>Instructions</h2>
    <div v-if="Array.isArray(recipe.instructions)">
      <ol class="instructions">
        <li v-for="instruction in recipe.instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ol>
    </div>
    <div v-else>
      <p class="instructions">{{ recipe.instructions }}</p>
    </div>

    <!-- Bouton d'édition -->
    <button class="edit-button" @click="goToEdit">Modifier la recette</button>
  </div>
</template>

<script>
import { db } from '../firebase/config';

export default {
  name: 'RecipeDetail',
  data() {
    return {
      recipe: {}
    };
  },
  methods: {
    goToEdit() {
      this.$router.push(`/edit-recipe/${this.$route.params.id}`);
    }
  },
  async mounted() {
    const recipeId = this.$route.params.id;
    try {
      const recipeDoc = await db.collection('recipes').doc(recipeId).get();
      this.recipe = recipeDoc.data();
      console.log('Fetched recipe:', this.recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  }
};
</script>

<style scoped>
/* Styles pour RecipeDetail.vue */
.recipe-detail {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-detail h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.image-container img {
  width: 100%;
  height: auto;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ingredients, .instructions {
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
  padding: 0;
  list-style-type: none;
}

.ingredients li, .instructions li {
  background-color: #f9f9f9;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.instructions li {
  margin-bottom: 1rem;
}

.instructions p {
  margin: 0;
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.edit-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff9900;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.edit-button:hover {
  background-color: #cc7a00;
  transform: translateY(-2px);
}

.edit-button:focus {
  outline: none;
}
</style>
