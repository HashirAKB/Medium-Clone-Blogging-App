import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
	Variables : {
		userId: string,
    prisma: any
	}
}>();

blogRouter.use('*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
    const token = jwt.split(' ')[1];
    const secret = c.env.JWT_SECRET;
    const payload = await verify(token, secret);
    if(!payload){
      c.status(401);
          return c.json({ error: "unauthorized" });
    }
    console.log(payload);
    c.set('userId', payload.id as string);
    await next();
  })
  
blogRouter.get('/all', (c) => {
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

blogRouter.get('/:id', (c) => {
    const blog_id = c.req.param('id');
    return c.text('This is blog with id:' +blog_id);
  });

blogRouter.post('/postBlog', async (c) => {
    console.log(c.get('userId'));
    const body = await c.req.json();
    console.log(body);
    try{
      const newBlog = await c.get('prisma').posts.create({
        data:{
          title: body.title,
          content: body.content,
          authorId: c.get('userId')
        }
      })
      return c.text('Blog posted.');
    }
    catch(error){
      console.log(error);
      c.status(403);
      return c.json({
        Error: error
      });
    }
  })
  
blogRouter.put('/updateBlog', (c) => {
    return c.text('Blog updated.');
  })