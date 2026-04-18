from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Task
        fields = ['id','owner','title','description','status','priority','created_at','due_date']
        read_only_fields = ['owner', 'created_at']
    def validate_title(self,value):
        if len(value)<3:
            raise serializers.ValidationError("Title must be at least 3 characters long")
        return value