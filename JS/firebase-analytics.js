import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

(function(){
  "use strict";
  const config = window.GJU_FIREBASE_CONFIG;
  if(!config || !config.measurementId){ 
    console.warn("[GovJobUpdates] Analytics configuration or Measurement ID missing."); 
    return; 
  }

  // Pehle se chal rahe firebase instance ko check karega, nahi toh naya banayega
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  
  // YEH LINE GOOGLE ANALYTICS KO START KAREGI
  const analytics = getAnalytics(app);
  
  console.log("[GovJobUpdates] Google Analytics activated successfully.");
}());