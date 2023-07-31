import express from 'express';
// import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './connection/database.js';
import routes from './routes/routes.js';

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: true, methods: ['GET', 'POST', 'PUT', 'UPDATE', 'PATCH', 'DELETE'] }));
// app.use(
//   session(
//     secret: 'super secret',
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       sameSite: 'none',
//       secure: true,
//     },
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});

export default app;
