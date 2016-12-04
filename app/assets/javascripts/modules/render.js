import foo from 'modules/foo';

let appNode;

export default function render() {
  const element = document.querySelector('.app');

  if (appNode) {
    element.removeChild(appNode);
  }

  appNode = element.appendChild(foo());
}
