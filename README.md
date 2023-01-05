**********************************************************************
Algorithm:
const items = ["A", "B", "C", "D", "E", "F", "G", "H"];

const group1 = [];
const group2 = [];
const group3 = [];

// Ngẫu nhiên chọn 3 mục cho nhóm 1
while (group1.length < 3) {
  const index = Math.floor(Math.random() * items.length);
  const item = items[index];
  group1.push(item);
  items.splice(index, 1);
}

// Ngẫu nhiên chọn 3 mục cho nhóm 2
while (group2.length < 3) {
  const index = Math.floor(Math.random() * items.length);
  const item = items[index];
  group2.push(item);
  items.splice(index, 1);
}

// Các mục còn lại sẽ thuộc vào nhóm 3
group3.push(...items);

console.log(group1);
console.log(group2);
console.log(group3);
**********************************************************************


website covid-19 hiển thị danh sách các nước bị ảnh hưởng bởi covid-19 bằng api: https://api.covid19api.com/summary có các chức năng sắp xếp, phân trang, và hiển thị quốc gia bị ảnh hưởng bằng api https://restcountries.com/v3.1/name/${slug}?fullText=true. trong code có sử dụng vuex để quản lí state và một số common như format số, format date.

sử dụng bằng môi trường dev:
b1: npm i
b2: npm run serve
b3: live on http://localhost:8080/ hoặc http://{ipconfig}:8080/
