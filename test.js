// function repairJSON(input) {
//   let stack = []
//   let current = {}
//   let key = ""
//   let value = ""
//   let inString = false
//   let escapeNext = false

//   function closeObject() {
//     if (stack.length > 0) {
//       let parent = stack.pop()
//       parent[Object.keys(parent)[Object.keys(parent).length - 1]] = current
//       current = parent
//     }
//   }

//   for (let i = 0; i < input.length; i++) {
//     let char = input[i]

//     if (escapeNext) {
//       value += char
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       escapeNext = true
//       value += char
//       continue
//     }

//     if (char === '"' && !inString) {
//       inString = true
//       continue
//     }

//     if (char === '"' && inString) {
//       inString = false
//       if (key === "") {
//         key = value
//       } else {
//         current[key] = value
//         key = ""
//       }
//       value = ""
//       continue
//     }

//     if (inString) {
//       value += char
//       continue
//     }

//     if (char === "{") {
//       if (key !== "") {
//         stack.push(current)
//         current[key] = {}
//         current = current[key]
//         key = ""
//       } else if (Object.keys(current).length === 0) {
//         // Root object
//       } else {
//         stack.push(current)
//         current = {}
//       }
//       continue
//     }

//     if (char === "}") {
//       if (key !== "") {
//         current[key] = "VALUE"
//         key = ""
//       }
//       closeObject()
//       continue
//     }

//     if (char === ":") {
//       if (key === "") {
//         key = "UNKNOWN_KEY"
//       }
//       continue
//     }

//     if (char === ",") {
//       if (key !== "") {
//         current[key] = "VALUE"
//         key = ""
//       }
//       continue
//     }
//   }

//   // Handle any remaining unclosed objects
//   while (stack.length > 0) {
//     closeObject()
//   }

//   // Handle any remaining key without value
//   if (key !== "") {
//     current[key] = "VALUE"
//   }

//   return JSON.stringify(current)
// }

function repairJSON(input) {
  let stack = []
  let current = {}
  let key = ""
  let value = ""
  let inString = false
  let escapeNext = false

  function closeObject() {
    if (stack.length > 0) {
      let parent = stack.pop()
      let lastKey = Object.keys(parent)[Object.keys(parent).length - 1]
      parent[lastKey] = current
      current = parent
    }
  }

  for (let i = 0; i < input.length; i++) {
    let char = input[i]

    if (escapeNext) {
      value += char
      escapeNext = false
      continue
    }

    if (char === "\\") {
      escapeNext = true
      value += char
      continue
    }

    if (char === '"' && !inString) {
      inString = true
      continue
    }

    if (char === '"' && inString) {
      inString = false
      if (key === "") {
        key = value
      } else {
        current[key] = value
        key = ""
      }
      value = ""
      continue
    }

    if (inString) {
      value += char
      continue
    }

    if (char === "{") {
      if (key !== "") {
        stack.push(current)
        current[key] = {}
        current = current[key]
        key = ""
      } else if (Object.keys(current).length === 0) {
        // Root object
      } else {
        stack.push(current)
        current = {}
      }
      continue
    }

    if (char === "}") {
      if (key !== "") {
        current[key] = "VALUE"
        key = ""
      }
      closeObject()
      continue
    }

    if (char === ":") {
      if (key === "") {
        key = "UNKNOWN_KEY"
      }
      continue
    }

    if (char === ",") {
      if (key !== "") {
        current[key] = "VALUE"
        key = ""
      }
      continue
    }
  }

  // Handle any remaining unclosed objects
  while (stack.length > 0) {
    if (key !== "") {
      current[key] = "VALUE"
      key = ""
    }
    closeObject()
  }

  // Handle any remaining key without value
  if (key !== "") {
    current[key] = "VALUE"
  }

  // If the current object is empty, add an UNKNOWN_KEY
  if (Object.keys(current).length === 0) {
    current["UNKNOWN_KEY"] = "VALUE"
  }

  return JSON.stringify(current)
}

// function repairJSON(input) {
//   let stack = []
//   let current = {}
//   let key = ""
//   let value = ""
//   let inString = false
//   let escapeNext = false
//   let lastOpenBrace = -1

//   function closeObject() {
//     if (stack.length > 0) {
//       let parent = stack.pop()
//       let lastKey = Object.keys(parent)[Object.keys(parent).length - 1]
//       if (lastKey === undefined) {
//         parent["UNKNOWN_KEY"] = current
//       } else {
//         parent[lastKey] = current
//       }
//       current = parent
//     }
//   }

