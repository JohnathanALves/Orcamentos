<template>
  <div class="corpo">
    <router-view></router-view>
  </div>
</template>

<script>
import { routes } from './routes';

export default {
  data() {
    return {
      routes
    }
  }  
}
</script>

<style scoped>

</style>
