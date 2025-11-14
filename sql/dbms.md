## Intro
- Data: **collection of raw bytes**
   - unorganized
- Information: meaning of data (processing the data)
   - processed data
   - organized
- Database: **an electronic place/system** where data is stored in a way that it can be easily **accessed, managed and updated**
- DBMS: a software, **db + set of programs** (access, add, update, delete)
   - To make real use of Data, we need DBMS
   - primary goal of dbms: provide a way **to store and retrieve** db info that is both convenient and efficient

## DBMS > File Systems
- data redundancy and inconsistency
- difficulty in accessing data
- data isolation (same data could be in diff format in file system), integrity problems, atomicity problems
- concurrent access anomalies
- security problems

The above are possible in file systems but we need to write a lot of code for that, but in DBMS those are built-in.

## Three schema (design) architecture (view of data)
- Physical level / Internal level
   - lowest level of abstraction
   - it has physical schema
   - Goal: we must define algo that allow efficient access to data
- Logical level / Conceptual level
   - conceptual schema
   - relationship between data, tabular form
   - Goal: ease to use
- View level / External level
   - view schema, highest level of abstraction
   - end user
   - data mapping to end user: customer_data, admin_data, specific_dept_data
   - provide necessary (not all) to specific users
