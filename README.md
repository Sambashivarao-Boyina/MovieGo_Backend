


# 🎬 MovieGo - Backend

This is the backend for the **MovieGo** mobile application — a modern movie ticket booking platform developed using **Jetpack Compose** for the frontend and **Node.js + Express** for the backend.

> 🔗 Frontend Repository: [MovieGo Frontend](https://github.com/Sambashivarao-Boyina/MovieGo_Backend.git)

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (Authentication)**
- **Cloudinary (Image Uploads)**
- **Razorpay (Payments)**
- **CORS, Helmet, Morgan (Security & Logging)**
- **dotenv (Environment Configs)**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
````

---

## 🚀 Installation & Setup

Follow these steps to run the backend server locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sambashivarao-Boyina/MovieGo_Backend.git
   cd MovieGo_Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file and fill in your environment variables as shown above.

4. **Run the server**

   ```bash
   npm run dev
   ```

   > The server should now be running on `http://localhost:5000` (or the port you defined).


---


## 💳 Razorpay Integration

Razorpay is used for handling secure payments. The server uses Razorpay APIs to create payment orders. The frontend collects payment via Razorpay Checkout.

> Add the `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in your `.env` file to enable payment functionality.

---

## 🔒 JWT Authentication

JWT is used for secure authentication:

* After login, a token is sent in the response.
* Include this token in subsequent requests:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 🛠 Available Scripts

* `npm run dev` – Starts the server with **nodemon** (auto-restarts on changes).
* `npm start` – Starts the server normally using Node.js.

---

## 🧑‍💻 Developer

**Samba Shiva Rao Boyina**

* 📧 Email: [boyinasambashivarao@gmail.com](mailto:boyinasambashivarao@gmail.com)
* 🔗 [LinkedIn](http://www.linkedin.com/in/sambashivarao-boyina)
* 💻 [GitHub](https://github.com/Sambashivarao-Boyina)


