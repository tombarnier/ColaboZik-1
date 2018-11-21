const app = require('../../src/app');

describe('\'musics\' service', () => {
  it('registered the service', () => {
    const service = app.service('musics');
    expect(service).toBeTruthy();
  });
});
