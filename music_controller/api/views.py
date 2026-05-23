from django.shortcuts import render
from django.utils import timezone
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        #Check if session was created
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #update values
            guess_can_pause = serializer.data.get('guess_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            
            #if room already exists change this values
            if queryset.exists():
                room = queryset[0]
                room.guess_can_pause = guess_can_pause
                room.votes_to_skip = votes_to_skip
                room.created_at = timezone.now()
                room.save(update_fields=['guess_can_pause', 'votes_to_skip', 'created_at'])
            
            #create new room
            else:
                room = Room(host=host, guess_can_pause=guess_can_pause, votes_to_skip=votes_to_skip)
                room.save()

        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)