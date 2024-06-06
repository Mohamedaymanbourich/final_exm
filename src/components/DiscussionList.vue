<template>
    <b-container class="mt-4">
      <h2 class="text-primary"> {{ yourdisc ? 'Your Discussions' : 'All Discussions' }}</h2>
      <b-list-group>
        <div v-for="discussion in   yourdisc ?  filterYourDiscussions :filteredDiscussions  " :key="discussion.id" class="discussion-item">
            <router-link :to="{ name: 'Discussion', params: { id: discussion.id, userId: userId } }" class="discussion-link">
                <b-list-group-item class="discussion-card">
                {{ discussion.title }}
                </b-list-group-item>
            </router-link>
            </div>

      </b-list-group>
    </b-container>
  </template>
  
<script>
import { projectFirestore } from '../firebase/config';

export default {
  name: 'DiscussionList',
  props: {
    userId: {
      type: String,
      required: true,
    },
    selectedCategory: {
      type: String,
      default: null
    },
    yourdisc: {
    type: Boolean,
    default: null
  }
  },
  data() {
    return {
      discussions: [],
      yourdiscussion:[]
    };
  },
  computed: {
    filteredDiscussions() {
      if (this.selectedCategory) {
        return this.discussions.filter(discussion => discussion.category === this.selectedCategory);
      } else {
        return this.discussions;
      }
    },
    filterYourDiscussions() {
  if (this.yourdisc && !this.selectedCategory) {
    return this.discussions.filter(discussion => discussion.createdBy === this.userId);
  } else if (this.yourdisc && this.selectedCategory) {
    return this.discussions.filter(discussion => discussion.createdBy === this.userId && discussion.category === this.selectedCategory);
  } else {
    console.log("frifgioeergj")
  }
},

  },
  
  async mounted() {
    try {
      let res = await projectFirestore.collection('Discussions').get();
      this.discussions = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>


  <style scoped>
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #007bff;
  }
  
  .discussion-item {
    margin-bottom: 10px;
  }
  
  .discussion-link {
    text-decoration: none;
  }
  
  .discussion-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #f8f9fa;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .discussion-card:hover {
    background-color: #e2e6ea;
    transform: scale(1.02);
    color: #007bff;
  }
  
  @media (max-width: 768px) {
    .discussion-card {
      flex-direction: column;
      padding: 15px;
    }
  }
  </style>
  
