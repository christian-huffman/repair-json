# repair-json

You are provided with a partial response from a streaming API that returns JSON.
This means the JSON object is incomplete. You need to complete the JSON object so that it can be parsed by a JSON parser to display partial information to the user.
Your input is an incomplete JSON string,
E.g.:
{"key1":"val1","key2":{"key3":"val3"},"key4":"val4

You need to return the completed JSON based on the information provided. In this case:
{"key1":"val1","key2":{"key3":"val3"},"key4":"val4"}

To keep it simple:

- Assume there are no arrays in the JSON object
- Assume all the values are strings

Some additional rules:

- If you are presented with a key that is being started (e.g. '{"key1":{"'), make the key "UNKNOWN_KEY"
- If you need to include a value that you don't know anything about, set it to "VALUE"

I'm going to share some of input and output sample cases below.

case1:
input:'{"a":{"b":{"c{{":"test"},"d{":"a"}}}}}'
expected output: '{"a":{"b":{"c{{":"test"},"d{":"a"}}'

case2:
input:'{"a":{"b":{"c":"}}"}'
expected output: '{"a":{"b":{"c":"}}"}}}'

case3:
input:'{"key1":'
expected output: '{"key1":"VALUE"}'

case4:
input:'{"a":{"b":{"c{{":"test"},"d{":"a"}'
expected output: '{"a":{"b":{"c{{":"test"},"d{":"a"}}'

case5:
input:'{"key1":"val1","key2":{"key3":"val3"},"key4"'
expected output: '{"key1":"val1","key2":{"key3":"val3"},"key4":"VALUE"}'

Could you share the parsing function in JavaScript?
I think you can solve this using recursive function.
