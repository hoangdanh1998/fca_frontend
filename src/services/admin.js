import request, { uploadToS3 } from '@/utils/request';
import { stringify } from 'qs';

export async function adminSignIn(params) {
  return request('/api/admin/auth/login', {
    method: 'POST',
    data: params,
  }).catch(error => error);
}

export async function createApplication(params) {
  return request.post('/api/admin/talent-application', {
    method: 'POST',
    data: params,
  });
}
export async function sendFilexlsx(params) {
  const formData = new FormData();
  formData.append('file', params);
  return uploadToS3(formData);
}

export async function getAllTags() {
  return request.get('/api/tag');
}

export async function sendNewContact(params) {
  return request.post('/api/contact', {
    data: params,
  });
}

export async function updateContact(params) {
  return request(`/api/contact/${params.id}`, {
    method: 'PUT',
    data: params.newValues,
  });
}

export async function mergeDuplicateContact(params) {
  return request(`/api/contact/merge`, {
    method: 'POST',
    data: params,
  });
}

export async function updateContactStatus(params) {
  return request(`/api/contact/${params.id}/status`, {
    method: 'PUT',
    data: params.values,
  });
}

export async function updateApplication(params) {
  return request(`/api/admin/talent-application/${params.applicationCode}`, {
    method: 'PUT',
    data: params.talentApplication,
  });
}

export async function getCVLink(param) {
  return request(`/api/tool/file/link?key=${param}`);
}

export async function getApplicationAvailableSlot(payload) {
  return request(`/api/admin/slot/${payload.applicationId}`, {
    params: payload.params,
  });
}

export async function createAvailableSlot(params) {
  return request.post('/api/admin/slot', {
    data: params,
  });
}

export async function adminGetTimeTable(params) {
  return request(`/api/admin/slot${params}`);
}

export async function getSchedule(queryString) {
  return request(`/api/admin/schedule${queryString}`);
}

