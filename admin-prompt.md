# AI PROMPT: Tạo Trang Admin Hoàn Chỉnh Cho Website VGBC

## Bối cảnh dự án
Tạo một trang admin hoàn chỉnh cho website VGBC (Vietnam Global Business Council) - một website dịch vụ phiên dịch chuyên nghiệp. Website hiện tại có cấu trúc modular với các component được load động, hỗ trợ đa ngôn ngữ (Việt Nam, Anh, Trung Quốc), và sử dụng JSON files để quản lý dữ liệu.

## Yêu cầu chung
- Tạo trang admin có thể quản lý TOÀN BỘ nội dung website
- Phải tương thích với cấu trúc hiện tại
- Hỗ trợ đa ngôn ngữ (vi, en, zh)
- Có authentication bảo mật
- Responsive design
- Real-time preview
- Backup/restore functionality

## Cấu trúc admin panel cần tạo

### 1. Authentication System
- Login/logout với session management
- Role-based access (Admin, Editor, Viewer)
- Password encryption
- Session timeout
- Activity logging

### 2. Dashboard Overview
- Statistics overview (số lượng dịch vụ, phiên dịch viên, tin tức, blog)
- Recent activities log
- Quick actions
- System status
- Language switcher

### 3. Content Management Modules

#### 3.1 Navigation & Header Management
- Menu items (thêm/sửa/xóa/reorder)
- Navigation structure
- Logo upload/management
- CTA buttons
- Social media links
- Mobile menu configuration

#### 3.2 Hero Section Management
- Hero title/subtitle (đa ngôn ngữ)
- Background image/video upload
- Call-to-action buttons
- VGBC Ecosystem items management
- Styling options

#### 3.3 Services Management
- Services CRUD operations
- Service categories
- Service icons/images
- Descriptions (đa ngôn ngữ)
- Display ordering
- Service featured status

#### 3.4 Interpreters Management
- Interpreter profiles CRUD
- Avatar upload
- Languages & specializations
- Experience & ratings
- Availability status
- Certifications
- Bio information (đa ngôn ngữ)

#### 3.5 About Section Management
- Company information
- Mission/Vision/Values (đa ngôn ngữ)
- Team members
- Statistics
- Background images

#### 3.6 Testimonials Management
- Customer testimonials CRUD
- Author information
- Company details
- Avatar upload
- Ratings
- Display ordering

#### 3.7 News Management
- News articles CRUD
- Categories
- Publish/unpublish
- Featured news
- Image upload
- SEO metadata
- Publishing schedule

#### 3.8 Blog Management
- Blog posts CRUD
- Categories
- Tags
- Author management
- Comments moderation
- Image upload
- SEO optimization

#### 3.9 Contact Management
- Contact information (đa ngôn ngữ)
- Social media links
- Map configuration
- Contact form responses
- Auto-responder settings

#### 3.10 Footer Management
- Footer content (đa ngôn ngữ)
- Quick links
- Service links
- Newsletter settings
- Copyright information

#### 3.11 SEO & Metadata Management
- Page titles (đa ngôn ngữ)
- Meta descriptions
- OG images
- Structured data
- Sitemap generation
- Robots.txt management

#### 3.12 Translation Management
- Complete translation editor
- Import/export translations
- Translation validation
- Missing translations detection
- Bulk translation tools

#### 3.13 Asset Management
- Image upload/organization
- File manager
- Image optimization
- CDN configuration
- Backup assets

#### 3.14 Business Network Management
- Partner companies
- Success stories
- Member programs
- Join requests

### 4. System Configuration

#### 4.1 General Settings
- Website title/tagline
- Default language
- Timezone
- Date format
- Email settings

#### 4.2 Appearance Settings
- Theme customization
- Color schemes
- Typography
- Layout options
- Custom CSS

#### 4.3 Performance Settings
- Caching configuration
- Image optimization
- Minification settings
- CDN settings

### 5. User Management
- User accounts CRUD
- Role assignments
- Permission management
- Activity tracking
- Bulk operations

### 6. Analytics & Reporting
- Page views statistics
- User engagement
- Form submissions
- Popular content
- Export reports

### 7. Backup & Maintenance
- Database backup
- File backup
- Scheduled backups
- Restore functionality
- System logs

## Technical Requirements

### Frontend
- Framework: Vanilla JavaScript hoặc React/Vue
- Styling: Tailwind CSS hoặc Bootstrap 5
- Icons: Font Awesome hoặc Heroicons
- Charts: Chart.js
- Rich text editor: TinyMCE hoặc Quill
- Image upload: Dropzone.js
- Tables: DataTables

### Backend
- PHP 8.0+ với MySQL/MariaDB
- RESTful API design
- JWT authentication
- File upload handling
- Image processing (GD/ImageMagick)
- Email functionality (PHPMailer)
- Caching system

