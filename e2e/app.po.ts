import { browser, by, element } from 'protractor';

export class FlexitPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fit-root h1')).getText();
  }
}
