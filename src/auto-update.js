import { app, autoUpdater } from "electron";
import isDev from "electron-is-dev";

export default () => {
  if (isDev) {
    return;
  }

  const server = "https://update.electronjs.org";
  const feed = `${server}/brgmnn/screen-capture/${
    process.platform
  }/${app.getVersion()}`;

  autoUpdater.setFeedURL(feed);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);
  autoUpdater.checkForUpdates();

  autoUpdater.on("checking-for-update", () => {
    console.log("checking-for-update");
  });

  autoUpdater.on("update-available", () => {
    console.log("update-available");
  });

  autoUpdater.on("update-not-available", () => {
    console.log("update-not-available");
  });

  autoUpdater.on(
    "update-downloaded",
    (event, releaseNotes, releaseName, updateURL) => {
      console.log("update-downloaded", {
        event,
        releaseNotes,
        releaseName,
        updateURL
      });
    }
  );

  autoUpdater.on("error", error => {
    console.log("error", { error });
  });
};
