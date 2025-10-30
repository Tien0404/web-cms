# Hướng Dẫn Sử Dụng Scroll Animations

## Tổng Quan

Bộ scroll animations này cung cấp nhiều hiệu ứng cuộn mượt mà và chuyên nghiệp cho website VGBC. Hệ thống bao gồm cả JavaScript và CSS để tạo ra các hiệu ứng động khi người dùng cuộn trang.

## Cài Đặt

### 1. Thêm CSS

```html
<link rel="stylesheet" href="css/scroll-animations.css" />
```

### 2. Thêm JavaScript

```html
<script src="js/scroll-effects.js"></script>
<script src="js/scroll-effects-enhanced.js"></script>
```

## Các Loại Hiệu Ứng

### 1. Fade Animations (Hiệu ứng mờ dần)

#### Classes có sẵn:
- `fade-in-up` - Xuất hiện từ dưới lên
- `fade-in-down` - Xuất hiện từ trên xuống
- `fade-in-left` - Xuất hiện từ bên trái
- `fade-in-right` - Xuất hiện từ bên phải
- `fade-in` - Mờ dần tại chỗ

#### Ví dụ sử dụng:
```html
<div class="fade-in-up">Nội dung sẽ xuất hiện từ dưới lên</div>
<div class="fade-in-left delay-200">Nội dung xuất hiện từ trái sau 200ms</div>
```

### 2. Slide Animations (Hiệu ứng trượt)

#### Classes có sẵn:
- `slide-in-left` - Trượt từ bên trái
- `slide-in-right` - Trượt từ bên phải
- `slide-in-up` - Trượt từ dưới lên
- `slide-in-down` - Trượt từ trên xuống

#### Ví dụ sử dụng:
```html
<div class="slide-in-left">Trượt từ trái</div>
<div class="slide-in-up delay-300">Trượt từ dưới lên sau 300ms</div>
```

### 3. Scale Animations (Hiệu ứng thu phóng)

#### Classes có sẵn:
- `scale-in` - Thu phóng từ nhỏ đến bình thường
- `scale-in-up` - Thu phóng và di chuyển lên
- `zoom-in` - Zoom in mạnh mẽ
- `zoom-in-rotate` - Zoom kết hợp xoay

#### Ví dụ sử dụng:
```html
<div class="scale-in">Thu phóng tại chỗ</div>
<div class="zoom-in">Zoom in mạnh mẽ</div>
```

### 4. Rotate & Flip Animations (Hiệu ứng xoay và lật)

#### Classes có sẵn:
- `rotate-in` - Xoay khi xuất hiện
- `rotate-in-left` - Xoay từ trái
- `rotate-in-right` - Xoay từ phải
- `flip-in` - Lật 3D theo trục Y
- `flip-in-x` - Lật 3D theo trục X

#### Ví dụ sử dụng:
```html
<div class="rotate-in">Xoay khi xuất hiện</div>
<div class="flip-in">Lật 3D</div>
```

### 5. Special Effects (Hiệu ứng đặc biệt)

#### Classes có sẵn:
- `bounce-in` - Nảy khi xuất hiện
- `elastic-in` - Đàn hồi khi xuất hiện

#### Ví dụ sử dụng:
```html
<div class="bounce-in">Hiệu ứng nảy</div>
<div class="elastic-in">Hiệu ứng đàn hồi</div>
```

## Tùy Chỉnh Hiệu Ứng

### 1. Delay (Độ trễ)

Sử dụng classes delay để điều chỉnh thời gian xuất hiện:

```html
<div class="fade-in-up delay-100">Trễ 100ms</div>
<div class="fade-in-up delay-200">Trễ 200ms</div>
<div class="fade-in-up delay-300">Trễ 300ms</div>
<div class="fade-in-up delay-400">Trễ 400ms</div>
<div class="fade-in-up delay-500">Trễ 500ms</div>
```

### 2. Duration (Thời lượng)

Sử dụng classes duration để điều chỉnh thời gian animation:

```html
<div class="fade-in-up duration-slow">Chậm (1s)</div>
<div class="fade-in-up duration-normal">Bình thường (0.6s)</div>
<div class="fade-in-up duration-fast">Nhanh (0.3s)</div>
```

### 3. Easing (Độ mượt)

Sử dụng classes easing để điều chỉnh độ mượt của animation:

