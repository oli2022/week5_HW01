const express = require('express');

const router = express.Router();

// 引用 postContr.js檔案
const postContr = require('../controllers/postContr');

router.get('/posts', (req, res) => postContr.getAllPosts(req, res));
router.post('/post', (req, res) => postContr.createPost(req, res));
router.delete('/post/:id', (req, res) => postContr.deleteOne(req, res));
router.delete('/posts', (req, res) => postContr.deleteAll(req, res));
router.patch('/post/:id', (req, res) => postContr.updatePost(req, res));

module.exports = router;
