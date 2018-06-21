let menuId = browser.menus.create({
  id: 'open-url',
  contexts: ['page', 'selection'],
  title: browser.i18n.getMessage('menuLabelOpenURL'),
  enabled: false,
  onclick: onClick
});

browser.menus.onShown.addListener(async function(info, tab) {
  let enabled = false;
  if (info.menuIds.indexOf(menuId) != -1
      && info.selectionText
      && stringIsURL(info.selectionText)) {
    enabled = true;
  }
  browser.menus.update(menuId, { enabled });
  browser.menus.refresh();
});

function stringIsURL(str) {
  try {
    new URL(str.trim());
    return true;
  }
  catch(ex) {
    return false;
  }
}

async function onClick(info, tab) {
  if (info.selectionText) {
    try {
      let url = new URL(info.selectionText.trim());
      browser.tabs.create({ url: url.href });
    }
    catch(ex) {
      console.error('selection not a url?', ex);
    }
  }

  /*
  else if (info.frameId > -1) {
    tab.executeScript(tab.id, {
      frameId: info.frameId,
      file: 'content.js'
    });
  }
  */
}
