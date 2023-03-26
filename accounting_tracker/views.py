from django.shortcuts import render
from rest_framework import generics, status, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Contact, Company, PaymentType, Order
from .serializers import ContactSerializer, CompanySerializer, PaymentTypeSerializer, OrderSerializer, OrderPostSerializer, CompanyOptionSerializer, OrderSummarySerializer
import datetime
from django.db.models import Q
from rest_framework.decorators import api_view

## order
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter ,filters.OrderingFilter]
    filterset_fields = ['company__name', 'company__id', 'invoice_number', 'bank_account']
    search_fields = ['content']
    ordering_fields = ['company__name', 'order_date', 'invoice_number', 'bank_account', 'payment_received_date', 'payment_amount', 'taxed_total', 'untaxed_total', 'payment_type__type', 'timestamp']


    def get_queryset(self):
        start_date_str, end_date_str = self.get_dates()
        created_from, created_to = self.get_created_from()
        print(created_from, created_to)
        un_paid, un_invoice = self.get_filters()
        orders = Order.objects.all()
        if start_date_str and end_date_str:
            orders = orders.filter(order_date__range=(start_date_str, end_date_str))
        if created_from and created_to:
            orders = orders.filter(timestamp__range=(created_from, created_to))
        if un_paid:
            orders = orders.filter(payment_amount=0)
        if un_invoice:
            orders = orders.filter(Q(invoice_number__isnull=True) | Q(invoice_number=''))
        return orders

    def get_created_from(self):
        created_from = self.request.query_params.get('created_from')
        created_to = self.request.query_params.get('created_to')

        if created_from:
            start_date = datetime.datetime.strptime(created_from, '%Y-%m-%d').date()
            end_date = datetime.datetime.strptime(created_to, '%Y-%m-%d').date()
            return start_date, end_date
        else:
            return None, None

    def get_dates(self):
        start_date_str = self.request.query_params.get('start_date')
        end_date_str = self.request.query_params.get('end_date')
        if start_date_str and end_date_str:
            start_date = datetime.datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.datetime.strptime(end_date_str, '%Y-%m-%d').date()
            return start_date, end_date
        else:
            return None, None

    def get_filters(self):
        un_paid = self.request.query_params.get('un_paid')
        un_invoice = self.request.query_params.get('un_invoice')

        return bool(un_paid == 'true'), bool(un_invoice == 'true')

class OrderUpdateView(APIView):
    def post(self, request, id):
        try:
            order = Order.objects.get(id=id)
        except Order.DoesNotExist:
            return Response({"error": f"Order with id {id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderPostSerializer(order, data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderCreateView(APIView):
    def post(self, request):
        serializer = OrderPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDeleteView(APIView):
    def post(self, request, id):
        print(request.data)
        try:
            order = Order.objects.get(id=id)
        except Order.DoesNotExist:
            return Response({"error": f"Order with id {id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrderView(APIView):
    def get(self, request, id):
        order = Order.objects.filter(id=id)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data[0])


## company
class CompanyView(APIView):
    def get(self, request, id):
        company = Company.objects.filter(id=id)
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data[0])

class CompanyUpdateView(APIView):
    def post(self, request, id):
        try:
            print(request)
            company = Company.objects.get(id=id)
        except Company.DoesNotExist:
            return Response({"error": f"Company with id {id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyCreateView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyOptionSerializer


## payment type
class PaymentTypeList(generics.ListCreateAPIView):
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer


## contacts
class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactView(APIView):
    def get(self, request, id):
        contact = Contact.objects.filter(id=id)
        serializer = ContactSerializer(contact, many=True)
        return Response(serializer.data[0])

class ContactCreateView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            company_id = request.data.get('company')
            if company_id:
                try:
                    company = Company.objects.get(id=company_id)
                    company.contacts.add(contact)
                    company.save()
                except Company.DoesNotExist:
                    return Response({"error": f"Company with id {company_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactUpdateView(APIView):
    def post(self, request, id):
        try:
            contact = Contact.objects.get(id=id)
        except Contact.DoesNotExist:
            return Response({"error": f"Contact with id {id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        serializer = ContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactDeleteView(APIView):
    def get(self, request, id):
        try:
            contact = Contact.objects.get(id=id)
        except Contact.DoesNotExist:
            return Response({"error": f"Contact with id {id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def get_orders_summary(request):
    orders = Order.objects.filter(order_date__isnull=False)
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data)
