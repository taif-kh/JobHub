<img src="Frontend/public/project_photo.jpg" alt="JobHub">

# jobHub: AI-Powered Job Board and Search Engine 🚀

jobHub is an AI-powered platform designed to revolutionize the job search and recruitment process. It leverages Machine Learning (Random Forest) to recommend job posts to seekers and rank candidate applications for HR managers. Built with **React.js, Node.js, Express.js, PostgreSQL (Prisma), Flask (Python), and Supabase**, jobHub streamlines hiring workflows and enhances user engagement.

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
   git clone https://github.com/taif-kh/jobHub/
   ```
2. Install dependencies for the frontend and backend:
   ```bash
    cd jobHub/frontend
    npm install
    cd ../backend
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
 Replace [user], [password], [neon_hostname], and [dbname] in DATABASE_URL with your PostgreSQL credentials.
 Add your Supabase URL and API key.
6. Set up the Flask server for AI integration:
   ```bash
    # Start the MERN Stack backend and frontend
    cd ../frontend
    npm run dev
    cd ../backend
    node --watch app.js

    # Start the Flask AI server
    python app.py
   ```

## 📂 Project Structure

```bash
jobHub/
├── frontend/            # React.js frontend
├── backend/             # Node.js, Express.js, and Flask backend (AI integration)
│   ├── app.py           # Flask server for AI integration
│   ├── models/          # Machine Learning model (Random Forest)
│   └── app.js           # Node.js server
├── README.md            # Project documentation
└── .env.example         # Environment variables template
```

## 📄 **License**

This project is licensed under the **MIT License**. For more details, see [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- <a href="https://supabase.com/" target="_blank">Supabase</a> for secure resume storage.
- <a href="https://scikit-learn.org/stable/" target="_blank">scikit-learn</a> for the Random Forest model.
- The MERN Stack community for endless resources and support.

Made with ❤️ by Taif Khaskhoussi. Let's connect on <a href="https://www.linkedin.com/in/taif-khaskhoussi/" target="_blank">LinkedIn</a>!