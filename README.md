PocketVim [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
---

> This project is not actively maintained. If it works for you, great! If not, I probably will not get around to fixing it.

A Chrome Extension that allows you to use Vim bindings in Codemirorr and Ace enabled textareas. Works on [Codepen](http://codepen.io), [jsFiddle](http://jsfiddle.net/), [GitHub Gists](http://gist.github.com/), and more!

Installation
---
Install from the [Chrome web store](https://chrome.google.com/webstore/detail/pocket-vim/pjnhffdkdckcagdmfmidafhppbomjdjg), or follow the development instructions below:

Hacking
---

Loading Dependencies:

- clone this repo
- ensure you are running an _oooold_ version of node (0.10 or 0.12)
- `npm install`
- `gem install compass`
  - this assumes you have ruby installed (sorry, I wrote back in the day this before node-sass was popular -- I was young)

Viewing your changes:

- `grunt build`
- In chrome:
  - open your chrome "extensions tab"
  - check the "developer mode" checkbox
  - click "load unpacked extension"
  - point the file browser to the repo's 'dist' folder
  - enjoy.
