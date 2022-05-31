const express = require('express');

const router = express.Router();

// 引用其他檔案 - 錯誤訊息
const { errorHandle, deleteError, deleteAllError, nullError } = require('../servers/errorHandle');

// 引用 Model 檔案
const Post = require('../Models/postModel');
const User = require('../Models/usersModel');

// 新增、修改、刪除
const postsController = {
    getAllPosts: async (req, res) => {
        const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
        const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
        const post = await Post.find(q)
            .populate({
                path: 'user',
                select: 'name photo ',
            })
            .sort(timeSort);
        // asc 遞增(由小到大，由舊到新) createdAt ;
        // desc 遞減(由大到小、由新到舊) "-createdAt"

        //const post = await Post.find();

        // const post = await Post.find().populate({
        //     path: 'user', //會去抓postModel.js的user
        //     select: 'name photo',
        // });
        res.status(200).json(post);
    },
    createPost: async (req, res) => {
        try {
            const newPost = await Post.create(req.body);
            res.status(200).json({
                post: newPost,
                status: ' 單筆資料新增成功 ',
            });
        } catch (error) {
            nullError(res, error);
        }
    },
    deleteAll: async (req, res) => {
        try {
            if (req.originalUrl === '/posts') {
                await Post.deleteMany({});
                res.status(200).json({
                    status: '刪除全部資料成功',
                });
            } else {
                deleteAllError(res, error);
            }
        } catch (error) {
            deleteAllError(res, error);
        }
    },
    deleteOne: async (req, res) => {
        try {
            const id = req.params.id;
            await Post.findByIdAndDelete(id);
            res.status(200).json({
                status: ' 單筆資料刪除成功 ',
            });
        } catch (error) {
            deleteError(res, error);
        }
    },
    updatePost: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await Post.findByIdAndUpdate(id, data);
            res.status(200).json({
                status: ' 單筆資料更新成功 ',
                data,
            });
        } catch (error) {
            deleteError(res, error);
        }
    },
};

module.exports = postsController;
