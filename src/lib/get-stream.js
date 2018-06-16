export default (sourceId) =>
  navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        // chromeMediaSourceId: sourceId,
        maxWidth: 1280,
        maxHeight: 720,
        maxFrameRate: 10,
        minAspectRatio: 1.77
      }
    },
    audio: false
  });
