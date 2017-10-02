from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^article/(?P<article_id>\d+)$', views.article_detail, name='article_detail'),
    url(r'^article/(?P<article_id>\d+)/edit$', views.article_edit, name="article_edit"),
    url(r'^article$', views.article_index, name='article_index'),
    url(r'^category$', views.category_index, name='category_index'),
    url(r'^article/(?P<category_name>.+)$', views.article_with_category, name='article_with_category'),
    url(r'^new/article/', views.article_new, name='article_new'),
    url(r'^register', views.register, name="register"),
    url(r'^signin', views.to_sign_in, name="sign_in"),


    url(r'^get_article_detail/(?P<article_id>\d+)$', views.get_article_detail),
    url(r'^change_article_detail/(?P<article_id>\d+)$', views.change_article_detail),
    url(r'^get_article_list', views.get_article_list),
    url(r'^get_category_list', views.get_category_list),
    url(r'^create_article', views.create_article),
    url(r'^get_category_detail/(?P<category_name>.+)$', views.get_category_detail),
    url(r'^change_category', views.change_category),
    url(r'^create_category', views.create_new_category),
    url(r'^check_username', views.check_username_effective),
    url(r'^add_browser_count', views.add_browser_count),
    url(r'^add_like_count', views.add_like_count)
]