<template>
  <div>
    <navBar/>
    <br/>
    <div class="page-title">
            <h1> My Plugins</h1>
            <p class="shortline"></p>
        </div>
 
        <br/> 
    <form  v-if="this.$session.exists()" role="search" style="width: 700px;left:10px" >
     <div class="search-container whiteframe" >
        <input
          type="text"
          class="form-control round"
          author="query"
          v-model="filterKey"
          placeholder="Search plugins"
        >
       
        
          <button type="button" class="feed-search-button">
                    <img src="/static/images/search.png" alt="Search">
                </button>       
      </div>
    </form>
    <div class="row match-height">
      <div v-for="audio in filteredData" class="col-lg-4 col-md-12 col-sm-12">
        <div class="card" style="width=200px; height=200px;">
          <h4 class="card-title" align="center">{{audio.res.author.name}}</h4>
          <div class="card-body">
            <div class="card-img" align="center">
              <a data-toggle="modal" :data-target="getID(setPlayID(audio._id))">
                <img
                  style="height:150px; width:auto;"
                  class="card-img-top img-fluid"
                  :src="audio.res.screenshotUrl"
                  alt="Card image cap"
                >
              </a>
            </div>
             
             <div class="divider"></div>
            <div class="card-block" style="padding-left: 50px;">
              <a
                class="btn btn-outline-warning"
                data-toggle="modal"
                :data-target="getID(audio._id)"
                style="width: 200px;"
              >
              EDIT
             </a> 
              <a
                class="btn btn-outline-warning"
                data-toggle="modal"
                :data-target="getID(setDetailsAudio(audio._id))"
                style="width: 200px;"
              >DETAILS
              </a>
              <a
                class="btn btn-floating halfway-fab bg-warning"
                data-toggle="modal"
                :data-target="getID(setdeleteID(audio._id))"
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- ***************************************** Modal pour Modifier une  Audio *********************************** -->
        <div
          class="modal fade text-left"
          style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
          :id="audio._id"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel34"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header bg-warning white">
                <h3 class="modal-title" id="myModalLabel34">Edit Audio</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div class="modal-body">
                  <label>Author:</label>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      type="text"
                      placeholder="author"
                      class="form-control"
                      v-model="audio.res.author.name"
                    >
                    <div class="form-control-position">
                      <i
                        class="fa fa-Audio-camera font-medium-1 line-height-1 text-muted icon-align"
                      ></i>
                    </div>
                  </div>

                  <label>Brand:</label>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      type="brand"
                      placeholder="brand"
                      class="form-control"
                      v-model="audio.res.brand"
                    >
                    <div class="form-control-position">
                      <i class="fa fa-link font-medium-1 line-height-1 text-muted icon-align"></i>
                    </div>
                  </div>

                  <label>Description:</label>
                  <div class="form-group position-relative has-icon-left">
                    <textarea
                      placeholder="Type here ..."
                      class="form-control"
                      v-model="audio.res.description"
                    ></textarea>
                    <div class="form-control-position">
                      <i
                        class="fa fa-file-text-o font-medium-1 line-height-1 text-muted icon-align"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <input
                    type="reset"
                    class="btn btn-outline-secondary btn-lg"
                    data-dismiss="modal"
                    value="close"
                  >
                  <input
                    type="button"
                    v-on:click="editAudio(audio)"
                    data-dismiss="modal"
                    class="btn btn-outline-warning btn-lg"
                    value="Edit"
                  >
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- ************************************ Modal pour Suppression d'une Audio ************************************** -->
        <div
          class="modal fade text-left"
          style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
          :id="setdeleteID(audio._id)"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel34"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div
                class="swal2-modal swal2-show"
                style="display: block; width: 500px; padding: 20px; background: rgb(255, 255, 255); min-height: 357px;"
                tabindex="-1"
              >
                <div class="swal2-icon swal2-warning pulse-warning" style="display: block;">!</div>

                <h2>Vous etes sure ?</h2>
                {{audio.res.author}}
                <div class="swal2-content" style="display: block;">You won't be able to revert this!</div>

                <hr class="swal2-spacer" style="display: block;">
                <button
                  v-on:click="removeAudio(audio)"
                  data-dismiss="modal"
                  class="swal2-confirm btn btn-success btn-raised mr-5"
                  style
                >Oui, le supprimer!</button>
                <button
                  class="swal2-cancel btn btn-danger btn-raised"
                  data-dismiss="modal"
                  style="display: inline-block;"
                >Non, cancel!</button>
              </div>
            </div>
          </div>
        </div>
        <!-- ***************************************** Modal pour Detail  Audio *********************************** -->
        <div
          class="modal fade text-left"
          style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
          :id="setDetailsAudio(audio._id)"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel34"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header bg-warning white">
                <h3 class="modal-title" id="myModalLabel34">Detail Audio</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div class="modal-body">
                  <table  class="w3-table-all w3-hoverable">
                    <tr>
                      <td>
                        <label>Author:</label>
                      </td>
                      <td>
                        {{audio.res.author.name}}
                        <img style="height:50px; width:auto;" :src="audio.res.author.avatarUrl">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Brand:</label>
                      </td>
                      <td>
                        {{audio.res.brand}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Categories:</label>
                      </td>
                      <td>
                        {{audio.categories}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Description:</label>
                      </td>
                      <td>
                        {{audio.res.description}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Label:</label>
                      </td>
                      <td>
                        {{audio.res.label}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Name:</label>
                      </td>
                      <td>
                        {{audio.res.name}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>PedalboardCount:</label>
                      </td>
                      <td>
                        {{audio.res.pedalboardCount}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Stable:</label>
                      </td>
                      <td>
                       {{audio.res.stable}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Uri:</label>
                      </td>
                      <td>
                        <a :href="audio.res.uri">Clicker sur ce lien</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Version:</label>
                      </td>remaincalm.
                      <td>
                        {{audio.res.version}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Screenshot:</label>
                      </td>
                      <td>
                        <img style="height:50px; width:auto;" :src="audio.res.screenshotUrl">
                      </td>
                    </tr>
                  </table>

                  <br/><br/>
                  <label>Control ports list:</label>
                  <table align="center" class="w3-table-all w3-hoverable">
                    <tr>
                      <td>Name</td>
                      <td>Default</td>
                      <td>Max</td>
                      <td>Min</td>
                    </tr>
                    <tr v-for="controlPort in audio.res.controlPorts" :key="controlPort.id">
                      <td>
                        {{controlPort.name}}
                      </td>
                      <td>
                        {{controlPort.default}}
                      </td>
                      <td>
                        {{controlPort.max}}
                      </td>
                      <td>
                        {{controlPort.min}}
                      </td>
                    </tr>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        class="btn btn-primary btn-xs"
        v-show="showPrev"
        @click.stop.prevent="renderList(currentPage-1)"
      >Prev</button>
      Page {{currentPage}} of {{totalPages}}
      <button
        class="btn btn-primary btn-xs"
        v-show="showNext"
        @click.stop.prevent="renderList(currentPage+1)"
      >Next</button>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import axios from 'axios'

export default {
  author: "Author",
  components: {
    "NavBar":NavBar
  },
  data() {
    return {
      audios: [],
      audiosToDisplay: [],
      perPage: 3,
      pageToOpen: 1,
      currentPage: 1,
      newAudio: {
        _id: "",
        author: { name: "" },
        brand: "",
        description: "",
        title: "",
        screenshotUrl: ""
      },
      filterKey: ""
    };
  },
  mounted() {
   
  },
  created() {
    this.getAudios();
  },
  computed: {
    filteredData: function() {
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.audiosToDisplay;
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      return data;
    },
    totalPages() {
      //calculate the total number of pages based on the number of items to show per page and the total items we got from server
     return this.audios.length && this.audios.length > this.perPage
        ? Math.ceil(this.audios.length / this.perPage)
        : 1;
    },

    start() {
      return (this.pageToOpen - 1) * this.perPage;
    },

    stop() {
      //stop at the end of the array if array length OR the items left are less than the number of items to show per page
      //do the calculation if otherwise
     if (this.audios.length - this.start >= this.perPage) {
        return this.pageToOpen * this.perPage - 1;
      } else {
        return this.audios.length - 1;
      }
    },

    showNext() {
     return this.currentPage < this.totalPages;
    },

    showPrev() {
       return this.currentPage > 1;
    }
  },
  watch: {
    //re-render list based on the value of `perPage` which indicates how many to show per page
     perPage: function() {
     this.renderList();
    }
  },
  methods: {
    getDataFromServer(url) {
      console.log("--- GETTING AUDIOS ---");
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.audios = response.data
            console.log(this.audios);
          });
        })
        .catch(err => {
          console.log("erreur dans le get : " + err);
        });
    },
    getAudios: function() {
      let _this = this;
      axios.get("http://localhost:8080/api/pluginAuthors",
        { params : {
          email: this.$session.get('email')
        }
      }).then(response => {
         _this.audios = response.data.audio;
         _this.renderList();
        })
        .catch(err => {
          console.log("erreur dans le get : " + err);
        });
    },
    getID: function(id) {
      return "#" + id;
    },
    setdeleteID: function(id) {
      return "del" + id;
    },
    setPlayID: function(id) {
      return "play" + id;
    },
    setDetailsAudio: function(id) {
      return "detail" + id;
    },
     renderList(pageNumber = 1) {
      //clear currently displayed list
      this.audiosToDisplay = [];

      //set ausdios to display
      if (this.audios.length) {
        let _this = this;

        return new Promise(function(res, rej) {
          //set the page to open to the pageNumber in the parameter in order to allow start and stop to update accordingly
          _this.pageToOpen = pageNumber;

          //add the necessary data to `audiosToDisplay` array
          for (let i = _this.start; i <= _this.stop; i++) {
            _this.audiosToDisplay.push(_this.audios[i]);
          }

          res();
        })
          .then(function() {
            //Now update the current page to the page we just loaded
            _this.currentPage = _this.pageToOpen;
          })
          .catch(function() {
            console.log("render err");
          });
      }
    },
     removeAudio: function(audio) {
      console.log("--- DELETE AUDIO ---");
      let url = "http://localhost:8080/api/audios/"+ audio.res._id;
     console.log(audio.res._id);

      fetch(url, {
        method: "DELETE"
      })
        .then(responseJSON => {
         window.location.reload(true)
         
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    

  }
};
</script>


