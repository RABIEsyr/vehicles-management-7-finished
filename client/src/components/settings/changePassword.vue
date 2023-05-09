<template>
  <div class="text-center" id="div">
    <h1 v-if="err" class="err">{{ msg }}</h1>
    <h1 v-if="localerr" class="err">{{ localMsg }}</h1>
    <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="changePassword()">
      <v-text-field
        v-model="oldPassword"
        label= "كلمة المرور القديمة"
        color="accent"
      ></v-text-field>
      <v-text-field
        v-model="newPassword"
        label= "كلمة المرور الجديدة"
        color="accent"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label= "تاكيد كلمة المرور "
        color="accent"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="accent">تغيير</v-btn>
    </v-form>
  </v-sheet>
  <h1 v-if="!err" class="success">{{ successMsg }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,

            localerr: false,
            localMsg: null
        }
    },
    ...mapGetters({
        'err': 'getErr2ChangePasword',
        'msg': 'getErr2ChangePaswordMsg'
    }),
    methods: {
        ...mapActions({
            actChangePassword: 'actChangePassword'
        }),
       async changePassword() {
            // this.localMsg = null;
            // this.err = false;
            if (this.oldPassword && this.newPassword && this.confirmPassword) {
                if (this.newPassword != this.confirmPassword) {
                    this.err = true
                    this.localMsg = 'كلمة المرور غير مطابقة'
                } else {
                    this.localMsg = null;
                   const resforpass = await this.actChangePassword({oldPass: this.oldPassword,newpass: this.newPassword})
                   console.log('www', resforpass)
                   if (!resforpass.success) {
                    if (resforpass.message == 'كلمة المرور القديمة غير صحيحة') {
                      this.$alert("", 'كلمة المرور القديمة غير صحيحة', 'error', );
                    }
                   } else if (resforpass.success) {
                    this.$alert(``, 'تمت تغيير كلمة المرور  بنجاح', 'success', );
                   }
                }
            } else {
                this.localerr = true;
                this.localMsg = 'ادخل جميع الحقول'
            }
    }
    }
}
</script>

<style scoped>
.err {
    color: red;
}
</style>