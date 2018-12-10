<template>
   <div id='AddAudio'>
      <form>
          <b-form-group  label="Vendeur">
               <b-form-input  type="text" name="vendeur" v-model="input.vendeur" placeholder="Entrez l'url de votre site"/>
         </b-form-group>
         <b-form-group label="Image">
            <b-form-input type="text" name="image" v-model="input.image" placeholder="Entrez l'url de votre image"/>
         </b-form-group>
         <b-form-group label="Tag">
            <b-form-input type="text" name="tag" v-model="input.tag" placeholder="Entrez votre tag"/>
         </b-form-group>
         <b-form-group label="Description">
            <b-form-input type="text" name="description" v-model="input.description" placeholder="Entrez votre description"/>
         </b-form-group>
         <b-form-group label="Détail des paramètres">
            <table border="1">
               <thead>
                  <td>Control</td>
                  <td>Default</td>
                  <td>Min</td>
                  <td>Max</td>
               </thead>
               <tbody>
                  <tr>
                     <td><input name="nomButton"  v-model="input.buttons[0].nomButton" type ="text" placeholder="Nom"/> </td>
                     <td><input name="defaultValue" v-model="input.buttons[0].defaultValue" type="text" placeholder="Default"></td>
                     <td><input name="min" type="text" v-model="input.buttons[0].min" placeholder="Min"></td>
                     <td><input name="max" type="text" v-model="input.buttons[0].max" placeholder="Max"></td>
                     
                  </tr>
               </tbody>
           </table>
         </b-form-group>
         <button type="button" v-on:click="addAudio() ">Ajouter</button>
      </form>
   </div>
</template>
<script>
import axios from 'axios'
export default {
   name:"AddAudio",
   data(){
      return{
         input :{
            vendeur:"",
            image:"",
            tag:"",
            description:"",
            buttons:[
               {
                  nomButton:"",
                  defaultValue   :"",
                  min:"",
                  max:""
               }
            ]
         }
      }
   },
   methods:{
      addAudio : function(){
         var  url = "http://localhost:8080/api/addPlugin"
         alert(url)
                axios.post(url, {
                    formData: this.input
                })
                .then(response => { 
                    this.msg =  response.data.msg;
                    if(this.msg===""){
                        console.log("dans msg");
                      // this.$router.push({name:'Audio'}); 
                    }
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