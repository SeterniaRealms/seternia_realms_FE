declare global {
  interface Window {
    ga: any;
  }
}

window.MyNamespace = window.ga || {};