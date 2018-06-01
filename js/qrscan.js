
        var ar = true;
        var en = false;
        var temp="";

        function setar(){



            ar = true;
            en = false;

            
        if(temp != ""){
          document.getElementById("audio_player").src = "arvoice/" + temp + ".mp3";
        }

        }

        function seten(){

          if(temp != ""){
            document.getElementById("audio_player").src = "envoice/" + temp + ".mp3";
          }
            ar = false;
            en = true;
        }
var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

navigator.mediaDevices.enumerateDevices()
  .then(gotDevices).then(getStream).catch(handleError);

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

        function gotDevices(deviceInfos) {
          for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            var option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'audioinput') {
              option.text = deviceInfo.label ||
                'microphone ' + (audioSelect.length + 1);
              audioSelect.appendChild(option);
            } else if (deviceInfo.kind === 'videoinput') {
              option.text = deviceInfo.label || 'camera ' +
                (videoSelect.length + 1);
              videoSelect.appendChild(option);
            } else {
              console.log('Found one other kind of source/device: ', deviceInfo);
            }
          }
        }

        function getStream() {
          if (window.stream) {
            window.stream.getTracks().forEach(function(track) {
              track.stop();
            });
          }
        
          var constraints = {
            audio: {
              deviceId: {exact: audioSelect.value}
            },
            video: {
              deviceId: {exact: videoSelect.value}
            }
          };
        
          navigator.mediaDevices.getUserMedia(constraints).
            then(gotStream).catch(handleError);
        }
        function gotStream(stream) {
          window.stream = stream; // make stream available to console
          videoElement.srcObject = stream;
        }
        
        function handleError(error) {
          console.log('Error: ', error);
        }
        
   
let scanner = new Instascan.Scanner({ video: document.getElementById('preview')});
scanner.addListener('scan', function (content) {
  console.log(content);
  temp = content;
  if(ar == true){

    document.getElementById("audio_player").src = "arvoice/" + content + ".mp3";

  }else{

    document.getElementById("audio_player").src = "envoice/" + content + ".mp3";

  }
 
  document.getElementById("audio_player").playing = true;
 
  
});

Instascan.Camera.getCameras().then(function (cameras) {

  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
//open back camera///
  const constraints  = {
    audio: {
      deviceId: {exact: audioSelect.value}
    },
    video: {
      deviceId: {exact: videoSelect.value}
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).
  then(gotStream).catch(handleError);

  if(cameras[1]){ scanner.start(cameras[1]); } else { scanner.start(cameras[0]); }
    ///////////////////////////////////
});