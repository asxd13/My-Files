function doGet(e) {
  var page = e && e.parameter.page ? e.parameter.page : "login"

  var template = HtmlService.createTemplateFromFile("layout")
  template.page = page

  return template
    .evaluate()
    .setTitle(CONFIG.APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}
