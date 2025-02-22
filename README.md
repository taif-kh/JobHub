<img src="Frontend/public/project_photo.jpg" alt="JobHub">
<br />

# About JobHub

JobHub is an AI-powered Full Stack platform designed to revolutionize the job search and recruitment process. It leverages Machine Learning (Random Forest) to recommend job posts to seekers and rank candidate applications for HR managers. Built with **React.js, Node.js, Express.js, PostgreSQL (Prisma), Flask (Python), and Supabase**, JobHub streamlines hiring workflows and enhances user engagement.

<br />

<div align="center">
  <img src="https://skillicons.dev/icons?i=react" height="60" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="60" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="60" alt="express logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="60" alt="nodejs logo"  />
  <img width="12" />
   <img src="https://skillicons.dev/icons?i=flask" height="60" alt="flask logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="60" alt="postgresql logo"  />
</div>


---

## ✨ **Features**

### **For Job Seekers:**
- Upload resumes and receive personalized job recommendations.
- Seamlessly apply to job postings.
- Access a user-friendly dashboard to track applications.

### **For HR Managers:**
- Post job openings and review AI-ranked candidate applications.
- Access candidate resumes stored securely on Supabase (private cloud provider).
- Make faster hiring decisions with AI-driven insights.

---

## 🛠️ **Technologies Used**

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, Flask (Python for AI integration)
- **Database:** PostgreSQL (Prisma)
- **File Storage:** Supabase (for resume storage)
- **AI/ML Integration:** Random Forest Model (Python/Flask)
- **Other Tools:** Git, Postman, Jupyter Notebook (for ML model development)

---

## 🚀 **Getting Started**

### Prerequisites
- Node.js, Python, and PostgreSQL installed.
- Supabase account for resume storage.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/taif-kh/JobHub.git
   ```
2. Install dependencies for the Frontend and Backend:
   ```bash
    cd JobHub/Frontend
    npm install
    cd ../Backend
    npm install
   ```
3. Set up Prisma:

- Install the Prisma CLI globally (if not already installed):

    ```bash
    npm install -g prisma
    ```
- Generate the Prisma client:

    ```bash
    npx prisma generate
    ```
- Apply database migrations:

    ```bash
    npx prisma migrate dev --name init
    ```
4. Set up the Flask server for AI integration:
   ```bash
    pip install -r requirements.txt
   ```
5. Configure environment variables:

- Copy .env.example to .env:
    ```bash
    cp .env.example .env
    ```
- Open .env and fill in the required values:
 Replace [user], [password], [hostname], and [dbname] in DATABASE_URL with your PostgreSQL credentials.
 Add your Supabase URL and API key.
6. Set up the Flask server for AI integration:
   ```bash
    # Start the Flask AI server
    python app.py

    # Start the Backend and Frontend
    node --watch app.js
    cd ../Frontend
    npm run dev
   ```

## 📂 Project Structure

```bash
JobHub/
├── Frontend/            # React.js Frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.jsx     # Main application file
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── Backend/            # Node.js, Express.js, and Flask Backend (AI integration)
│   ├── models/         # Machine Learning models (Random Forest)
│   ├── modelsTraining/ # Model training files
│   ├── prisma/         # Prisma schema and migrations
│   ├── routes/         # API endpoints
│   ├── app.py           # Flask server for AI integration
│   ├── .env.example     # Environment variables template
│   ├── app.js           # Node.js server
│   └── package.json    # Backend dependencies
└── README.md            # Project documentation

```

## 📄 **License**

This project is licensed under the **MIT License**. For more details, see <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">https://opensource.org/licenses/MIT</a>.

## 🙏 Acknowledgments

- <a href="https://supabase.com/" target="_blank" rel="noopener">Supabase</a> for secure resume storage.
- <a href="https://scikit-learn.org/stable/" target="_blank" rel="noopener">scikit-learn</a> for the Random Forest model.
- The web development community for endless resources and support.

Made with ❤️ by Taif Khaskhoussi. Let's connect on <a href="https://www.linkedin.com/in/taif-khaskhoussi/" target="_blank" rel="noopener">LinkedIn</a>!
