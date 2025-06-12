import express from "express";
import ejsLayouts from "express-ejs-layouts";

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let posts = [];
let currentId = 1;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Form Handling
app.get('/', (req, res) => {
    res.render('index.ejs', { posts }); // sends you to index instantly
  });

// established once posts are made  
app.post('/posts', (req, res) => {
    const newPost = {
      id: currentId++,
      title: req.body.title,
      author: req.body.author,
      date: new Date(),
      content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
  });


// Sends you to edit page
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit', { post });
});
// Sends you back once done  
app.post('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    posts[postIndex] = {
      ...posts[postIndex],
      title: req.body.title,
      author: req.body.author,
      content: req.body.content
    };
    res.redirect('/');
});
 

// Handles deleting postss
app.post('/posts/:id/delete', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
  });
  