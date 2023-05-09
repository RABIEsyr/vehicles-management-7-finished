<template>
   <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                عرض صور
                            </v-expansion-panel-header>
                            <v-expansion-panel-content style="z-index: 10">
                                <div class="row">
                                    <div class="col-lg-6 col-sm-4 col-sm-offset-2" align="center">
                                        <div class="form-group">
                                            <div class="inputGroupContainer">
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="i in imagesNumber"
      :key="i"
    >
      <v-sheet
       width="100%"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            <v-img :src="url + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/>
            <v-img :src="'http://localhost:3000' + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/>
            <!-- <v-img :src="'http://localhost:3000' + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/> -->
            <!-- <img src="http://localhost:3000/profile-image/640afa6585909c13846b95fb/640afa4c85909c13846b95f8/0.jpg" alt=""> -->
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</div>
                                        </div>
                                    </div>

                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>

</template>

<script>
import config from '../../../../config/config'
var url = config.apiUrl;

export default {
    props: [
        'imagesNumber',
        'messageId',
        'senderId'
    ],
    date() {
        return {
            url: null
        }
    },
    mounted() {this.url = url},
    updated() {
        console.log('url', this.url)
    }

}
</script>

<style>

</style>