```html
<div class="fade-in-up ease-linear">Linear</div>
<div class="fade-in-up ease-ease-in">Ease In</div>
<div class="fade-in-up ease-ease-out">Ease Out</div>
<div class="fade-in-up ease-ease-in-out">Ease In Out</div>
<div class="fade-in-up ease-cubic-bezier">Cubic Bezier</div>
```

### 4. Data Attributes (Tùy chỉnh nâng cao)

Sử dụng data attributes để tùy chỉnh chi tiết:

```html
<div class="fade-in-up" 
     data-animation-delay="250ms" 
     data-animation-duration="0.8s" 
     data-animation-easing="ease-out">
  Tùy chỉnh nâng cao
</div>
```

## Staggered Animations (Hiệu ứng nối tiếp)

### 1. Stagger Fade In

```html
<div class="stagger-fade-in">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

### 2. Stagger Slide Up

```html
<div class="stagger-slide-up" data-stagger-delay="150">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

### 3. Stagger Slide Left

```html
<div class="stagger-slide-left" data-stagger-delay="100">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

## Counter Animations (Đếm số)

### Cách sử dụng:

```html
<div class="counter" 
     data-counter-target="1500" 
     data-counter-suffix="+" 
     data-counter-prefix="$" 
     data-counter-duration="2000">
  0
</div>
```

### Các data attributes:

- `data-counter-target` - Số đích đến
- `data-counter-suffix` - Hậu tố (ví dụ: "+", "%", "k")
- `data-counter-prefix` - Tiền tố (ví dụ: "$", "€")
- `data-counter-duration` - Thời gian đếm (ms)

### Ví dụ thực tế:

```html
<div class="stat-number counter" data-counter-target="98" data-counter-suffix="%">0</div>
<div class="counter" data-counter-target="1500" data-counter-suffix="+">0</div>
<div class="counter" data-counter-target="50000" data-counter-prefix="$" data-counter-duration="3000">0</div>
```

## Parallax Effects (Hiệu ứng parallax)

### 1. Parallax Background

```html
<section class="parallax-bg" 
         data-parallax-speed="0.5" 
         data-parallax-direction="vertical"
         style="background-image: url('image.jpg')">
  Nội dung section
</section>
```

### 2. Parallax Element

```html
<div class="parallax-element" 
     data-parallax-speed="0.3" 
     data-parallax-direction="vertical">
  Element sẽ di chuyển khi scroll
</div>
```

### Các data attributes:

- `data-parallax-speed` - Tốc độ parallax (0.1 - 1.0)
- `data-parallax-direction` - Hướng di chuyển ("vertical" hoặc "horizontal")

## Reveal Animations (Hiệu ứng lộ ra)

### 1. Reveal From Left

```html
<div class="reveal-section reveal-left">
  <h3>Tiêu đề</h3>
  <p>Nội dung sẽ lộ ra từ bên trái</p>
</div>
```

### 2. Reveal From Right

```html
<div class="reveal-section reveal-right">
  <h3>Tiêu đề</h3>
  <p>Nội dung sẽ lộ ra từ bên phải</p>
</div>
```

### 3. Reveal From Bottom

```html
<div class="reveal-section reveal-up">
  <h3>Tiêu đề</h3>
  <p>Nội dung sẽ lộ ra từ dưới lên</p>
</div>
```

### 4. Reveal From Top

```html
<div class="reveal-section reveal-down">
  <h3>Tiêu đề</h3>
  <p>Nội dung sẽ lộ ra từ trên xuống</p>
</div>
```

## Video Scroll Animations

### 1. Auto Play on Scroll

```html
<video class="video-scroll-play" muted loop>
  <source src="video.mp4" type="video/mp4">
</video>
```

### 2. Video Parallax

```html
<video class="video-parallax" 
       data-parallax-speed="0.2" 
       muted loop autoplay>
  <source src="video.mp4" type="video/mp4">
</video>
```

## Scroll Progress Indicator

Thanh tiến trình scroll được tự động tạo khi load trang. Có thể tùy chỉnh qua CSS:

```css
.scroll-progress {
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #b30000);
}

.scroll-progress-thick {
  height: 5px;
}

.scroll-progress-colored {
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
  animation: gradientShift 3s ease infinite;
}
```

## Hover Effects kết hợp Scroll

### 1. Hover Lift

```html
<div class="hover-lift fade-in-up">
  Nảy lên khi hover và xuất hiện khi scroll
