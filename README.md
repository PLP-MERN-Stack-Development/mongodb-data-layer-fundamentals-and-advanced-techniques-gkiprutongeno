# 📚 PLP Bookstore – MongoDB Data Layer Fundamentals & Advanced Techniques

This project demonstrates core and advanced MongoDB techniques by building a robust data layer for a fictional bookstore application. It covers database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing—all implemented in the context of a `plp_bookstore` database.

---

## 🧰 Tech Stack

- **MongoDB** – NoSQL database
- **Node.js** – JavaScript runtime
- **MongoDB Shell (mongosh)** or **MongoDB Compass** – for database interaction

---

## 🗂️ Project Structure

├── insert_books.js # Script to populate the 'books' collection ├── queries.js # MongoDB queries: CRUD, advanced, aggregation, indexing ├── screenshots/ │ └── compass_sample_data.png # Screenshot of sample data in MongoDB Compass └── README.md # Project documentation

Code

---

## 🚀 Getting Started

### 1. Setup MongoDB

- Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community) locally **OR** create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.
- Create a database named: `plp_bookstore`
- Create a collection named: `books`

### 2. Insert Sample Data

Run the script to insert 10+ book documents:

```bash
node insert_books.js
This will drop any existing books collection and reinsert fresh sample data.

📌 Running Queries
All queries are stored in queries.js. You can run them using:

Option 1: Load inside mongosh
bash
mongosh "your-connection-string"
> load("queries.js")
Option 2: Run directly
bash
mongosh "your-connection-string" --file queries.js
Replace "your-connection-string" with your actual MongoDB URI, e.g.:

bash
mongosh "mongodb+srv://<username>:<password>@cluster-url/plp_bookstore"
🧪 Features & Tasks Implemented
✅ Task 1: MongoDB Setup
Database: plp_bookstore

Collection: books

✅ Task 2: Basic CRUD Operations
Insert, find, update, and delete book documents

Fields include: title, author, genre, published_year, price, in_stock, pages, publisher

✅ Task 3: Advanced Queries
Filter by genre, author, year

Projection: return only selected fields

Sorting: by price (asc/desc)

Pagination: using limit and skip

✅ Task 4: Aggregation Pipelines
Average price by genre

Author with most books

Grouping by publication decade

✅ Task 5: Indexing
Index on title

Compound index on author and published_year

Performance analysis using explain()

🖼️ Sample Data Screenshot

👤 Author
Gideon Kipruto – Full Stack Developer in training (PLP Cohort)
