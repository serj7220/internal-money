// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  DbLoginUrl: "http://193.124.114.46:3001/sessions/create",
  DbCreateUserUrl: "http://193.124.114.46:3001/users",
  DbUserInfoUrl: "http://193.124.114.46:3001/api/protected/user-info",
  DbListTransUrl: "http://193.124.114.46:3001/api/protected/transactions",
  DbListUsers: "http://193.124.114.46:3001/api/protected/users/list"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
