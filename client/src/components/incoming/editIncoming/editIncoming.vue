
<template>
    <div class="container" style="max-width: 800px;">
        <SearchForm />
        <div v-if="getSerialNumberSearch && getdateSearch && getSearchResult">
            <form class="well form-horizontal" id="contact_form">
                <fieldset>

                    <!-- Form Name -->
                    <legend>
                        <span style="margin-left: 40%">تعديل كتاب وارد </span>
                    </legend>

                    <!-- Text input-->

                    <div class="row myCustomInput" style="margin-left: 30px ">
                        <div></div>
                        <div class="col-lg-3 col-sm-4 col-sm-offset-2 col-lg-offset-3 col-md-offset-2">
                            <div class="form-group">
                                <div class="inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-refresh"></i></span>
                                        <input  name="serial"
                                            class="form-control myCustomInput" type="number" v-model="serialNumber">
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
                                        <input name="messaageNumber" class="form-control myCustomInput" type="number"
                                            v-model="messageNumber">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label class="my-custom-label">رقم الرسالة الواردة</label>
                        </div>
                    </div>


                    <!-- Text input-->
                    <div class="row">
                        <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                            <div class="form-group">
                                <div class="inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <!-- <select name="state" class="form-control selectpicker" v-model="senderName">
                                        <option value=" ">Please select your state</option>
                                        <option>Alabama</option>
                                        <option>Alaska</option>
                                        </select> -->
                                    <!-- <Dropdown v-model="ss[0].name" style="z-index: 10;" :options="ss" v-on:selected="validateSelection"
                  :value="ss[0]"
                 
                     :disabled="false" name="zipcode"
                    :placeholder="senderName.name">
                      </Dropdown> -->
                                        <Dropdown v-model="ss[0].name" style="z-index: 10;" :options="ss"
                                            v-on:selected="validateSelection" :value="ss[0]" :disabled="false"
                                            name="zipcode" :placeholder="senderName.name">
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
                                                <div class="input-group" style="width: 380px; margin-left: 16px">
                                                    <span class="input-group-addon"><i
                                                            class="glyphicon glyphicon-calendar"></i></span>
                                                    <date-picker class="form-control" 
                                                    :placeholder="datePlace"
                                                    v-model="date"
                                                        ></date-picker>

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
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                                        <textarea name="result" class="form-control" type="text"
                                            v-model.lazy="result"></textarea>
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
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-paperclip"></i></span>
                                        <textarea name="conclusion" class="form-control" type="text"
                                            v-model="conclusion"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label class="my-custom-label">الخلاصة</label>
                        </div>
                    </div>

                    <!-- 11 -->
                    <!-- <div class="row">
                        <div class="col-lg-6 col-sm-4 col-sm-offset-2">
                            <div class="form-group">
                                <div class="inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                                        <textarea name="result" class="form-control" type="text"
                                            v-model="result"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label class="my-custom-label">النتيجة</label>
                        </div>
                    </div> -->


                    <!-- 111 -->
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
                                                <!-- <uploadImage/> -->
                                                <carousel-images :images-number="max" :message-id="messageId"
                                                    :sender-id="senderId"></carousel-images>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>




                    <!-- ببب -->
                    <div style="margin-top: 10px">
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    اضافة صور
                                </v-expansion-panel-header>
                                <v-expansion-panel-content style="z-index: 10">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-4 col-sm-offset-2" align="center">
                                            <div class="form-group">
                                                <div class="inputGroupContainer">
                                                    <uploadImage />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                    <!-- Button -->
                    <div class="form-group">
                        <label class="col-md-4 control-label"></label>
                        <div class="col-md-4">
                            <button @click.prevent="editIncoming()" class="btn btn-warning">تعديل <span
                                    class="glyphicon glyphicon-save"></span></button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div v-else>
            <!-- <h1>No Results</h1> -->
        </div>
        <!-- <button v-if="getImage" @click="sendImage()">Send</button> -->
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import datePicker from 'vue-bootstrap-datetimepicker';
import Dropdown from 'vue-simple-search-dropdown';

import CarouselsComponent from './carouselsImages.vue';

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import uploadImage from '../multipleImagesUpload/uploadImage.vue';
import SearchForm from './searchForm';
export default {
    data() {
        return {
            conclusion: null,
            result: null,
            senderName: { name: '' },
            messageNumber: null,
            serialNumber: 0,
            date: null,
            ss: [{ id: '11ddd', name: 'Sam' }],
            max: null,
            messageId: null,
            senderId: null,
            name: '',
            datePlace: null
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
            uploadImageX: 'uploadImageX',
            'editMessage': 'actEditMessage'
        }),
        ...mapMutations({
            'setRemoveSenderList': 'setRemoveSenderList',
            'setImageM': 'setImageM'
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
       async editIncoming() {
           const resoForEdit = await this.editMessage({
                serialNumber: this.serialNumber,
                senderId: this.senderId,
                messageNumber: this.messageNumber,
                conclusion: this.conclusion,
                date: this.date,
                result: this.result,
                images: this.getImage
            });
            if (!resoForEdit.success) {
                this.$alert("", 'حدث خطا يرجى مراجعة المطور', 'error', );
            } else {
                this.$alert(`${this.username}`, 'تم التعديل بنجاح', 'success', );
            }

        }
    },
    components: {
        'date-picker': datePicker,
        uploadImage,
        SearchForm,
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
        console.log('dated', this.getSearchResult.doc.date)
        this.date =   this.getSearchResult.doc.date

        this.datePlace = this.getSearchResult.doc.date;
        this.max =  this.getSearchResult.files;
        this.messageId = this.getSearchResult.doc._id;
        this.senderId = this.getSearchResult.doc.sender._id
    },
    destroyed() {
    this.setRemoveSenderList();
    this.setImageM(null);
    },
    beforeDestroy() {
        this.setRemoveSenderList();
    }, 
}
</script>

<style lang="css" scoped src="../bootstrapstyle/min.css">
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
</style>