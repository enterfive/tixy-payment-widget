// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://us-central1-tixy-dev.cloudfunctions.net',
  firebase: {
    apiKey: "AIzaSyDY9OL_VFfGsDx3o9Km_YvHzS7JeFBkYIE",
    authDomain: "tixy-dev.firebaseapp.com",
    databaseURL: "https://tixy-dev.firebaseio.com",
    projectId: "tixy-dev",
    storageBucket: "tixy-dev.appspot.com",
    messagingSenderId: "1007880935271",
    appId: "1:1007880935271:web:3a7e1ab48801382a"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
