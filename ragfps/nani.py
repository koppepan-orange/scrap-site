import string
import random

res = ''.join(random.choices(string.ascii_letters, k=6))
print(res)