## Intro
- Developed by **IBM** researchers in the **1970s**; standardized by ANSI in 1986.
- SQL is also used by PostgreSQL, SQLite, Oracle, SQL Server, etc.
- Internals of SQL: query parsing, optimization, execution, indexing, and storage.
- **B+ Tree Index** → Default for most relational databases.
- query order: **from - join - where - group by - having - select - distinct - order by - limit**
- correlated nested query: subquery is dependent on outer query, M*N
- Optimization: with > join > subquery
- 10 common sql commands: **select, from, where, join, group by, having, order by, sub_queries, CTEs, window functions**

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
- char: lower, concat, substr, instr, initcap, length
- date: next_day, round, trunc, add_months
- general: nvl, nullif, case, decode
- data type conversion: to_char, to_number, to_date

## Multi Row Functions
- aggregate functions: sum, max/min, count, avg

## Group By
- must use same col after both group by and select: `SELECT dept FROM emp GROUP BY dept;`
- if we need to select other col than we can do that by aggregate functions

## Having vs Where
- having filters post-group rows
- where filter pre-group rows
- for aggregate function filter use having

## Rank(), Dense_rank()
- rank() => (5:val, 1:rank), (4, 2), (4, 2), (4, 2), (3, 5)
- dense_rank() => (5, 1), (4, 2), (4, 2), (4, 2), (3, 3)

## Delete duplicate row
- using rowid, group by
- for each group take only min rowid, others will be deleted

## SARGABLE queries
- Search ARGument ABLE
- queries that can use indexing for faster execution

### To write sargable queries
- avoid using functions or calculations on indexed columns in the WHERE clause
- use direct comparisons when possible, instead of wrapping the column in a function
- if we need to use a function on a column, consider creating a computed column or a function-based index, if the database system supports it

## Types of Backups in MySQL

MySQL supports 3 major backup methods:
1. **Logical Backup**: Human-readable SQL commands, Taken using **`mysqldump`**, Not binary, not page-by-page, Easy to inspect and restore, Slow for huge databases, Larger file size, DB < 10 GB
2. **Physical Backup**: Binary-only, Copies raw data files (.ibd, .frm, redo logs, undo logs), Fastest
3. Hot Backup

