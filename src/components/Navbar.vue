<template>
  <div v-for="(disc, index) in search" :key="index">
    <router-link :to="{ name: 'Discussion', params: { id: disc.id, userId: userId } }" class="notification-link">
      {{ disc.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true
    },
    discussions: {
      type: Array,
      required: true
    },
    str: {
      type: String,
      default: ''
    }
  },
  computed: {
    search() {
      return this.discussions.filter(disc => 
        disc.category.toLowerCase().trim() === this.str.toLowerCase().trim() || 
        disc.title.toLowerCase().trim() === this.str.toLowerCase().trim()
      );
    }
  }
};
</script>

<style scoped>
.notification-link {
  text-decoration: none;
  color: #007bff;
}

.notification-link:hover {
  text-decoration: underline;
}
</style>