export async function getApplications(params) {
  return request(`/api/admin/talent-application?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getRelatedApplications({ applicationCode, params }) {
  return request(`/api/admin/talent-application/${applicationCode}/related?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getApplicationByCode(params) {
  return request(`/api/admin/talent-application/${params.applicationCode}`);
}

export async function ApplicationManagementHeader(params) {
  return request(`/api/admin/talent-application/statistics`, {
    params: { search: params.searchString },
  });
}

export async function updateApplicationNotes(params) {
  return request(`/api/admin/application/${params.applicationCode}/notes`, {
    method: 'PUT',
    data: params.notes,
  });
}

export async function consolidateApplication(params) {
  return request.post(`/api/admin/application/${params.applicationCode}/consolidate`, {
    data: { result: params.result, picIdList: params.picIdList },
  });
}

export async function sendMail(params) {
  return request.post('/api/admin/application/mail', {
    data: params,
  });
}

export async function createSchedule(params) {
  return request
    .post('/api/admin/schedule', {
      data: params,
    })
    .catch(error => error);
}

export async function getApplicationOneBooking(params) {
  return request(`/api/admin/slot/${params}/application`);
}

export async function deleteSlot(params) {
  return request.delete(`/api/admin/slot`, {
    method: 'DELETE',
    params,
  });
}

export async function updateSchedule(params) {
  return request('/api/admin/schedule', {
    method: 'PUT',
    data: params,
  }).catch(error => error);
}

export async function deleteSchedule(params) {
  return request
    .delete(`/api/admin/schedule/${params}`, {
      method: 'DELETE',
    })
    .catch(error => error);
}

export async function getCurrentAdmin() {
  return request('/api/admin/auth/me');
}

export async function createPIC(params) {
  return request
    .post('/api/admin/pic', {
      data: params,
    })
    .catch(error => error);
}

export async function getPIC() {
  return request('/api/admin/pic');
}

export async function getApplicationNotesByCode(params) {
  return request(`/api/admin/application/${params.applicationCode}/notes`);
}

export async function getOnProgressApplication(params) {
  return request(`/api/admin/talent-application/on-progress`, {
    params: { search: params.searchString },
  });
}

export async function queryContacts({ payload }) {
  return request(
    `/api/contact?search=${payload.search}&status=${payload.status}&skip=${payload.skip}&limit=${payload.limit}`,
  );
}

export async function getAllContacts() {
  return request(`/api/contact`);
}

export async function searchContact(params) {
  return request(`/api/contact?search=${params.keyword}&status=${params.status}`, {
    method: 'GET',
  });
}

export async function getAllTalent() {
  return request(`/api/talent`);
}

export async function queryTalents(params) {
  return request(
    `/api/talent?search=${params.search}&status=${params.status}&skip=${params.skip}&limit=${params.limit}`,
  );
}

export async function getFilteredTalents(params) {
  return request(`/api/talent?status=${params.payload}`);
}

export async function searchTalent(params) {
  return request(`/api/talent?search=${params.textSearch}`, {
    method: 'GET',
  });
}

export async function getTouchPoints() {
  return request(`/api/touchpoint`, {
    method: 'GET',
  });
}
export async function getOneTouchPoint(param) {
  return request(`/api/touchpoint/${param}`, {
    method: 'GET',
  });
}
export async function getTalentById(params) {
  return request(`/api/talent/${params}`, {
    method: 'GET',
  });
}

export async function addCoreValue(params) {
  return request.post(`/api/talent/value-validation`, {
    data: params,
  });
}

export async function updateCoreValue(params) {
  return request(`/api/talent/value-validation/${params.valueId}`, {
    data: params.header,
    method: 'PUT',
  });
}

export async function getAllOpportunityMatching(params) {
  return request(
    `/api/opportunity-matching?search=${params.payload.search}&status=${params.payload.status}`,
    {
      method: 'GET',
    },
  );
}
export async function getContactMerge(params) {
  return request(`/api/contact/duplicate?search=${params.search}`);
}

export async function createTalentFromContact(params) {
  return request(`/api/talent`, {
    data: params,
    method: 'POST',
  });
}

export async function createNewTalent(params) {
  return request.post('/api/talent', {
    data: params,
  });
}

export async function fetchOpportunities() {
  return request('/api/opportunity-matching/opportunity');
}
export async function createOM(params) {
  return request('/api/opportunity-matching', {
    data: params,
    method: 'POST',
  });
}
export async function getCandidate(params) {
  return request(`/api/candidate?skip=${params.skip}&limit=${params.limit}`, {
    method: 'GET',
  });
}
export async function getOpportunity() {
  return request('/api/opportunity', {
    method: 'GET',
  });
}

export async function getOneOpportunity(params) {
  return request(`/api/opportunity/${params}`, {
    method: 'GET',
  });
}

export async function uploadCV(params) {
  const formData = new FormData();
  formData.append('file', params);
  return uploadToS3(formData, 'cv');
}

export async function fetchCandidateById(params) {
  return request(`/api/candidate/${params.payload}`, {
    method: 'GET',
  });
}

export async function updateCandidate(params) {
  return request(`/api/candidate/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function postEvent(params) {
  return request('/api/event', {
    data: params,
    method: 'POST',
  });
}

export async function fetchListTalentInAddingCandidate() {
  return request('/api/talent', {
    method: 'GET',
  });
}

export async function fetchAllEvent() {
  return request('/api/event', {
    method: 'GET',
  });
}

export async function createCandidate(params) {
  return request('/api/candidate', {
    method: 'POST',
    data: params,
  });
}

export async function updateTouchpoint(params) {
  return request(`/api/touchpoint/${params.touchpointId}`, {
    method: 'PUT',
    data: params.header,
  });
}

export async function updateValueProposition(params) {
  return request(`/api/value-validation/${params.valueId}`, {
    method: 'PUT',
    data: params.header,
  });
}

export async function adddValueProposition(params) {
  return request(`/api/value-validation`, {
    method: 'POST',
    data: params,
  });
}

export async function setHighPriority(params) {
  return request(`/api/candidate/${params}/isHighPriority`, {
    method: 'PUT',
  });
}
export async function getDetailEvent(params) {
  return request(`/api/event/${params}`, {
    method: 'GET',
  });
}

export async function getGroupCandidateById(params) {
  return request(`/api/group-candidate/${params}`, {
    method: 'GET',
  });
}
