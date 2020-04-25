const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;

module.exports = value => {
    const DOM = new JSDOM(`<!DOCTYPE html>${value}`, {
        resources: 'usable'
    });

    const document = DOM.window.document;
    const caption = document.querySelector('.wp-caption-text');
    if (caption) {
        return caption.textContent;
    }
    return '';
};
