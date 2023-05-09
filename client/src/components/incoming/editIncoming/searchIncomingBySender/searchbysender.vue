<template>
    <div style="padding-top: 100px;">
        <v-sheet width="500" class="mx-auto">
        <v-form fast-fail >
            <v-row>
              <v-col>
                <Dropdown  style="z-index: 10; margin-top: 20px" :options="sendersName" v-on:selected="validateSelection"
                  :value="'ss'"
                     :disabled="false" name="zipcode"
                    placeholder="Please select an option">
                  </Dropdown>
              </v-col>
              <v-col>
                <v-text-field v-model="date" label="التاريخ" type="number"></v-text-field>
              </v-col>
            
            </v-row>

            <v-btn @click="search()" block class="mt-2" color = "accent">بحث</v-btn>
        </v-form>
       
    </v-sheet>
    <div v-if="results">
            <div v-for="msg in results" :key="msg._id" >
        <incoming-screen
        :serialNumber="msg.serialNumber"
        :conclusion="msg.conclusion"
        :result="msg.result"
        :senderName="msg.sender.name"
        :messageNumber="msg.messageNumber"
        :date="new Date(msg.date)"
        :senderId="msg.sender._id"
        :messageId="msg._id"
        :max="msg.files"
        :authorName="msg.author.name"
        >
        </incoming-screen>
        <div style="margin-top: 10px;"></div>
    </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Dropdown from 'vue-simple-search-dropdown';

import IncomingScreen from './incomingtscreen.vue'

export default {
    data() {
        return {
            sendersName: [],
            selectedSenderId: null,
            date: null
        }
    },
    computed: {
        ...mapGetters({
            'results': 'getResultsForSearchbySender'
        })
    },
    methods: {
        ...mapActions({
            'getSendersList': 'getSendersList',
            'actSearchBySender': 'actSearchBySender',
        }),
        ...mapMutations({
            'setRemoveSenderList': 'setRemoveSenderList',
            'setResultsForSearchbySender': 'setResultsForSearchbySender'
        }),
        validateSelection(selection) {
            this.selected = selection;
            // console.log(selection.name + " has been selected", selection);
            this.selectedSenderId = selection.id;
            // console.log(selection.name + " had been selected", this.selectedSenderId);
           
        },
        async search() {
            this.setResultsForSearchbySender(null);
            console.log('selection.name '+ " had been selected", this.selectedSenderId, 'year: this.data',  this.date);
            if (this.selectedSenderId && this.date) {
               await this.actSearchBySender({senderID: this.selectedSenderId, year: this.date})
            }
        }
    },
    async created() {
       console.log('first', await this.getSendersList())
       console.log('results33', this.results)
       this.setRemoveSenderList()
        // await this.getSendersList();
        const result = await this.getSendersList();
    const sendersNameList = result.senders
    sendersNameList.forEach((obj) => {
      obj.id = obj._id;
      delete obj._id
    })
    this.sendersName = sendersNameList
    console.log('senders cc: ', this.sendersName)
        // console.log('senders3', this.senders)
    },
    destroyed() {
        this.setRemoveSenderList();
        this.selectedSenderId = null;
        this.date = null
        this.results = null
    },
    beforeDestroy() {
        this.setRemoveSenderList();
        this.selectedSenderId = null;
        this.date = null
        this.results = null
    }, 
    components: {
        Dropdown,
        'incoming-screen': IncomingScreen,
    }
}
</script>

<style></style>