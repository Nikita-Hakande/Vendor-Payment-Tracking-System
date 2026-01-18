# MSME Vendor Payment Tracking System (Backend API)

A backend API built using **NestJS, TypeScript, and PostgreSQL** to help MSMEs manage vendors, purchase orders, payments, and outstanding balances efficiently.

This project was developed as part of the **API / Back-End Developer Intern assignment** and focuses on clean architecture, strong business logic, and data integrity.

---

## 🚀 Tech Stack

- **Backend Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** class-validator
- **Testing:** Jest
- **API Client:** Postman
- **Deployment (Planned):** Railway / Render

---

## 📌 Features Overview

### Core Capabilities

- Vendor management (CRUD)
- Purchase order creation with items
- Payment recording with business rules
- Automatic PO status updates
- Outstanding amount calculation
- Strong validation & error handling

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm
- Git

---

### Installation Steps

```bash
git clone <your-github-repo-url>
cd vendor-payment-api
npm install


DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=vendor_db

Vendor APIs
 ├─ Create Vendor
 ├─ Get Vendors
 ├─ Get Vendor by ID
 └─ Update Vendor

Purchase Orders
 ├─ Create PO (with items)
 ├─ Get All POs
 ├─ Get PO by ID
 └─ Update PO Status

Payments
 ├─ Create Partial Payment
 ├─ Create Final Payment
 ├─ Get All Payments
 └─ Get Payment by ID
```
