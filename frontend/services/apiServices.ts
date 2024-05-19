
import { createApiFunction } from './createApiFunction';


// Dynamic API functions for various operations
export const listUsers = createApiFunction<"/api/accounts/", "get", 200>('/api/accounts/', 'get');
export const createUser = createApiFunction<"/api/accounts/", "post",201>('/api/accounts/', 'post');
export const retrieveUser = createApiFunction<"/api/accounts/{id}/", "get",200>('/api/accounts/{id}/', 'get', ['id']);
export const updateUser = createApiFunction<"/api/accounts/{id}/", "put",200>('/api/accounts/{id}/', 'put', ['id']);
export const deleteUser = createApiFunction<"/api/accounts/{id}/", "delete",204>('/api/accounts/{id}/', 'delete', ['id']);
export const partialUpdateUser = createApiFunction<"/api/accounts/{id}/", "patch",200>('/api/accounts/{id}/', 'patch', ['id']);
export const loginUser = createApiFunction<"/api/accounts/login/", "post", 200>('/api/accounts/login/', 'post');
export const listUnverifiedOwners = createApiFunction<"/api/accounts/needs_verification/", "get",200>('/api/accounts/needs_verification/', 'get');
export const verifyOwner = createApiFunction<"/api/accounts/verify_owners/{id}/", "put",200>('/api/accounts/verify_owners/{id}/', 'put', ['id']);
export const batchVerifyOwners = createApiFunction<"/api/accounts/verify_owners/batch_verify/", "put",200>('/api/accounts/verify_owners/batch_verify/', 'put');
export const listReservations = createApiFunction<"/api/reservations/", "get",200>('/api/reservations/', 'get');
export const createReservation = createApiFunction<"/api/reservations/", "post",201>('/api/reservations/', 'post');
export const retrieveReservation = createApiFunction<"/api/reservations/{id}/", "get",200>('/api/reservations/{id}/', 'get', ['id']);
export const updateReservation = createApiFunction<"/api/reservations/{id}/", "put",200>('/api/reservations/{id}/', 'put', ['id']);
export const deleteReservation = createApiFunction<"/api/reservations/{id}/", "delete",204>('/api/reservations/{id}/', 'delete', ['id']);
export const partialUpdateReservation = createApiFunction<"/api/reservations/{id}/", "patch",200>('/api/reservations/{id}/', 'patch', ['id']);
export const getApiSchema = createApiFunction<"/api/schema/", "get",200>('/api/schema/', 'get');
export const listStudios = createApiFunction<"/api/studios/", "get",200>('/api/studios/', 'get');
export const createStudio = createApiFunction<"/api/studios/", "post",201>('/api/studios/', 'post');
export const retrieveStudio = createApiFunction<"/api/studios/{id}/", "get",200>('/api/studios/{id}/', 'get', ['id']);
export const updateStudio = createApiFunction<"/api/studios/{id}/", "put",200>('/api/studios/{id}/', 'put', ['id']);
export const deleteStudio = createApiFunction<"/api/studios/{id}/", "delete",204>('/api/studios/{id}/', 'delete', ['id']);
export const partialUpdateStudio = createApiFunction<"/api/studios/{id}/", "patch",200>('/api/studios/{id}/', 'patch', ['id']);
export const occupyStudio = createApiFunction<"/api/studios/{id}/occupy_studio/", "put",200>('/api/studios/{id}/occupy_studio/', 'put', ['id']);
export const createToken = createApiFunction<"/api/token/", "post",200>('/api/token/', 'post');
export const refreshToken = createApiFunction<"/api/token/refresh/", "post",200>('/api/token/refresh/', 'post');