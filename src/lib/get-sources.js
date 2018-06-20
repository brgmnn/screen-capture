import { desktopCapturer } from "electron";

export default () =>
  new Promise((resolve, reject) => {
    desktopCapturer.getSources(
      { types: ["window", "screen"] },
      (error, sources) => {
        if (error) {
          reject(error);
        } else {
          resolve(sources.map(s => ({ id: s.id, name: s.name })));
        }
      }
    );
  });
