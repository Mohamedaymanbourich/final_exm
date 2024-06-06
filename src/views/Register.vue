<template>
  <div class="container">
    <div class="register-form">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Entrer l'email"
          >
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Entrer le mot de passe"
          >
        </div>
        <button type="submit">Inscription</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <router-link to="/">Déjà inscrit ? Connectez-vous</router-link>
    </div>
  </div>
</template>

<script>
import { projectAuth, db } from '@/firebase/config';

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await projectAuth.createUserWithEmailAndPassword(this.email, this.password);
        const user = userCredential.user;
        console.log(user.uid)
        await db.collection('users').doc(user.uid).set({
          email: this.email,
          photoURL: '',
          password : this.password
        });
        this.$router.push("/");
      } catch (error) {
        this.error = "Erreur lors de la création du compte. Veuillez réessayer.";
        console.error("Erreur d'inscription:", error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.register-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.register-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #ff6a00;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
}

button:hover {
  background-color: #a4b300;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

a {
  display: block;
  text-align: center;
  margin-top: 10px;
}

a:hover {
  text-decoration: underline;
}
</style>
