with open("ascii.txt", "rb") as f:
    ascii = f.read()
    f.close()

ascii = ascii.replace(b"\xe2\x96\x88", b" ")
ascii = ascii.replace(b"\xe2\x96\x91", b" ")
ascii = ascii.replace(b"\xe2\x96\x92", b"\xe2\x96\x88")
# ascii = ascii.replace(b"\xe2\x96\x93", b"\xe2\x96\x92")

with open("newascii.txt", "wb") as f:
    f.write(ascii)
    f.close()
