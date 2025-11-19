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
- Entity - Attribute

### Entity
- An entity is a thing or object in real world that is distinguishable from all other objects.
- uniquely identifiable, primary key
- for example: each student in a class
- entity set: student table

### Attributes
- properties, that define entity

#### Types of attributes
- simple: can't be divide further
- composite: for example, full_name
- single-valued: one value, for example: one std one std_id
- multi-valued: nominee_name (can have multiple nominees)
- derived
- null value

**In diagram**: simple (single ellipse), multi-valued (double ellipse), derived (dotted ellipse)

### Relationship
association among 2 or more entities
- strong relationship (single square in ER diagram)
   - strong entity = can be identified using primary key
- weak relationship (double square)
   - weak entity dependent on strong one, not identifiable using primary key

### Degree of Relation
- number of participants (or, entities)
- unary, binary, ternary
- ternary example: emp --- [works-on] --- job --- [works-on] --- branch

### Relationship constraints
- mapping cardinality (one-to-one...)
- participation constraints
   - partial (single line)
   - total (double line)

#### Weak entity has total participation constraint

## Relation Model (Tabular form)
- degree of table: no of attributes
- cardinality: total no of tuples (rows)

### ER to Table
- entity => table
- attributes => columns

### Properties of table
- unique relation name
- values have to be atomic, can't be broken down further
- column name unique
- each tuple must be unique in a table
- seq of row/col has no significance
- tables must follow integrity constraints - it helps to maintain data consistency across the tables

### Relation keys
- super key (all possible set, can be null)
- candidate key (can't be null, minimal set of SK)
- primary key = selected out of CK set, has the least no of attributes
- alternate key = all CK except PK
- foreign key = PK of another table
   - creates relation
   - **referenced** relation / parent table
   - referencing relation / child table
- composite key = PK formed using at least 2 attributes
- compound key = PK which is formed using 2FK
- surrogate key
   - synthetic PK
   - generated auto by DB, usually INT, may be used as PK

### Integrity constraints
- CRUD operations must be done with some integrity policy so that DB is always consistent, no accidental corrupt to DB
#### Domain constraint
INT, age >= 18

#### Entity constraint
PK != NULL, must have PK

#### Referential constraint
- insert constraint: no tuple insertion in child if FK doesn't exist in parent
- delete constraint: no delete from parent if that exists in child
- **`ON DELETE CASCADE`**: deleting from parent will also delete from child
- **`ON DELETE NULL`**
   - **FK can be NULL**
   - delete value from parent table => put corresponding FK value = NULL

### Key constraints
- Not Null
- unique
- default constraint
- check constraint: limit value range
   - `check (age >= 18)`
- PK constraint
   - uniquely identify each tuple
   - PK != null
   - only 1 PK
- FK constraint
   - keeps relation between 2 table

## What is Clustering / Replication in DBMS
Mostly used in NoSQL (mongoDB)