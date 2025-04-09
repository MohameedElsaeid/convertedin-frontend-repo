((w) => {
  w.RedmoseComponents = (onload, baseUrl) => {
    const polyfills = document.createElement('script');
    polyfills.async = true;
    polyfills.defer = true;
    polyfills.onload = () => {
      const main = document.createElement('script');
      main.async = true;
      main.defer = true;
      main.src = baseUrl + '/main.js';
      if (onload) {
        main.onload = () => {
          onload();
        };
      }
      document.head.appendChild(main);
    };
    polyfills.src = baseUrl + '/polyfills.js';
    document.head.appendChild(polyfills);
    const runtime = document.createElement('script');
    runtime.async = true;
    runtime.defer = true;
    runtime.src = baseUrl + '/runtime.js';
    document.head.appendChild(runtime);
  };
})(window);
