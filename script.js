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
  // const url = 'http://test.k6.io/login';
  // const payload = JSON.stringify({
  //   email: 'aaa',
  //   password: 'bbb',
  // });
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // const res = http.post(url, payload, params);

  // const res = http.get('http://localhost:3000/qa/questions?product_id=200');
  const res = http.get('http://localhost:3000/qa/questions/3518965/answers');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}



