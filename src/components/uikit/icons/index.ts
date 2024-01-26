import { createApp, type App, type Plugin } from "vue";

import SVGSpriteComponent from "./sprite/tn-sprite.vue";
import TNIcon from "./tn-icon.vue";

export const elementID = "svg--iconpack";
let _isSpriteInserted = false;

const TNIconPack: Plugin = {
  install(app: App) {
    // app.config.globalProperties.$somewhat = myCustomPlugin
    addSVGSpriteToBody();
    app.component("TNIcon", TNIcon);
  },
};

export default TNIconPack;

function isSpriteInserted(): boolean {
  return _isSpriteInserted;
}

function addSVGSpriteToBody() {
  if (isSpriteInserted()) {
    return;
  }

  const sprite = document.createElement("svg");
  sprite.setAttribute("id", elementID);

  document.body.insertBefore(sprite, document.body.firstChild);

  setTimeout(function () {
    mountSprite(elementID);
  }, 1);
}

function mountSprite(elID: string) {
  if (isSpriteInserted()) {
    return;
  }
  _isSpriteInserted = true;

  const app = createApp(SVGSpriteComponent);
  app.mount(`#${elID}`);
}
