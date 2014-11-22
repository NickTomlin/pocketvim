require ('./test-helper');

t.describe('PocketVim', function () {
  this.timeout(20000);

  before(function (done) {
    // this is both a test of the options page and storage
    // but since it provides an initialization point for all the other features
    // we perform it before the others
    setOptions(driver, done);
  });

  after(function () {
    driver.quit();
  });

  t.describe('options', function () {
    beforeEach(function () {
      driver.get(EXTENSION_URL + '/html/options.html');
    })

    t.it('resets options to default', function (done) {
      var addOption = new wd.ActionSequence(driver)
        .click(driver.findElement({id: 'enabled_urls'}))
        .sendKeys(wd.Key.RETURN, 'http://foobar.com/*')
        .click(driver.findElement({id: 'save'}))
        .perform();

      addOption
        .then(function () {
          new wd.ActionSequence(driver)
            .click(driver.findElement({id: 'defaults'}))
            .perform()
            .then(function () {
              driver.findElement({id:'enabled_urls'})
              .then(function (element) {
                element
                  .getText()
                  .then(function (text) {
                    assert.equal(text.indexOf('foobar'), -1);
                  });
              })
            });
        })
    });
  })

  t.describe('CodeMirror', function () {
    beforeEach(function () {
      driver.get('http://localhost:9999/codemirror.html');
    });

    t.it('activates vim bindings', function (done) {
      var phrase = 'Vim is cool';
      var action = new wd.ActionSequence(driver);

      driver.findElement({className: 'CodeMirror'}).then(function (element) {
        return element;
      })
      .then(function (element) {
       var a =  action
          .click(element)
          .sendKeys('S' + phrase)
          .perform();

          a.then(function (r) {
            element.getText(function (text) {
              assert.equal(text, phrase);
              done();
            })
          })
      })
    });
  });

  t.describe('Ace', function () {
    beforeEach(function () {
      driver.get('http://localhost:9999/ace.html');
    });

    t.it('activates vim bindings', function (done) {
      var phrase = 'Vim is cool';
      var action = new wd.ActionSequence(driver);

      driver.findElement({className: 'ace_editor'}).then(function (element) {
        console.log('element');
        return element;
      })
      .then(function (element) {
       var a =  action
          .click(element)
          .sendKeys('S' + phrase)
          .perform();

          a.then(function (r) {
            element.getText(function (text) {
              assert.equal(text, phrase);
              done();
            })
          })
      })
    });
  });
});
