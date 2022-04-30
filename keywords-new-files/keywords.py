import yake

text = ""
print("The whole text to be usedn",text)

kw_extractor = yake.KeywordExtractor(top=10, stopwords=None)
keywords = kw_extractor.extract_keywords(text)
for kw, v in keywords:
    print("Keyphrase: ",kw, ": score", v)