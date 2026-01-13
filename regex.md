## Regex or Regexp

- Starts with '/' and ends with '/'
- `/text_to_match/flags` : `/the/gi`
- some flags: **g** (global), **i** (case insensitive)
- g flag for all matches, without g only the first match
- `/e+/g` : e, ee, eee
- `/ea?/g` : e, ea  (a is optional, one or none)
- `/a./g` : **`.` (dot) matches any char except new line**
- `/\./g` : only matches . (dot)
- `/\w{3, 5}/g` : **matches any word of length between 3 and 5**
- `/[0-9]at/g`
- grouping: `/(t|T|r){3, 4}/g` => word with t or T or r len (3, 4)
- group match: `/(a|b) then/gi` => first match the group (a or b) then "then" afterwards
- $ for end char
- `/d{1}[ -]?\d{1}[ -]?\d{2}/g` : matches "1-2 34"
- naming: `(?<name>)\d{3}/g`
- JS has 4 functions to work with Regex
   - match()
   - search()
   - replace()
   - test()

## Use cases

- validation
- pattern match or find

## Three classes

- `\w, \d, \s` => select all words, select all digit, select all spaces (including tabs)
- `\W, \D, \S` => select everything except words, select everything except digits, select everything except space

## Some Examples

- `/colou?r/gi` => **u** can be 0 or 1 time
- `/color*/gi` => **r** in any count
- `/color+/gi` => **r** in 1 or more count
- `/color{2}/gi` => **r** appears exactly 2 times
- `/a?\?/g` => first ? is keyword, second one is plain character

## Anchors

- `/^[0-9]/` => text starts with digit
- `/end$/` => text ends with "end"
- `/!$/gim/` => text ends with ! in each line, we're using `/m` flag here