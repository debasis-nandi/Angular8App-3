// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  enableDebug: true,
  isWindAuth: false,
  imaPath:'assets/images/',
  templatePath:'assets/template/',
  jsonFilePath:'assets/datasource/',
  windAuthApi:'https://strategyreporting.evalueserve.com/WinAuthApi/Auth/GetUser',
  baseUrl: '',
  companyDomain: 'evalueserve.com',
  write2us:'globalhr@evalueserve.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
