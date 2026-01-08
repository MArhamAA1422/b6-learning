## Important Terms

- data pages
- root node
- leaf nodes
- B-tree
- clustered index structure

## Data Page

- sql server physically stores data in data pages
- it is the fundamental unit of data storage in sql server
- tree like structure
   - PK by default gets indexed
   - so, B-tree or clustered index
   - clustered key / PK is sorted
   - in leaf nodes we have data pages, each contain multiple **data rows**
- 8 KB in size normally