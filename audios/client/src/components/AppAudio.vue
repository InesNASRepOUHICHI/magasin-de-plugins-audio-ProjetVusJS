<template>
  <div>
    <form id="search" role="search" style="width: 300px;">
      <div class="position-relative has-icon-right">
        <input
          type="text"
          class="form-control round"
          author="query"
          v-model="filterKey"
          placeholder="Search"
        >
        <div class="form-control-position">
          <i class="ft-search"></i>
        </div>
      </div>
    </form>
    <div class="row match-height">
      <div v-for="Audio in filteredData" class="col-lg-4 col-md-12 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-img">
              <a data-toggle="modal" :data-target="getID(setPlayID(Audio._id))">
                <img
                  class="card-img-top img-fluid"
                  :src="Audio.thumbnail_href"
                  alt="Card image cap"
                >
                <h4 class="card-title">{{Audio.author}}</h4>
              </a>
              <a
                class="btn btn-floating halfway-fab bg-warning"
                data-toggle="modal"
                :data-target="getID(setdeleteID(Audio._id))"
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </a>
            </div>

            <div class="card-content" style="height :140px ;">
              <a href="#"></a>
              <p class="row mb-1">
                <small style="padding-left: 40px; padding-top: 5px;">{{Audio.title}}</small>
              </p>
              <p style="padding-left: 20px;">Author : {{Audio.author}}.</p>
            </div>

            <div class="card-block" style="padding-left: 50px;">
              <a
                class="btn btn-outline-warning"
                data-toggle="modal"
                :data-target="getID(Audio._id)"
                style="width: 200px; background-color: #ED646E;"
              >EDIT</a>
            </div>
          </div>
        </div>

        <!-- ***************************************** Modal pour Modifier une  Audio *********************************** -->
        <div
          class="modal fade text-left"
          style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
          :id="Audio._id"
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
                  <label>author:</label>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      type="text"
                      placeholder="author"
                      class="form-control"
                      v-model="Audio.author"
                    >
                    <div class="form-control-position">
                      <i
                        class="fa fa-Audio-camera font-medium-1 line-height-1 text-muted icon-align"
                      ></i>
                    </div>
                  </div>

                  <label>audio_href:</label>
                  <div class="form-group position-relative has-icon-left">
                    <input
                      type="audio_href"
                      placeholder="audio_href"
                      class="form-control"
                      v-model="Audio.audio_href"
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
                      v-model="Audio.description"
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
                    v-on:click="editAudio(Audio)"
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
          :id="setdeleteID(Audio._id)"
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
                {{Audio.author}}
                <div class="swal2-content" style="display: block;">You won't be able to revert this!</div>

                <hr class="swal2-spacer" style="display: block;">
                <button
                  v-on:click="removeAudio(Audio)"
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

        <!-- ************************************ Modal pour jouer une Audio ************************************** -->
        <div
          class="modal fade text-left"
          style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
          :id="setPlayID(Audio._id)"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel34"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <figure>
                <figcaption>Listen to {{Audio.title}}:</figcaption>
                <audio controls :src="Audio.audio_href">
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  author: "AppAudio",
  components: {},
  data() {
    return {
      Audios: [],
      newAudio: {
        _id: "",
        author: "",
        audio_href: "",
        description: "",
        title: "",
        thumbnail_href: ""
      },
      filterKey: ""
    };
  },
  mounted() {
    this.getDataFromServer(
      "http://localhost:8080/api/audios?page=0&pagesize=30"
    );
  },
  computed: {
    filteredData: function() {
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var data = this.Audios;
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
    }
  },
  methods: {
    getDataFromServer(url) {
      console.log("--- GETTING AUDIOS ---");
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.Audios = res.data;
          });
        })
        .catch(err => {
          console.log("erreur dans le get : " + err);
        });
    },
    removeAudio: function(Audio) {
      console.log("--- DELETE AUDIO ---");
      let url = "http://localhost:8080/api/audios/" + Audio._id;

      fetch(url, {
        method: "DELETE"
      })
        .then(responseJSON => {
          this.audios.splice(index, 1);
          this.filteredaudios.splice(index, 1);
          this.message = "Ce audio a été supprimé";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    editAudio: function(Audio) {
      console.log("--- UPDATE AUDIO ---");
			let url = "http://localhost:8080/api/audios/" + Audio._id;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(Audio)
      })
        .then(responseJSON => {
          console.log("Audio updated");
        })
        .catch(function(err) {
          console.log(err);
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
    }
  }
};
</script>


