<template>
  <div class="gear-gallery--dark wrapper">
    <navBar  />
    <div style="background-image:url('https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg'); height: 610px;">
    <div style="width:50%;text-align:justify; color:white;">
    <br><br>
    <h1><b>For all purposes, an entire sonic universe inside</b></h1>
    <h2><b>Get access to more than five hundred audio and MIDI plugins in a collection that will never stop growing</b></h2>
  </div>
</div>
<div class="accueil">
  <br><br>
  <h2 style="text-align: center;">Inspiration in all the Classics</h2>
<p  class="large" style="text-align: center;">All the famous stompboxes, FX, synths, sequencers and amps that made history</p>
<br/>

    <div class="row match-height">
      <div v-for="audio in filteredData" :key="audio.id" class="col-lg-4 col-md-12 col-sm-12">
        <div class="card" style="width=200px; height=200px;">
          <h4 class="card-title" align="center">{{audio.author.name}}</h4>
          <div class="card-body">
            <div class="card-img" align="center">
              <a data-toggle="modal" :data-target="getID(setPlayID(audio._id))">
                <img
                  style="height:150px; width:auto;"
                  class="card-img-top img-fluid"
                  :src="audio.screenshotUrl"
                  alt="Card image cap"
                >
              </a>
            </div>

            <div class="card-content" style="height :auto ;">
              
              <span style="color: #666;padding-left: 20px; font-family: Times New Roman"><h5> The brand of this Device is {{audio.brand}}</h5></span>
            </div>

            <div class="card-block" style="padding-left: 50px;" align="center">
          
              <a
                class="btn btn-outline-warning"
                data-toggle="modal"
                :data-target="getID(setDetailsAudio(audio._id))"
                style="width: 200px;"
              >DETAILS</a>
              
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
                        {{audio.author.name}}
                        <img style="height:50px; width:auto;" :src="audio.author.avatarUrl">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Brand:</label>
                      </td>
                      <td>
                        {{audio.brand}}
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
                        {{audio.description}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Label:</label>
                      </td>
                      <td>
                        {{audio.label}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Name:</label>
                      </td>
                      <td>
                        {{audio.name}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>PedalboardCount:</label>
                      </td>
                      <td>
                        {{audio.pedalboardCount}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Stable:</label>
                      </td>
                      <td>
                       {{audio.stable}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Uri:</label>
                      </td>
                      <td>
                        <a :href="audio.uri"> Lien Image Audio</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Version:</label>
                      </td>
                      <td>
                        {{audio.version}}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Screenshot:</label>
                      </td>
                      <td>
                        <img style="height:50px; width:auto;" :src="audio.screenshotUrl">
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
                    <tr v-for="controlPort in audio.controlPorts" :key="controlPort.id">
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
<p style="text-align: center; color:#17a2b8 ;" class="large">Explore more in the Plugin Shop</p>
<a href="/pluginShop" class="button">Go to Plugin Shop</a>
<br/>
<br/><br/>
  </div>
  </div>

</template>

<script>
import NavBar from './NavBar'
export default {
  author: "AppAudio",
  components: {
    "NavBar":NavBar
  },
  data() {
    return {
      audios: [],
      audiosToDisplay: [],
      perPage: 12,
      pageToOpen: 1,
      currentPage: 1,
      newAudio: {
        _id: "",
        author: { name: "" },
        brand: "",
        description: "",
        title: "",
        screenshotUrl: ""
      }
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
      console.log("--- GETTING  Audios ---");
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.audios = res.data;
          });
        })
        .catch(err => {
          console.log("erreur dans le get : " + err);
        });
    },
    getAudios: function() {
      let _this = this;
      fetch("http://localhost:8080/api/audios?page=0&pagesize=3000")
        .then(response => {
          response.json().then(res => {
            _this.audios = res.data;
            _this.renderList();
          });
        })
        .catch(err => {
          console.log("erreur dans le get : " + err);
        });
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
    
    detailAudio: function(audio) {
      console.log("--- DETAIL Audio ---");
      let url = "http://localhost:8080/api/audios/" + audio._id;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(audio)
      })
        .then(responseJSON => {
          console.log("Audio details");
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getID: function(id) {
      return "#" + id;
    },
   
    setPlayID: function(id) {
      return "play" + id;
    },
    setDetailsAudio: function(id) {
      return "detail" + id;
    }
  }
};
</script>