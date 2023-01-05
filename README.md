website covid-19 hiển thị danh sách các nước bị ảnh hưởng bởi covid-19 bằng api: https://api.covid19api.com/summary có các chức năng sắp xếp, phân trang, và hiển thị quốc gia bị ảnh hưởng bằng api https://restcountries.com/v3.1/name/${slug}?fullText=true. trong code có sử dụng vuex để quản lí state và một số common như format số, format date.

sử dụng bằng môi trường dev:
b1: npm i
b2: npm run serve
b3: live on http://localhost:8080/ hoặc http://{ipconfig}:8080/
