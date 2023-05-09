<template>
  <transition name="fade">
   <section style="z-index: 1000; position: absolute; width: 100%; height: 100%;" v-if="open">
        <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" style="height: 100%">
          <v-layout column align-center justify-center class="white--text">
            <img :src="imgSrc" alt="">
            <h4 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 100; text-shadow: 3px 2px #000000">وزارة الداخلية السورية</h4> 

            <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 400; text-shadow: 3px 2px #000000">ادارة المركبات و الرحبات</h1> 
             <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">مكتب البرقيات</div>
            <v-btn class="blue lighten-2 mt-5" dark large @click="close()">
              متابعة
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </transition>
</template>

<script>
export default {
  data() {
    return {
      open: true,
      imgSrc: require('@/assets/images/download5.jpg')
    }
  },
  methods: {
    close() {
      this.open = !this.open;
      this.$router.push('/add-incoming');
    }
  },
  destroyed() {

  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  max-height: 100%;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0px;
  scale: 0;
}
</style>