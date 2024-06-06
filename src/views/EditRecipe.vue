<template>
  <div class="edit-recipe">
    <h1>Modifier la Recette</h1>
    <form @submit.prevent="updateRecipe">
      <label>
        Titre:
        <input type="text" v-model="recipe.nom" required />
      </label>
      <label>
        Description:
        <textarea v-model="recipe.description" required></textarea>
      </label>
      <label>
        Ingrédients:
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-row">
          <input type="text" v-model="ingredient.nom" placeholder="Nom" required />
          <input type="number" v-model="ingredient.quantité" placeholder="Quantité" required />
          <input type="text" v-model="ingredient.unité" placeholder="Unité" required />
          <button @click.prevent="removeIngredient(index)" class="remove-button">Supprimer</button>
        </div>
        <button @click.prevent="addIngredient" class="add-button">Ajouter Ingrédient</button>
      </label>
      <label>
        Instructions:
        <textarea v-model="recipe.instructions" required></textarea>
      </label>
      <label>
        Régime:
        <select v-model="recipe.regime" required>
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
      </label>
      <label>
        Image URL:
        <input type="url" v-model="recipe.image" required />
      </label>
      <button type="submit" class="submit-button">Mettre à jour la recette</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase/config';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: {
        nom: '',
        description: '',
        ingredients: [{ nom: '', quantité: '', unité: '' }],
        instructions: '',
        regime: '',
        image: '',
      }
    };
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ nom: '', quantité: '', unité: '' });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    async updateRecipe() {
      const recipeId = this.$route.params.id;
      await db.collection('recipes').doc(recipeId).update(this.recipe);
      this.$router.push(`/recipe/${recipeId}`);
    }
  },
  async mounted() {
    const recipeId = this.$route.params.id;
    const recipeDoc = await db.collection('recipes').doc(recipeId).get();
    this.recipe = recipeDoc.data();
  }
};
</script>

<style scoped>
/* Styles pour EditRecipe.vue */
.edit-recipe {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-size: 2rem;
}

.edit-recipe form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-recipe label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.edit-recipe input,
.edit-recipe textarea,
.edit-recipe select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.edit-recipe input:focus,
.edit-recipe textarea:focus,
.edit-recipe select:focus {
  border-color: #ffea00;
}

.edit-recipe textarea {
  height: 100px;
}

.ingredient-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.edit-recipe .remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-recipe .remove-button:hover {
  background-color: #c82333;
}

.edit-recipe .add-button {
  align-self: flex-start;
  background-color: #e8d613;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-recipe .add-button:hover {
  background-color: #886421;
}

.submit-button {
  background-color: #ff9500;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #b33f00;
}
</style>
