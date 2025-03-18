A simple web application for tracking personal finances, allowing users to add, view, and delete transactions, and visualize expenses through charts.

Tech Stack
Frontend: Next.js, React, Tailwind CSS
Backend: Node.js, MongoDB (Compass)
UI Components: Recharts for data visualization

Features
Add, edit, and delete transactions (amount, date, description)
View transactions in a list format
Display monthly expenses in a bar chart
Store and fetch transaction data from MongoDB


⚙️ Installation Instructions
Clone the Repository
bash
Copy
Edit
git clone <your-repository-url>

cd Personal-Finance-Visualizer
Install Dependencies
bash
Copy
Edit

npm install
Set Up MongoDB
Open MongoDB Compass

Connect to:
arduino
Copy
Edit
mongodb://localhost:27017

Create a database:
Database Name: financeDB
Collection: transactions

Add Environment Variables Create a .env.local file in the root directory:
bash
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/financeDB

Run the Project
For development:
bash
Copy
Edit
npm run dev

For production:
bash
Copy
Edit

npm run build
npm start
Open http://localhost:3000 in your browser.