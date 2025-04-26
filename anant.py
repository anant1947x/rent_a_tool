# a,b=0,1
# n=10
# for _ in range (n):
#     print(a,end=' ')
#     a,b=b,a+b

l=1
r=10
count=0
for i in range (l,r+1):
    if i>1:
        for j in range (2,int(i**0.5)+1):
            if (i%j==0):
                break
        else:
            print(i,end=" ")
# print(count)
