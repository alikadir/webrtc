const buttonElm = document.querySelector('button');
const videoElm = document.querySelector('video');
const codeElm = document.querySelector('code');

const getDeviceInfo = () => {
  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      codeElm.innerText = JSON.stringify(devices);
      devices.forEach(function (device) {
        console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
      });
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });
};

const getStream = () => {
  videoElm.setAttribute('autoplay', '');
  videoElm.setAttribute('playsinline', '');

  const constraints = {
    audio: true,
    video: { facingMode: 'user' },
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    videoElm.srcObject = stream;
    getDeviceInfo();
  });
};

buttonElm.addEventListener('click', getStream);
