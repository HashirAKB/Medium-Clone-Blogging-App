- This is a medium like blogging web application that I'm building.

- The stack:
    1. React in the frontend
    2. Cloudflare workers in the backend
    3. zod as the validation library, type inference for the frontend types
    4. Typescript as the language
    5. Prisma as the ORM, with connection pooling
    6. Postgres as the database
    7. jwt for authentication

- Finished Initialising the backend.
- Finished setting up basic routing.

- I'm using hono as the backend runtime as we're deploying this on cloudflare as serverless.
- Why Hono: Using Hono instead of Express for backends deployed on Cloudflare Workers offers significant advantages in terms of performance, compatibility, resource usage, and initialization time. Hono is purpose-built for environments like Cloudflare Workers, making it a better fit for the unique requirements of serverless and edge computing. Express, while powerful and versatile, is more suited for traditional server deployments where these constraints are less critical.

- For DB, I'm using neon postgresql with prisma accelerate for connection pooling.
- Why the above configuration: 
Using Neon PostgresDB with Cloudflare Worker can provide a faster and more reliable database experience. Neon's serverless platform is designed to integrate seamlessly with Cloudflare's global network, reducing latency and improving performance. 
Prisma Accelerate is beneficial for connection pooling as it optimizes the number of connections between your application and the database, reducing overhead and improving efficiency. It also provides automatic load balancing and failover, ensuring high availability and scalability.
- Why Prisma ORM: Prisma ORM is an open-source Node.js and TypeScript ORM that simplifies database interactions, providing a readable data model, automated migrations, type-safety, and auto-completion. ORMs like Prisma are beneficial with PostgreSQL databases as they abstract complex database operations, making it easier to develop, fortify, and scale applications. They also provide a consistent and efficient way to interact with your database, allowing you to build, fortify, and grow your application with ease.

- Finished initializing DB.
- Finished generating connection pool URL from prisma accelerate.
- Finished installing prisma ORM into the project.

- Connection poolURL - DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmUzZGE0ODAtNzViNS00Mjc0LTliZmItZGFkYjJhYjM3ZmRmIiwidGVuYW50X2lkIjoiZDRmM2JjNGZjYmQ4ZTMwNDY2ZDQxNjdjODFmOGE2YzY3MTBkYWM2NmEwYTEzNzM0MTFkZGIzM2I4NzI5NjgwMCIsImludGVybmFsX3NlY3JldCI6IjYxNzM2YmNjLTA2NzItNDE1NC1iM2QyLTAxYzU3YWUzMGI1NiJ9.BjJQgUdgA_BShFK7maqGlSSVOLwstNAy6bqer6qRhxU"

