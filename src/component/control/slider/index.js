import { state } from '../../state';
import { data } from '../../data';
import { grid } from '../../grid';
import { bookmark } from '../../bookmark';
import { form } from '../../form';

import { Button } from '../../button';
import { Collapse } from '../../collapse';

import { node } from '../../../utility/node';
import { get } from '../../../utility/get';
import { set } from '../../../utility/set';
import { convertColor } from '../../../utility/convertColor';
import { ifValidString } from '../../../utility/ifValidString';
import { minMax } from '../../../utility/minMax';

export const Control_slider = function({ object = {}, path = false, id = 'name', labelText = 'Name', hue = false, value = 0, defaultValue = false, min = 0, max = 100, action = false } = {}) {

  this.label = form.render.label({
    forInput: id,
    text: labelText
  });

  const classList = [];

  if (hue) {
    classList.push('input-range-hue-spectrum');
  };

  this.range = form.render.input.range({
    id: id,
    value: value,
    min: min,
    max: max,
    classList: classList,
    func: () => {
      if (path) {
        set({
          object: object,
          path: path,
          value: this.value()
        });
      };
      if (action) {
        action();
      };
      this.number.value = get({
        object: object,
        path: path,
      });
    }
  });

  this.number = form.render.input.number({
    value: value,
    min: min,
    max: max,
    classList: ['form-group-item-small'],
    func: () => {
      if (path) {
        set({
          object: object,
          path: path,
          value: minMax({
            value: parseInt(this.number.value, 10),
            min: min,
            max: max
          })
        });
      };
      if (action) {
        action();
      };
      this.update({ delay: true });
    }
  });

  this.reset = new Button({
    text: false,
    iconName: 'replay',
    style: ['line'],
    classList: ['form-group-item-small'],
    func: () => {
      set({
        object: object,
        path: path,
        value: JSON.parse(JSON.stringify(defaultValue))
      });
      this.update();
      if (action) {
        action();
      };
    }
  });

  this.update = ({ delay = false } = {}) => {
    let delayedUpdate = null;
    const updateControl = () => {
      this.range.value = get({
        object: object,
        path: path,
      });
      this.number.value = get({
        object: object,
        path: path,
      });
    };

    if (delay) {
      clearTimeout(delayedUpdate);
      delayedUpdate = setTimeout(updateControl, 2000);
    } else {
      updateControl();
    };
  };

  this.value = () => {
    return parseInt(this.range.value, 10);
  };

  this.wrap = () => {
    const formGroup = form.render.group({
      children: [
        this.number
      ]
    });

    if (defaultValue || (typeof defaultValue === 'number' && defaultValue === 0)) {
      formGroup.appendChild(this.reset.button);
    };

    const formInline = form.render.inline({
      block: true,
      children: [
        this.range,
        formGroup
      ]
    });

    const wrap = form.render.wrap([
      this.label,
      formInline
    ]);

    return wrap;
  };

  this.disable = () => {
    this.label.classList.add('disabled');
    this.range.disabled = true;
    this.number.disabled = true;
    this.reset.disable();
  };

  this.enable = () => {
    this.label.classList.remove('disabled');
    this.range.disabled = false;
    this.number.disabled = false;
    this.reset.enable();
  };
};