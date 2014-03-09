'use strict';

define(function (require, exports, module) {
  var root;
  var options = require('./options');
  // our option inputs
  var settingInputs = ['enabled_urls'];

  function getInput (name) {
    return root.querySelector('[name="'+ name + '"]');
  }

  function getInputValue(ele) {
    var name = ele.nodeName.toLowerCase();
    var inputs = {
      'select': function () {
        return this.children[this.selectedIndex].value;
      },
      'input': function () {
        return this.value;
      },
      'textarea': function () {
        this.value = this.value
                            .split('\n')
                            .filter(function(value){
                              return value !== "";
                            })
                            .join('\n') + '\n';
        return this.value; // we are just storing things as whole lines
      }
    };

    return inputs[name].call(ele);
  }


  // @todo#cleanup run trim to remove empty strings?
  function save_options() {
    for (var i = 0; i < settingInputs.length; i++) {
      var inputName = settingInputs[i];
      var input = getInput(inputName);
      options(inputName, getInputValue(input));
    }

    // Update status to let user know options were saved.
    var status = root.querySelector('#status');
    status.innerHTML = 'Options Saved.';
    setTimeout(function() {
      status.innerHTML = '';
    }, 750);
  }

  /**
  * Restore options from localstorage
  * @param  {bool} reset reset options to defaults.
  */
  function restoreOptions() {

    for (var i = 0; i < settingInputs.length; i++) {
      var key = settingInputs[i];
      var value = options(key);

      if (!value) {
      continue;
      }
      var settingElement = getInput(key);

      var type = settingElement.nodeName.toLowerCase();

      if (type === 'select') {
        for (var j = 0; j < settingElement.children.length; j++) {
          var child = settingElement.children[j];
          if (child.value == value) {
            child.selected = "true";
          }
        }
      } else if (type === 'textarea') {
        settingElement.value = value;
      }
    }
  }

  function resetOptions() {
    options.restoreDefaultOptions();
    restoreOptions();
  }

  module.exports.initialize = function (rootElement) {
    root = rootElement;
    restoreOptions();

    rootElement.querySelector('#save').addEventListener('click', save_options);
    rootElement.querySelector('#defaults').addEventListener('click', resetOptions);
  };
});