- Finished structuring the DB.
- How I structured the DB for this appication:
    # Database Structure for the Blogging Web Application
    The database for the blogging web application is structured to support the core functionality of the application, which includes managing users and their blog posts. The database is designed with two main tables: User and Post.

    ## User
    The User table stores information about each user. The id field is a unique identifier for each user, automatically generated using a Universally Unique Identifier (UUID) format. The email field is a unique string that serves as the user's login identifier. The name field is an optional string that stores the user's name, and the password field stores the user's encrypted password.

    ## Post
    The Post table stores all blog posts. The id field is a unique identifier for each post, also generated using a UUID. The title and content fields store the post's title and content, respectively. The published field is a Boolean that indicates whether the post is published or not.

    ## User-Post Relationship
    The User and Post tables are related through a one-to-many relationship. Each User can have multiple Posts, and each Post belongs to one User. This relationship is established through the author field in the Post table, which references the id field in the User table. This allows us to track the author of each post and establish a clear ownership relationship.

    ## ER Diagram:
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentStyleType="text/css" height="382px" preserveAspectRatio="none" style="width:163px;height:382px;background:#FFFFFF;" version="1.1" viewBox="0 0 163 382" width="163px" zoomAndPan="magnify"><defs/><g><!--class User--><g id="elem_User"><rect codeLine="1" fill="#F1F1F1" height="137.4844" id="User" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="128" x="17.5" y="7"/><ellipse cx="61.3" cy="23" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M65.4094,29 L57.6906,29 L57.6906,16.6094 L65.4094,16.6094 L65.4094,18.7656 L60.1438,18.7656 L60.1438,21.4375 L64.9094,21.4375 L64.9094,23.5938 L60.1438,23.5938 L60.1438,26.8438 L65.4094,26.8438 L65.4094,29 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="32" x="81.7" y="27.8467">User</text><line style="stroke:#181818;stroke-width:0.5;" x1="18.5" x2="144.5" y1="39" y2="39"/><ellipse cx="28.5" cy="52.6484" fill="none" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="93" x="37.5" y="55.9951">id: String [PK]</text><line style="stroke:#181818;stroke-width:1.0;" x1="18.5" x2="144.5" y1="63.2969" y2="63.2969"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="109" x="23.5" y="80.292">email: String [U]</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="95" x="23.5" y="96.5889">name: String?</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="116" x="23.5" y="112.8857">password: String</text><line style="stroke:#181818;stroke-width:1.0;" x1="18.5" x2="144.5" y1="120.1875" y2="120.1875"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="97" x="23.5" y="137.1826">posts: Posts[]</text></g><!--class Posts--><g id="elem_Posts"><rect codeLine="11" fill="#F1F1F1" height="153.7813" id="Posts" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="149" x="7" y="221.49"/><ellipse cx="57.75" cy="237.49" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M61.8594,243.49 L54.1406,243.49 L54.1406,231.0994 L61.8594,231.0994 L61.8594,233.2556 L56.5938,233.2556 L56.5938,235.9275 L61.3594,235.9275 L61.3594,238.0837 L56.5938,238.0837 L56.5938,241.3337 L61.8594,241.3337 L61.8594,243.49 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="39" x="78.25" y="242.3367">Posts</text><line style="stroke:#181818;stroke-width:0.5;" x1="8" x2="155" y1="253.49" y2="253.49"/><ellipse cx="18" cy="267.1384" fill="none" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="93" x="27" y="270.4851">id: String [PK]</text><line style="stroke:#181818;stroke-width:1.0;" x1="8" x2="155" y1="277.7869" y2="277.7869"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="74" x="13" y="294.782">title: String</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="103" x="13" y="311.0789">content: String</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="134" x="13" y="327.3757">published: Boolean</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="137" x="13" y="343.6726">authorId: String [FK]</text><line style="stroke:#181818;stroke-width:1.0;" x1="8" x2="155" y1="350.9744" y2="350.9744"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="86" x="13" y="367.9695">author: User</text></g><!--link User to Posts--><g id="link_User_Posts"><path codeLine="22" d="M81.5,152.74 C81.5,176.93 81.5,178.31 81.5,203.14 " fill="none" id="User-Posts" style="stroke:#181818;stroke-width:1.0;"/><line style="stroke:#181818;stroke-width:1.0;" x1="77.5" x2="85.5" y1="148.74" y2="148.74"/><line style="stroke:#181818;stroke-width:1.0;" x1="77.5" x2="85.5" y1="151.74" y2="151.74"/><line style="stroke:#181818;stroke-width:1.0;" x1="81.5" x2="81.5" y1="152.74" y2="144.74"/><line style="stroke:#181818;stroke-width:1.0;" x1="81.5" x2="87.5" y1="213.14" y2="221.14"/><line style="stroke:#181818;stroke-width:1.0;" x1="81.5" x2="75.5" y1="213.14" y2="221.14"/><line style="stroke:#181818;stroke-width:1.0;" x1="81.5" x2="81.5" y1="213.14" y2="221.14"/><ellipse cx="81.5" cy="207.14" fill="none" rx="4" ry="4" style="stroke:#181818;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="23" x="82.5" y="187.5569">has</text></g><!--SRC=[VO_12i8m38RlVOhGg_G5UX4y2E9b83kD7Qe6L-ZQqNGCsNntK-VSJbuQ-ltv_oJeaqrFa2LXb30AW9szQxYaQFq3gk9SCrAA7soDTQjIPi6R5XUqvtzdY8OGVm6BjmkKI4EHIrMBbn3udVj1_mTpeyDDuYtunFODwVghizGW-myXE3IUeUbJ4-9fatbSCsTHGpuxhvChJ9DIOPot10soCIJV]--></g></svg>

This database structure provides a solid foundation for managing users and their blog posts, enabling features such as user authentication, post creation, editing, and deletion, and post viewing with user-specific filtering and sorting.

- Finished prism DB migrations.
- The word "migration" in this context refers to the process of creating and applying changes to the schema of a database, such as adding or modifying tables, columns, or relationships. This process is often referred to as "migrating" the database schema.

- Finished generating prisma client.
- Finished installing Prisma accelerate extension.
- Finished coding signup route. Implemented password hashing using web-crypto. Returns JWT.
- Finished signin route.
- Finished writing a middleware that extracts the user id and passes it over to the main route.

- Separated user and blog routes.
- Implemented apis to create, edit, view, and get all the posts.