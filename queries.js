
use('plp_bookstore');
print('✅ Connected to DB:', db.getName());

// ==================================================================
// Task 2: Basic CRUD Operations
// ==================================================================
print('\n--- Task 2: Basic CRUD ---');

// 1) Read - Find all books in Fiction genre
print('\n📚 Find all books in genre "Fiction":');
db.books.find({ genre: "Fiction" }).forEach(printjson);

// 2) Read - Find books published after 2010
print('\n📚 Books published after 2010:');
db.books.find({ published_year: { $gt: 2010 } }).forEach(printjson);

// 3) Read - Find books by George Orwell
print('\n📚 Books by George Orwell:');
db.books.find({ author: "George Orwell" }).forEach(printjson);

// 4) Update - Update price of "The Alchemist"
print('\n✏️ Update the price of "The Alchemist":');
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 11.99 } }
);
print('➡️ Updated document:');
db.books.find({ title: "The Alchemist" }, { title:1, price:1, _id:0 }).forEach(printjson);

// 5) Delete - Example 
print('\n🗑️ Delete "Moby Dick" (disabled for safety):');
// db.books.deleteOne({ title: "Moby Dick" });
// print('Remaining count:', db.books.countDocuments({ title: "Moby Dick" }));

// ==================================================================
// Task 3: Advanced Queries
// ==================================================================
print('\n--- Task 3: Advanced Queries ---');

// a) Find in-stock books published after 2010
print('\n📦 In-stock books published after 2010 (title, author, price):');
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title:1, author:1, price:1, _id:0 }
).forEach(printjson);

// b) Projection example - Only show specific fields
print('\n🔎 Projection (title, author, price) for all Fantasy books:');
db.books.find(
  { genre: "Fantasy" },
  { title:1, author:1, price:1, _id:0 }
).forEach(printjson);

// c) Sorting by price ASC & DESC
print('\n⬆️ Sort by price ascending:');
db.books.find({}, { title:1, price:1, _id:0 }).sort({ price: 1 }).forEach(printjson);

print('\n⬇️ Sort by price descending:');
db.books.find({}, { title:1, price:1, _id:0 }).sort({ price: -1 }).forEach(printjson);

// d) Pagination (5 docs per page)
print('\n📄 Pagination - Page 1 (first 5):');
db.books.find({}, { title:1, author:1, _id:0 }).sort({ title:1 }).limit(5).forEach(printjson);

print('\n📄 Pagination - Page 2 (next 5):');
db.books.find({}, { title:1, author:1, _id:0 }).sort({ title:1 }).skip(5).limit(5).forEach(printjson);

// ==================================================================
// Task 4: Aggregation Pipelines
// ==================================================================
print('\n--- Task 4: Aggregation Pipelines ---');

// 1) Average price of books by genre
print('\n📊 Average price by genre:');
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
  { $sort: { avgPrice: -1 } }
]).forEach(printjson);

// 2) Author with most books
print('\n👨‍💻 Author with most books:');
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]).forEach(printjson);

// 3) Group books by decade
print('\n📆 Books grouped by decade:');
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] } },
          "s"
        ]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).forEach(printjson);

// ==================================================================
// Task 5: Indexing & Explain()
// ==================================================================
print('\n--- Task 5: Indexing & Explain() ---');

// Show current indexes
print('\n🔎 Current indexes:');
db.books.getIndexes().forEach(printjson);

// Ensure clean state for demo (drop old title index if exists)
const hasTitleIndex = db.books.getIndexes().some(i => i.key && i.key.title);
if (hasTitleIndex) {
  print('⚠️ Dropping existing title index...');
  try { db.books.dropIndex('title_1'); } catch(e) { print(e); }
}

// Explain BEFORE creating index
print('\n📉 Explain BEFORE creating index (should show COLLSCAN):');
let before = db.books.find({ title: "Clean Code" }).explain("executionStats");
printjson({
  stage: before.queryPlanner.winningPlan.stage || before.queryPlanner.winningPlan.inputStage?.stage,
  totalDocsExamined: before.executionStats?.totalDocsExamined,
  totalKeysExamined: before.executionStats?.totalKeysExamined
});

// Create new indexes
print('\n⚡ Creating index on title...');
db.books.createIndex({ title: 1 });

print('\n⚡ Creating compound index on (author ASC, published_year DESC)...');
db.books.createIndex({ author: 1, published_year: -1 });

// Explain AFTER creating index
print('\n📈 Explain AFTER creating index (should show IXSCAN):');
let after = db.books.find({ title: "Clean Code" }).explain("executionStats");
printjson({
  stage: after.queryPlanner.winningPlan.stage || after.queryPlanner.winningPlan.inputStage?.stage,
  totalDocsExamined: after.executionStats?.totalDocsExamined,
  totalKeysExamined: after.executionStats?.totalKeysExamined
});

// Show indexes again
print('\n✅ Indexes after creation:');
db.books.getIndexes().forEach(printjson);

print('\n--- End of queries.js ---');
