import {open} from "lmdb";


async function main() {

    let newObject = open({
        path: "./relationGraph",
        compression: false,
        dupSort: false, // do not allow duplicate kes <= this kills performance
        cache: false, // helps with performance with larger objects <= lags behind
        maxDbs: 1,
        commitDelay: 50, // in ms This is the amount of time to wait for batching write operations before committing the writes (in a transaction).
        noMemInit: true, //  If you do not need to worry about unauthorized access to the database files themselves, this is recommended.
        keyEncoding: "ordered-binary",
        remapChunks: false,
        pageSize: 16384,
        useWritemap: false,
        safeRestore: true,
        encoding: "json",

    });


    // first error
   let output = await newObject.getRange({snapshot: false})
      .map(({key, value}) => value).asArray
    // output =>
    // SyntaxError: Unexpected token '', "�"... is not valid JSON
    //     at JSON.parse (<anonymous>)
    //     at Object.next (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/read.js:771:23)
    //     at Object.next (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/util/RangeIterable.js:38:35)
    //     at next (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/util/RangeIterable.js:324:24)
    //     at file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/util/RangeIterable.js:328:4
    //     at new Promise (<anonymous>)
    //     at get asArray [as asArray] (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/util/RangeIterable.js:312:17)
    //     at main (file:///Users/test/Bug2/Bug.js:26:36)
    //     at file:///Users/test/Bug2/Bug.js:67:1
    //     at ModuleJob.run (node:internal/modules/esm/module_job:222:25)



    // second error 
    newObject.put("S:c1edfab0-ca28-4124-822b-bdc5a78cf527", ["bb5ed3951fc9"])
    // output =>
    // duplicate value error
    // mdb_page_alloc error
    // mdb_page_touch error
    // do_write error 0 4294967295
    // Error: Operation not permitted
    //     at Function.<anonymous> (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:508:7) {
    //   code: 1
    // }
    // file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:604
    //                                 let error = new Error('Commit failed (see commitError for details)');
    //                                             ^
    // 
    // Error: Commit failed (see commitError for details)
    //     at rejectCommit (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:604:17)
    //     at resolveWrites (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:566:40)
    //     at Function.<anonymous> (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:492:4) {
    //   commitError: Promise {
    //     <rejected> Error: Operation not permitted
    //         at Function.<anonymous> (file:///Users/test/Bug2/node_modules/.pnpm/lmdb@3.0.12/node_modules/lmdb/write.js:508:7) {
    //       code: 1
    //     },
    //     reject: [Function (anonymous)]
    //   }
    
    //newObject.put("S:f19370b1-b24a-48ca-9ec4-9fdf3d295f1b", ["0c76d8011855"])
    //newObject.put("S:c1edfab0-ca28-4124-822b-bdc5a78cf527", ["ba1daf546a7d"])
    //newObject.put("S:1ffe1719-e8a7-4c98-98ef-6f0a46b04bcb", ["87dd0c7c3f77"])


}


main()


