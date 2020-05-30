

export interface Config {
  /**
   * Project location to start your aggregation
   */
  start: string;
  
  /**
   * Dependencies you want to exclude
   */
  exclude?: string[];
  /**
   * Direct dependencies only
   */
  direct?: boolean;
}