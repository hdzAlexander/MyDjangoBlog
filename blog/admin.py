from django.contrib import admin
from .models import Article, Category, User
from django import forms
from pagedown.widgets import AdminPagedownWidget


class ArticleForm(forms.ModelForm):
    text = forms.CharField(widget=AdminPagedownWidget())

    class Meta:
        model = Article
        fields = '__all__'


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'publish_time', 'last_modify_time', 'id')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_time', 'last_modify_time', 'id')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'nickname', 'created_time', 'id')


admin.site.register(Article, ArticleAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(User, UserAdmin)
