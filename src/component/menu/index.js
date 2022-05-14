import { state } from '../state';

import { MenuFrame } from '../menuFrame';

const menu = {};

menu.navData = [
  // { name: 'Debug', active: true, overscroll: true, sub: ['Input', 'Button', 'Bookmark', 'Icon'] },
  { name: 'Theme', active: true, overscroll: true, sub: ['Preset', 'Saved', 'Style', 'Colour', 'Accent', 'Font', 'Shade', 'Opacity', 'Background', 'Bookmark'] },
  { name: 'Layout', active: false, overscroll: true, sub: ['Scaling', 'Grid'] },
  { name: 'Bookmark', active: false, overscroll: true, sub: ['General', 'Hover', 'Shadow'] },
  { name: 'Toolbar', active: false, overscroll: true, sub: ['Size', 'Position', 'Controls'] },
  { name: 'Data', active: false, overscroll: true, sub: ['Restore', 'Backup', 'Clear'] },
  { name: 'Support', active: false, overscroll: false },
  { name: 'Coffee', active: false, overscroll: false },
  { name: 'app', active: false, overscroll: false }
];

menu.mod = {};

menu.element = {
  frame: null
};

menu.open = (name) => {

  menu.element.frame = new MenuFrame({
    navData: menu.navData
  });

  if (name) {

    menu.element.frame.menuNav.state.toggle(name);

  }

  menu.element.frame.open();

};

menu.close = () => {

  if (menu.element.frame) {
    menu.element.frame.close();
  }

};

menu.toggle = () => {

  if (state.get.current().menu) {
    menu.close();
  } else {
    menu.open();
  }

};

export { menu };
