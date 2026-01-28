## Important Terms

- data pages
- root node
- leaf nodes
- B-tree
- clustered index structure
- index seek  // fast
- index scan  // BF, linear
   - so, we create non-clustered index (for example for "name" column)

## Data Page

- sql server physically stores data in data pages
- it is the fundamental unit of data storage in sql server
- tree like structure
   - PK by default gets indexed
   - so, B-tree or clustered index
   - clustered key / PK is sorted
   - in leaf nodes we have data pages, each contain multiple **data rows**
- 8 KB in size normally

## HDD SSD

- spinning mechanical disk, stores data in section (say 512 bytes) in a sector, there are multiple sectors
- each section has data pages
- so for a specific data for a row, we pull out whole the section (with multiple pages)
- write into a block and flashback, there is no limit to write in HDD for a block/section, but there is limit (**endurance**) in SSD to write in a block, but SSD is faster in read/write
- SSD loves new write in new block, but for writing in existing block is troublesome, as we have B-Tree as DS, and that always gets updated, that (update) is bad for SSD
- so, to get rid of B-Tree update problems, a new DS is invented? RocksDB

## SQL optimization/mind set

- first check without any index how db query performs, why bother extra space or write time for index?
- JOIN vs Preload (preload doesn't do subquery always, it can be separate query), JOIN is readable + faster on average
- analyze raw query (adonisjs has some builtin functions/tools to see generated sql)
- use db transaction for batch upload
- no extra query (consider round trip, request/response cycle)