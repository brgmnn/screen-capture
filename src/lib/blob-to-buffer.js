export default blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      const result = reader.result || new ArrayBuffer(0);
      resolve(Buffer.from(result));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};
