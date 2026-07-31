# Angular Cơ Bản -- Buổi 10 Login + Lưu Token LocalStorage

## Login API (`/login`)

## Nội dung buổi học

- Tạo form đăng nhập bằng Reactive Forms
- Validate dữ liệu nhập
- Gọi API Login bằng HttpClient
- Lưu token vào LocalStorage
- Chuyển trang sau khi đăng nhập
- Hiển thị trạng thái Loading và thông báo lỗi

---

# 1. Luồng đăng nhập

Đây là luồng đăng nhập phổ biến của hầu hết website.

```text
Người dùng
     │
     ▼
Nhập Email + Password
     │
     ▼
Validate Form
     │
     ▼
POST /login
     │
     ▼
Server kiểm tra tài khoản
     │
     ▼
Trả về Access Token
     │
     ▼
Lưu LocalStorage
     │
     ▼
Đi tới Trang chủ
```

---

## API Login

```http
POST http://localhost:3000/login
```

Body

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "admin@gmail.com"
  }
}
```

---

# 2. Tạo Login Service

```bash
ng generate service services/auth
```

**auth.service.ts**

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }
}
```

## Vì sao nên dùng Service?

- Component chỉ hiển thị giao diện.
- Service chuyên xử lý gọi API.
- Dễ tái sử dụng.
- Dễ bảo trì dự án.

# 3.Component Login

```ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  loginForm: FormGroup;

  loading = false;
  error = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = "";

    const data = this.loginForm.value;

    this.http.post<any>("http://localhost:3000/login", data).subscribe({
      next: (res) => {
        this.loading = false;

        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));

        this.router.navigateByUrl("/");
      },
      error: () => {
        this.loading = false;
        this.error = "Sai email hoặc mật khẩu";
      },
    });
  }
}
```

---

## 4.HTML

```html
<div class="p-6 max-w-md mx-auto">
  <h1 class="text-2xl font-semibold mb-6">Đăng nhập</h1>

  <form [formGroup]="loginForm" (ngSubmit)="submitForm()" class="space-y-6">
    <div>
      <label class="block font-medium mb-1">Email</label>
      <input formControlName="email" type="email" class="w-full border rounded-lg px-3 py-2" />
    </div>

    <div>
      <label class="block font-medium mb-1">Mật khẩu</label>
      <input formControlName="password" type="password" class="w-full border rounded-lg px-3 py-2" />
    </div>

    <button type="submit" [disabled]="loading" class="px-5 py-2 bg-green-600 text-white rounded-lg w-full">{{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}</button>

    <p class="text-red-500" *ngIf="error">{{ error }}</p>
  </form>
</div>
```

---

## 5. Lưu Token, User vào LocalStorage

```ts
localStorage.setItem("token", res.accessToken);
localStorage.setItem("user", JSON.stringify(res.user));
```

---

## 6. Đọc dữ liệu

```ts
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");
```

---

## 7. Logout

```ts
logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.router.navigateByUrl("/login");
}
```

---

## 8. Bài tập

### Bài 1

Hiển thị lỗi từng field (email invalid, password ngắn)

### Bài 2

Hiển thị thông tin user sau khi login

### Bài 3

Tạo nút Logout

### Bài 4

Nếu đã login → không cho vào trang login nữa

👉 Gợi ý: check localStorage.getItem("token")

### Bài 5 (Nâng Cao)

Tự động thêm token vào mọi request (Interceptor)

👉 Gợi ý:

- Tạo Interceptor: ng generate interceptor auth
- Config trong auth.interceptor.ts

---

## 9. Tổng kết

- Tạo form đăng nhập bằng Reactive Forms.
- Gọi API Login bằng Service.
- Validate dữ liệu người dùng.
- Lưu và đọc Token từ LocalStorage.
- Điều hướng sau khi đăng nhập.
- Thực hiện Logout.
