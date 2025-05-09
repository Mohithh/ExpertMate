 Professional Connect Portal (MERN + Next.js)
This is a full-stack web application built using Next.js, Node.js, MongoDB, and Express that enables seamless interaction between users and professionals (faculty such as doctors, teachers, lawyers, engineers, etc.). The platform includes authentication, role-based dashboards, professional networking, secure file sharing, real-time messaging, and admin control — all with a modern, responsive design.

Authentication & Roles
Separate login/signup systems for Users and Faculty
Passwords are hashed using bcrypt
JWT-based secure authentication
Only authenticated users/faculty can access their dashboards

Faculty Features
Submit professional details through a detailed form:
Name, Email, Contact, Country, City, Gender, Experience, Age
Job Preferences: Mode, Type, Profession, Profession Category
Upload Profile Photo and Documents
Description of their skills or services
View, edit, and manage submitted information
Receive requests from users seeking help
Accept/reject requests and connect with users
Access user information based on category (e.g., Teacher, Lawyer, Engineer) or email

👤 User Features
Submit personal information and post their problems/needs
Upload image and document files
Search faculty by email or category
View faculty profiles (including photo and file download)
Send help requests to specific professionals
Get notified when their request is accepted or rejected
If accepted, users can chat with faculty directly

💬 Chat Functionality
Real-time one-to-one chat between users and faculty once connected
Chat history saved and accessible
Admin can monitor all conversations

🛠️ Admin Panel
View and manage all user and faculty profiles
Access and moderate any chats
Edit emails, names, photos, etc.
Ban or unban accounts as necessary

📱 Tech Stack
Frontend: Next.js (React), Tailwind CSS, React Icons, React Toastify
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Auth: JWT, bcrypt
Chat System: Custom messaging logic
UI/UX: Fully responsive and mobile-friendly

 Features Implemented
 Secure Login/Signup
 Image & File Uploads
Role-Based Interface (User & Faculty)
View/Edit Own Data
Profession-Based Search System
Request System & Notifications
Chat between users and professionals
Admin panel for full control
Light/Dark Mode Toggle

Future Work
Add video calling between users and faculty
Integrate email or push notifications
Improve search suggestions and filtering
Add review or rating system
Analytics for faculty engagement and user issues
