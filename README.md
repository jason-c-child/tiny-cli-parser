# tiny-cli-parser

use

```javascript
#!/usr/bin/env node

const parser = require('tiny-cli-parser').tinyCliParser
const validate = require('tiny-cli-parser').validateArgs

console.log(parser(process.argv))

```

output

```bash
Jasons-MBP:example jasonchild$ ./example.js
{ options: [], args: [], count: 2 }
Jasons-MBP:example jasonchild$ clear
Jasons-MBP:example jasonchild$ ./example.js -f flag1 -o flag2 arg1 arg2 -l flag3
{ options:
   [ { flag: '-f', value: 'flag1' },
     { flag: '-o', value: 'flag2' },
     { flag: '-l', value: 'flag3' } ],
  args: [ 'arg1', 'arg2' ],
  count: 10 }
Jasons-MBP:example jasonchild$
```

basic validation 

```javascript
#!/usr/bin/env node

const parser = require('tiny-cli-parser').tinyCliParser
const validate = require('tiny-cli-parser').validateArgs

const cli = parser()

// cli    - parsed argv as above
// ['-p'] - option flag that cannot be null
// 1      - minimum number of args
if (!validate(cli, ['-p'], 1)) {
    console.log('validation error!', cli)
} else {
    console.log('passed validation!')
}

```

output

```bash
Jasons-MBP:example jasonchild$ ./example.js -p flag1 arg1 arg2
passed validation!
Jasons-MBP:example jasonchild$ ./example.js -p flag1
validation error! { options: [ { flag: '-p', value: 'flag1' } ],
  args: [],
  count: 4 }
Jasons-MBP:example jasonchild$ ./example.js arg1 -p
validation error! { options: [ { flag: '-p', value: null } ],
  args: [ 'arg1' ],
  count: 4 }
Jasons-MBP:example jasonchild$
```