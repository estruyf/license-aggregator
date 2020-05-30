import * as checker from 'license-checker';
import * as fs from 'fs';
import { Config, ProjectInfo } from './models';

export class LicenseAggregator {

  /**
   * Start license retrieval
   * 
   * @param config 
   */
  public static start(config: Config): Promise<ProjectInfo> {
    return new Promise((resolve, reject) => {
      const files = fs.readdirSync(config.start);

      if (!files || files.length === 0) {
        reject('No files found in the start location');
        return;
      }

      const solution = files.find(name => name === "package.json");
      if (!solution) {
        reject('Solution file not found');
        return;
      }

      const packageJson = JSON.parse(fs.readFileSync(solution, 'utf8'));
      if (!packageJson) {
        reject('Could not read solution file');
        return;
      }

      checker.init({
        start: config.start
      }, (err: Error, pkgs: checker.ModuleInfos) => {
        const projectInfo = {
          solution: packageJson.name,
          version: packageJson.version,
          dependencies: []
        };

        const exclusionList = config.exclude || [];
        // Loop over all the packages and check if they need to be included
        const pkgKeys = Object.keys(pkgs);
        for (const pkgId of pkgKeys) {
          const keyValues = pkgId.split('@');
          const version = keyValues.pop();
          const name = keyValues.join('@');

          let toBeExcluded = false;

          // Check if package needs to be excluded
          toBeExcluded = exclusionList.filter(excl => {
            return name.trim().toLowerCase().indexOf(excl) === 0
          }).length > 0;

          // Check if it is a direct dependency
          if (config.direct && !toBeExcluded) {
            toBeExcluded = !packageJson.dependencies[name];
          }

          if (!toBeExcluded) {
            projectInfo.dependencies.push({
              name: name,
              version: version,
              ...pkgs[pkgId]
            })
          }
        }

        resolve(projectInfo);
      });
    });
  }
}