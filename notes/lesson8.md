# Angular Cơ Bản - Buổi Ôn Tập

## Nội dung buổi học

Ôn lại các kiến thức quan trọng:

- Component
- Routing
- Cú pháp `@for`
- HttpClient
- Reactive Form
- Validation
- CRUD
- Câu hỏi ôn tập

---

# 1. Angular là gì?

Angular là một Framework phát triển ứng dụng Web do Google phát triển.

Angular giúp xây dựng các ứng dụng **SPA (Single Page Application)**, trong đó chỉ tải trang một lần, các thao tác chuyển trang được xử lý trên trình duyệt mà không cần tải lại toàn bộ website. Theo tài liệu chính thức, Angular cung cấp sẵn các tính năng như Component, Routing, Forms, HttpClient và Dependency Injection.

## Đặc điểm

- Viết bằng TypeScript
- Có cấu trúc rõ ràng
- Hỗ trợ Component
- Có Router
- Có HttpClient
- Có Form mạnh mẽ
- Dễ mở rộng dự án lớn

---

# 2. Component

## Component là gì?

Component là thành phần cơ bản nhất của Angular.

Mỗi màn hình được tạo từ nhiều Component nhỏ.

Ví dụ:

```text
Trang chủ

├── Header
├── Product List
├── Footer
```

## Một Component gồm

- HTML (Template)
- TypeScript (Logic)
- CSS/SCSS (Style)

Ví dụ:

```ts
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.css",
})
export class ProductComponent {}
```

## Cần nhớ

- Một UI = nhiều Component
- Component có thể tái sử dụng
- Component quản lý dữ liệu của chính nó

---

# 3. Routing

## Routing là gì?

Routing giúp chuyển đổi giữa các trang trong Angular mà không cần tải lại toàn bộ website.

Ví dụ URL

```text
/

 /products

 /products/1

```

## Khai báo Route

```ts
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "products",
    component: ProductComponent,
  },
  {
    path: "products/:id",
    component: ProductDetailComponent,
  },
];
```

## Chuyển trang

HTML

```html
<a routerLink="/products">Products</a>
```

TypeScript

```ts
this.router.navigate(["/products"]);
```

## Lấy tham số URL

```text
/products/10
```

```ts
this.route.snapshot.params["id"];
```

## Cần nhớ

- routerLink
- Router
- ActivatedRoute
- Route Parameter (:id)

---

# 4. @for (Angular 17+)

Angular mới sử dụng Control Flow thay cho `*ngFor`.

## Cú pháp

```html
@for(item of products; track item.id){

<div>{{item.name}}</div>

}
```

## Cần nhớ

- Luôn dùng `track`
- Nên track bằng id
- Giúp Angular render nhanh hơn

---

# 5. HttpClient

## HttpClient là gì?

HttpClient dùng để giao tiếp với Server hoặc REST API.

Các phương thức phổ biến:

- GET
- POST
- PUT
- PATCH
- DELETE

HttpClient trả về **Observable**, vì vậy cần `subscribe()` để nhận dữ liệu.

## GET

```ts
this.http.get(url).subscribe((res) => {
  console.log(res);
});
```

## POST

```ts
this.http.post(url, data).subscribe();
```

## DELETE

```ts
this.http.delete(url).subscribe();
```

## Quy trình

```text
Component

↓

Service

↓

API

↓

Response

↓

Update UI
```

---

# 6. Reactive Form

Reactive Form là kiểu Form được tạo trong TypeScript.

## Thành phần

- FormGroup
- FormControl
- FormBuilder
- Validators

## Khởi tạo Form

```ts
form: FormGroup;

contructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    name: "",
    price: 0,
  });
}
```

## Submit

```ts
submit(){
    console.log(this.form.value);
}
```

## HTML

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="name" />

  <input formControlName="price" />
</form>
```

## Cần nhớ

- Form nằm trong TS
- HTML chỉ hiển thị dữ liệu

---

# 7. Validation

Validation giúp kiểm tra dữ liệu trước khi gửi lên Server.

## Validator thường dùng

```ts
Validators.required;

Validators.email;

Validators.minLength(3);

Validators.maxLength(50);

Validators.min(1);

Validators.max(100);
```

## Hiển thị lỗi

```html
@if(form.controls.name.invalid && form.controls.name.touched){

<span>Vui lòng nhập tên</span>

}
```

## Disable Button

```html
<button [disabled]="form.invalid">Save</button>
```

---

# 8. Luồng CRUD

CRUD gồm

- Create
- Read
- Update
- Delete

Quy trình

```text
GET

↓

Hiển thị dữ liệu

↓

POST

↓

Reload

↓

DELETE

↓

Reload
```

## Tư duy

```text
UI

↓

Function

↓

Service

↓

API

↓

Update State

↓

Render UI
```

---

# 9. Các lỗi thường gặp

- Quên subscribe()
- Không import ReactiveFormsModule
- Không import HttpClient
- Sai formControlName
- Không bind formGroup
- Quên reload sau POST
- Quên reload sau DELETE
- Không dùng track trong @for
- Sai routerLink
- Không lấy đúng id trên URL

---

# 10. Câu hỏi ôn tập

### Câu 1

Component gồm những thành phần nào?

---

### Câu 2

Routing dùng để làm gì?

---

### Câu 3

Tại sao nên dùng `track` trong `@for`?

---

### Câu 4

HttpClient trả về kiểu dữ liệu gì? làm gì để lấy dữ liệu trả về?

---

### Câu 5

Reactive Form gồm những thành phần nào?

---

### Câu 6

Muốn lấy tham số `id` trên URL `/products/:id` thì dùng cách nào?

---

### Câu 7

Sau khi thêm hoặc xóa dữ liệu, cần làm gì để giao diện cập nhật?
