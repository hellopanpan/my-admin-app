//  声明合并
interface String {
  matchAll: (regex: RegExp) => Array<RegExpExecArray | null>
}

// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
if (!String.prototype.matchAll) {
  String.prototype.matchAll = function(regex) {
    const matches: Array<RegExpExecArray | null> = []
    let match: RegExpExecArray | null
    while ((match = regex.exec(this))) {
      matches.push(match)
    }
    console.log({
      matches
    })

    return matches
  }
}
