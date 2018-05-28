export default () =>
  navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        maxWidth: 1280,
        maxHeight: 720,
        maxFrameRate: 10,
        minAspectRatio: 1.77
      }
    },
    audio: false
  });
