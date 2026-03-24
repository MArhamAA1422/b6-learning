## JOIN: primary/driving table selection

In join, primary table vs secondary tables. Which table should be primary and which one in join so that query is fast: `The table with fewer rows after filtering should drive the join (be "primary"), and the larger table should be "secondary" (joined-to).`

1. Apply WHERE filters first in your mind
2. Estimate result size of each table after filtering
3. Smallest result set → driving table (first in FROM)
4. Larger table → inner table (in JOIN)
5. Ensure index exists on JOIN column of the inner table

The index on the join column of the inner/secondary table is just as important as the table order — both together make the query fast.
