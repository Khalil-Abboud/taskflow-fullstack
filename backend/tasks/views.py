
from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend


class TaskListView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ['status','priority','due_date']
    search_fields = ['title','description']
    ordering_fields = ['created_at','title','due_date']
    ordering = ['-created_at']
    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)