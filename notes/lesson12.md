# Angular Cơ Bản — Buổi 12

# Ôn tập CRUD + Form + HttpClient + Giới thiệu Component Lifecycle

---

## Nội dung buổi học

- Ôn lại kiến trúc Angular
- Vòng đời của một ứng dụng Angular
- Ôn tập CRUD
- Ôn tập Reactive Form
- Ôn tập HttpClient
- Giới thiệu Component Lifecycle
- Bài tập thực hành CRUD

---

## 1. Ôn lại kiến trúc Angular

Một ứng dụng Angular thường được chia thành nhiều thành phần nhỏ.

```text
App
├── Components
│   ├── Product List
│   ├── Product Form
│   └── Product Detail
├── Services
│   └── ProductService
└── Routing
```

| Thành phần    | Vai trò                |
| ------------- | ---------------------- |
| Component     | Hiển thị giao diện     |
| Service       | Xử lý gọi API          |
| HttpClient    | Gửi request tới Server |
| Reactive Form | Quản lý Form           |
| Router        | Điều hướng             |

---

## 3. Ôn tập CRUD

- **Create** → `POST /products`
- **Read** → `GET /products`
- **Update** → `PUT /products/:id`
- **Delete** → `DELETE /products/:id`

## 4. Ôn tập Reactive Form

- Khởi tạo form

```ts
form: FormGroup;
this.form = this.fb.group({
  name: "",
  price: 0,
});
```

- Lấy giá trị form

```ts
this.form.value;
```

---

## 5. Ôn tập HttpClient

```ts
constructor(private http: HttpClient) {}
```

```ts
this.http.get("/products");
this.http.post("/products", data);
this.http.put(`/products/${id}`, data);
this.http.delete(`/products/${id}`);
```

> Khuyến khích đặt toàn bộ logic gọi API trong Service.

---

## 6. Giới thiệu Component Lifecycle

Các hook quan trọng:

- constructor
- ngOnInit
- ngOnChanges
- ngAfterViewInit
- ngOnDestroy

Ví dụ:

```ts
export class ProductList {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:3000/products").subscribe((data) => {
      this.products = data;
    });
  }
}
```

---

## 8. Kiến thức cần nhớ

- Component xử lý giao diện.
- Service xử lý nghiệp vụ.
- HttpClient gọi API.
- Reactive Form quản lý Form.
- ngOnInit thường dùng để gọi API.

---

## 9. Bài tập thực hành

Xây dựng ứng dụng **Quản lý sản phẩm** với JSON Server.

Model:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}
```

```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop Dell Inspiron 15",
      "price": 18990000,
      "quantity": 12,
      "description": "Laptop văn phòng, Core i5, RAM 16GB",
      "image": "https://picsum.photos/200?random=1",
      "category": "Laptop"
    },
    {
      "id": 2,
      "name": "MacBook Air M3",
      "price": 28990000,
      "quantity": 8,
      "description": "MacBook Air chip M3 13 inch",
      "image": "https://picsum.photos/200?random=2",
      "category": "MacBook"
    }
  ]
}
```

### Bài 1

Hiển thị danh sách sản phẩm bằng `ngOnInit()`.

### Bài 2

Thêm sản phẩm bằng Reactive Form.

Yêu cầu:

- Tên bắt buộc
- Giá > 0
- Số lượng ≥ 0

### Bài 3

Cập nhật sản phẩm.

### Bài 4

Xóa sản phẩm có xác nhận.
