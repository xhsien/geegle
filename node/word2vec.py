import gensim
import sys

fileName = './GoogleNews-vectors-negative300-SLIM.bin'

model = gensim.models.KeyedVectors.load_word2vec_format(fileName, binary=True)

res = model.most_similar(positive=[sys.argv[1]], topn=1)

res = list(map(lambda x: x[0], res));

print(res);
