import { FoursquareAppPage } from './app.po';

describe('foursquare-app App', function() {
  let page: FoursquareAppPage;

  beforeEach(() => {
    page = new FoursquareAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
