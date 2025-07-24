import handler from '../api/translate.js';
import { jest } from '@jest/globals';

describe('translate handler', () => {
  it('returns translation string', async () => {
    const req = { body: { text: 'こんにちは' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        choices: [ { message: { content: '你好' } } ]
      })
    });

    await handler(req, res);

    expect(fetch).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ translation: '你好' });
  });
});
