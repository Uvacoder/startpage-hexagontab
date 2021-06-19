import { node } from '../../../../utility/node';

import './index.css';

export const number = function({ id = false, min = 0, max = 100, step = 1, value = false, placeholder = false, classList = [], func = false } = {}) {

  const input = node('input|type:number,min:' + min + ',max:' + max + ',step:' + step + ',tabindex:1');

  let delayUpdate = null;

  if (id) {
    input.setAttribute('id', id);
  };

  if (value || (typeof value === 'number' && value === 0)) {
    input.setAttribute('value', value);
  };

  if (placeholder) {
    input.setAttribute('placeholder', placeholder);
  };

  if (classList.length > 0) {

    classList.forEach((item, i) => {
      input.classList.add(item);
    });

  };

  if (func) {

    input.addEventListener('input', function(event) {
      func();
    });

  };

  return input;

};