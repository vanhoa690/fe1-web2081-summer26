# Angular Cơ Bản - Buổi 9

# Register API (`/register`)

## Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Tạo form đăng ký bằng Reactive Forms
- Validate dữ liệu trước khi gửi
- Gọi API Register bằng HttpClient
- Hiển thị Loading
- Hiển thị thông báo thành công/thất bại

---

# Nội dung

- Reactive Form
- Validators
- Gọi API Register
- Loading
- Thông báo lỗi

---

# 1. Luồng hoạt động

```text
Nhập thông tin
        ↓
Validate dữ liệu
        ↓
Nhấn Đăng ký
        ↓
POST /register
        ↓
Thành công → Chuyển sang Login
```

---

# 2. Tạo Form

```ts
constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private router: Router
) {
  this.registerForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
}
```

Ở đây chúng ta sử dụng:

- `Validators.required` → bắt buộc nhập
- `Validators.email` → đúng định dạng email
- `Validators.minLength(6)` → mật khẩu tối thiểu 6 ký tự

---

# 3. Submit Form

```ts
submitForm() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.error = "";

  this.http
    .post("http://localhost:3000/register", this.registerForm.value)
    .subscribe({
      next: () => {
        this.loading = false;

        alert("Đăng ký thành công");

        this.router.navigateByUrl("/login");
      },
      error: () => {
        this.loading = false;
        this.error = "Đăng ký thất bại";
      },
    });
}
```

Trước khi gọi API, kiểm tra:

```ts
if (this.registerForm.invalid)
```

Nếu form chưa hợp lệ thì dừng lại và hiển thị lỗi.

---

# 4. HTML

```html
<div class="max-w-md mx-auto p-6">
  <h1 class="text-2xl font-bold mb-6">Đăng ký</h1>

  <form [formGroup]="registerForm" (ngSubmit)="submitForm()" class="space-y-4">
    <div>
      <label>Tên</label>

      <input class="w-full border rounded p-2" formControlName="name" />

      @if(registerForm.get('name')?.touched && registerForm.get('name')?.invalid){

      <p class="text-red-500 text-sm">Vui lòng nhập tên</p>

      }
    </div>

    <div>
      <label>Email</label>

      <input class="w-full border rounded p-2" type="email" formControlName="email" />

      @if(registerForm.get('email')?.touched && registerForm.get('email')?.invalid){

      <p class="text-red-500 text-sm">Email không hợp lệ</p>

      }
    </div>

    <div>
      <label>Mật khẩu</label>

      <input class="w-full border rounded p-2" type="password" formControlName="password" />

      @if(registerForm.get('password')?.touched && registerForm.get('password')?.invalid){

      <p class="text-red-500 text-sm">Mật khẩu tối thiểu 6 ký tự</p>

      }
    </div>

    @if(error){
    <div class="text-red-500">{{ error }}</div>
    }

    <button class="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400" [disabled]="loading">{{ loading ? "Đang đăng ký..." : "Đăng ký" }}</button>
  </form>
</div>
```

---

# 5. Kết quả

Khi form chưa hợp lệ:

- Không gọi API
- Hiển thị lỗi

Khi hợp lệ:

```text
POST /register
```

Nếu thành công:

```text
Đăng ký thành công
↓

Chuyển sang Login
```

Nếu thất bại:

```text
Đăng ký thất bại
```

---

# Bài tập

## Bài 1

Thêm trường **Confirm Password**

Yêu cầu:

- Bắt buộc nhập
- Phải giống Password

---

## Bài 2

Sau khi đăng ký thành công:

```ts
this.registerForm.reset();
```

---

## Bài 3

Hiển thị thông báo:

```
Email đã tồn tại
```

nếu API trả về lỗi.

---

## Bài 4

Thêm nút:

```
Đã có tài khoản? Đăng nhập
```

Khi nhấn:

```ts
this.router.navigateByUrl("/login");
```

---

# Tổng kết

Sau buổi học, sinh viên đã biết:

- Tạo Reactive Form
- Sử dụng Validators
- Kiểm tra dữ liệu trước khi gọi API
- Gọi API bằng HttpClient
- Hiển thị Loading
- Hiển thị lỗi từ API
- Điều hướng sang trang Login
