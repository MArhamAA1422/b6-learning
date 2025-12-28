## Intro

- Git is a database
- A commit is a record
- **`content + metadata + parent = hash`**

## Commit

- A snapshot, A complete photograph of the project
- A commit contains
   - snapshot
   - metadata (who, when, why)
   - parent commit
- A DAG

## Branch

- Branches are just sticky notes, a pointer

## HEAD

- The "you're here" marker

### Detached HEAD

- When HEAD points directly to a commit (not a branch)
- Orphaned commits eventually get garbage collected (usually, after 30-90 days)
- So, HEAD should point to a branch, otherwise all recent works may gone

## Code location in Git

- working directory
- staging area
- repository

## checkout vs reset vs revert

- checkout: move head
- reset: move branch
   - creates orphaned commits
   - `--soft` (branch), `--mixed` (branch+stage, default), `--hard` (moves branch, clearing staging and working directory, data loss possible)
- revert: add commit
   - save history preserved
   - undoing shared history

## Rebase (rewrites history)

- never rebase commits you've pushed
   - others may have based work on those commits, changing them will cause merge conflicts for everyone
- only rebase local, unpushed commits

## git reflog

- safety net
- in emergency
- 90 days = reachable commits, 30 days = orphaned commits

## Don't use `git pull`

For example: person A has some works on main locally. person B has also some works on main locally. person A is the first to push origin. now, if person B tries to push he can't. now, git pull? but it'll create a merge like A's work + B's work both pointing same parent main. this will create complicated history. instead do this:

- first try, **`git pull --rebase`**, it it works, you're done
- if you get a merge conflict, you can undo everything with: `git rebase --abort`
- just pull normally using `git pull` now

## Commands

- create alias: `git config --global alias.pr "pull --rebase"`