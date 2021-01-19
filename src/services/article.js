import request from '@/utils/request';

export async function getArticles() {
  return request('/api/admin/article');
}

export async function createArticle(params) {
  return request.post('/api/admin/article', {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params) {
  return request(`/api/admin/article/${params.articleId}`, {
    method: 'PUT',
    data: params.updatedArticle,
  });
}

export async function deleteArticle(params) {
  return request(`/api/admin/article/${params}`, {
    method: 'DELETE',
  });
}

export async function getImageLink() {
  return request(`/api/tool/file/upload/article-image`);
}
