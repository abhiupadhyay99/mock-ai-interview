const BASE_URL = "/api";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
  SESSIONS: {
    MY_SESSIONS: `${BASE_URL}/sessions/my-sessions`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/sessions/create`,
    GET_ALL: `${BASE_URL}/sessions/my-sessions`,
    GET_SESSION: `${BASE_URL}/sessions`, 
    UPDATE_SCORE: `${BASE_URL}/sessions`, // usage: UPDATE_SCORE/:id
    SAVE_ANSWER: `${BASE_URL}/sessions`, // usage: SAVE_ANSWER/:id/answer
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    EXPLAIN: `${BASE_URL}/ai/generate-explanation`,
  },
};
