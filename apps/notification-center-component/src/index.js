((w) => {
  w.injectNotificationIcons = (baseUrl) => {
    const family = document.createElement('style');
    family.innerHTML = `@font-face{font-family: 'primeicons';font-display: swap;src: url('${baseUrl}/primeicons.woff2');font-weight: normal;font-style: normal;}`;
    document.head.appendChild(family);
  };
})(window);
