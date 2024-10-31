// function completePartialJSON(input) {
//   let stack = []
//   let result = ""
//   let inString = false
//   let escapeNext = false
//   let lastKey = ""
//   let expectingValue = false

//   for (let i = 0; i < input.length; i++) {
//     const char = input[i]

//     if (escapeNext) {
//       result += char
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       result += char
//       escapeNext = true
//       continue
//     }

//     if (char === '"' && !escapeNext) {
//       inString = !inString
//       if (!inString && expectingValue) {
//         expectingValue = false
//       }
//     }

//     if (!inString) {
//       if (char === "{") {
//         stack.push("}")
//         lastKey = ""
//       } else if (char === "}") {
//         if (stack.length > 0) {
//           stack.pop()
//         } else {
//           break
//         }
//       } else if (char === ":") {
//         expectingValue = true
//       } else if (char === ",") {
//         expectingValue = false
//       }
//     } else if (expectingValue) {
//       lastKey += char
//     }

//     result += char
//   }

//   // Handle incomplete key-value pairs
//   if (expectingValue) {
//     result += '"VALUE"'
//   }

//   // Add closing braces if there are unclosed opening braces
//   while (stack.length > 0) {
//     result += stack.pop()
//   }

//   // Handle case where a key is started but not completed
//   if (result.endsWith(":{")) {
//     result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
//   }

//   // Handle case where the input is just an opening brace
//   if (result === "{") {
//     result = '{"UNKNOWN_KEY":"VALUE"}'
//   }

//   return result
// }

function completePartialJSON(input) {
  let stack = []
  let result = ""
  let inString = false
  let escapeNext = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (escapeNext) {
      result += char
      escapeNext = false
      continue
    }

    if (char === "\\") {
      result += char
      escapeNext = true
      continue
    }

    if (char === '"' && !escapeNext) {
      inString = !inString
    }

    if (!inString) {
      if (char === "{") {
        stack.push("}")
      } else if (char === "}") {
        if (stack.length > 0) {
          stack.pop()
        } else {
          // If we encounter a closing brace without a matching opening brace, stop processing
          break
        }
      }
    }

    result += char
  }

  // Handle case where input ends with a colon
  if (result.endsWith(":")) {
    result += '"VALUE"'
  }

  // Add closing braces if there are unclosed opening braces
  while (stack.length > 0) {
    result += stack.pop()
  }

  // Handle case where a key is started but not completed
  if (result.endsWith(":{")) {
    result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
  }

  return result
}

// function completePartialJSON(input) {
//   let stack = []
//   let result = ""
//   let inString = false
//   let escapeNext = false

//   for (let i = 0; i < input.length; i++) {
//     const char = input[i]

//     if (escapeNext) {
//       result += char
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       result += char
//       escapeNext = true
//       continue
//     }

//     if (char === '"' && !escapeNext) {
//       inString = !inString
//     }

//     if (!inString) {
//       if (char === "{") {
//         stack.push("}")
//       } else if (char === "}") {
//         if (stack.length > 0) {
//           stack.pop()
//         } else {
//           // If we encounter a closing brace without a matching opening brace, stop processing
//           break
//         }
//       }
//     }

//     result += char
//   }

//   // Add closing braces if there are unclosed opening braces
//   while (stack.length > 0) {
//     result += stack.pop()
//   }

//   // Handle case where a key is started but not completed
//   if (result.endsWith(":{")) {
//     result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
//   } else if (result.endsWith(":")) {
//     result += '"VALUE"'
//   }

//   return result
// }

// function completePartialJSON(input) {
//   let stack = []
//   let result = ""
//   let inString = false
//   let escapeNext = false

//   for (let i = 0; i < input.length; i++) {
//     const char = input[i]
//     result += char

//     if (escapeNext) {
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       escapeNext = true
//       continue
//     }

//     if (char === '"' && !escapeNext) {
//       inString = !inString
//     }

//     if (!inString) {
//       if (char === "{") {
//         stack.push("}")
//       } else if (char === "}") {
//         if (stack.length > 0) {
//           stack.pop()
//         }
//       } else if (char === ":") {
//         if (i === input.length - 1) {
//           result += '"VALUE"'
//         }
//       }
//     }
//   }

//   // Remove any extra closing braces at the end of the input
//   while (result.endsWith("}") && stack.length === 0) {
//     result = result.slice(0, -1)
//   }

//   // Add closing braces if there are unclosed opening braces
//   while (stack.length > 0) {
//     result += stack.pop()
//   }

//   // Handle case where a key is started but not completed
//   if (result.endsWith(":{")) {
//     result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
//   }

//   return result
// }

// function completePartialJSON(input) {
//   let stack = []
//   let result = ""
//   let inString = false
//   let escapeNext = false
//   let depth = 0

//   for (let i = 0; i < input.length; i++) {
//     const char = input[i]
//     result += char

//     if (escapeNext) {
//       escapeNext = false
//       continue
//     }

//     if (char === "\\") {
//       escapeNext = true
//       continue
//     }

//     if (char === '"' && !escapeNext) {
//       inString = !inString
//     }

//     if (!inString) {
//       if (char === "{") {
//         stack.push("}")
//         depth++
//       } else if (char === "}") {
//         if (stack.length > 0) {
//           stack.pop()
//           depth--
//         }
//       } else if (char === ":") {
//         if (i === input.length - 1) {
//           result += '"VALUE"'
//         }
//       }
//     }
//   }

//   // Only add closing braces if there are unclosed opening braces
//   while (depth > 0 && stack.length > 0) {
//     result += stack.pop()
//     depth--
//   }

//   // Handle case where a key is started but not completed
//   if (result.endsWith(":{")) {
//     result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
//   }

//   return result
// }

// function completePartialJSON(input) {
//   let stack = []
//   let result = ""
//   let inString = false
//   let currentKey = ""
//   let depth = 0

//   for (let i = 0; i < input.length; i++) {
//     const char = input[i]
//     result += char

//     if (char === '"' && (i === 0 || input[i - 1] !== "\\")) {
//       inString = !inString
//       if (!inString && depth > 0) {
//         currentKey = ""
//       }
//     }

//     if (!inString) {
//       if (char === "{") {
//         stack.push("}")
//         depth++
//       } else if (char === "}") {
//         stack.pop()
//         depth--
//       } else if (char === ":") {
//         if (i === input.length - 1) {
//           result += '"VALUE"'
//         }
//       }
//     }

//     if (inString && depth > 0) {
//       currentKey += char
//     }
//   }

//   while (stack.length > 0) {
//     result += stack.pop()
//   }

//   // Handle case where a key is started but not completed
//   if (result.endsWith('":{')) {
//     result = result.slice(0, -2) + ':"UNKNOWN_KEY"}'
//   }

//   return result
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

console.log("test1:  ", test1, "->", completePartialJSON(test1))
console.log("test2:  ", test2, "->", completePartialJSON(test2))
console.log("test3:  ", test3, "->", completePartialJSON(test3))
console.log("test4:  ", test4, "->", completePartialJSON(test4))
console.log("test5:  ", test5, "->", completePartialJSON(test5))
console.log("test6:  ", test6, "->", completePartialJSON(test6))
console.log("test7:  ", test7, "->", completePartialJSON(test7))
console.log("test8:  ", test8, "->", completePartialJSON(test8))
console.log("test9:  ", test9, "->", completePartialJSON(test9))
console.log("test10:  ", test10, "->", completePartialJSON(test10))
