## SQL Is NOT Executed Directly
SQL is not a programming language the CPU understands.
So the database must:
- Parse SQL
- Convert it into a logical plan
- Optimize it
- Convert it into an executable physical plan
- Then execute it using **low-level operators implemented in C/C++**
- **SQL is executed by**: Database **`query executor`** (written in C) — not by a compiler.
- SQL is compiled only into a query plan, not into machine code.

So SQL is interpreted by the **DB’s query engine**, not by hardware.

## Memory and Cache Effects

The biggest cost isn’t CPU. It’s:
- Cache misses
- Branch mispredictions
- Random vs sequential memory access
- I/O page fetches

This is why **databases are heavily optimized for CPU cache friendliness**.

## So Who Runs SQL Queries?
- The Query Executor
   - a C/C++ module inside the DB engine
- The Buffer Manager
   - handles reading pages into RAM
- The Storage Engine
   - returns rows and pages

No OS or external compiler executes SQL.

**`Everything runs inside mysqld process.`**

## What is DB ENGINE
The Database Engine is the **core runtime** that actually stores data, manages memory, executes SQL queries, handles concurrency, recovers from crashes, etc. It is the heart of a DBMS. It lives inside the **DBMS server process**.

### A DBMS has roughly three major layers
- Client-facing (sql parser)
- Core runtime
- Physical storage (file system/disk)

## mysqld process

- Starts the SQL interface layer
- Starts the database engine
- Loads buffer pool into RAM
- Opens table/index files

#### Then it listens on
- TCP port (**`3306`** for MySQL, 5432 for PG)
- Local socket for local clients

## why SQL queries are so fast
- Indexes (B+ Trees) → O(log n) Operation
- Buffer Pool (Memory Cache) → Hot Data in RAM
- Query Optimizer → Better Execution Plans
- C/C++ Low-level Implementation
- Data Stored in Pages → Sequential IO
   - Data is stored in pages, not individual rows: MySQL: `16 KB` default, `Reading 1 page = reading 300–1000 rows`
- Column Stats → Avoid Scanning Useless Data
   - Optimizers use: histograms, correlation info, cardinality estimations
   - Example: `where age = 25`, If the histogram shows: `0.1% rows have age=25`, The Optimizer chooses: index
- Concurrency + Lock-Free Reads (MVCC)
- Pre-compiled Query Plans (Prepared Statements)
   - Many DBs cache execution plans.
- Vectorized Execution (Modern DB engines)
   - Instead of row-by-row processing: **queries run on batches of rows**
- Write-Ahead Logging (WAL) → Fast Writes + Safe Reads