import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';
import { signinInput, signupInput } from 'common4medium';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
	Variables : {
		userId: string,
    prisma: any
	}
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success){
      c.status(400);
      return c.json({error: "invalid input."});
    }
    try{
      const passwordHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body.password));
      const user = await c.get('prisma').user.create({
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

userRouter.post('/signin',  async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success){
      c.status(400);
      return c.json({error: "invalid input."});
    }
    try{
      const passwordHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body.password));
      const user = await c.get('prisma').user.findUnique({
        where:{
          email:body.email,
          password:await new Uint8Array(passwordHash)
        }
      })
      // console.log(user);
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