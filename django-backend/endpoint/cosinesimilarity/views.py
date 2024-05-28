# myapp/views.py

from rest_framework import viewsets
from .models import CosineSimilarity
from .serializers import CosineSimilaritySerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

@api_view(['POST'])
def cosine_similarity_view(request):
    resume = request.data.get('resume')
    company_texts = request.data.get('company_texts')

    if not resume or not company_texts:
        return Response({'error': 'Both resume and company_texts are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if not isinstance(company_texts, list):
        return Response({'error': 'company_texts must be a list.'}, status=status.HTTP_400_BAD_REQUEST)

    # Calculate TF-IDF and cosine similarity
    tfidf_vectorizer = TfidfVectorizer()
    texts = [resume] + company_texts
    tfidf_matrix = tfidf_vectorizer.fit_transform(texts)
    
    resume_vector = tfidf_matrix[0:1]
    company_vectors = tfidf_matrix[1:]

    similarities = cosine_similarity(resume_vector, company_vectors)[0]

    results = []
    for company_text, similarity in zip(company_texts, similarities):
        results.append({
            'company_text': company_text,
            'cosine_similarity': similarity
        })

    return Response({
        'resume': resume,
        'results': results
    }, status=status.HTTP_200_OK)