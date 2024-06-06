<!-- src/components/Notifications.vue -->
<template>
    <div class="notifications">
      <h2>Notifications</h2>
      <div v-for="disc in discussions" :key="disc.id" >
        <router-link :to="{ name: 'Discussion', params: { id: disc.id, userId: userId } }" class="notification-link">
          <div class="notification-item" v-if="!func(disc)">
            You have replies in the discussion: <strong>{{ disc.title }}</strong>
          </div>
        </router-link>
      </div>
      <button class="btn btn-secondary center-button" @click="$emit('hide-notifications')">
        Return to Discussions
      </button>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '../firebase/config';
  
  export default {
    name: 'Notification',
    data() {
      return {
        discussions: [],
        replies: [],
      };
    },
    props: {
      userId: {
        type: String,
        required: true,
      },
      selectedCategory: {
        type: String,
        default: null,
      },
      yourdisc: {
        type: Boolean,
        default: null,
      },
    },
    async mounted() {
      try {
        const res = await projectFirestore.collection('Discussions').get();
        this.discussions = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        this.error = err.message;
      }
      try {
        const res = await projectFirestore.collection('responses').get();
        this.replies = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        this.error = err.message;
      }
    },
    methods: {
      func(disc) {
        if (disc.replies.length == 0) return true;
        const id1 = disc.replies[disc.replies.length - 1];
        for (let i = 0; i < this.replies.length; i++) {
          if (this.replies[i].id == id1) {
            if (this.replies[i].auteur == this.userId) return true;
          }
        }
        return false;
      },
    },
  };
  </script>
  
  <style scoped>
  .notifications {
    padding: 20px;
    text-align: left;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  
  .notification-item {
    padding: 10px 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .notification-item:hover {
    background-color: #f1f1f1;
  }
  
  .notification-link {
    text-decoration: none;
    color: #007bff;
    display: block;
  }
  
  .notification-link:hover {
    text-decoration: underline;
  }
  
  .notification-link strong {
    color: #333;
  }
  
  .center-button {
    display: block;
    margin: 20px auto;
    width: 50%;
  }
  </style>
  
