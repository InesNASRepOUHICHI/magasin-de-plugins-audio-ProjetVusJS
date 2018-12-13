<template>
   <div id='AddAudio' v-if="this.$session.exists()">
      <navbar/>
      <form style="text-align:left ;font-size:1em;">
          <b-form-group  label="Vendeur :" >
               <b-form-input  type="text" name="avatarUrl" v-model="input.author.avatarUrl" placeholder="Entrez l'url de votre site"/>
         </b-form-group>
          <b-form-group  label="Nom :">
               <b-form-input  type="text" name="name" v-model="input.author.name" placeholder="Entrez l'url de votre site"/>
         </b-form-group>
          <b-form-group  label="Marque :">
               <b-form-input  type="text" name="brand" v-model="input.brand" placeholder="Entrez le nom de votre marque"/>
         </b-form-group>
         <b-form-group label="Tag :">
            <b-form-input type="text" name="categories" v-model="input.categories" placeholder="Entrez votre tag"/>
         </b-form-group>
         <b-form-group label="Image :">
            <b-form-input type="text" name="screenshotUrl" v-model="input.screenshotUrl" placeholder="Entrez l'url de votre image"/>
         </b-form-group>
         <b-form-group label="Détail des paramètres :">
            <table border="1">
               <thead>
                  <td>Default</td>
                  <td>Min</td>
                  <td>Max</td>
                  <td>Name</td>
               </thead>
               <tbody>
                  <tr>
                     <td><input name="default" v-model="input.controlPorts[0].default" type="text" placeholder="Default"></td>
                     <td><input name="min" type="text" v-model="input.controlPorts[0].min" placeholder="Min"></td>
                     <td><input name="max" type="text" v-model="input.controlPorts[0].max" placeholder="Max"></td>
                     <td><input name="name" type="text" v-model="input.controlPorts[0].name" placeholder="Name"></td>

                  </tr>
               </tbody>
           </table>
         </b-form-group>
          <b-form-group label="Description :">
            <b-form-input type="text" name="description" v-model="input.description" placeholder="Entrez votre description"/>
         </b-form-group>
         <button type="button" v-on:click="addAudio() ">Ajouter</button>
      </form>
   </div>
</template>
<script>
import axios from 'axios'
import NavBar from './NavBar'
export default {
   name:"AddAudio",
   components: { 
            'Navbar':NavBar
   },
   data(){
      return{
         input:{
            author :{
               avatarUrl:"",
               name:""
            },
            brand:"",
            categories:[],
            controlPorts:[
               {
                  default:"",
                  max:"",
                  min:"",
                  name:""
               }
            ],
            description:"",
            screenshotUrl:""
         }
      }
   },
   methods:{
      addAudio : function(){
         var  url = "http://localhost:8080/api/addPlugin"
                axios.post(url, {
                    formData: this.input
                })
                .then(response => { 
                    this.msg =  response.data.msg;
                   
                      this.$router.push({name:'Author'}); 
                    
                })
                .catch(e => {
                    console.log(e)
                    //this.errors.push(e);
                })
               
      } 
   }
   
}
</script>

<style>

</style>    