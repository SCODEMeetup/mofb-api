const getLogger = require("/Users/willjohnston/Workspace/mofb-api/dist/utils/logger.js").default;

test('createLogger works with regular strings', () => {
  expect(getLogger('healthServices').level()).toBe(30);
});
