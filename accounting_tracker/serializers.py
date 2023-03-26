from rest_framework import serializers
from .models import Contact, Company, PaymentType, Order

class ContactSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=30, required=True)
    phone = serializers.CharField(max_length=30, allow_blank=True, allow_null=True)
    email = serializers.CharField(max_length=50, allow_blank=True, allow_null=True)


    class Meta:
        model = Contact
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=30, allow_blank=False, allow_null=False)
    address = serializers.CharField(max_length=30, allow_blank=True, allow_null=True, required=False)
    zip_code = serializers.CharField(max_length=10, allow_blank=True, allow_null=True, required=False)
    phone = serializers.CharField(max_length=30, allow_blank=True, allow_null=True, required=False)
    email = serializers.CharField(max_length=50, allow_blank=True, allow_null=True, required=False)
    contacts = ContactSerializer(many=True, read_only=True)
    tax_id = serializers.CharField(max_length=30, allow_blank=True, allow_null=True, required=False)
    note = serializers.CharField(max_length=1000, allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = Company
        fields = '__all__'

    def validate_name(self, value):
        if self.instance is None and Company.objects.filter(name=value).exists():
            raise serializers.ValidationError("此公司已存在")
        return value

class CompanyOptionSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=30, allow_blank=False, allow_null=False)

    class Meta:
        model = Company
        fields = ('id', 'name')

class PaymentTypeSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    type = serializers.CharField(max_length=30, allow_blank=False, allow_null=False)

    class Meta:
        model = PaymentType
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    content = serializers.CharField(max_length=100, allow_blank=False, allow_null=False)
    company = CompanyOptionSerializer(read_only=True)
    untaxed_total = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=False)
    taxed_total = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=False)
    payment_type = PaymentTypeSerializer(read_only=True)
    payment_amount = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=False)
    payment_received_date = serializers.DateField(allow_null=True)
    bank_account = serializers.CharField(max_length=10, allow_blank=True, allow_null=True)
    invoice_number = serializers.CharField(max_length=20, allow_blank=True, allow_null=True)
    order_date = serializers.DateField(allow_null=True)
    note = serializers.CharField(max_length=1000, allow_blank=True, allow_null=True)

    class Meta:
        model = Order
        fields = '__all__'

class OrderPostSerializer(serializers.ModelSerializer):
    company = serializers.UUIDField()
    payment_type = serializers.UUIDField(required=False, allow_null=True)

    class Meta:
        model = Order
        fields = ('content', 'company', 'untaxed_total', 'taxed_total', 'payment_type', 'payment_amount',
                  'payment_received_date', 'bank_account', 'invoice_number', 'order_date', 'note')

    def validate(self, data):
        errors = {}
        taxed_total = data.get('taxed_total')
        untaxed_total = data.get('untaxed_total')
        invoice_number = data.get('invoice_number')
        order_date = data.get('order_date')
        payment_amount = data['payment_amount']
        payment_type = data['payment_type']
        if untaxed_total is not None and untaxed_total < 0:
            errors['untaxed_total'] = ['未稅總額不能為負數。']
        if taxed_total is not None and taxed_total < 0:
            errors['taxed_total'] = ['含稅總額不能為負數。']
        if payment_amount is not None and payment_amount < 0:
            errors['payment_amount'] = ['付款金額不能為負數。']
        if untaxed_total is not None and taxed_total is not None:
            if taxed_total <= untaxed_total:
                errors['taxed_total'] = ['含稅總額必須大於未稅總額。']
        if invoice_number is not None and not order_date:
            errors['order_date'] = ['開發票日期必須設定。']
        if payment_amount > 0 and not payment_type:
            errors['payment_type'] = ['付款方式必須設定。']
        if errors:
            raise serializers.ValidationError(errors)
        if payment_type is not None:
            try:
                PaymentType.objects.get(id=payment_type)
            except PaymentType.DoesNotExist:
                errors['payment_type'] = ['沒有此付款方式']
        if errors:
            raise serializers.ValidationError(errors)
        return data

    def create(self, validated_data):
        print(validated_data)
        company = Company.objects.get(id=validated_data.pop('company'))
        payment_type = validated_data.pop('payment_type', None)
        payment_type = PaymentType.objects.get(id=payment_type) if payment_type is not None else None
        order = Order.objects.create(company=company, payment_type=payment_type, **validated_data)
        return order

    def update(self, instance, validated_data):
        company = validated_data.pop('company', None)
        if company is not None:
            instance.company = Company.objects.get(id=company)
        payment_type = validated_data.pop('payment_type', None)
        if payment_type is not None:
            instance.payment_type = PaymentType.objects.get(id=payment_type)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

class OrderSummarySerializer(serializers.ModelSerializer):
    payment_amount = serializers.DecimalField(max_digits=10, decimal_places=0, allow_null=False)
    order_date = serializers.DateField(allow_null=True)
    class Meta:
        model = Order
        fields = ( 'payment_amount', 'order_date')
