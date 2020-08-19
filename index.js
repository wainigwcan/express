const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
// 连接数据库 express-test 数据库名
mongoose.connect("mongodb://localhost:27017/express-test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("数据库连接成功");
    });

//创建Schema
const Product = mongoose.model("Product", new mongoose.Schema({
    "title": String
}))
// 插入数据到数据库 测试
// Product.insertMany([
//     { "title": "产品1" },
//     { "title": "产品2" },
//     { "title": "产品3" }
// ]);

// 配置跨域
app.use(require("cors")());

// 查询数据
app.get("/products", async (req, res) => {
    // find 获取所有数据
    // const data = await Product.find();

    // limit 限制条数数据
    // const data = await Product.find().limit(2);

    // skip 指定跳过几条数据
    // const data = await Product.find().skip(1).limit(2);

    // where 指定查询条件 "title": "产品2"
    // const data = await Product.find().where({
    //     "title": "产品2"
    // });

    // sort 指定id排序 1正序  -1 倒序
    const data = await Product.find().sort({ _id: -1 });
    res.send(data);
});
//根据id获取单一数据
app.get("/products/:id", async (req, res) => {
    const data = await Product.findById(req.params.id)
    res.send(data);
});

// 新增数据
app.post("/products", async (req, res) => {
    const data = req.body;
    const product = await Product.create(data);
    res.send(product);
});
// 修改
app.put("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);

    product.title = req.body.title;

    await product.save();

    res.send(product);
});

// 删除
app.delete("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);

    await product.remove();

    res.send({ "result": true });
})

app.listen(3000, () => {
    console.log("服务器开启成功");
});