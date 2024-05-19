/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/accounts/": {
    /**
     * List all users
     * @description List detailed information about all users.
     */
    get: operations["api_accounts_list"];
    /**
     * Create a new user
     * @description Creates a new user with the given details. Admins can create other admin accounts.
     */
    post: operations["api_accounts_create"];
  };
    "/api/accounts/{id}/": {
    /**
     * Retrieve a user
     * @description Retrieves detailed information about a user. If no ID is provided, it retrieves the current authenticated user.
     */
    get: operations["api_accounts_retrieve"];
    /**
     * Update a user
     * @description Updates the specified user with the provided data.
     */
    put: operations["api_accounts_update"];
    /**
     * Delete a user
     * @description Deletes a user. Users can only delete themselves unless they are admin.
     */
    delete: operations["api_accounts_destroy"];
    /**
     * Partially update a user
     * @description Partially updates the specified user with the provided data.
     */
    patch: operations["api_accounts_partial_update"];
  };
  "/api/accounts/login/": {
    /**
     * Login user
     * @description Authenticates a user and returns tokens if credentials are valid.
     */
    post: operations["api_accounts_login_create"];
  };
  "/api/accounts/needs_verification/": {
    /**
     * List unverified owners
     * @description Lists all studio owners who have not been verified. Accessible only by admins.
     */
    get: operations["api_accounts_needs_verification_list"];
  };
  "/api/accounts/verify_owners/{id}/": {
    /**
     * Verify a single owner
     * @description Verifies the owner with the specified ID.
     */
    put: operations["api_accounts_verify_owners_update"];
  };
  "/api/accounts/verify_owners/batch_verify/": {
    /**
     * Batch verify owners
     * @description Verifies a batch of owners identified by their IDs.
     */
    put: operations["api_accounts_verify_owners_batch_verify_update"];
  };
  "/api/reservations/": {
    /**
     * List all Reservations
     * @description Retrieve a list of all reservations available to the authenticated user. Filters can be applied to refine the list based on studio, customer, and reservation status.
     */
    get: operations["api_reservations_list"];
    /**
     * Create a Reservation
     * @description Create a new reservation instance. Necessary details such as start and end times, customer, and studio must be provided.
     */
    post: operations["api_reservations_create"];
  };
  "/api/reservations/{id}/": {
    /**
     * Retrieve a Reservation
     * @description Retrieve details of a specific reservation by ID. Only accessible if the user has the right permissions based on their role (admin, studio owner, or customer).
     */
    get: operations["api_reservations_retrieve"];
    /**
     * Update a Reservation
     * @description Update details of a specific reservation. Modifications are allowed based on user roles and specific business rules (e.g., cannot modify past reservations).
     */
    put: operations["api_reservations_update"];
    /**
     * Delete a Reservation
     * @description Deletes a reservation. Restrictions apply based on user type and timing relative to the reservation's start.
     */
    delete: operations["api_reservations_destroy"];
    /**
     * Partially update a Reservation
     * @description Partially updates a reservation with the provided fields. All other fields remain unchanged.
     */
    patch: operations["api_reservations_partial_update"];
  };
  "/api/schema/": {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation.
     *
     * - YAML: application/vnd.oai.openapi
     * - JSON: application/vnd.oai.openapi+json
     */
    get: operations["api_schema_retrieve"];
  };
  "/api/studios/": {
    /**
     * List all Studios
     * @description Retrieve a list of all studios with optional filtering by location, capacity, and occupancy status. Filters can be applied using query parameters like ?location=xyz&capacity=50.
     */
    get: operations["api_studios_list"];
    /**
     * Create a Studio
     * @description Create a new studio instance. The owner will be automatically assigned based on the authenticated user making the request.
     */
    post: operations["api_studios_create"];
  };
  "/api/studios/{id}/": {
    /**
     * Retrieve a Studio
     * @description Retrieve details of a specific studio by ID.
     */
    get: operations["api_studios_retrieve"];
    /**
     * Update a Studio
     * @description Update details of a specific studio. Only the owner or an admin can update studio details.
     */
    put: operations["api_studios_update"];
    /**
     * Delete a Studio
     * @description Delete a specific studio. Only the owner or an admin can delete a studio.
     */
    delete: operations["api_studios_destroy"];
    /**
     * Partially update a Studio
     * @description Partially update details of a specific studio. This is typically used for patching a subset of fields.
     */
    patch: operations["api_studios_partial_update"];
  };
  "/api/studios/{id}/occupy_studio/": {
    /**
     * Occupy a Studio
     * @description Allows an admin to assign any customer to any studio, a studio owner to assign any customer to their own studios, and a customer to assign themselves to any studio. The studio must not already be occupied. Provide the 'occupied_by' parameter with the ID of the customer.
     */
    put: operations["api_studios_occupy_studio_update"];
  };
  "/api/token/": {
    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     */
    post: operations["api_token_create"];
  };
  "/api/token/refresh/": {
    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     */
    post: operations["api_token_refresh_create"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    BatchVerify: {
      /** @description List of user IDs to verify. */
      ids: number[];
    };
    Login: {
      username: string;
      password: string;
    };
    LoginResponse: {
      tokens: components["schemas"]["Token"];
      user: components["schemas"]["UserRegistration"];
    };
    OwnerVerification: {
      id: number;
      is_verified: boolean;
      /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
      username: string;
      /**
       * Email address
       * Format: email
       */
      email: string;
    };
    PaginatedOwnerVerificationList: {
      /** @example 123 */
      count: number;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=4
       */
      next?: string | null;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=2
       */
      previous?: string | null;
      results: components["schemas"]["OwnerVerification"][];
    };
    PaginatedReservationList: {
      /** @example 123 */
      count: number;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=4
       */
      next?: string | null;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=2
       */
      previous?: string | null;
      results: components["schemas"]["Reservation"][];
    };
    PaginatedStudioList: {
      /** @example 123 */
      count: number;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=4
       */
      next?: string | null;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=2
       */
      previous?: string | null;
      results: components["schemas"]["Studio"][];
    };
    PaginatedUserRegistrationList: {
      /** @example 123 */
      count: number;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=4
       */
      next?: string | null;
      /**
       * Format: uri
       * @example http://api.example.org/accounts/?page=2
       */
      previous?: string | null;
      results: components["schemas"]["UserRegistration"][];
    };
    PatchedReservation: {
      id?: number;
      /** Format: date-time */
      start?: string;
      /** Format: date-time */
      end?: string;
      studio?: number;
      customer?: number;
      status?: components["schemas"]["StatusEnum"];
    };
    PatchedStudio: {
      id?: number;
      name?: string;
      location?: string;
      /** Format: int64 */
      capacity?: number;
      owner?: number;
      occupied_by?: number | null;
      is_occupied?: boolean;
      reserved_periods?: string;
      images?: readonly components["schemas"]["StudioImage"][];
    };
    PatchedUserRegistration: {
      /** @description user generated id. Set internally. */
      id?: number;
      /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
      username?: string;
      /** @description Password for the user, write-only for security */
      password?: string;
      /**
       * Email address
       * Format: email
       */
      email?: string;
      user_type?: components["schemas"]["UserTypeEnum"];
      /**
       * Staff status
       * @description Indicates if the user is an admin. Set internally.
       */
      is_staff?: boolean;
      /** @description Indicates if the Studio Owner is verified by an admin. Set internally. */
      is_verified?: boolean;
    };
    Reservation: {
      id: number;
      /** Format: date-time */
      start: string;
      /** Format: date-time */
      end: string;
      studio: number;
      customer: number;
      status?: components["schemas"]["StatusEnum"];
    };
    /**
     * @description * `active` - Active
     * * `cancelled` - Cancelled
     * @enum {string}
     */
    StatusEnum: "active" | "cancelled";
    Studio: {
      id: number;
      name: string;
      location: string;
      /** Format: int64 */
      capacity: number;
      owner: number;
      occupied_by: number | null;
      is_occupied: boolean;
      reserved_periods: string;
      images: readonly components["schemas"]["StudioImage"][];
    };
    StudioImage: {
      id: number;
      /** Format: uri */
      image: string;
    };
    Token: {
      access: string;
      refresh: string;
    };
    TokenObtainPair: {
      username: string;
      password: string;
      access: string;
      refresh: string;
    };
    TokenRefresh: {
      access: string;
      refresh: string;
    };
    UserRegistration: {
      /** @description user generated id. Set internally. */
      id: number;
      /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
      username: string;
      /** @description Password for the user, write-only for security */
      password: string;
      /**
       * Email address
       * Format: email
       */
      email?: string;
      user_type?: components["schemas"]["UserTypeEnum"];
      /**
       * Staff status
       * @description Indicates if the user is an admin. Set internally.
       */
      is_staff: boolean;
      /** @description Indicates if the Studio Owner is verified by an admin. Set internally. */
      is_verified: boolean;
    };
    /**
     * @description * `admin` - Admin
     * * `studio_owner` - Studio Owner
     * * `customer` - Customer
     * @enum {string}
     */
    UserTypeEnum: "admin" | "studio_owner" | "customer";
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * List all users
   * @description List detailed information about all users.
   */
  api_accounts_list: {
    parameters: {
      query?: {
        /** @description A page number within the paginated result set. */
        page?: number;
        /** @description Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedUserRegistrationList"];
        };
      };
    };
  };
  /**
   * Create a new user
   * @description Creates a new user with the given details. Admins can create other admin accounts.
   */
  api_accounts_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserRegistration"];
        "application/x-www-form-urlencoded": components["schemas"]["UserRegistration"];
        "multipart/form-data": components["schemas"]["UserRegistration"];
      };
    };
    responses: {
      /** @description User created successfully */
      201: {
        content: never;
      };
    };
  };
  /**
   * Retrieve a user
   * @description Retrieves detailed information about a user. If no ID is provided, it retrieves the current authenticated user.
   */
  api_accounts_retrieve: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this custom user. */
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserRegistration"];
        };
      };
    };
  };
  /**
   * Update a user
   * @description Updates the specified user with the provided data.
   */
  api_accounts_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this custom user. */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserRegistration"];
        "application/x-www-form-urlencoded": components["schemas"]["UserRegistration"];
        "multipart/form-data": components["schemas"]["UserRegistration"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserRegistration"];
        };
      };
    };
  };
  /**
   * Delete a user
   * @description Deletes a user. Users can only delete themselves unless they are admin.
   */
  api_accounts_destroy: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this custom user. */
        id: number;
      };
    };
    responses: {
      /** @description User deleted successfully */
      204: {
        content: never;
      };
    };
  };
  /**
   * Partially update a user
   * @description Partially updates the specified user with the provided data.
   */
  api_accounts_partial_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this custom user. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PatchedUserRegistration"];
        "application/x-www-form-urlencoded": components["schemas"]["PatchedUserRegistration"];
        "multipart/form-data": components["schemas"]["PatchedUserRegistration"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserRegistration"];
        };
      };
    };
  };
  /**
   * Login user
   * @description Authenticates a user and returns tokens if credentials are valid.
   */
  api_accounts_login_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Login"];
        "application/x-www-form-urlencoded": components["schemas"]["Login"];
        "multipart/form-data": components["schemas"]["Login"];
      };
    };
    responses: {
      /** @description Login successful */
      200: {
        content: {
          "application/json": components["schemas"]["LoginResponse"];
        };
      };
      /** @description Invalid credentials */
      400: {
        content: never;
      };
    };
  };
  /**
   * List unverified owners
   * @description Lists all studio owners who have not been verified. Accessible only by admins.
   */
  api_accounts_needs_verification_list: {
    parameters: {
      query?: {
        /** @description A page number within the paginated result set. */
        page?: number;
        /** @description Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedOwnerVerificationList"];
        };
      };
    };
  };
  /**
   * Verify a single owner
   * @description Verifies the owner with the specified ID.
   */
  api_accounts_verify_owners_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["OwnerVerification"];
        "application/x-www-form-urlencoded": components["schemas"]["OwnerVerification"];
        "multipart/form-data": components["schemas"]["OwnerVerification"];
      };
    };
    responses: {
      /** @description Owner verified */
      200: {
        content: never;
      };
    };
  };
  /**
   * Batch verify owners
   * @description Verifies a batch of owners identified by their IDs.
   */
  api_accounts_verify_owners_batch_verify_update: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["BatchVerify"];
        "application/x-www-form-urlencoded": components["schemas"]["BatchVerify"];
        "multipart/form-data": components["schemas"]["BatchVerify"];
      };
    };
    responses: {
      /** @description Owners verified in batch */
      200: {
        content: never;
      };
    };
  };
  /**
   * List all Reservations
   * @description Retrieve a list of all reservations available to the authenticated user. Filters can be applied to refine the list based on studio, customer, and reservation status.
   */
  api_reservations_list: {
    parameters: {
      query?: {
        /** @description Filter reservations by customer. */
        customer?: number;
        /** @description Filter reservations by the numeric ID of the studio owner. */
        owner?: number;
        /** @description A page number within the paginated result set. */
        page?: number;
        /** @description Number of results to return per page. */
        page_size?: number;
        /** @description Filter upcoming reservations based on the current time. */
        past?: boolean;
        /**
         * @description Filter reservations by status.
         *
         * * `active` - Active
         * * `cancelled` - Cancelled
         */
        status?: "active" | "cancelled";
        /** @description Filter reservations by studio. */
        studio?: number;
        /** @description Filter upcoming reservations based on the current time. */
        upcoming?: boolean;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedReservationList"];
        };
      };
    };
  };
  /**
   * Create a Reservation
   * @description Create a new reservation instance. Necessary details such as start and end times, customer, and studio must be provided.
   */
  api_reservations_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Reservation"];
        "application/x-www-form-urlencoded": components["schemas"]["Reservation"];
        "multipart/form-data": components["schemas"]["Reservation"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Reservation"];
        };
      };
    };
  };
  /**
   * Retrieve a Reservation
   * @description Retrieve details of a specific reservation by ID. Only accessible if the user has the right permissions based on their role (admin, studio owner, or customer).
   */
  api_reservations_retrieve: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this reservation. */
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Reservation"];
        };
      };
    };
  };
  /**
   * Update a Reservation
   * @description Update details of a specific reservation. Modifications are allowed based on user roles and specific business rules (e.g., cannot modify past reservations).
   */
  api_reservations_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this reservation. */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Reservation"];
        "application/x-www-form-urlencoded": components["schemas"]["Reservation"];
        "multipart/form-data": components["schemas"]["Reservation"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Reservation"];
        };
      };
    };
  };
  /**
   * Delete a Reservation
   * @description Deletes a reservation. Restrictions apply based on user type and timing relative to the reservation's start.
   */
  api_reservations_destroy: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this reservation. */
        id: number;
      };
    };
    responses: {
      /** @description Reservation deleted successfully */
      204: {
        content: never;
      };
      /** @description Unauthorized to delete the reservation */
      403: {
        content: never;
      };
      /** @description Cannot delete reservation within 24 hours of start time */
      406: {
        content: never;
      };
    };
  };
  /**
   * Partially update a Reservation
   * @description Partially updates a reservation with the provided fields. All other fields remain unchanged.
   */
  api_reservations_partial_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this reservation. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PatchedReservation"];
        "application/x-www-form-urlencoded": components["schemas"]["PatchedReservation"];
        "multipart/form-data": components["schemas"]["PatchedReservation"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Reservation"];
        };
      };
    };
  };
  /**
   * @description OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   */
  api_schema_retrieve: {
    parameters: {
      query?: {
        format?: "json" | "yaml";
        lang?: "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "ckb" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "ms" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "ug" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
      };
    };
    responses: {
      200: {
        content: {
          "application/vnd.oai.openapi": {
            [key: string]: unknown;
          };
          "application/yaml": {
            [key: string]: unknown;
          };
          "application/vnd.oai.openapi+json": {
            [key: string]: unknown;
          };
          "application/json": {
            [key: string]: unknown;
          };
        };
      };
    };
  };
  /**
   * List all Studios
   * @description Retrieve a list of all studios with optional filtering by location, capacity, and occupancy status. Filters can be applied using query parameters like ?location=xyz&capacity=50.
   */
  api_studios_list: {
    parameters: {
      query?: {
        /** @description Filter studios based on minimum capacity. */
        capacity?: number;
        /** @description Filter studios based on the occupancy status. */
        is_occupied?: boolean;
        /** @description Filter studios by location. */
        location?: string;
        /** @description Filter studios by the customer currently occupying them. */
        occupied_by?: number;
        /** @description Filter studios by the studio owner. */
        owner?: number;
        /** @description A page number within the paginated result set. */
        page?: number;
        /** @description Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["PaginatedStudioList"];
        };
      };
    };
  };
  /**
   * Create a Studio
   * @description Create a new studio instance. The owner will be automatically assigned based on the authenticated user making the request.
   */
  api_studios_create: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Studio"];
        "application/x-www-form-urlencoded": components["schemas"]["Studio"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Studio"];
        };
      };
    };
  };
  /**
   * Retrieve a Studio
   * @description Retrieve details of a specific studio by ID.
   */
  api_studios_retrieve: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this studio. */
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Studio"];
        };
      };
    };
  };
  /**
   * Update a Studio
   * @description Update details of a specific studio. Only the owner or an admin can update studio details.
   */
  api_studios_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this studio. */
        id: number;
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Studio"];
        "application/x-www-form-urlencoded": components["schemas"]["Studio"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Studio"];
        };
      };
    };
  };
  /**
   * Delete a Studio
   * @description Delete a specific studio. Only the owner or an admin can delete a studio.
   */
  api_studios_destroy: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this studio. */
        id: number;
      };
    };
    responses: {
      /** @description No response body */
      204: {
        content: never;
      };
    };
  };
  /**
   * Partially update a Studio
   * @description Partially update details of a specific studio. This is typically used for patching a subset of fields.
   */
  api_studios_partial_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this studio. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "multipart/form-data": components["schemas"]["PatchedStudio"];
        "application/x-www-form-urlencoded": components["schemas"]["PatchedStudio"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Studio"];
        };
      };
    };
  };
  /**
   * Occupy a Studio
   * @description Allows an admin to assign any customer to any studio, a studio owner to assign any customer to their own studios, and a customer to assign themselves to any studio. The studio must not already be occupied. Provide the 'occupied_by' parameter with the ID of the customer.
   */
  api_studios_occupy_studio_update: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this studio. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "content": unknown;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": unknown;
        };
      };
      400: {
        content: {
          "application/json": unknown;
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /**
   * @description Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   */
  api_token_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TokenObtainPair"];
        "application/x-www-form-urlencoded": components["schemas"]["TokenObtainPair"];
        "multipart/form-data": components["schemas"]["TokenObtainPair"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["TokenObtainPair"];
        };
      };
    };
  };
  /**
   * @description Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   */
  api_token_refresh_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TokenRefresh"];
        "application/x-www-form-urlencoded": components["schemas"]["TokenRefresh"];
        "multipart/form-data": components["schemas"]["TokenRefresh"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["TokenRefresh"];
        };
      };
    };
  };
}
