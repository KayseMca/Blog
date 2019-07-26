# Blog


with **nodejs** and  **mongoDB** simple blog App

I deployed to Heroku and simple you can find in the below link..

[Blog link](https://kayseblog.herokuapp.com/blogs)


When you clone this first, then run this command <code>npm install</code> to install all packages.

then you need database I used mongodb:

to use it first create Keys directory <code>mkdir keys</code>. then create file named keys.js in the keys directory.
js with this command <code>touch keys/keys.js</code>

lastly; paste your mongodb cloud link in this file. if you haven't you can create new one [here](https://cloud.mongodb.com)
or you can use local mongodb database, just change <code>mongoose.connect(process.env.MONGODB_URI || keys.database,{ useNewUrlParser: true });</code> to <code>mongoose.connect("mongodb://localhost/[enter your database_name here]",{ useNewUrlParser: true });</code>
