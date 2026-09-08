(function(){
  "use strict";
  const originalFetch=window.fetch.bind(window);
  window.fetch=function(resource,options){
    try{
      const raw=typeof resource==="string"?resource:(resource&&resource.url?resource.url:"");
      if(raw&&raw.includes("/live-test/typing-api/stats.php")&&!/[?&]passage_id=/.test(raw)){
        const page=new URL(window.location.href);
        const preset=page.searchParams.get("preset");
        const language=page.searchParams.get("language")||"english";
        const difficulty=page.searchParams.get("difficulty")||"medium";
        const passage=page.searchParams.get("passage");
        if(preset&&passage!==null&&/^\d+$/.test(passage)){
          const url=new URL(raw,window.location.href);
          url.searchParams.set("passage_id",`${preset}:${language}:${difficulty}:${passage}`);
          resource=typeof resource==="string"?url.toString():new Request(url.toString(),resource);
        }
      }
    }catch(error){}
    return originalFetch(resource,options);
  };
})();