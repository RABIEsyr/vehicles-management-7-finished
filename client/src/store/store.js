import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config/config';

const url = config.apiUrl;

Vue.use(Vuex);

const store = new Vuex.Store(

    {
        state: {
            isAuthenticated: null,
            isAdmin: false,
            // sendersList: [],
            image: null,

            // search state
            serialNumberSearch: null,
            dateSearch: null,
            searchResult: {},
            err1NewUser: false,
            err1NewUserMsg: null,
            policeUsername: null,
            err2ChangePasword: null,
            err2ChangePaswordMsg: null,
            sendersList: [],

            resultsForSearchbySender: null,

            lastSerialSequential: null,
        },
        getters: {
            getIsAutenticated: state => state.isAuthenticated,
            getIsAdmin: state => state.isAdmin,
            getImage: state => state.image,

            // search get
            getSerialNumberSearch: state => state.serialNumberSearch,
            getdateSearch: state => state.dateSearch,
            getSearchResult: state => state.searchResult,

            getErr1NewUser: state => state.err1NewUser,
            getErr1NewUserMsg: state => state.err1NewUserMsg,

            getPoliceUsername: state => state.policeUsername,

            getErr2ChangePasword: state => state.err2ChangePasword,
            getErr2ChangePaswordMsg: state => state.err2ChangePaswordMsg,

            getSendersList: state => state.sendersList,

            getResultsForSearchbySender: state => state.resultsForSearchbySender,

            getLastSerialSequential: state => state.lastSerialSequential,
            
        },
        mutations: {
            checkIsAuthenticated(state, payload) {
                state.isAuthenticated = payload;
            },
            checkIsAdmin(state, payload) {
                state.isAdmin = payload;
            },
            loginMutation(state, payload) {
                console.log('payload', payload);
                state.isAuthenticated = payload;
            },
            logoutMutations(s) {
                s.isAuthenticated = false
                s.policeUsername = null
            },
            // mutSendersList(state, payload) {
            //     state.sendersList = payload
            // },
            setImageM(state, payload) {
                state.image = payload;
            },

            // search mutation
            setSerialNumberSearch(state, payload) {
                state.serialNumberSearch = payload;
            },
            setDateSearch(state, payload) {
                state.dateSearch = payload
            },
            setSearchResult(state, payload) {
                state.searchResult = payload
            },
            setErr1NewUser(state, payload) {
                state.err1NewUser = payload
            },
            setErr1NewUserMsg(state, payload) {
                state.err1NewUserMsg = payload
            },
            setPoliceUsername(state, payload) {
                state.policeUsername = payload
            },
            setErr2ChangePassword(state, payload) {
                state.err2ChangePasword = payload
            },
            setErr2ChangePasswordMsg(state, payload) {
                state.err2ChangePaswordMsg = payload
            },

            setSendersList(state, payload) {
                state.sendersList = payload;
            },

            setResultsForSearchbySender(state, payload) {
                state.resultsForSearchbySender = payload
            },
            setRemoveSenderList(state) {
                state.sendersList = null;
                state.resultsForSearchbySender = null
                console.log('eerr, ', state.sendersList)
            },

            setLastSerialSequential(state, payload) {
                state.lastSerialSequential = payload;
            }
            

        },
        actions: {
            async checkIsAuthenticated({ commit }, token) {
                if (!token) return false;
                else {
                    try {
                        const data = await axios.post(url + '/check-is-auth', { token });
                        const isAuth = data.data;
                        // console.log('store:isAuth', isAuth);
                        if (isAuth.success) {
                            commit('checkIsAuthenticated', true);
                            return true;
                        } else {
                            commit('checkIsAuthenticated', false);
                            return false;
                        }
                    } catch (error) {
                        console.log('err1: ', error)
                        commit('checkIsAuthenticated', false);
                        return false;
                    }

                }
            },
            async checkIsAdmin({ commit }, token) {
                if (!token) return false;
                else {
                    try {
                        const data = await axios.post(url + '/check-is-admin', { token });
                        const isAdmin = data.data;
                        // console.log('store:isAuth', isAuth);
                        if (isAdmin.success) {
                            commit('checkIsAdmin', true);
                            return true;
                        } else {
                            commit('checkIsAdmin', false);
                            return false;
                        }
                    } catch (error) {
                        console.log('err1: ', error)
                        commit('checkIsAdmin', false);
                        return false;
                    }

                }
            },
            async loginActions({ commit }, { username, password }) {
                const data = await axios.post(url + '/auth/log-in',
                    {
                        username,
                        password
                    }
                );
                const result = data.data;
                if (result.success) {
                    // console.log('store lo:,', result);
                    localStorage.setItem('token', result.token);
                    commit('loginMutation', true);
                    return true;
                } else {
                    commit('loginMutation', false);
                    return false
                }

            },
            async addNewMessage(_, { conclusion, messageNumber, serialNumber, date, senderId, result, images }) {
               return await axios.post(url + '/new-message/new',
                    {
                        serialNumber,
                        senderId,
                        messageNumber,
                        conclusion,
                        date,
                        result,
                        images
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
            },
            // async fetchOneMessage({commit}, {year, serialNumber}) {
            //     await axios.post(url + '/edit-message', 
            //     {

            //     },
            //     { headers: { authorization: localStorage.getItem('token') } }
            //     )
            // },
            async addNewSenderX(_, { name }) {
               const res = await axios.post(url + '/add-sender',
                    {
                        name
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
                return res;
            },
            async getSendersList({commit}) {
                const data = await axios.get(url + '/get-senders',
                    {
                        headers: { authorization: localStorage.getItem('token') }
                    }
                );
                // console.log('sender5', data.data)
                 commit('setSendersList', data.data.senders)   
                return data.data;
            },
            // async uploadImageX(_, payload) {


            //     axios.post(url + '/edit-message', {
            //         payload
            //     },
            //         {
            //             headers: {
            //                 // "Content-Type": "multipart/form-data",
            //                 authorization: localStorage.getItem('token')
            //             }
            //         }
            //     )
            // }
            async searchForIncoming({ commit }, { serial, date }) {
                const data = await axios.post(url + '/edit-message/get-no-edit',
                    {
                        serial,
                        date
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
                console.log('result for search', data.data)
                commit('setSearchResult', data.data)
            },
            async actAddNewUser({ commit }, username) {

                const result = await axios.post(url + '/new-user/new-user',
                    {
                        username
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
                if (result.data.success == false) {
                    commit('setErr1NewUser', !result.data.success);
                    commit('setErr1NewUserMsg', result.data.message)
                } else {
                    commit('setErr1NewUser', false);
                }
                console.log('new user reslut', result.data);
            },
           async actPoliceUsername({commit}) {
               const result =  await axios.get(url + '/new-user/get-username',
                { headers: { authorization: localStorage.getItem('token') } });
                commit('setPoliceUsername', result.data);
            },

            async actChangePassword({ commit }, {oldPass, newpass}) {
                const result = await axios.post(url + '/change-password/change-password',
                    {
                        oldpass: oldPass,
                        newpass: newpass
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
                if (result.data.success) {
                    commit('setErr2ChangePassword', false)
                } else {
                    commit('setErr2ChangePassword', true)
                    commit('setErr2ChangePasswordMsg', result.data.message)
                }
                return result.data;
            },
            async actSearchBySender({commit}, {senderID, year}) {
                const result = await axios.post(url + '/search-by-sender/',
                {
                    senderID,
                    year
                },
                { headers: { authorization: localStorage.getItem('token') } }
                );

                if (result.data.success) {
                    console.log('resoreso', result.data.docs)
                    commit('setResultsForSearchbySender', result.data.docs)
                }
            },

            async actEditMessage(_, {conclusion, messageNumber, serialNumber, date, senderId, result, images}) {
                const resultServer = await axios.post(url + '/edit-message/edit',
                {
                    serialNumber,
                    senderId,
                    messageNumber,
                    conclusion,
                    date,
                    result,
                    images
                },
                { headers: { authorization: localStorage.getItem('token') } });
                return resultServer.data;
             },
             
             async actLastSerialSequential({commit}) {
                const result =  await axios.get(url + '/get-last-serial',
                 { headers: { authorization: localStorage.getItem('token') } });
                 console.log('max here', result.data)
                 if (result.data.success == true) {
                    commit('setLastSerialSequential', result.data.max);
                 } else {
                    commit('setLastSerialSequential', -1);
                 }
                 return result.data.max;
             },

             async actGetAllUsers() {
                const result =  await axios.get(url + '/new-user/get-all-users',
                 { headers: { authorization: localStorage.getItem('token') } });

                 console.log('userr', result);
                 return result
             },
        }
    }
)

export default store;