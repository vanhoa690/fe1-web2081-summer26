# Angular Cơ Bản — Buổi 11 (Private Route với Guard)

## Nội dung buổi học

- Private Route là gì
- Angular Guard
- Tạo `AuthGuard`
- Chặn route khi chưa login
- Redirect về `/login`
- Bảo vệ các trang cần đăng nhập
- Tạo `GuestGuard`
- Logout và Guard hoạt động

---

# 1. Vấn đề

Sau khi hoàn thành bài Login, chúng ta đã lưu token vào `localStorage`.

Người dùng vẫn có thể truy cập trực tiếp:

```
/list
/add
/edit/1
```

Đây là lý do cần sử dụng Guard để bảo vệ các route.

---

# 2. Private Route là gì

Private Route là những trang chỉ người đã đăng nhập mới được phép truy cập.

Ví dụ:

```
/list
/add
/edit/:id
```

Nếu chưa đăng nhập:

```
→ chuyển về /login
```

---

# 3. Flow hoạt động

```
Người dùng truy cập

      /add
        │
        ▼
 AuthGuard kiểm tra token
        │
   ┌────┴────┐
   │         │
 Có token  Không có token
   │         │
   ▼         ▼
Vào trang  Redirect /login
```

---

# 4. Angular Guard là gì

Guard dùng để kiểm tra điều kiện trước khi truy cập Route.

| Guard         | Chức năng                       |
| ------------- | ------------------------------- |
| CanActivate   | Kiểm tra trước khi vào Route    |
| CanDeactivate | Kiểm tra trước khi rời trang    |
| CanLoad       | Kiểm tra trước khi load Module  |
| Resolve       | Load dữ liệu trước khi mở Route |

Trong bài này sử dụng `CanActivate`.

---

# 5. Tạo Guard

```bash
ng g guard auth
```

Angular tạo file:

```
src/app/auth.guard.ts
```

---

# 6. Code AuthGuard

```ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem("token");

  if (token) {
    return true;
  }

  router.navigateByUrl("/login");
  return false;
};
```

---

# 7. Gắn Guard vào Route

```ts
import { Routes } from "@angular/router";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: "list",
    component: Stories,
    canActivate: [authGuard],
  },
  {
    path: "add",
    component: AddStory,
    canActivate: [authGuard],
  },
  {
    path: "edit/:id",
    component: EditStory,
    canActivate: [authGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];
```

---

# 8. Thử nghiệm

Xóa token:

```js
localStorage.removeItem("token");
```

Truy cập:

```
http://localhost:4200/list
```

Kết quả:

```
→ redirect /login
```

---

# 9. Guest Guard

Tạo Guard:

```bash
ng g guard guest
```

Code:

```ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  if (token) {
    router.navigateByUrl("/list");
    return false;
  }

  return true;
};
```

Áp dụng:

```ts
{
  path: "login",
  component: Login,
  canActivate: [guestGuard],
}
```

---

# 10. Logout

```ts
logout() {
  localStorage.removeItem("token");
  this.router.navigateByUrl("/login");
}
```

---

# 11. Flow Authentication

```
Login
   │
POST /login
   │
Server trả accessToken
   │
Lưu localStorage
   │
AuthGuard kiểm tra
   │
Cho phép truy cập
```

---

# 12. Bài tập

## Bài 1

Tạo `AuthGuard`.

## Bài 2

Bảo vệ các route:

```
/list
/add
/edit/:id
```

## Bài 3

Nếu chưa đăng nhập:

```
→ redirect /login
```

## Bài 4

Tạo `GuestGuard`.

Nếu đã đăng nhập:

```
/login
```

↓

```
/list
```

## Bài 5

Tạo nút Logout:

- Xóa token.
- Chuyển về `/login`.
- Không thể truy cập `/list`, `/add`, `/edit/:id`.

---

# 13. Tổng kết

- Hiểu Private Route.
- Tạo `AuthGuard`.
- Bảo vệ Route.
- Redirect khi chưa đăng nhập.
- Tạo `GuestGuard`.
- Hoàn thiện luồng Login → Guard → Logout.
