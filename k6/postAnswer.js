import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '5s', target: 1 },
    { duration: '10s', target: 10 },
    { duration: '15s', target: 100 },
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  const url = `http://localhost:3000/qa/questions/${Math.floor(Math.random() * 3000000)}/answers`;
  const payload = JSON.stringify({
    body: 'bodybodybody',
    name: 'namenamename',
    email: 'email@gmail.com'
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  sleep(1);
}
