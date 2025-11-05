🌟 **PrepBot - AI Interview Assistant**

PrepBot is an AI-powered interview preparation assistant. It helps users generate **technical and behavioral interview questions** with strong sample answers based on a job title or description. PrepBot is designed to improve your confidence and readiness for interviews with real-time AI guidance.

---

🚀 **Live Demo**

🔗 Frontend (Vercel): https://ai-smart-prep.vercel.app  

---

🛠️ **Tech Stack**

**Frontend:**  
Next.js 16, React, TypeScript, Tailwind CSS, Lucide Icons  

**Backend:**  
Django 4, Django REST Framework, Python 3.12

---

⚙️ **Features**

✅ **AI Interview Q&A** Generate 5–10 sample interview questions and answers based on a job description.  

✅ **Technical & Behavioral Options** Choose between technical, behavioral, or both types of questions.  

✅ **Dark/Light Mode** Smooth toggle for user-friendly UI.  

✅ **Secure API Calls** Backend handles requests to Hugging Face API and returns formatted responses.  

---

⚙️ **Setup Instructions**

1️⃣ Clone the repository  
git clone https://github.com/madhumitha09-05/prepbot-python-webapp.git

2️⃣ Backend Setup

cd backend
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Update .env with your Hugging Face API key
Backend runs at: ➡️ http://localhost:8000

3️⃣ Frontend Setup

cd frontend
npm install
npm run build
npm run start
Frontend runs at: ➡️ http://localhost:3000
