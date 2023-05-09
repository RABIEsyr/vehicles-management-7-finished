
<template>
    <div>
        <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header color="#F8BC24">
                <span style="color: white; margin-left: 45%;">{{ senderName }} </span>
                <template v-slot:actions>
            <v-icon color="white">
              $expand
            </v-icon>
          </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content style="z-index: 10">
                <div class="row">
                    <div class="col-lg-6 col-sm-4 col-sm-offset-2" align="center">
                        <div class="form-group">
                            <div class="inputGroupContainer">
                                <div class="container" style="max-width: 800px;">
                                    <div>
                                        <form class="well form-horizontal" id="contact_form">
                                            <fieldset>

                                                <div class="row myCustomInput" style="margin-left: 30px ">
                                                    <div
                                                        class="col-lg-3 col-sm-4 col-sm-offset-2 col-lg-offset-3 col-md-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"><i
                                                                            class="glyphicon glyphicon-user"></i></span>
                                                                    <input :v-model="authorName"
                                                                        name="author" class="form-control myCustomInput"
                                                                         v-model="authorName">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">المحرر</label>
                                                    </div>
                                                </div>


                                                <div class="row myCustomInput" style="margin-left: 30px ">
                                                    <div
                                                        class="col-lg-3 col-sm-4 col-sm-offset-2 col-lg-offset-3 col-md-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"><i
                                                                            class="glyphicon glyphicon-refresh"></i></span>
                                                                    <input :v-model="serialNumber"
                                                                        name="serial" class="form-control myCustomInput"
                                                                        type="number" v-model="serialNumber">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">الرقم المتسلسل</label>
                                                    </div>
                                                </div>
                                                <!-- Text input-->

                                                <!-- <div class="row" style="z-index: -1;"> -->
                                                <div class="row">
                                                    <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer ">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"> و /</span>
                                                                <!-- <input style="z-index: -1;" name="messaageNumber" class="form-control myCustomInput" type="number"
                                            v-model="messageNumber">  -->
                                                                    <input name="messaageNumber"
                                                                        class="form-control myCustomInput" type="number"
                                                                        v-model="messageNumber">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">رقم الرسالة الواردة</label>
                                                    </div>
                                                </div>


                                                <!-- Text input مرسل-->
                                                <div class="row">
                                                    <div class="col-lg-1 col-sm-4 col-sm-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"><i
                                                                            class="glyphicon glyphicon-user"></i></span>
                                                               
                                                                    <Dropdown v-model="senderId" style="z-index: 10;"
                                                                        :options="senderId" 
                                                                        :value="senderId" :disabled="true" name="zipcode"
                                                                        :placeholder="senderName"
                                                                        >
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">المرسل</label>
                                                    </div>
                                                </div>


                                                <!-- Text input-->
                                                <div class="row">
                                                    <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer ">
                                                                <div class="input-group">
                                                                    <div class="form-group">
                                                                        <div class="inputGroupContainer">
                                                                            <div class="input-group"
                                                                                style="width: 380px; margin-left: 16px">
                                                                                <span class="input-group-addon"><i
                                                                                        class="glyphicon glyphicon-calendar"></i></span>
                                                                                <!-- <input name="email" placeholder="E-Mail Address" class="form-control" type="text"> -->
                                                                                <date-picker class="form-control"
                                                                                    @dp-hide="doSomethingOnHide"
                                                                                    @dp-change="doSomethingOnChange"
                                                                                    :config="{ format: 'DD/MM/YYYY' }"
                                                                                    v-model="date"></date-picker>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">تاريخ ورود الرسالة</label>
                                                    </div>
                                                </div>

                                                <!-- Text input-->

                                                <div class="row">
                                                    <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"><i
                                                                            class="glyphicon glyphicon-list"></i></span>
                                                                    <textarea name="result" class="form-control" type="text"
                                                                        v-model="result"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">النتيجة</label>
                                                    </div>
                                                </div>

                                                <!-- Text input-->

                                                <div class="row">
                                                    <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                                                        <div class="form-group">
                                                            <div class="inputGroupContainer">
                                                                <div class="input-group">
                                                                    <span class="input-group-addon"><i
                                                                            class="glyphicon glyphicon-paperclip"></i></span>
                                                                    <textarea name="conclusion" class="form-control"
                                                                        type="text" v-model="conclusion"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label class="my-custom-label">الخلاصة</label>
                                                    </div>
                                                </div>

                                                <!-- 11 -->
                                               


                                                <!-- 111 -->
                                                <v-expansion-panels>
                                                    <v-expansion-panel>
                                                        <v-expansion-panel-header>
                                                            عرض صور
                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content style="z-index: 10">
                                                            <div class="row">
                                                                <div class="col-lg-6 col-sm-4 col-sm-offset-2"
                                                                    align="center">
                                                                    <div class="form-group">
                                                                        <div class="inputGroupContainer">
                                                                            <!-- <uploadImage/> -->
                                                                            <carousel-images :images-number="max"
                                                                                :message-id="messageId"
                                                                                :sender-id="senderId"></carousel-images>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </v-expansion-panel-content>
                                                    </v-expansion-panel>
                                                </v-expansion-panels>




                                               
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import datePicker from 'vue-bootstrap-datetimepicker';
import Dropdown from 'vue-simple-search-dropdown';

import CarouselsComponent from '../carouselsImages.vue'

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
    props: [
        'serialNumber',
        'conclusion',
        'result',
        'senderName',
        'messageNumber',
        'date',
        'senderId',
        'messageId',
        'max',
        'authorName'
    ],
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters({
            getImage: 'getImage',
            getSerialNumberSearch: 'getSerialNumberSearch',
            getdateSearch: 'getdateSearch',
            getSearchResult: 'getSearchResult'
        })
    },
    methods: {
        ...mapActions({
            uploadImageX: 'uploadImageX'
        }),
        ...mapMutations({
            'setRemoveSenderList': 'setRemoveSenderList'
        }),
        sendImage() {
            this.uploadImageX(this.getImage);
        },
        validateSelection(selection) {
            // this.selected = selection;
            // console.log(selection.name + " has been selected", selection.id);
            // this.senderId = selection.id;
            console.log(selection.name + " had been selected", this.senderId);

        },
    },
    components: {
        'date-picker': datePicker,
        Dropdown,
        'carousel-images': CarouselsComponent
    },
    updated() {
        console.log('getSearchResult', this.getSearchResult)
        this.serialNumber = this.getSearchResult.doc.serialNumber;
        this.conclusion = this.getSearchResult.doc.conclusion,
            this.result = this.getSearchResult.doc.result;
        this.senderName = this.getSearchResult.doc.sender;
        this.messageNumber = this.getSearchResult.doc.messageNumber;
        this.date = this.getSearchResult.doc.date;
        this.max = this.getSearchResult.files;
        this.messageId = this.getSearchResult.doc._id;
        this.senderId = this.getSearchResult.doc.sender._id
    },
    destroyed() {
        this.setRemoveSenderList()
    },
    beforeDestroy() {
        this.setRemoveSenderList();
    }, 
}
</script>

<style lang="css" scoped src="../../bootstrapstyle/min.css">
.myCustomInput {
    /* z-index: -1 !important; */
}

.input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    /* z-index: -1 !important; */
}

.input-group .form-control[data-v-13ed8f39]:last-child {
    /* z-index: -1 !important; */
}

.mdi-chevron-down::before {
    content: "\F0140";
    color: white !important;
}
.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
    display: inline-block;
    font: normal normal normal 24px/1 "Material Design Icons";
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    color: white !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>