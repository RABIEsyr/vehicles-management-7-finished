<template>
  <div>
    <div >
      <carousel-3d style="width: 70%; margin:0 auto;" :controls-visible="true">
    <slide v-for="(user, i) in users" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <!-- <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide.src"> -->
            <h1 style="margin-left: 35% !important;margin-top: 30% !important;" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0),  }">{{ user.name }}</h1>
          </template>
        <!-- <h1 style="margin: 0 auto;">{{ user.name }}</h1> -->
    </slide>
</carousel-3d>
    </div>
    <div class="text-center" id="div">
    <!-- <carousel-3d>
      <slide :index="0">
        slide 0
      </slide>
      <slide :index="1">
        slide 2
      </slide>
      <slide :index="2">
        slide 3
      </slide>
    </carousel-3d> -->
    
    <!-- <h1 v-if="err" class="err">{{ msg }}</h1> -->
    <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="addNewUser()">
      <v-text-field
        v-model="username"
       
        label="اسم المستخدم"
        color="accent"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="accent">اضافة</v-btn>
    </v-form>
  </v-sheet>
  <!-- <h1 v-if="!err" class="success">{{ successMsg }}</h1> -->
  </div>
  </div>
 
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
    data() {
        return {
            username: null,
            successMsg: null,
            users: []
        }
    },
    computed: {
        ...mapGetters({
            'err': 'getErr1NewUser',
            'msg': 'getErr1NewUserMsg'
        })
    },
    methods: {
        ...mapActions({
            'actAddNewUser': 'actAddNewUser',
            actGetAllUsers: 'actGetAllUsers'
        }),
       async addNewUser() {
            this.err = false;
            if (this.username != null) {
              await  this.actAddNewUser(this.username);
            } 
            if (this.err == false) {
                this.successMsg = 'تمت الاضافة بنجاح'
                this.$alert(`${this.username}`, 'تمت الاضافة بنجاح', 'success', );
            }
            if (this.err == true) {
                // this.successMsg = 'تمت الاضافة بنجاح'
                this.$alert("", 'المستخدم موجود مسبقا', 'error', );
            }  

        },
    },
    async created() {
      const reso = await this.actGetAllUsers();
      if (reso.data.success) {
        this.users = reso.data.users
      }
    },
    comments: {
      Carousel3d, 
      Slide 
    }
}
</script>

<style scoped>
/* .err {
    color: red;
}
.success {
    color: green;
} */
#div {
  /* position: fixed; */
  /* top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%); */
}
.center {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>