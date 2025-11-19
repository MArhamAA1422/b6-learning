## Intro
- Data file in Disc
- block by block records
- 10000 records, 100 block, 100 records per block
- Indexing is optional, but increases access speed. It is not the
primary mean to access the tuple, it is the secondary mean.
- Index file is always sorted.
- Based on selectivity (uniqueness of any column) DB optimizer chooses weather to use index or not.

## Index
- index file, a DS, kinda map
- can be in RAM or Disc
- **search key, BP** (base pointer)
   - BP = block id
   - now, we know the block, we can do binary search or linear search in a smaller search space (block is smaller in size normally)
   - we can find BP using binary search

### Search Key
Contains copy of primary key or candidate key of the table or something else.

### Data Reference
Pointer holding the address of **disk block** where the value of the corresponding key is stored.

## Types of Indexing

### Primary Index (clustering index)
Always sorted.

1. A file may have several indices, on different search keys. If the data file containing the records is sequentially ordered, a Primary index is an index whose search key also defines the sequential order of the file.
2. All files are ordered sequentially on some search key. It could be Primary Key or non-primary key.

#### Dense Index

1. The dense index contains an index record for every search key value in the data file.
2. The index record contains the search-key value and a pointer to the first data record with that search-key value. The rest of the records with the same search-key value would be stored sequentially after the first record.

#### Sparse Index

1. An index record appears for only some of the search-key values.
2. Sparse Index helps you to resolve the issues of dense Indexing in DBMS. In this method of indexing technique, a range of index columns stores the same data block address, and when data needs to be retrieved, the block address will be fetched.

#### Multi-level Index
1. Index with two or more levels.
2. If the single level index become enough large that the binary search it self would take much time, we can break down indexing into multiple levels.
3. Index of Index.

### Secondary Index (Non-Clustering Index)
1. Datafile is unsorted. Hence, Primary Indexing is not possible.
2. Can be done on key or non-key attribute.
3. Called secondary indexing because normally one indexing is already applied.
4. No. Of entries in the index file = no. of records in the data file.
5. It's an example of Dense index.
6. Search key corresponds to a linked list (all data value in actual table).
   - for example, 3 (search key) = Block1 => Block5 => Block10
7. **Benefit**: index file is sorted, so we can apply BINARY SEARCH to find corresponding linked list.

## Advantages of Indexing
- Faster access and retrieval of data.
- IO is less.

## Limitations of Indexing
- Additional space to store index table
- Indexing Decrease performance in INSERT, DELETE, and UPDATE query.

## Where Indexes Are Stored Physically
- Indexes are NOT stored in memory permanently.
- **Indexes are stored on disk, inside the database's data directory, exactly like tables.** Indexes are stored permanently on disk as a set of pages (blocks) that form a B-tree or LSM structure.

## What Is Selectivity in Indexing

**Selectivity = fraction of rows a query will return. UNIQUENESS**

Mathematically: `selectivity = matching_rows / total_rows`

- High selectivity → very few rows match (e.g., 0.1%, 1%, 5%).
- Low selectivity → many rows match (e.g., 50%, 70%, 90%).

**Indexes are only beneficial when selectivity is high.**

##### Example
If your table has 1,000,000 rows:
Query returns 1,000 rows → selectivity = 0.1% → index is perfect.
Query returns 700,000 rows → selectivity = 70% → index is useless; sequential scan is cheaper.

Use an index when the WHERE condition eliminates ≥95% rows.

In other words:

- Selectivity ≤ 5% → index good
- Selectivity ≤ 10–15% → usually index still good
- Selectivity ≥ 20–30% → depends
- Selectivity ≥ 40–50% → index usually slow or useless

##### Why?
Because using index needs:
- B-tree traversal
- Many random I/O fetches
- Fetching heap pages for each row
- If half the table matches, it's faster to just read the table sequentially.

### When NOT to Use Indexes
- Very low cardinality (few distinct values)
- Frequently updated columns
- Columns involved in heavy bulk inserts
   - E.g., logs table receiving millions of rows/minute.
- Indexing low-selectivity columns: Indexing these doesn't help — **DB will ignore** the index and do sequential scan.

### When You MUST Create Indexes
- WHERE conditions with high selectivity
- JOIN columns
   - always index foreign keys
- ORDER BY and GROUP BY
   - If the query relies heavily on sorting: `ORDER BY created_at`
   - index on (created_at) helps avoid external sorting.
- UNIQUE or primary key columns: These automatically become indexes.

## How to Choose Columns for Indexing
#### Rule 1: High Cardinality Columns (many distinct values)
#### Rule 2: Columns frequently used in WHERE filters
#### Rule 3: Columns used in JOINs
#### Rule 4: Columns used in GROUP BY / ORDER BY
Indexes help avoid full table sorts.
#### Rule 5: Composite (multi-column) indexes when needed
Create when your filter looks like:
`WHERE country = 'BD' AND signup_ts > '2024-01-01'`

**`Composite index:`**
(country, signup_ts)

##### Important: Order matters.
- (country, signup_ts) works for both columns
- (signup_ts, country) only works if query filters on signup_ts