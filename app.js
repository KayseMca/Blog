
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
//var keys        = require("./");
var expressSanitizer = require("express-sanitizer");
var app = express();


//var http = require("http");
//var server = http.Server(app)
var PORT = process.env.PORT || 5555;
//blog has image, title, body, created date

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://kayse:000@cluster0-9j7b3.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));



//schema and model for a database-> / model/mongoose CONFIG

var blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});

var Blog = mongoose.model('Blog',blogSchema);


/*Blog.create({
    title:"Test Blog",
    image:"https://images.unsplash.com/photo-1521498328641-2ddda2dec7a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    body:"Hello this is a Blog Post"
})*/
mongoose.set('useFindAndModify', false);
// RESTFUL  ROUTES

app.get("/",function(req,res){

    //res.render("index")
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res) {
    Blog.find({},function(err,blogs){
        if(err){
            console.log("there is an error at finding blogs: ",err)
        }
        else{
            res.render("index",{blogs:blogs});
        }
    })
});

//New route

app.get('/blogs/new',function(req,res){
    res.render("new");
});

//post route

app.post("/blogs",function(req,res){
    // create blog 
    //req.body.blog.body = req.sanitizer(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){

        if(err){
            console.log('not added the blog ',err);
        }
        else{
            res.redirect('blogs');
        }
    });
});

//show page

app.get("/blogs/:id",function(req,res){

    Blog.findById(req.params.id,function(err,findBlog){
        if(err){
            console.log("not found blog ",err);
        }
        else{
            res.render("show",{blog:findBlog});
        }
    });
});

// Edit Route

app.get('/blogs/:id/edit',function(req,res){

    Blog.findById(req.params.id,function(err,findBlog){
        if(err){
            console.log("not found blog ",err);
        }
        else{
            res.render("edit",{blog:findBlog});
        }
    });

});

// Update routes

app.put("/blogs/:id",function(req,res){

    //req.body.blog.body = req.sanitizer(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){

        if(err){
            console.log("not updated.. ",err);
        }else{
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});


//delete route

app.delete("/blogs/:id",function(req,res){

    //Destroy blog 
    // and redirect somewhere
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err){

        if(err){
            console.log("not deleted.. ",err);
        }else{
            res.redirect("/blogs");
        }
    });
});


//localhost
app.listen(PORT,console.log("server has started 5555"));
