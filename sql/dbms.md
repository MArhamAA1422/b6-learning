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
- The overall design of the DB is called DB schema
- Schema: is structural description of data, doesn't change frequently. Data may change frequently.
- **Logical schema is most important** in terms of its effect on application programs.
- **Physical data independence**: physical schema change should not affect logical schema programs.

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

## DB Schema (logical schema)
- attributes of table
- consistency constraints (say, primary key)

## Data Models
- Provides a way to **describe the design of a DB at logical level**.
- underlying the structure of the DB is the data model
- example: ER model

## DB language
- DDL: defines schema
- DML: insert, delete, update, retrieve

## How app access DB
- js, java, c/c++... interaction with DBMS
- We need interface (communication between two different entity)
   - kinda API
   - JDBC (java db connectivity)
   - ODBC (c/c++)

## DB administrator (DBA)
- a person who has central control of both **the data and the programs** that access those data
- functions of DBA
   - schema def
   - storage structure and access methods
   - authorization control

## DBMS application architecture
- client machine, server machine

### T1 arch
- server, db, client all in one machine

### T2 arch (two-tier)
- client --- (sql query (JDBC), through network) --- server (DB, DBMS)
- direct access to db

### T3 arch (three-tier)
- user - application client --- network --- application server - db system
- no direct access to db
- scalable (due to distributed application servers)

## ER (entity-relationship) model
- It's a **high level data model** based on a perception of a real world that consists of a collection of basic objects, called entities and of relationships among these objects.
- Graphical representation of EF model is **ER diagram**, which acts as a **blueprint of DB**.

### Entity
- An entity is a thing or object in real world tha is distinguishable