</div>
```

### 2. Hover Scale

```html
<div class="hover-scale slide-in-left">
  Phóng to khi hover và trượt vào khi scroll
</div>
```

### 3. Hover Rotate

```html
<div class="hover-rotate zoom-in">
  Xoay khi hover và zoom in khi scroll
</div>
```

## Responsive Considerations

Các hiệu ứng tự động điều chỉnh cho mobile:

- Khoảng cách di chuyển giảm trên màn hình nhỏ
- Font size counter tự động điều chỉnh
- Tắt parallax trên mobile để tối ưu performance

## Performance Optimization

### 1. GPU Acceleration

```html
<div class="fade-in-up gpu-accelerated">
  Sử dụng GPU acceleration
</div>
```

### 2. Will Change

```html
<div class="slide-in-left will-change-transform">
  Tối ưu cho transform
</div>
```

### 3. Reduced Motion Support

Hệ thống tự động tắt animations khi người dùng chọn "reduced motion" trong hệ điều hành.

## Best Practices

### 1. Sử dụng hợp lý

- Không lạm dụng quá nhiều animation trong cùng một section
- Sử dụng delay để tạo cảm giác tự nhiên
- Kết hợp nhiều loại animation để tạo trải nghiệm đa dạng

### 2. Performance

- Sử dụng `will-change` cho các element phức tạp
- Giới hạn số lượng parallax elements
- Test trên các thiết bị khác nhau

### 3. Accessibility

- Đảm bảo content vẫn readable khi animation đang chạy
- Tôn trọng setting reduced motion của user
- Cung cấp alternative cho người dùng không muốn animation

## Troubleshooting

### 1. Animation không hoạt động

- Kiểm tra đã include đúng file CSS và JS chưa
- Đảm bảo element có class animation đúng
- Kiểm tra console có error không

### 2. Performance kém

- Giảm số lượng animation trên cùng một page
- Sử dụng `will-change` hợp lý
- Test trên mobile devices

### 3. Animation không mượt

- Kiểm tra CSS transitions
- Sử dụng appropriate easing functions
- Tránh thay đổi quá nhiều properties cùng lúc

## Examples

### Example 1: Hero Section

```html
<section class="hero parallax-bg" data-parallax-speed="0.5">
  <div class="hero__content">
    <h1 class="fade-in-up">Tiêu đề chính</h1>
    <p class="fade-in-up delay-200">Mô tả ngắn</p>
    <div class="hero__actions fade-in-up delay-400">
      <button class="btn">Nút chính</button>
      <button class="btn btn-ghost">Nút phụ</button>
    </div>
  </div>
</section>
```

### Example 2: Services Grid

```html
<div class="services-grid stagger-fade-in">
  <div class="service-card stagger-item scale-in">
    <h3>Dịch vụ 1</h3>
    <p>Mô tả dịch vụ 1</p>
  </div>
  <div class="service-card stagger-item slide-in-left">
    <h3>Dịch vụ 2</h3>
    <p>Mô tả dịch vụ 2</p>
  </div>
  <div class="service-card stagger-item slide-in-right">
    <h3>Dịch vụ 3</h3>
    <p>Mô tả dịch vụ 3</p>
  </div>
</div>
```

### Example 3: Statistics Section

```html
<section class="statistics">
  <div class="stat-item fade-in-up">
    <div class="counter stat-number" data-counter-target="500" data-counter-suffix="+">0</div>
    <h4>Projects</h4>
  </div>
  <div class="stat-item fade-in-up delay-200">
    <div class="counter stat-number" data-counter-target="98" data-counter-suffix="%">0</div>
    <h4>Satisfaction</h4>
  </div>
  <div class="stat-item fade-in-up delay-400">
    <div class="counter stat-number" data-counter-target="15" data-counter-suffix="+">0</div>
    <h4>Years</h4>
  </div>
</section>
```

## Kết Luận

Bộ scroll animations này cung cấp đầy đủ công cụ để tạo ra trải nghiệm người dùng mượt mà và chuyên nghiệp. Hãy sử dụng hợp lý và test kỹ trên các thiết bị khác nhau để đảm bảo performance tốt nhất.

Để xem demo đầy đủ, mở file `scroll-animations-demo.html` trong trình duyệt.