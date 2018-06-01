
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

        var front = false;
        var video= document.getElementById('preview');
        //document.getElementById('flip-button').onclick = function() { front = !front; };

   
let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),  mirror: false});
scanner.addListener('scan', function (content) {
  console.log(content);
  temp = content;
  if(ar == true){

    document.getElementById("audio_player").src = "arvoice/" + content + ".mp3";

  }else{

    document.getElementById("audio_player").src = "envoice/" + content + ".mp3";

  }
});
Instascan.Camera.getCameras().then(function (cameras) {
//open back camera///
  const constraints = {
    video: { facingMode: { exact: "environment" } },
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error(error);///kjlkj
    });
    ///////////////////////////////////

  if (cameras.length > 0) {



        scanner.start(cameras[0]);

      
 

   

 
   
  } else {
    console.error('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});