<template>
  <div
    class="modal fade text-left"
    style="position : fixed;top : 0;right : 0;bottom : 0;left : 0;z-index : 1040;background-color : rgba(0,0,0,0.5);"
    id="addAudioForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel34"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary white">
          <h3 class="modal-title" id="myModalLabel34">New Audio</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form v-on:submit.prevent="addAudio">
          <div class="modal-body">
            <label>audio_href:</label>
            <div class="form-group position-relative has-icon-left">
              <input
                type="audio_href"
                placeholder="audio_href"
                class="form-control"
                @change="fillFields()"
                v-model="newAudio.audio_href"
              >
              <div class="form-control-position">
                <i class="fa fa-link font-medium-1 line-height-1 text-muted icon-align"></i>
              </div>
            </div>

            <label>author:</label>
            <div class="form-group position-relative has-icon-left">
              <input
                type="text"
                placeholder="author"
                class="form-control"
                v-model="newAudio.author"
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
                v-model="newAudio.description"
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
            <input type="submit" class="btn btn-outline-primary btn-lg" value="Add">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  author: "AddAudio",
  data() {
    return {
      newAudio: {
        _id: "",
        author: "",
        audio_href: "http://",
        description: "",
        title: "",
        thumbnail_href: ""
      }
    };
  },
  methods: {
    addAudio: function() {
      console.log("--- ADD AUDIO ---");

      if (!this.newAudio.author || !this.newAudio.title) {
        return;
      }
      this.colMod = false;
      this.insertMod = false;
      let url = "/api/audios";
      fetch(url, {
        method: "POST",
        body: newAudio
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            alert(res.data);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fillFields: function() {
      fetch(
        "https://www.googleapis.com/youtube/v3/Audios?part=snippet&id=" +
          this.newAudio.audio_href.substring(32, 43) +
          "&key=" +
          "AIzaSyAfKdpiqmCJarHU1_3YAUbyXG110h6wKEw"
      )
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp);
          const Audio = {
            id: resp.items[0].id,
            author: resp.items[0].snippet.title,
            description: resp.items[0].snippet.description,
            starCount: null,
            title: resp.items[0].snippet.publishedAt,
            thumbnail_href: resp.items[0].snippet.thumbnails.high.audio_href
          };
          this.newAudio.author = Audio.author;
          this.newAudio.description = Audio.description;
          this.newAudio.title = Audio.title;
          this.newAudio.thumbnail_href = Audio.thumbnail_href;
        });
    }
  }
};
</script>