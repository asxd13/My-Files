function getSheet(name) {
  return SpreadsheetApp
    .getActive()
    .getSheetByName(name);
}
