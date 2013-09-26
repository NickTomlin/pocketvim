PocketVim
---

A Chrome Extension that allows you to use Vim bindings in Codemirorr and Ace enabled textareas. Works on [Codpen](http://codepen.io), [jsFiddle](http://jsfiddle.net/), [GitHub Gists](http://gist.github.com/), and more!

Installing
---
A chrome web store version is coming eventually. For now, download the [crx File](https://db.tt/D3J720SE) (use "save link as" or ``curl -O https://db.tt/D3J720SE`` to avoid broken chrome auto-installing) and drag it into your chrome "extensions" window. If that's too easy, follow the instructions under hacking.

Hacking
---

Loading Dependencies:

- clone this repo
- ``npm install``
- ``bower install``


Viewing your changes:

- ``grunt build``
- In chrome:
  - open your chrome "extensions tab"
  - check the "developer mode" checkbox
  - click "load unpacked extension"
  - point the file browser to the repo's 'dist' folder
  - enjoy.
