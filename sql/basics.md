## Intro
- Developed by **IBM** researchers in the **1970s**; standardized by ANSI in 1986.
- SQL is also used by PostgreSQL, SQLite, Oracle, SQL Server, etc.
- Internals of SQL: query parsing, optimization, execution, indexing, and storage.
- **B+ Tree Index** → Default for most relational databases.
- query order: **from - join - where - group by - having - select - distinct - order by - limit**
- correlated nested query: subquery is dependent on outer query, M*N
- Optimization: with > join > subquery
- 10 common sql commands: **select, from, where, join, group by, having, order by, sub_queries, CTEs, window functions**
- **select command always creates a table, even dummy one**
- **Dual tables** are dummy tables created by mysql, help users to do certain obvious actions without referring to user defined tables
- We can use IN instead of multiple OR
- For aggregation we need to use GROUP BY
- Full Join != Cross Join
- **set operations (union, intersect, minus) apply on `ROWS`**
- **joins apply on `COLUMNS`**
- MINUS = LEFT JOIN + TABLE.id IS NULL
- SUB QUERY is the alternative to JOIN
- Normalization: SRP, one table one responsibility

## Flow/Parts of DB

- ORM/ODM <=> Client => Database <=> Disc
- Inside Database
   - query parser/optimizer <=> execution engine (kinda CEO) <=> cache
   - storage engine: B/B+ tree, hashindex
   - data file, index file
   - transaction (follow atomicity) manager, lock manager, recovery manager

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

## Update vs Replace

If row is not present, **Replace will add a new row** while Update will do nothing.

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

## Co-related Subqueries

- Inner queries that refer outer query, Outer query refers inner one
```sql
-- 3rd oldest employee
select *
from employee e1
where 3 = (
   select count(e2.age)
   from employee e2
   where e2.age >= e1.age
);
```

## SQL View
- simpler table
- alter view, drop view
```sql
create view customer_view as select fname, age from employee;
select * from customer_view
```

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

## Data types in SQL

- blob (audio, video)
- datetime = yyyy-mm-dd hh:mm:ss
- timestamp = yyyymmddhhmmss
- signed/unsigned int
- **advanced DT**: JSON

## Functions

- ADDDATE(date, day);

## Referential Constraints
- delete: ON DELETE CASCADE, ON DELETE SET NULL
   - FK can be NULL

## Functional Dependency
- Trivial: A (determinant) => B (dependent), and B is a subset of A
- Non Trivial: A => B, and B is not a subset of A

### Rules of FD (Armstrong's axioms)
- Reflexive: if B is a subset of A, then A => B
- Augmentation: if A => B, then for any other attribute X in the table, AX => BX
- Transitivity: if A => B, B => C, then A => C

## Redundant Data Introduces Anomalies
- insertion anomaly
- deletion anomaly
- update anomaly