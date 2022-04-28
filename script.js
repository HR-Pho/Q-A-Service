import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '15s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 1000 },
    { duration: '15s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 1000 },
  ],
};

// localhost:3000/qa/questions?product_id=200&count=10&page =1
export default function () {
  const res = http.get('http://localhost:3000/qa/questions?product_id=200');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}



