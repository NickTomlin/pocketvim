'use strict';
// Saves options to localStorage.
var settings = ['favorite_color', 'included_urls'];

function getValue(ele) {
  var name = ele.nodeName.toLowerCase();
  var inputs = {
    'select': function () {
      return this.children[this.selectedIndex].value;
    },
    'input': function () {
      return this.value;
    },
    'textarea': function () {
      return this.value; // we are just storing things as whole lines
    }
  }
  return inputs[name].call(ele);
}

function getInput (name) {
  return document.querySelector('[name="'+ name + '"]');
}

function save_options() {
  for (var i = 0; i < settings.length; i++) {
    var name = settings[i];
    localStorage[name] = getValue(getInput(name));
  };
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.innerHTML = 'Options Saved.';
  setTimeout(function() {
    status.innerHTML = '';
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  for (var i = 0; i < settings.length; i++) {
    var key = settings[i];
    var value = localStorage[key];

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

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
