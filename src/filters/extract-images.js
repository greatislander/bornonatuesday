const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;

module.exports = value => {
    const DOM = new JSDOM(`<!DOCTYPE html>${value}`, {
        resources: 'usable'
    });

    const document = DOM.window.document;
    const els = [...document.querySelectorAll('img')];
    const images = [];
    if (els.length) {
        Array.prototype.forEach.call(els, img => {
            images.push({
                title: img.getAttribute('title') || '',
                alt: img.getAttribute('alt') || '',
                id: img.getAttribute('class').split('wp-image-')[1].split(' ')[0] || '',
                src: img.getAttribute('src')
            });
        });
    }
    return images;
};
