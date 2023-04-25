<template>
    <v-app>
       <v-main>
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="#2a3990">
                         <v-toolbar-title>{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <form ref="form" @submit.prevent="isRegister ? register() : login()">
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               required
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
                               name="password"
                               label="Password"
                               type="password"
                               placeholder="password"
                               required
                            ></v-text-field>
 
                            <v-text-field v-if="isRegister"
                               v-model="confirmPassword"
                               name="confirmPassword"
                               label="Confirm Password"
                               type="password"
                               placeholder="cocnfirm password"
                               required
                            ></v-text-field>
                            <div class="red--text"> {{errorMessage}}</div>
                            <v-container>
                              <v-row>
                                 <v-col>
                                    <v-btn dark type="submit" class="mt-4" color="primary" value="log in">{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-btn>
                                 </v-col>
                                 <v-col>
                                    <v-btn class="text-h7 mt-4" v-on:click="isRegister = !isRegister;">
                                       {{toggleMessage}}  
                                   </v-btn>
                                 </v-col>
                              </v-row>
                            </v-container>

                       </form>
                      </v-card-text>
                   </v-card>
                 
                </v-flex>
             </v-layout>
          </v-container>
       </v-main>
    </v-app>
 </template>
 
 <script>
import cognitoService from '../services/cognito-service';
 export default {
   name: "App",
   data() {
     return {
       
       username: "",
       password: "",
       confirmPassword: "",
       isRegister : false,
       errorMessage: "",
       stateObj: {
          register :{
             name: 'Register',
             message: 'Aleady have an Account? Login'
          },
          login : {
             name: 'Login',
             message: "Don't have an Account? Register"
          }
       }
     };
   },
   methods: {
      async login() {
       const { username } = this;
       const resp = await cognitoService.validateCognito(this.username, this.password); 
       if(resp == "success"){
       this.$router.replace({ name: "dashboard", params: { username: username } });
       }
       else{
         this.errorMessage = "Invalid Username/Password."
         console.log("ERRRORRRR_INV_LOGIN"); 
       }
     },
     async register() {
        if(this.password == this.confirmPassword){
           this.isRegister = false;
           const resp = await cognitoService.validateCognito(this.username, this.password); 
           if(resp == "success"){
            this.errorMessage = "Registration Successful."
            }
           else{
           this.errorMessage = "Registration Failed."
           console.log("ERRRORRRR_INV_LOGIN"); 
            }
           this.$refs.form.reset();
        }
        else {
          this.errorMessage = "Passwords did not match, try again."
        }
     }
   },
       computed: {
        toggleMessage : function() { 
           return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message }
     }
 };
 </script>