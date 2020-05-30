import { LicenseAggregator } from "..";


(async () => {
  const licenses = await LicenseAggregator.start({
    start: './',
    direct: true,
    exclude: [
      "@types/"
    ]
  });

  console.log(licenses);
})();