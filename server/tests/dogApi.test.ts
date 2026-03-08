import { describe, expect, test } from 'vitest' 
import request from 'supertest' 
import { app } from '../index'

describe('Dog API', () => {
    test('GET /api/dogs/random returns dog image', async() => {
        const response = await request(app)
        .get('/api/dogs/random')

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.imageUrl).toBeDefined()
        expect(typeof response.body.data.imageUrl).toBe('string')
    })

    test('GET /api/dogs/invalid returns error', async() => {
        const response = await request(app)
        .get('/api/dogs/invalid')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error') 
        expect(response.body.error).toBe('Route not found')
    })
})