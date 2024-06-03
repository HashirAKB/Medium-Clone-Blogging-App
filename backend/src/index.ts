import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();


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

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try{
    const passwordHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body.password));
    const user = await prisma.user.create({
      data: 
      {
        name: body.username,
        email: body.email,
        password: new Uint8Array(await passwordHash),
      }
    });
    
    const payload = {
      id: user.id,
      name: body.username,
      email: body.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // Token expires in 5 minutes
    }
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);
    return c.json({token}); 
  }
  catch(e){
    console.log(e);
    c.status(403);
    return c.json({
      Error: e
    });
  }
});

app.post('/api/v1/user/signin',  async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try{
    const passwordHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body.password));
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:await new Uint8Array(passwordHash)
      }
    })
    console.log(user);
    if(user){
      const payload = {
        id: user.id,
        name: body.username,
        email: body.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 10, // Token expires in 5 minutes
      }
      const secret = c.env.JWT_SECRET;
      const token = await sign(payload, secret);
      return c.json({token}); 
    }
    else{
      c.status(403);
		  return c.json({ error: "user not found" });
    }
  }
  catch(e: any){
    console.log(e);
    c.status(404);
    return c.text(e);
  }
  
});

app.post('/api/v1/blog', (c) => {
  return c.text('Blog posted.');
})

app.put('/api/v1/blog', (c) => {
  return c.text('Blog updated.');
})

export default app;
