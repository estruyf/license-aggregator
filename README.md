# License Aggregator

Retrieves all the licenses used for the current project.

## Installation

```bash
npm i license-aggregator
```

## Usage

```typescript
import { LicenseAggregator } from "license-aggregator";

(async () => {
  const licenses = await LicenseAggregator.start({
    start: './',
    direct: false,
    exclude: [
      "@types/"
    ]
  });

  console.log(licenses);
})();
```

### Outputs

```
{
  solution: '<project-name>',
  version: '<project-version>',
  dependencies: [
    {
      name: '<dependency-name>',
      version: '<dependency-version>',
      licenses: '<dependency-license>',
      repository: '<dependency-repo-url>',
      path: '<dependency-path>',
      licenseFile: '<dependency-license-path>'
    }
  ]
}
```