export const websocketURL = 'wss://www.cryptofacilities.com/ws/v1';
export const wsSubscribeMsg = (event, marketId) => ({
  event: event,
  feed: 'book_ui_1',
  product_ids: [marketId],
});
