# week4_HW01

## 第四週：期中考：打造全端 (FULL STACK) 網站架構 - 後端

### 建立環境

```
$ npm install express-generator -g
```

### 建立專案

#### 可以先用 `express -h` 來查詢

```
$ express --no-view myApp
```

#### 進入 myApp

```
$ cd myApp

$ npm install
```

#### 新增需要的資料夾：

**`connections`** - 資料庫連結  
**`controllers`** - 控制器  
**`Models`** - 模型  
**`servers`** - 訊息

#### 新增檔案

**`config.env`** - 連線資料  
**`example.env`** - 放連線資料的 key，value 則不放  
**`.gitignore`** - 不想上傳到 github 的資料夾或檔案可以設定在這裡

> exsample.env  
> 這個檔案是在交接給別人時要用的  
> 原本的 config.env 是自己用的不外露  
> 告訴別人原本的 env 檔裡面的結構有什麼?

---

### 第一階段 📣 📣 📣

**`package.json`** -  
設定 start  
確定可以 npm run start:dev

```js
"scripts": {
        "start": "node ./bin/www",
        "start:dev": "nodemon ./bin/www"
    },
```

:open_file_folder: Models 底下  
:heavy_plus_sign:**`新增 postModel.js`** -  
設定 Schema

```js
const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Content 未填寫'],
        },
        image: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        name: {
            type: String,
            required: [true, '貼文姓名未填寫'],
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        versionKey: false,
    }
);
```

:heavy_plus_sign:**`新增 postContr.json`** -  
:open_file_folder: controllers 底下  
新增 postContr.json  
寫簡單的 get post 測試是否可以執行

```js
// 新增、修改、刪除
const postsController = {
    getAllPosts: async (req, res) => {
        const post = await postModel.find();
        res.status(200).json(post);
    },
    createPost: async (req, res) => {
        const newPost = await postModel.create(req.body);
        res.status(200).json({
            post: newPost,
            status: ' 單筆資料新增成功 ',
        });
    },
};
```

**`引用設定 app.js`** -  
app.js -> routes/posts.js(路由) -> controllers/postContr.js(控制) -> Models/postModel.js(Schema)

```js
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);
```

連線可以先用本地端做測試 - Postman

```js
// mongoose.connect('mongodb://localhost:27017/week4HW01').then((res) => {
//     console.log('連線資料成功');
// });
```

用 Postman 測試完後再建立遠端

## 遠端的部份 - heroku 部署

### heroku 指令

```js
$ git init
$ git add.
$ git commit -m 'first commit'
$ git push heroku master
```

heroku 預設的分支是 master  
github 預設的分支是 main - 2021 底改的

### 遠端連線設定

#### 連接 mongoDB

打開檔案：config.env
裡面的結構：

```js
PORT = 3000
DATABASE = 這是 mongoDB 取得的路徑
DATABASE_PASSWORD = 這是密碼
```

:open_file_folder: connections 底下  
:heavy_plus_sign:新增檔案： post.js

```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // 路徑

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB)
    .then(() => console.log('連線資料成功'))
    .catch((err) => console.log(err));
```

#### 在 app.js require 檔案路徑

```js
// 連線資料庫
require('./connections/post');
```

### 在 heroku 裡設定環境變數

-   選擇機台
    -   ⇒settings ⇒Config Vars - 把 config.env 的資料放進去 -
        ![imgbox for post_img](https://images2.imgbox.com/48/1a/kxnP4yPw_o.png)
        重啟主機 ⇒ more ⇒restart all...
        可以到 more ⇒ view logs 看有沒有重啟成功
        接著輸入 git push 將資料推到 heroku

**測試是否能夠新增、取得資料**  
:bangbang:如果失敗，看看這個流程有沒有漏掉什麼  
**app.js -> routes/posts.js(路由) -> controllers/postContr.js(控制) -> Models/postModel.js(Schema)**

---

### 第二階段 📣 📣 📣

-   把功能補齊 -
    -   取得所有資料
    -   新增資料
    -   刪除單筆資料 - ID
    -   刪除全部資料
    -   更新單筆資料 - ID

*   錯誤訊息補齊

### 第三階段 📣 📣 📣 合併兩個 collections

#### 本地端

-   新增檔案：usersModels.js 並寫入程式
-   到 controllers 的 postContr.js 引入 usersModels.js
-   到 postModel.js 更改內容

```js
user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user', // 來源為collections裡的user資料
            required: [true, '貼文 id 未填寫'],
        },
```

-   測試是否可以 post 資料 (postman)

```js
{
    "user":"6292fe984281c8ad8deab7c4",
    "content":"關聯性資料-03"
}
```

-   本地端全部測試
-   到 mongoDB 雲端新增使用者
-   測試 heroku (postman)

:warning: **常發生的錯誤**

-   忘記引用套件
-   忘記設定路徑
-   太倚賴自動選字功能，常選錯

:bangbang: **Github 跟 Heroku**

-   heroku 可以設定與 github 同步佈署
# week5_HW01
