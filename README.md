PocketVim
---

A Chrome Extension that allows you to use Vim bindings in Codemirorr and Ace enabled textareas. Works on [Codepen](http://codepen.io), [jsFiddle](http://jsfiddle.net/), [GitHub Gists](http://gist.github.com/), and more!

Installation
---

Install on the [Chrome web store](https://chrome.google.com/webstore/detail/pocket-vim/pjnhffdkdckcagdmfmidafhppbomjdjg).

Development
---

# Setup

- clone this repo
- ``npm install``
- ``bower install``


# Loading the extension:

- In chrome:
  - open your chrome "extensions tab"
  - check the "developer mode" checkbox
  - click "load unpacked extension"
  - point the file browser to the repo's 'app' directory
  - enjoy.

# Testing

Run unit tests:

```
grunt test
```

Manual "integration" testing:

Run ``npm run serve`` then open [localhost:9000/codemirror.html](http://localhost:9000/codemirror.html) and [localhost:9000/ace.html](http://localhost:9000/ace.html) with the development version of the extension loaded to make sure everything is playing nice.

