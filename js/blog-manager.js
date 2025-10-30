// Blog Management System Module
class BlogManager {
  constructor() {
    this.blogs = [];
    this.modal = null;
    this.form = null;
    this.blogGrid = null;
    this.addBlogBtn = null;
    this.saveBlogBtn = null;
    this.cancelBlogBtn = null;
    this.closeModalBtn = null;
    this.translations = {};
  }

  init() {
    // Initialize elements after DOM is ready
    setTimeout(() => {
      this.modal = document.getElementById('blogModal');
      this.form = document.getElementById('blogForm');
      this.blogGrid = document.getElementById('blogGrid');
      this.addBlogBtn = document.getElementById('addBlogBtn');
      this.saveBlogBtn = document.getElementById('saveBlogBtn');
      this.cancelBlogBtn = document.getElementById('cancelBlogBtn');
      this.closeModalBtn = document.querySelector('.modal__close');
      
      // Load initial blogs
      this.loadBlogsFromJSON();
      
      // Event listeners
      if (this.addBlogBtn) {
        this.addBlogBtn.addEventListener('click', () => this.openModal());
      }
      
      if (this.saveBlogBtn) {
        this.saveBlogBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.saveBlog();
        });
      }
      
      if (this.form) {
        this.form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveBlog();
        });
      }
      
      if (this.cancelBlogBtn) {
        this.cancelBlogBtn.addEventListener('click', () => this.closeModal());
      }
      
      if (this.closeModalBtn) {
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
      }
      
      // Close modal when clicking outside
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal || e.target.classList.contains('modal__overlay')) {
            this.closeModal();
          }
        });
      }
      
      // Close modal with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
          this.closeModal();
        }
      });
    }, 100);
  }

  async loadBlogsFromJSON() {
    try {
      // First try to load from localStorage cache
      if (window.blogDataCache) {
        this.blogs = window.blogDataCache.blogs || [];
        this.renderBlogs();
        return;
      }
      
      // Then try to load from localStorage
      const cachedData = localStorage.getItem('vgbc-blog-data');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        this.blogs = data.blogs || [];
        window.blogDataCache = data;
        this.renderBlogs();
        return;
      }
      
      // Finally, load from the original JSON file
      const response = await fetch('data/blog-data.json');
      const data = await response.json();
      this.blogs = data.blogs || [];
      window.blogDataCache = data;
      this.renderBlogs();
    } catch (error) {
      console.error('Error loading blog data:', error);
      // Fallback to default blogs if JSON file fails to load
      const errorTitle = this.translations.errorTitle || 'Không thể tải bài viết';
      const errorMessage = this.translations.errorMessage || 'Đã xảy ra lỗi khi tải dữ liệu bài viết. Vui lòng thử lại sau.';
      
      this.blogs = [
        {
          id: 1,
          title: errorTitle,
          category: 'khac',
          categoryDisplay: this.getCategoryLabel('khac'),
          content: errorMessage,
          image: 'https://picsum.photos/seed/error/400/250.jpg',
          author: 'System',
          date: new Date().toISOString().split('T')[0],
          display: true
        }
      ];
      this.renderBlogs();
    }
    
    // Listen for blog data updates from admin page
    window.addEventListener('blogDataUpdated', (event) => {
      this.blogs = event.detail.blogs || [];
      this.renderBlogs();
    });
  }

  updateTranslations(translations) {
    this.translations = translations.blog || {};
    this.renderBlogs();
    
    // Update button labels in existing blog cards
    document.querySelectorAll('[data-i18n="blog.viewMore"]').forEach(element => {
      if (this.translations.viewMore) {
        element.textContent = this.translations.viewMore;
      }
    });
    
    document.querySelectorAll('[data-i18n="blog.delete"]').forEach(element => {
      if (this.translations.delete) {
        element.textContent = this.translations.delete;
      }
    });
  }

  renderBlogs() {
    if (!this.blogGrid) return;
    
    this.blogGrid.innerHTML = '';
    
    // Filter blogs to only show items with display: true
    const visibleBlogs = this.blogs.filter(article => article.display !== false);
    
    // Sort blogs by date (newest first)
    const sortedBlogs = [...visibleBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedBlogs.length === 0) {
      const noBlogsMessage = this.translations.noBlogs || 'Không có bài viết nào để hiển thị.';
      this.blogGrid.innerHTML = `<p>${noBlogsMessage}</p>`;
      return;
    }
    
    sortedBlogs.forEach(article => {
      const blogCard = this.createBlogCard(article);
      this.blogGrid.appendChild(blogCard);
    });
    
    // Refresh scroll animations for newly added elements
    if (window.scrollEffects) {
      window.scrollEffects.refreshScrollElements();
    }
  }

  createBlogCard(article) {
    const card = document.createElement('article');
    card.className = 'blog-card fade-in-up';
    
    // Use background image style for the image container
    const imageStyle = article.image ? `background-image: url('${article.image}')` : '';
    
    card.innerHTML = `
      <div class="blog-card__image" style="${imageStyle}">
        <div class="blog-card__category">${this.getCategoryLabel(article.category)}</div>
      </div>
      <div class="blog-card__content">
        <h3 class="blog-card__title">${article.title}</h3>
        <p class="blog-card__excerpt">${this.truncateText(article.content, 120)}</p>
        <div class="blog-card__meta">
          <span class="blog-card__author">${article.author}</span>
          <span class="blog-card__date">${this.formatDate(article.date)}</span>
        </div>
        <div class="blog-card__actions">
          <button class="btn btn--ghost btn--small" onclick="blogManager.viewBlog(${article.id})" data-i18n="blog.viewMore">Xem thêm</button>
        </div>
      </div>
    `;
    return card;
  }

  getCategoryLabel(category) {
    // First check if we have a categoryDisplay in the article itself
    if (this.blogs.length > 0) {
      const articleWithCategory = this.blogs.find(article => article.category === category && article.categoryDisplay);
      if (articleWithCategory) {
        return articleWithCategory.categoryDisplay;
      }
    }
    
    // Fall back to translations
    if (this.translations.categories) {
      const categoryMap = {
        'ngon-ngu': this.translations.categories.language,
        'su-kien': this.translations.categories.events,
        'dao-tao': this.translations.categories.training,
        'khac': this.translations.categories.other
      };
      return categoryMap[category] || this.translations.categories.other;
    }
    
    // Final fallback to Vietnamese
    const categories = {
      'ngon-ngu': 'Ngôn ngữ',
      'su-kien': 'Sự kiện',
      'dao-tao': 'Đào tạo',
      'khac': 'Khác'
    };
    return categories[category] || 'Khác';
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const currentLang = document.documentElement.lang || 'vi';
    const locale = currentLang === 'en' ? 'en-US' : currentLang === 'zh' ? 'zh-CN' : 'vi-VN';
    
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (this.form) this.form.reset();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      if (this.form) this.form.reset();
    }
  }

  saveBlog() {
    if (!this.form) return;
    
    // Prevent default form submission
    event.preventDefault();
    
    // Basic form validation
    const title = this.form.querySelector('#blogTitle').value.trim();
    const content = this.form.querySelector('#blogContent').value.trim();
    const author = this.form.querySelector('#blogAuthor').value.trim();
    
    if (!title || !content || !author) {
      const requiredFieldsMessage = this.translations.requiredFields || 'Vui lòng điền đầy đủ các trường bắt buộc!';
      this.showNotification(requiredFieldsMessage, 'error');
      return;
    }
    
    const formData = new FormData(this.form);
    const category = formData.get('category');
    
    // Get category display name
    let categoryDisplay = '';
    if (this.translations.categories) {
      const categoryMap = {
        'ngon-ngu': this.translations.categories.language,
        'su-kien': this.translations.categories.events,
        'dao-tao': this.translations.categories.training,
        'khac': this.translations.categories.other
      };
      categoryDisplay = categoryMap[category] || this.translations.categories.other;
    } else {
      const categories = {
        'ngon-ngu': 'Ngôn ngữ',
        'su-kien': 'Sự kiện',
        'dao-tao': 'Đào tạo',
        'khac': 'Khác'
      };
      categoryDisplay = categories[category] || 'Khác';
    }
    
    const newArticle = {
      id: Date.now(),
      title: formData.get('title'),
      category: category,
      categoryDisplay: categoryDisplay,
      content: formData.get('content'),
      image: formData.get('image') || `https://picsum.photos/seed/blog${Date.now()}/400/250.jpg`,
      author: formData.get('author'),
      date: new Date().toISOString().split('T')[0],
      display: true
    };
    
    this.blogs.push(newArticle);
    
    // Save to localStorage
    try {
      const data = { blogs: this.blogs };
      localStorage.setItem('vgbc-blog-data', JSON.stringify(data));
      window.blogDataCache = data;
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('blogDataUpdated', { detail: data }));
      
      this.renderBlogs();
      this.closeModal();
      
      // Show success message
      const successMessage = this.translations.messages?.added || 'Bài viết đã được thêm thành công!';
      this.showNotification(successMessage, 'success');
    } catch (error) {
      console.error('Error saving blog data:', error);
      const errorMessage = 'Không thể lưu bài viết. Vui lòng thử lại.';
      this.showNotification(errorMessage, 'error');
    }
  }

  viewBlog(id) {
    const article = this.blogs.find(a => a.id === id);
    if (article) {
      // Create a simple modal to view the full article
      const viewModal = document.createElement('div');
      viewModal.className = 'modal active';
      viewModal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content modal__content--large">
          <div class="modal__header">
            <h3>${article.title}</h3>
            <button class="modal__close" aria-label="Đóng">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal__body">
            <div class="blog-article">
              <div class="blog-article__image" style="background-image: url('${article.image}')">
              </div>
              <div class="blog-article__meta">
                <span class="blog-article__category">${this.getCategoryLabel(article.category)}</span>
                <span class="blog-article__author">${this.translations.authorPrefix || 'Tác giả:'} ${article.author}</span>
                <span class="blog-article__date">${this.formatDate(article.date)}</span>
              </div>
              <div class="blog-article__content">
                <p>${article.content}</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(viewModal);
      
      // Close modal handlers
      const closeBtn = viewModal.querySelector('.modal__close');
      const overlay = viewModal.querySelector('.modal__overlay');
      
      const closeModal = () => {
        viewModal.remove();
      };
      
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', closeModal);
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Export for use in other modules
window.BlogManager = BlogManager;