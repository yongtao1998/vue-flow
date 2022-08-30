<template>
 <div class="main">
   <div>
     <router-link to='/flow'>括扑图</router-link>
   </div>
    <div class="b">
      <router-link to='/cron'>CRON</router-link>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
  padding-top: 50px;
  box-sizing: border-box;
}
.b{
  margin-top: 120px;
}
</style>
