const express = require('express');
const axios = require('axios');
const FormData = require('form-data'); // Ensure form-data is installed
const bodyParser = require('body-parser');
const PORT = 3000;

const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const multer  = require('multer')
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const jobsRouter = require('./routes/jobsRouter');


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      console.log('Authenticating user:', email);
      try {
        const user = await prisma.users.findUnique({
          where: { email }
        });

        if (!user) {
          console.log('User not found');
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log('Password mismatch');
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        console.log('Authentication successful');
        return done(null, user);
      } catch (err) {
        console.log('Error during authentication:', err);
        return done(err);
      }
    }
));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  },
  async (jwt_payload, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id: jwt_payload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});


app.post("/sign-up", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during sign-up.");
  }
});


app.post("/sign-up-hr", async (req, res) => {
  const { username, email, password, fullName, physicAdd, linkedin, glassDoor, contactEmail, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName, physicAdd, linkedin, glassDoor, contactEmail, phoneNumber,
        isHr: true,
      }
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during sign-up.");
  }
});



app.post("/log-in", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      // Include user details in the response
      res.json({
        token,
        id: user.id,
        email: user.email,
        username: user.username, // Add other necessary fields
      });
    });
  })(req, res, next);
});

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});




app.get("/", (req, res) => {
    res.send("Yo");
});

app.use('/users', userRouter);
app.use('/jobs', jobsRouter)

// _________________________________________________

app.post('/upload', upload.single('resumeLink'), async (req, res, next) => {
  try {
    // Check allowed MIME types
    const allowedMimeTypes = ['application/pdf', 'text/plain'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).send('Only PDF and TXT files are allowed.');
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('resume', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Forward file to Python `/pred` endpoint for processing
    const pythonResponse = await axios.post('http://localhost:5000/pred', formData, {
      headers: formData.getHeaders(), // Include correct headers
    });

    const { predicted_category, recommended_job } = pythonResponse.data;

    // Generate a unique file name for Supabase
    const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('files')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    // Construct the public URL for the file
    const fileUrl = `https://unifremnvldupfgrgwkl.supabase.co/storage/v1/object/public/files/${fileName}`;

    // Save the file URL and Python's response in the database
    const userId = Number(req.body.userId);

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        resumeLink: fileUrl,
        predField: predicted_category,
        recJob: recommended_job,
      },
    });

    res.json({
      message: 'File uploaded and processed successfully.',
      fileUrl,
      predicted_category,
      recommended_job,
    });
    console.log( predicted_category,recommended_job);
  } catch (error) {
    console.error('Error during file upload and processing:', error);
    res.status(500).send('An error occurred during file upload and processing.');
  }
});

//----------------------------------------------------------------
app.get('/hello', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/hello');
    res.send(response.data); // Receive Hello
  } catch (error) {
    console.error('Error communicating with Python server:', error.message);
    res.status(500).send('Error reaching Python server.');
  }
});



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


// localStorage.removeItem('token');      CLEAR TOKEN AND LOG OUT