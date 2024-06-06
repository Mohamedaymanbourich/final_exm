<template>
  <div class="add-recipe">
    <h1>Ajouter une Recette</h1>
    <form @submit.prevent="addRecipe">
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
        <div class="ingredients">
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient">
            <input type="text" v-model="ingredient.nom" placeholder="Nom" required />
            <input type="number" v-model="ingredient.quantité" placeholder="Quantité" required />
            <input type="text" v-model="ingredient.unité" placeholder="Unité" required />
            <button class="remove-button" @click.prevent="removeIngredient(index)">Supprimer</button>
          </div>
          <button class="add-button" @click.prevent="addIngredient">Ajouter Ingrédient</button>
        </div>
      </label>
      <label>
        Instructions:
        <div class="instructions">
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="instruction">
            <input type="text" v-model="recipe.instructions[index]" placeholder="Étape" required />
            <button class="remove-button" @click.prevent="removeInstruction(index)">Supprimer</button>
          </div>
          <button class="add-button" @click.prevent="addInstruction">Ajouter Étape</button>
        </div>
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
      <button class="submit-button" type="submit">Ajouter Recette</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase/config';

export default {
  name: 'AddRecipe',
  data() {
    return {
      recipe: {
        nom: '',
        description: '',
        ingredients: [{ nom: '', quantité: '', unité: '' }],
        instructions: [''],
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
    addInstruction() {
      this.recipe.instructions.push('');
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
    async addRecipe() {
      await db.collection('recipes').add(this.recipe);
      this.$router.push('/recipes');
    }
  }
};
</script>

<style scoped>
/* Styles pour AddRecipe.vue */
.add-recipe {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
}

.add-recipe form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.add-recipe label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.add-recipe input,
.add-recipe textarea,
.add-recipe select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.add-recipe input:focus,
.add-recipe textarea:focus,
.add-recipe select:focus {
  border-color: #ffc400;
}

.add-recipe textarea {
  height: 100px;
}

.ingredients,
.instructions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ingredient,
.instruction {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.ingredient input,
.instruction input {
  flex: 1;
}

.add-button,
.remove-button,
.submit-button {
  background-color: #ff6f00;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover,
.remove-button:hover,
.submit-button:hover {
  background-color: #b3ad00;
  transform: translateY(-2px);
}

.remove-button {
  background-color: #dc3545;
}

.remove-button:hover {
  background-color: #c82333;
}

.add-button {
  align-self: flex-start;
}

.submit-button {
  align-self: center;
  font-size: 1.2rem;
  background-color: #a76328;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background-color: #c08c1b;
  transform: translateY(-2px);
}
</style>
