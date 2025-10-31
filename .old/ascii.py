f = open("ascii.txt", "r")
text = f.readlines()
f.close()

rtext = [i[::-1] for i in text]
f = open("ascii_reversed.txt", "w")
f.writelines(rtext)
f.close()
