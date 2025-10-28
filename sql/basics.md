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