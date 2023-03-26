from django.urls import path
from .views import OrderView, OrderList, OrderCreateView, OrderUpdateView, OrderDeleteView, CompanyList, PaymentTypeList, CompanyView, CompanyCreateView, CompanyUpdateView, ContactList, ContactCreateView, ContactList, ContactUpdateView, ContactView, ContactDeleteView, get_orders_summary


app_name = 'post'
urlpatterns = [
    path('order/<uuid:id>', OrderView.as_view(), name='order_detail'),
    path('order', OrderList.as_view(), name='order_list'),
    path('create-order', OrderCreateView.as_view(), name='order_create'),
    path('update-order/<uuid:id>', OrderUpdateView.as_view(), name='order_update'),
    path('delete-order/<uuid:id>', OrderDeleteView.as_view(), name='order_delete'),
    path('companies', CompanyList.as_view(), name='company_list'),
    path('payment-types', PaymentTypeList.as_view(), name='payment_type_list'),
    path('company/<uuid:id>', CompanyView.as_view(), name='company_detail'),
    path('create-company', CompanyCreateView.as_view(), name='company_create'),
    path('update-company/<uuid:id>', CompanyUpdateView.as_view(), name='company_update'),
    path('contacts', ContactList.as_view(), name='contact_list'),
    path('contact/<uuid:id>', ContactView.as_view(), name='contact_detail'),
    path('create-contact', ContactCreateView.as_view(), name='contact_create'),
    path('update-contact/<uuid:id>', ContactUpdateView.as_view(), name='contact_update'),
    path('delete-contact/<uuid:id>', ContactDeleteView.as_view(), name='contact_delete'),
    path('get-orders-summary', get_orders_summary, name='get_orders_summary'),
    # path('', index),
]