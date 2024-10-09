import * as rudderanalytics from "rudder-sdk-js";

rudderanalytics.load("2nCqFpxloWdUTmZz66JE9G9TcOT", "https://tavopomatsbodp.dataplane.rudderstack.com");
rudderanalytics.ready(() => {
    console.log("Rudderstack is ready");
});

export default rudderanalytics;