### Security Features
- Input validation & sanitization
- XSS protection
- CSRF protection
- SQL injection prevention
- File upload security
- Rate limiting
- Audit logging

### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    image_url VARCHAR(255),
    display BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service translations
CREATE TABLE service_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    language VARCHAR(5) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE KEY unique_service_lang (service_id, language)
);

-- Interpreters table
CREATE TABLE interpreters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    avatar_url VARCHAR(255),
    experience_years INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    status ENUM('available', 'busy') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Interpreter translations
CREATE TABLE interpreter_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    interpreter_id INT NOT NULL,
    language VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    FOREIGN KEY (interpreter_id) REFERENCES interpreters(id) ON DELETE CASCADE,
    UNIQUE KEY unique_interpreter_lang (interpreter_id, language)
);

-- Interpreter languages
CREATE TABLE interpreter_languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    interpreter_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    FOREIGN KEY (interpreter_id) REFERENCES interpreters(id) ON DELETE CASCADE
);

-- Interpreter specializations
CREATE TABLE interpreter_specializations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    interpreter_id INT NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    FOREIGN KEY (interpreter_id) REFERENCES interpreters(id) ON DELETE CASCADE
);

-- News table
CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    author VARCHAR(100),
    image_url VARCHAR(255),
    category VARCHAR(50),
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- News translations
CREATE TABLE news_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    news_id INT NOT NULL,
    language VARCHAR(5) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
    UNIQUE KEY unique_news_lang (news_id, language)
);

-- Blog posts table
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    author VARCHAR(100),
    image_url VARCHAR(255),
    category VARCHAR(50),
    tags VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog translations
CREATE TABLE blog_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    blog_id INT NOT NULL,
    language VARCHAR(5) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    FOREIGN KEY (blog_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_blog_lang (blog_id, language)
);

-- Testimonials table
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    author_position VARCHAR(100),
    author_company VARCHAR(100),
    avatar_url VARCHAR(255),
    rating INT DEFAULT 5,
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonial translations
CREATE TABLE testimonial_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    testimonial_id INT NOT NULL,
    language VARCHAR(5) NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (testimonial_id) REFERENCES testimonials(id) ON DELETE CASCADE,
    UNIQUE KEY unique_testimonial_lang (testimonial_id, language)
);

-- Activity logs
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Settings table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## File Structure
```
admin/
├── index.html                 # Admin dashboard
├── login.html                 # Login page
├── logout.php                 # Logout handler
├── config/
│   ├── database.php           # Database configuration
│   ├── auth.php               # Authentication functions
│   └── constants.php          # Application constants
├── includes/
│   ├── header.php             # Admin header
│   ├── sidebar.php            # Navigation sidebar
│   └── footer.php             # Admin footer
├── assets/
│   ├── css/
│   │   ├── admin.css          # Main admin styles
│   │   └── components.css     # Component styles
│   ├── js/
│   │   ├── admin.js           # Main admin JavaScript
│   │   ├── dashboard.js       # Dashboard functionality
│   │   ├── content-manager.js # Content management
│   │   └── utils.js           # Utility functions
│   └── images/                # Admin assets
├── modules/
│   ├── dashboard/             # Dashboard module
│   ├── services/              # Services management
│   ├── interpreters/          # Interpreters management
│   ├── news/                  # News management
│   ├── blog/                  # Blog management
│   ├── testimonials/          # Testimonials management
│   ├── translations/          # Translation management
│   ├── assets/                # Asset management
│   ├── users/                 # User management
│   ├── settings/              # System settings
│   └── backup/                # Backup/restore
├── api/
│   ├── auth.php               # Authentication API
│   ├── services.php           # Services API
│   ├── interpreters.php       # Interpreters API
│   ├── news.php               # News API
│   ├── blog.php               # Blog API
│   ├── testimonials.php       # Testimonials API
│   ├── translations.php       # Translations API
│   ├── assets.php             # Asset upload API
│   ├── users.php              # Users API
│   └── settings.php           # Settings API
└── backups/                   # Backup storage
```

## API Endpoints Design

### Authentication
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user info
- POST /api/auth/refresh - Refresh token

### Services
- GET /api/services - List all services
- GET /api/services/{id} - Get service details
- POST /api/services - Create new service
- PUT /api/services/{id} - Update service
- DELETE /api/services/{id} - Delete service

### Interpreters
- GET /api/interpreters - List all interpreters
- GET /api/interpreters/{id} - Get interpreter details
- POST /api/interpreters - Create new interpreter
- PUT /api/interpreters/{id} - Update interpreter
- DELETE /api/interpreters/{id} - Delete interpreter

### News
- GET /api/news - List all news
- GET /api/news/{id} - Get news details
- POST /api/news - Create news article
- PUT /api/news/{id} - Update news article
- DELETE /api/news/{id} - Delete news article

