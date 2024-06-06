<template>
  <div class="container">
    <div class="login-form">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Entrer l'email"
          >
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Entrer le mot de passe"
          >
        </div>
        <button type="submit">Connexion</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="google-button" @click="signInWithGoogle">Connexion avec Google</button>
      <button class="guest-button" @click="asGuest">Connexion comme invité</button>
      <router-link to="/signup">Pas de compte ? Inscrivez-vous</router-link>
    </div>
  </div>
</template>

<script>
import { projectAuth, googleProvider } from '@/firebase/config';

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  async mounted() {
    // Redirection si l'utilisateur est déjà connecté
    if (projectAuth.currentUser) {
      this.$router.push("/home");
    }
  },
  methods: {
    async login() {
      try {
        await projectAuth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
        console.error("Erreur de connexion:", error);
      }
    },
    async signInWithGoogle() {
      try {
        await projectAuth.signInWithPopup(googleProvider);
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
        console.error("Erreur de connexion avec Google:", error);
      }
    },
    asGuest() {
      this.$router.push('/home');
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

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.login-form h2 {
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
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
}

.google-button {
  margin-top: 10px;
  background-color: #db4437;
}

.google-button:hover {
  background-color: #c33d2e;
}

.guest-button {
  margin-top: 10px;
  background-color: #28a745;
}

.guest-button:hover {
  background-color: #218838;
}

button:hover {
  background-color: #0056b3;
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
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