//   for (let i = 0; i < input.length; i++) {
//     let char = input[i]

//     if (escapeNext) {
//       value += char
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       escapeNext = true
//       value += char
//       continue
//     }

//     if (char === '"' && !inString) {
//       inString = true
//       continue
//     }

//     if (char === '"' && inString) {
//       inString = false
//       if (key === "") {
//         key = value
//       } else {
//         current[key] = value
//         key = ""
//       }
//       value = ""
//       continue
//     }

//     if (inString) {
//       value += char
//       continue
//     }

//     if (char === "{") {
//       lastOpenBrace = i
//       if (key !== "") {
//         stack.push(current)
//         current[key] = {}
//         current = current[key]
//         key = ""
//       } else if (Object.keys(current).length === 0) {
//         // Root object
//       } else {
//         stack.push(current)
//         current = {}
//       }
//       continue
//     }

//     if (char === "}") {
//       if (key !== "") {
//         current[key] = "VALUE"
//         key = ""
//       }
//       closeObject()
//       continue
//     }

//     if (char === ":") {
//       continue
//     }

//     if (char === ",") {
//       if (key !== "") {
//         current[key] = "VALUE"
//         key = ""
//       }
//       continue
//     }

//     if (!inString) {
//       value += char
//     }
//   }

//   // Handle any remaining unclosed objects
//   while (stack.length > 0) {
//     if (key !== "") {
//       current[key] = "VALUE"
//       key = ""
//     }
//     closeObject()
//   }

//   // Handle any remaining key without value
//   if (key !== "") {
//     current[key] = "VALUE"
//   }

//   // If the last character was an opening brace, add UNKNOWN_KEY
//   if (input[input.length - 1] === "{") {
//     current["UNKNOWN_KEY"] = {}
//   }

//   // If the current object is empty and it's not the root object, set it to UNKNOWN_KEY
//   if (Object.keys(current).length === 0 && stack.length > 0) {
//     current["UNKNOWN_KEY"] = "VALUE"
//   }

//   return JSON.stringify(current)
// }

const test1 = '{"key1":"val1","key2":{"key3":"val3"},"key4":"val4"'
const test2 = '{"key1":"val1","key2":{"key3":"val3"},"key4"'
const test3 = '{"key1":"val1","key2":{"key3":"val3"'
const test4 = '{"key1":"val1","key2":{"key3"'

const test5 = '{"a":{"b":{"c{{":"test"},"d{":"a"}}}}}'
const test6 = '{"a":{"b":{"c":"}}"}'
const test7 = '{"key1":'
const test8 = '{"a":{"b":{"c{{":"test"},"d{":"a"}'

const test9 = '{"key1":"val1"'
const test10 = '{"key1":{'
const test11 = '{"key1":"val1","key2":{"key3":"val2"}'
const test12 = '{"key1":"val1","key2":{"key3":"val2'
const test13 = '{"key1":"val1","key2":{'
const test14 = '{"key1":"val1","key2":{"key3":"'
const test15 = '{"key1":"val1","key2"'
const test16 = '{"key1":"val1"'
const test17 = '{"key1":"val1","key2":{"key3"'
const test18 = '{"key1":"val1","key2":{"'

console.log("test1:  ", test1, "->", repairJSON(test1))
console.log("test2:  ", test2, "->", repairJSON(test2))
console.log("test3:  ", test3, "->", repairJSON(test3))
console.log("test4:  ", test4, "->", repairJSON(test4))
console.log("test5:  ", test5, "->", repairJSON(test5))
console.log("test6:  ", test6, "->", repairJSON(test6))
console.log("test7:  ", test7, "->", repairJSON(test7))
console.log("test8:  ", test8, "->", repairJSON(test8))
console.log("test9:  ", test9, "->", repairJSON(test9))
console.log("test10:  ", test10, "->", repairJSON(test10))
console.log("test11:  ", test11, "->", repairJSON(test11))
console.log("test12:  ", test12, "->", repairJSON(test12))
console.log("test13:  ", test13, "->", repairJSON(test13))
console.log("test14:  ", test14, "->", repairJSON(test14))
console.log("test15:  ", test15, "->", repairJSON(test15))
console.log("test16:  ", test16, "->", repairJSON(test16))
console.log("test17:  ", test17, "->", repairJSON(test17))
console.log("test18:  ", test18, "->", repairJSON(test18))
