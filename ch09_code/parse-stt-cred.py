import json
import sys

with open('stt-cred.json', 'r') as f:
    stt_cred = json.load(f)
with open('stt-cred.json', 'w') as f:
    if sys.version_info[0] < 3:
        stt_cred['username'] = raw_input('>>>Please input your stt credential username:  ')
        stt_cred['password'] = raw_input('>>>Please input your stt credential password:  ')
    else:
        stt_cred['username'] = input('>>>Please input your stt credential username:  ')
        stt_cred['password'] = input('>>>Please input your stt credential password:  ')
    text = json.dumps(stt_cred, indent = 4)
    print("\nYour stt-cred.json is")
    print(text)
    f.write(text)
