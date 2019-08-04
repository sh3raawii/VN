const { cleanUpDatabase, generateNotification } = require('../utils/db')
const request = require('../utils/request')
const { expect } = require('../utils/chai')

describe('Notifications', () => {
  describe('GET /notification', () => {
    beforeEach(cleanUpDatabase)

    it('should get all user notifications', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification()
      ])
      const res = await request.get('/notification').query({
        user: recieverId
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(2)
    })

    it('should not find any notifications', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification({ recieverId })
      ])
      const res = await request.get('/notification').query({
        user: 'weirdId'
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(0)
    })

    it('should get only 1 notification', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification()
      ])
      const res = await request.get('/notification').query({
        user: recieverId,
        limit: 1
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(1)
    })

    it('should ignore limit when set to 0 and use a default of 10', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification()
      ])
      const res = await request.get('/notification').query({
        user: recieverId,
        limit: 0
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(2)
    })

    it('should ignore limit when set to negative value and use a default of 10', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification()
      ])
      const res = await request.get('/notification').query({
        user: recieverId,
        limit: -1
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(2)
    })

    it('should get only read notifications', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification()
      ])
      const res = await request.get('/notification').query({
        user: recieverId,
        read: true
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(1)
    })

    it('should get only unread notifications', async () => {
      const recieverId = 'mostafa'
      await Promise.all([
        generateNotification({ recieverId, isRead: true }),
        generateNotification({ recieverId, isRead: false }),
        generateNotification({ recieverId, isRead: false })
      ])
      const res = await request.get('/notification').query({
        user: recieverId,
        read: false
      })
      expect(res).to.has.status(200)
      expect(res.body).to.be.array()
      expect(res.body).to.be.of.length(2)
    })
  })
})
