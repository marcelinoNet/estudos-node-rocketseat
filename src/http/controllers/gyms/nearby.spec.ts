import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gym',
        description: null,
        phone: null,
        latitude: -7.0743724,
        longitude: -41.471574,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: null,
        phone: null,
        latitude: -6.9632607,
        longitude: -41.3352668,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -7.0743724,
        longitude: -41.471574,
      })
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gym',
        description: 'Some description',
        phone: '999999999',
        latitude: -7.0741469,
        longitude: -41.4723104,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript gym',
      }),
    ])
  })
})
