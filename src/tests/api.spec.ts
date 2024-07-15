import axios from 'axios';
import { test, expect } from '@playwright/test';

const baseURL = 'https://enotes.pointschool.ru';

test.describe('API Tests', () => {
  let token: string;

  test.beforeAll(async () => {
    const response = await axios.post(`${baseURL}/login`, {
      username: 'test',
      password: 'test',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    token = response.data.token;
  });

  test('Scenario 1: Add 9 discounted items to cart', async () => {
    await axios.post(`${baseURL}/basket/clear`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    for (let i = 0; i < 9; i++) {
      await axios.post(`${baseURL}/basket/add`, {
        product_id: 1,
        quantity: 1
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    const cartResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartResponse.data.items.length).toBe(9);

    const cartPageResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartPageResponse.status).toBe(200);
  });

  test('Scenario 2: Add 8 different items to cart with 1 discounted item', async () => {
    await axios.post(`${baseURL}/basket/clear`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    await axios.post(`${baseURL}/basket/add`, {
      product_id: 1,
      quantity: 1
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    for (let i = 0; i < 8; i++) {
      await axios.post(`${baseURL}/basket/add`, {
        product_id: i + 2,
        quantity: 1
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    const cartResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartResponse.data.items.length).toBe(9);

    const cartPageResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartPageResponse.status).toBe(200);
  });

  test('Scenario 3: Add 1 discounted item to cart', async () => {
    await axios.post(`${baseURL}/basket/clear`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    await axios.post(`${baseURL}/basket/add`, {
      product_id: 1,
      quantity: 1
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const cartResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartResponse.data.items.length).toBe(1);

    const cartPageResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartPageResponse.status).toBe(200);
  });

  test('Scenario 4: Add 1 non-discounted item to cart', async () => {
    await axios.post(`${baseURL}/basket/clear`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    await axios.post(`${baseURL}/basket/add`, {
      product_id: 2,
      quantity: 1
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const cartResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartResponse.data.items.length).toBe(1);

    const cartPageResponse = await axios.get(`${baseURL}/basket`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartPageResponse.status).toBe(200);
  });
});