import { FlexitPage } from './app.po';

describe('flexit App', () => {
  let page: FlexitPage;

  beforeEach(() => {
    page = new FlexitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to fit!!');
  });
});
