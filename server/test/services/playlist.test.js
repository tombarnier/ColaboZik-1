const app = require('../../src/app');

describe('\'playlist\' service', () => {
  it('registered the service', () => {
    const service = app.service('playlist');
    expect(service).toBeTruthy();
  });
});
