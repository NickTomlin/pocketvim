describe("CodeMirror embed", function () {
  var editorContainer, cmEle,  cmInstance;

  beforeEach(function () {
    editorContainer = document.createElement("textarea");
    editorContainer.innerHTML = __html__["test/unit/support/codemirror.html"];

    document.body.appendChild(editorContainer);
     cmInstance = CodeMirror.fromTextArea(editorContainer, {mode: 'text/html'});
  });

  afterEach(function () {
    cmInstance.getWrapperElement();
  });

  it('enables vim keybinding on textarea', function () {
    expect(cmInstance).toBeDefined();
  });
});
