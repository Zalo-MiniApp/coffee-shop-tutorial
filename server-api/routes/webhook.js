var express = require('express');
const db = require('../models');
var router = express.Router();

/* Get orders history of logged in user */
router.post('/', async (req, res, next) => {
  try {
    const payload = req.body
    console.log('[Webhook] Received payload', payload)
    switch (payload.event_name) {
      case 'follow':
        await processFollowEvent(payload)
        break;

      case 'unfollow':
        await processUnfollowEvent(payload)
        break;

      default:
        console.log('[Webhook] Event not supported!', payload.event_name)
        break;
    }
    res.sendStatus(200)
    console.log('[Webhook] Processed payload successfully!')
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.error('[Webhook] Exception', error);
  }
});

async function processFollowEvent(payload) {
  const { user_id_by_app, follower } = payload
  const followerId = follower.id
  await db.Users.updateOne({
    zaloId: user_id_by_app
  }, {
    followerId,
    isFollowing: true
  }, {
    upsert: true
  })
}

async function processUnfollowEvent(payload) {
  const { user_id_by_app, follower } = payload
  const followerId = follower.id
  await db.Users.updateOne({
    zaloId: user_id_by_app
  }, {
    followerId,
    isFollowing: false
  }, {
    upsert: true
  })
}

module.exports = router;
