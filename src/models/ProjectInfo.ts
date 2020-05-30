import { ModuleInfo } from "license-checker";

export interface ProjectInfo {
  solution: string;
  version: string;
  dependencies: Dependency[];
}

export interface Dependency extends ModuleInfo {
  name: string;
  version: string;
}