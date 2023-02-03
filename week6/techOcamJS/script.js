const canvas = document.getElementById('canvas');
const videoElement = document.getElementById('video');
const ctx = canvas.getContext('2d');

videoElement.onplaying = () => {
  canvas.height = videoElement.videoHeight;
  canvas.width = videoElement.videoWidth;
};

let statusVideo = false;

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      videoElement.srcObject = stream;
      statusVideo = true;
      videoElement.play();
      loadBodyPix();
    })
    .catch((err) => {
      alert(`Some error happened: ${err}`);
    });
}

function loadBodyPix() {
  options = {
    multiplier: 0.5,
    stride: 32,
    quantBytes: 4,
  };
  bodyPix
    .load(options)
    .then((net) => blurVideo(net))
    .catch((err) => console.log(err));
}

async function blurVideo(net) {
  videoElement.hidden = true;
  while (statusVideo) {
    const segmentation = await net.segmentPerson(video);

    const backgroundBlurAmount = 10;
    const edgeBlurAmount = 5;
    const flipHorizontal = false;

    bodyPix.drawBokehEffect(
      canvas,
      videoElement,
      segmentation,
      backgroundBlurAmount,
      edgeBlurAmount,
      flipHorizontal
    );
  }
}
startVideo();
