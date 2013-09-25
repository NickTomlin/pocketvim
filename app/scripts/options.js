'use strict';

// Saves options to localStorage.
var options = chrome.extension.getBackgroundPage().options;

// our option inputs
var settingInputs = ['enabled_urls'];

function getInput (name) {
  return document.querySelector('[name="'+ name + '"]');
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
      var cleanedValues = this.value
                            .split('\n')
                            .filter(function(value){
                              return value !== ""
                            })
                            .join('\n') + '\n';
      this.value = cleanedValues;
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
  };
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}
// default is initialy 'undefined', we set it to false when we retoreDefaults()

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

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#defaults').addEventListener('click', resetOptions);
