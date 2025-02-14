# 🔄 Identity Reconciliation Service

## 🎯 Overview
A sophisticated solution for **Bitespeed's Identity Reconciliation problem** to track and consolidate customer identities across different purchases, handling varying contact information efficiently.

---

## 🌟 Core Features

### ✅ Contact Management
- Maintains contact information in relational database
- Tracks email addresses and phone numbers
- Establishes links between related contacts
- Manages primary/secondary relationships

### ✅ Identity Linking
- Links contacts based on matching details
- Maintains oldest contact as "primary"
- Associates newer contacts as "secondary"
- Preserves complete identity chains

### ✅ Hierarchical Structure
- Primary contacts as root of identity chains
- Secondary contacts with primary linkage
- Temporal precedence maintenance
- Relationship integrity preservation

---

## 🛠️ Tech Stack

### Backend
- 🟢 **Node.js**
- 🔷 **TypeScript**
- 🚀 **Express.js**
- 🗄️ **Sequelize ORM**
- 📊 **MySQL**
- ✨ **Zod** (validation)

---

## 🚀 Quick Start

### Prerequisites
- Node.js
- MySQL
- npm

### Installation Steps
```bash
# Clone repository
git clone https://github.com/shreerajsingh/bitespeed-identity_reconciliation.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📡 API Endpoints

#### 1. Create/Identify Contact
- Endpoint: POST /identify

- Purpose: Create or update contact information

- Request Body:
```json
{
  "email": "example@email.com",
  "phoneNumber": "1234567890"
}
```

- Response:
```
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["example@email.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

#### 2. Get Contacts
- Endpoint: GET /contacts
- Purpose: Retrieve contact information
- Response: Returns a list of contacts with their relationships

#### 3. Delete All Contacts
- Endpoint: DELETE /contacts
- Purpose: Remove all contacts (useful for testing/development)

---
## 🚨 Error Handling & Development Guide

#### ⚠️ Error Response Format
The service implements standardized error responses:

```json
{
  "success": false,
  "message": "Error message", 
  "data": {},
  "error": {
    "details": "Specific error information"
  }
}
```

---

## 🛠️ Development Guide

#### Project Structure
```code
src/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── dtos/               # Data Transfer Objects
├── middlewares/        # Custom middleware functions
├── migrations/         # Database migrations
├── models/             # Database models
├── repositories/       # Data access layer
├── routes/             # API routes
├── services/           # Business logic
└── utils/              # Utility functions
```

#### Running Tests

```bash
npm test
```

#### Building for Production

```bash
npm run build
```

---

## 🤝 Contributing

- Fork the repository
- Create a feature branch
```
git checkout -b feature/AmazingFeature
```
- Commit your changes
```
git commit -m 'Add some AmazingFeature'
```

- Push to the branch 
```
git push origin feature/AmazingFeature
```
- Open a Pull Request

---

## 📞 Contact

- Dev: Priyvardhan Singh Sisodiya
- Email: priyvardhansinghsisodiya@gmail.com
- Project Link: https://github.com/shreerajsingh/bitespeed-identity_reconciliation
