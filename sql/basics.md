## Intro
- Developed by **IBM** researchers in the **1970s**; standardized by ANSI in 1986.
- SQL is also used by PostgreSQL, SQLite, Oracle, SQL Server, etc.
- Internals of SQL: query parsing, optimization, execution, indexing, and storage.
- **B+ Tree Index** → Default for most relational databases.

## Modern SQL databases include background tasks that improve efficiency
- Checkpointing: Periodically writes modified pages from memory to disk.
- Log Writer: Maintains transaction logs for recovery.
- Garbage Collection (PostgreSQL VACUUM): Cleans up old row versions in MVCC.
- Query Cache: Stores frequently used query results.

## MySQL engine
- storage engine: innoDB
- indexing: B+ tree
- concurrency: MVCC
- logging: binary log
- best use case: web apps

## Alter (DDL)
- table **structure** update
- col add/delete
- col datatype change
- col/table name change
- varchar(10) to varchar(20) typeof change

## Update (DML)
- change on **data**

## Delete (DML), Drop (DDL), Truncate (DDL)
- row delete: Delete  // Rollback (using log) is possible, slower
- full table gone: Drop
- all rows delete: Truncate  // faster

## Constraints
- unique
- not null
- primary key
- check (condition)
- foreign key
- default

## Single Row Functions
- number: round, trunc, mod
- char: lower, concat, substr, length
- date: next_day, round, trunc, add_months
- general: nvl, nullif, case, decode
- data type conversion: to_char, to_number, to_date

## Multi Row Functions
- aggregate functions: sum, max/min, count, avg