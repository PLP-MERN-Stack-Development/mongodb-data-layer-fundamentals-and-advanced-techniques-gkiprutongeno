# 📚 MongoDB Data Layer Fundamentals – PLP Bookstore

This project demonstrates MongoDB fundamentals and advanced techniques by building a **Bookstore database** (`plp_bookstore`) with a `books` collection.  
It covers CRUD operations, advanced queries, aggregation pipelines, and indexing for performance optimization.

---

## 📂 Project Structure

.
├── insert_books.js # Script to populate the 'books' collection with sample data
├── queries.js # MongoDB queries (CRUD, advanced queries, aggregations, indexing)
├── README.md # Project documentation
└── screenshots/
└── compass_sample_data.png # Screenshot showing the collection and sample data

yaml
Copy code

---

## 🚀 How to Run

### 1. Insert Sample Data
Run the provided script to insert 10+ book documents:

```bash
node insert_books.js
This will connect to your MongoDB instance (local or Atlas), drop any existing books collection, and reinsert the sample data.

2. Run Queries
All MongoDB queries are stored in queries.js.

Option 1: Load inside mongosh
bash
Copy code
mongosh "your-connection-string"
> load("queries.js")
Option 2: Run directly with mongosh
bash
Copy code
mongosh "your-connection-string" --file queries.js
Replace "your-connection-string" with your Atlas URI, e.g.:

bash
Copy code
mongosh "mongodb+srv://<username>:<password>@cluster-url/plp_bookstore"
📸 Screenshot
Below is proof that the database and collection were created successfully, with sample data inserted:


✅ Tasks Implemented
Task 1: Setup

Database: plp_bookstore

Collection: books

Task 2: Basic CRUD

Insert, find, update, and delete book documents

Task 3: Advanced Queries

Filtering, projection, sorting, and pagination

Task 4: Aggregation Pipelines

Average price by genre

Author with the most books

Grouping by publication decade

Task 5: Indexing

Index on title

Compound index on author and published_year

Performance comparison using explain()

🧑‍💻 Author
Gideon Kipruto – Full Stack Developer in training (PLP Cohort)