### Blog
- GET /api/blog - List all blog posts
- GET /api/blog/{id} - Get blog post details
- POST /api/blog - Create blog post
- PUT /api/blog/{id} - Update blog post
- DELETE /api/blog/{id} - Delete blog post

### Testimonials
- GET /api/testimonials - List all testimonials
- GET /api/testimonials/{id} - Get testimonial details
- POST /api/testimonials - Create testimonial
- PUT /api/testimonials/{id} - Update testimonial
- DELETE /api/testimonials/{id} - Delete testimonial

### Translations
- GET /api/translations/{lang} - Get translations for language
- PUT /api/translations/{lang} - Update translations
- POST /api/translations/import - Import translations
- GET /api/translations/export - Export translations

### Assets
- POST /api/assets/upload - Upload file
- GET /api/assets - List assets
- DELETE /api/assets/{id} - Delete asset

### Users
- GET /api/users - List all users
- GET /api/users/{id} - Get user details
- POST /api/users - Create user
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Delete user

### Settings
- GET /api/settings - Get all settings
- GET /api/settings/{key} - Get setting value
- PUT /api/settings/{key} - Update setting
- POST /api/settings/bulk - Bulk update settings

## Key Features Implementation

### 1. Real-time Preview
- Live preview of content changes
- Toggle between edit/preview modes
- Mobile/desktop preview options

### 2. Bulk Operations
- Bulk edit/delete content
- Bulk translation updates
- Bulk image uploads
- Import/export functionality

### 3. Version Control
- Content versioning
- Rollback functionality
- Change history
- User attribution

### 4. SEO Optimization
- SEO score indicators
- Meta tag management
- Sitemap generation
- Structured data

### 5. Performance Optimization
- Lazy loading
- Image optimization
- Caching strategies
- Minification

### 6. Security Features
- Input validation
- XSS protection
- CSRF tokens
- Rate limiting
- Audit logging

### 7. User Experience
- Drag & drop interfaces
- Keyboard shortcuts
- Search & filtering
- Pagination
- Loading states
- Error handling

## Integration with Existing System

### 1. JSON File Compatibility
- Maintain compatibility with existing JSON structure
- Sync between database and JSON files
- Fallback to JSON if database unavailable

### 2. Language Manager Integration
- Integrate with existing language-manager.js
- Support for current translation structure
- Maintain translation keys

### 3. Component System
- Work with existing component loading system
- Maintain page structure
- Support dynamic content loading

### 4. API Integration
- Extend existing data-manager.js
- Maintain current API endpoints
- Add new admin-specific endpoints

## Deployment Instructions

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE vgbc_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Import schema
-- Run migration scripts
```

### 2. Configuration
```php
// config/database.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'vgbc_admin');
define('DB_USER', 'username');
define('DB_PASS', 'password');

// config/constants.php
define('ADMIN_URL', '/admin/');
define('UPLOAD_PATH', '../uploads/');
define('BACKUP_PATH', '../backups/');
```

### 3. File Permissions
```bash
chmod 755 admin/
chmod 755 admin/uploads/
chmod 755 admin/backups/
chmod 644 config/database.php
```

### 4. Initial Setup
1. Create admin user account
2. Import existing data from JSON files
3. Configure system settings
4. Test all functionality
5. Set up backup schedule

## Testing Requirements

### 1. Unit Tests
- Database operations
- API endpoints
- Authentication
- Validation functions

### 2. Integration Tests
- Content management workflows
- File upload functionality
- Translation management
- User permissions

### 3. User Acceptance Tests
- Complete content management scenarios
- Multi-user collaboration
- Performance under load
- Mobile responsiveness

## Maintenance & Support

### 1. Regular Tasks
- Database optimization
- Log cleanup
- Backup verification
- Security updates

### 2. Monitoring
- System performance
- Error tracking
- User activity
- Storage usage

### 3. Documentation
- User manual
- Developer documentation
- API documentation
- Troubleshooting guide

## Future Enhancements

### 1. Advanced Features
- Content scheduling
- A/B testing
- Advanced analytics
- AI-powered content suggestions

### 2. Integrations
- Third-party services
- Social media management
- Email marketing
- CRM integration

### 3. Performance
- Advanced caching
- CDN integration
- Database optimization
- Load balancing

---

**Lưu ý quan trọng:**
1. Phải tương thích với cấu trúc hiện tại của website
2. Hỗ trợ đầy đủ đa ngôn ngữ (vi, en, zh)
3. Maintain existing JSON file structure for compatibility
4. Security phải được ưu tiên hàng đầu
5. Responsive design là bắt buộc
6. Cần có backup/restore functionality
7. Performance optimization là quan trọng

Admin panel này sẽ cung cấp giải pháp quản lý nội dung hoàn chỉnh cho website VGBC, cho phép quản lý tất cả các khía cạnh của website một cách hiệu quả và chuyên nghiệp.