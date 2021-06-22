(async function registerServiceWorker() {
    if(!{{ site.sw_enabled }}) return;
    if('serviceWorker' in navigator) {
      const swRegistered = await navigator.serviceWorker.getRegistration()
        .then((registration) => !!registration);
      if(swRegistered) {
        return;
      }
      navigator.serviceWorker.register('{{ site.sw_url }}', { scope: '{{ site.sw_scope }}'})
        .catch((e) => {
          console.error('Error during service worker registration:', e.message);
        });
    } else {
      console.warn('Service Worker is not supported');
    }
  }());