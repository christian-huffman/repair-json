const jsonData = {
    key1: "val1",
    key2: { key3: "val2" },
    key4: "val4"
}

function repairJson(input) {
    if (input[input.length - 1] === "}") {
        let openBraceCnt = (input.match(/{/g) || []).length
        let closeBraceCnt = (input.match(/}/g) || []).length
        while (openBraceCnt > closeBraceCnt) {
            input += "}"
            closeBraceCnt++
        }
        return input
    } else if (input[input.length - 1] === '"') {
        if (input.slice(-2) === ':"') {
            return repairJson(input + 'unknown"')
        } else if (input.slice(-2) === '{"') {
            return repairJson(input + 'default":"unknown"}')
        } else if (input.slice(-2) === ',"') {
            return repairJson(input.slice(0, -2))
        } else {
            for (let i = input.length - 2; i >= 0; i--) {
                if (input[i] === '"' && input[i - 1] === ":") {
                    return repairJson(input + "}")
                } else if (input[i] === '"' && input[i - 1] === ",") {
                    return repairJson(input + ':"unknown"}')
                } else if (input[i] === '"' && input[i - 1] === "{") {
                    return repairJson(input + ':"unknown"}')
                }
            }
        }
    } else if (input.slice(-1) === "{") {
        return repairJson(input + '"default":"unknown"}')
        // if (input.slice(-2) === ":{") {
        //     return repairJson(input.slice + '"default":"unknown"}')
        // } else {
        //     return repairJson(input.slice(0, -1) + '"unknown"')
        // }
    } else if (input.slice(-2) === '":') {
        return repairJson(input + '"unknown"}')
    } else if (input.slice(-2) === '",') {
        return repairJson(input.slice(0, -1) + "}")
    } else {
        return repairJson(input + '"')
    }
    // console.log(input)
    // console.log(JSON.parse(input))
}

// '{"key1":"val1","key2":{"key3":"val3"},"key4":"val4"
// '{"key1":"val1","key2":{"key3":"val3"},"key4"
// '{"key1":"val1","key2":{"key3":"val3"
// '{"key1":"val1","key2":{"key3"
// '{"key1":"val1","key2":{"key3":"val2"}'
// '{"key1":"val1","key2":{"key3":"val2'
// '{"key1":"val1","key2":{'
// '{"key1":"val1","key2":{"key3":"'
// '{"key1":"val1","key2"'
// '{"key1":"val1"'
// '{"key1":"val1","key2":{"key3"'
// '{"key1":"val1","key2":{"'

// '{"a":{"b":{"c{{":"test"},"d{":"a"}}}}}' -> '{"a":{"b":{"c{{":"test"},"d{":"a"}}'
// '{"a":{"b":{"c":"}}"}' -> '{"a":{"b":{"c":"}}"}}}'
// '{"a":{"b":{"c":"}}"}' -> '{"a":{"b":{"c":"}}"}}}'
// '{"key1":' -> '{"key1":"VALUE"}'
// '{"a":{"b":{"c{{":"test"},"d{":"a"}' -> '{"a":{"b":{"c{{":"test"},"d{":"a"}}'
const sample = '{"key1":"val1","key2":{"key3":"val3"},"key4"'
console.log(repairJson(sample))
// console.log(JSON.parse(repairJson(sample)))
