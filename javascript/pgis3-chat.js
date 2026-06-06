console.log("script working");
  
(function () {
    if (window.self !== window.top) {
        const paramName = "hide_badge";
        const paramValue = "true";

        const url = new URL(window.location.href);

        if (!url.searchParams.has(paramName)) {
            url.searchParams.set(paramName, paramValue);
            history.replaceState({}, "", url.toString());
        }
    }
})();
