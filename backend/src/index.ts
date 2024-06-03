import { Hono } from 'hono'

const app = new Hono()

// To begin with, our backend will have 4 routes
// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk
// 💡
// https://hono.dev/api/routi

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.get('/api/v1/blog/:id', (c) => {
  const blog_id = c.req.param('id');
  return c.text('This is blog with id:' +blog_id);
});

app.get('/api/v1/blogs/', (c) => {
  const blogs = [{
    Title: "Blog 1",
    Description: "Description 1"
  },
  {
    Title: "Blog 2",
    Description: "Description 2"
  },
  {
    Title: "Blog 3",
    Description: "Description 3"
  }];

  return c.json(blogs);
});

app.post('/api/v1/user/signup', (c) => {
  return c.text('signup route.');
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('signin route.');
})

app.post('/api/v1/blog', (c) => {
  return c.text('Blog posted.');
})

app.put('/api/v1/blog', (c) => {
  return c.text('Blog updated.');
})

export default app;
