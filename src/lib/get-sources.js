import { desktopCapturer } from "electron";

export default () =>
  new Promise((resolve, reject) => {
    desktopCapturer.getSources(
      { types: ["window", "screen"] },
      (error, sources) => {
        if (error) {
          return reject(error);
        }

        resolve(sources.map(s => ({ id: s.id, name: s.name })));
      }
    );
  });
