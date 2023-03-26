from django.shortcuts import render
from .settings import BASE_DIR
from django.http import JsonResponse
from datetime import datetime
import os

def index(request, *args, **kwargs):
    return render(request, os.path.join(BASE_DIR, 'accounting_frontend/build/index.html'))
