import { websocketURL, wsSubscribeMsg } from '../api';

describe('API', () => {
  it('ws url should be correct', () => {
    const expected = 'wss://www.cryptofacilities.com/ws/v1';

    expect(expected).toBe(websocketURL);
  });

  it('ws subscription message should be correct', () => {
    const expected = {
      event: 'subscbribe',
      feed: 'book_ui_1',
      product_ids: ['ETH'],
    };

    expect(expected).toMatchObject(wsSubscribeMsg('subscbribe', 'ETH'));
  });

  it('ws unsubscription message should be correct', () => {
    const expected = {
      event: 'unsubscbribe',
      feed: 'book_ui_1',
      product_ids: ['ETH'],
    };

    expect(expected).toMatchObject(wsSubscribeMsg('unsubscbribe', 'ETH'));
  });
});
