import { ESightsPage } from './app.po';

describe('e-sights App', () => {
  let page: ESightsPage;

  beforeEach(() => {
    page = new ESightsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to es!');
  });
});
