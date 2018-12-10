<template>
    <div id="Login">
        <b-form >
        <p class="error"> {{msg}}</p>
         <b-form-group>
          <b-form-input type="text" name="email" v-model="input.email" required placeholder="Email"></b-form-input>
         </b-form-group>
        <b-form-group>
           <b-form-input type="password" name="password" v-model="input.password" placeholder="Password"> </b-form-input>
        </b-form-group>
        <b-button type="button" v-on:click="login()">Login</b-button>
    </b-form>
    </div>
   
</template>
<script>
import axios from 'axios'

    export default {
       
        name: 'Login',
        data() {
            return {
                msg :"",
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                var  url = "http://localhost:8080/api/login"
                axios.post(url, {
                    formData: this.input
                })
                .then(response => { 
                    console.log(response)
                    this.msg =  response.data.msg;
                    if(this.msg===""){
                        console.log("dans msg");
                      // localStorage.setItem('email', this.input.email)
                       this.$router.push({name:'Audio'}); 
                    }
                })
                .catch(e => {
                    console.log(e)
                   //localStorage.removeItem('email')
                })
               

               
            }
        }
    }
</script>
