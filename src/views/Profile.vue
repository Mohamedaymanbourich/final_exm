<template>
  <div class="profile">
    <div class="header">
      <h1>Profil Utilisateur</h1>
    </div>
    <div class="user-info">
      <div class="avatar">
        <img :src="userAvatar" alt="User Avatar">
      </div>
      <div class="details">
        <p><strong>Email:</strong> {{ userEmail }}</p>
        <p><strong>Nom:</strong> {{ userName }}</p>
        <p><strong>Inscrit le:</strong> {{ joinedDate }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" @click="goHome">Retour à l'accueil</button>
      <button class="btn btn-danger" @click="signOut">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import { projectAuth } from '@/firebase/config';

export default {
  name: 'Profile',
  data() {
    return {
      userEmail: '',
      userName: '',
      joinedDate: '',
      userAvatar: require('@/assets/download.png') // Default avatar
    };
  },
  async created() {
    projectAuth.onAuthStateChanged(user => {
      if (user) {
        this.userEmail = user.email;
        this.userName = user.displayName || 'Utilisateur';
        this.joinedDate = new Date(user.metadata.creationTime).toLocaleDateString();
        this.userAvatar = user.photoURL || require('@/assets/download.png');

        // Optionnel: Stocker dans localStorage
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('joinedDate', this.joinedDate);
        localStorage.setItem('userEmail', this.userEmail);
        localStorage.setItem('userAvatar', this.userAvatar);
      } else {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
          this.$router.push('/');
        } else {
          // Récupérer les données de localStorage
          this.userName = localStorage.getItem('userName');
          this.userEmail = localStorage.getItem('userEmail');
          this.joinedDate = localStorage.getItem('joinedDate');
          this.userAvatar = localStorage.getItem('userAvatar') || require('@/assets/download.png');
        }
      }
    });
  },
  methods: {
    async signOut() {
      try {
        await projectAuth.signOut();
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    },
    goHome() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
/* Styles pour le composant Profile.vue */
.profile {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details {
  flex: 1;
  text-align: left;
}

.details p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.actions .btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions .btn-primary {
  background-color: #ff6a00;
  color: #fff;
}

.actions .btn-primary:hover {
  background-color: #b37d00;
}

.actions .btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.actions .btn-danger:hover {
  background-color: #c82333;
}

.actions .btn:focus {
  outline: none;
}

.actions .btn:active {
  transform: translateY(1px);
}
</style>
