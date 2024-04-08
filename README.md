## Aeonaxy Assignment

### Dribbble Auth Clone: Full Stack Dev Internship

```NEXT.JS VERSION```

<hr>

This is the backend of the assignment for full-stack development internship opening at Aeonaxy Technologies. This
particular assignment is created using Node.Js, Express.Js and Typescript. NeonDB has been used as the database and
Prisma as the ORM. The backend has been deployed to a VPS.

You can find the frontend of the assignment [here](https://github.com/pingSubhajit/dribbble-auth-clone-legacy-frontend)
and the backend has been deployed [here](https://dribbble-auth-clone-legacy-aeonaxy.vercel.app/).

### Local development server

- First clone the repository and run `npm install` to install all the dependencies.
- Run `npm run dev` to start the development server.
- Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

### Environment variables

- Create a `.env` file in the root directory of the project.
- Add the following environment variables in the `.env` file:
  ```bash
  DATABASE_URL="postgres://neondb_owner:Y1BsHjJrWyv3@ep-tiny-feather-a1wqbc3k.ap-southeast-1.aws.neon.tech/dribbble-auth?sslmode=require&pgbouncer=true&connect_timeout=15&connection_limit=20"
  JWT_SECRET="secret" // Or a generated secret
  RESEND_API_KEY="re_Ms3iq1vG_6qpYVubmxs5ZSyMuPYBunxgJ" // Or your own Resend API key
  CLIENT_URL="https://dribbble-clone-frontend.netlify.app" // Or the local frontend URL
  ```
```
Note: This repository is public and the database URL is public as well. The API key works too. That puts the database
and my Resend account at risk. The secrets will be rotated after the review or two months after the submission,
whichever comes early. The secrets can be rotated before this time frame if significant unusual activity is noticed. So
please contact me if those secrets do not work while reviewing.
```

### Deployment guide

This application has been deployed on a private VPS with the IP `64.227.129.118`. You can check the live
backend [here](https://dribbble.subhajitkundu.me/).

#### Follow these steps below to deploy the application on your own server

- First make sure that Node and npm are installed on your server. If not, run `sudo apt install nodejs npm`.
- Clone the repository on your server and run `npm install` to install all the dependencies.
- Create a `.env` file in the root directory of the project and add the environment variables as mentioned above.
- Export the environment variables in the `.env` file by running `export $(cat .env | xargs)`.
- Run `npm run build` to build the project.
- Run `npm start` to start the server. Or alternatively, you can use `pm2` to run the server in the background. Install
  `pm2` by running `npm install pm2 -g` and then run `pm2 start npm -- start`.
- Use nginx as a reverse proxy to forward the requests to the Node server at `4000` port. You can follow the steps
  mentioned [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04#step-4-setting-up-nginx-as-a-reverse-proxy-server).
