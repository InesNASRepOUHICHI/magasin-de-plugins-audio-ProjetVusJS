<template>
  <div
    class="modal fade text-left"
    style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
    id="detailAudioForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel34"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary white">
          <h3 class="modal-title" id="myModalLabel34">Detail Audio</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form v-on:submit.prevent="DetailAudio">
          <div class="modal-body">
            <label>brand:</label>
            <div class="form-group position-relative has-icon-left">
              <input
                type="brand"
                placeholder="brand"
                class="form-control"
                @change="fillFields()"
                v-model="Audio.brand"
              >
              <div class="form-control-position">
                <i class="fa fa-link font-medium-1 line-height-1 text-muted icon-align"></i>
              </div>
            </div>

            <label>author name:</label>
            <div class="form-group position-relative has-icon-left">
              <input
                type="text"
                placeholder="author"
                class="form-control"
                v-model="Audio.author.name"
              >
              <div class="form-control-position">
                <i class="fa fa-Audio-camera font-medium-1 line-height-1 text-muted icon-align"></i>
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
                <i class="fa fa-file-text-o font-medium-1 line-height-1 text-muted icon-align"></i>
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
            <input type="submit" class="btn btn-outline-primary btn-lg" value="Detail">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailAudio",
  data() {
    return {
      Audio: {}
    };
  },
  methods: {
    detailAudio: function() {
      console.log("--- Detail AUDIO ---");
			let url = "http://localhost:8080/api/audios";
			//let data =JSON.stringify(this.Audio);
      fetch(url, {
				method: "GET",
				headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: data
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
             this.Audio = res.data;;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fillFields: function() {
    }
  }
};
</script>
