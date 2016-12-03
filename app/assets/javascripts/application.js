import foo from './modules/foo';

let appNode;

function render() {
  const element = document.querySelector('.app');

  if (appNode) {
    element.removeChild(appNode);
  }

  appNode = element.appendChild(foo());
}

window.addEventListener('load', function () {
  render();
});

// if (module.hot) {
//   module.hot.accept('./modules/foo', render);
// }
