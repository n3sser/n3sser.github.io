
        var ar = true;
        var en = false;
        var temp="";
        function setar(){
            ar = true;
            en = false;     
        if(temp != ""){
          document.getElementById("audio_player").src = "arvoice/" + temp + ".mp3";
        }
        }//kkk
        function seten(){
          if(temp != ""){
            document.getElementById("audio_player").src = "envoice/" + temp + ".mp3";
          }
            ar = false;
            en = true;
        }
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
  console.log(content);
  temp = content;
  if(ar == true){
    document.getElementById("audio_player").src = "arvoice/" + content + ".mp3";
  }
  else{
    document.getElementById("audio_player").src = "envoice/" + content + ".mp3";
  }
});
Instascan.Camera.getCameras().then(function (cameras) {

  if (cameras.length > 0) {
    var selectedCam = cameras[0];
    $.each(cameras, (i, c) => {
        if (c.name.indexOf('back') != -1) {
            selectedCam = c;
            return false;
        }
    });

    scanner.start(selectedCam);
} else {
    console.error('No cameras found.');
}
/*
  if (cameras[1]) {
    scanner.start(cameras[1]);
  }
  else if (cameras.length > 0) {
    scanner.start(cameras[0]);
  }
  else {
    console.error('No cameras found.');
  }
  */
}).catch(function (e) {
  console.error(e);
});