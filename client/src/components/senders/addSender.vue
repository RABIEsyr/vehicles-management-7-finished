<template>
  <div >
    <div>
      <vue-horizontal-list :items="getSendersListg" style="width: 70%; margin:0 auto;">
        
      <template v-slot:default="{ item }">
        <div class="item">
          <h3>{{ item.name }}</h3>
          
        </div>
      </template>
    </vue-horizontal-list>
    </div>

    <div class="text-center" id="div">
    
    <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="addSender()">
      
      <v-text-field
        v-model="name"
        :rules="rules"
        label="الجهة"
        color="accent"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="accent">اضافة</v-btn>
    </v-form>
  </v-sheet>
  </div>
  </div>
  
</template>

<script>
import VueHorizontalList from "vue-horizontal-list";
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: null,
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return { title: `Item ${i}`, content: `🚀 Simple content ${i}` };
      }),
      
    }
  },
  computed: {
    ...mapGetters({
      'getSendersListg': 'getSendersList'
    })
  },
  methods: {
        ...mapActions({
            'addNewSender': 'addNewSenderX',
            getSendersListXX: 'getSendersList'
        }),
       async addSender() {
            if (this.name) {
              const result = await  this.addNewSender({name: this.name});
              this.items = this.getSendersListg;
              console.log('result of adding!', result);
              if (result.data.success == false) {
                if (result.data.message == 'name of sender already exists') {
                  this.$alert("", 'الجهة موجودة مسبقا', 'error', );
                }
              }
              if (result.data.success == true) {
                  this.$alert(`${this.name}`, 'تمت الاضافة بنجاح', 'success', );
                
              }
            }
        }
    },
    async created() {
     await this.getSendersListXX();
    },
    components: {
    VueHorizontalList,
  },
}
</script>

<style scoped>
#div {
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
.vlist {
  top: 50% !important;
  left: 50% !important;
  /* transform: translate(50%, 50%); */
}
.item {
  padding: 16px 24px;
  border-radius: 3px;
  background: #f5f5f5;
}

</style>