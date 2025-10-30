/**
 * Phiendichvien Manager - Handles interpreter listing, filtering, and booking
 */
class PhiendichvienManager {
  constructor() {
    this.interpreters = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        languages: ["Tiếng Anh", "Tiếng Việt"],
        specializations: ["Hội nghị", "Kinh doanh"],
        experience: "10+ năm",
        rating: 4.9,
        status: "available",
        about: "Thông dịch viên chuyên nghiệp với hơn 10 năm kinh nghiệm trong các hội nghị quốc tế và sự kiện kinh doanh. Đã phục vụ cho hơn 200 sự kiện lớn nhỏ.",
        education: "Thạc sĩ Ngôn ngữ học - Đại học Hà Nội",
        certifications: ["Chứng chỉ thông dịch viên cấp cao", "IELTS 8.5", "TOEFL 115"],
        reviews: [
          { author: "Công ty ABC", date: "15/10/2025", content: "Rất chuyên nghiệp và chuẩn xác trong việc truyền đạt thông tin.", rating: 5 },
          { author: "Tổ chức XYZ", date: "10/10/2025", content: "Dịch thuật mượt mà, dễ hiểu, giúp hội thảo thành công tốt đẹp.", rating: 5 }
        ]
      },
      {
        id: 2,
        name: "Trần Thị B",
        languages: ["Tiếng Trung", "Tiếng Việt"],
        specializations: ["Kinh doanh", "Kỹ thuật"],
        experience: "5 năm",
        rating: 4.7,
        status: "available",
        about: "Chuyên gia phiên dịch tiếng Trung với kinh nghiệm trong các lĩnh vực kinh doanh và kỹ thuật. Có khả năng xử lý các thuật ngữ chuyên ngành phức tạp.",
        education: "Cử nhân Tiếng Trung - Đại học Ngoại ngữ",
        certifications: ["HSK 6", "Chứng chỉ thông dịch viên thương mại"],
        reviews: [
          { author: "Công ty TNHH DEF", date: "12/10/2025", content: "Phiên dịch viên nhiệt tình và có kiến thức sâu về kỹ thuật.", rating: 5 },
          { author: "Doanh nghiệp GHI", date: "08/10/2025", content: "Giúp chúng tôi đàm phán thành công với đối tác Trung Quốc.", rating: 4 }
        ]
      },
      {
        id: 3,
        name: "Lê Văn C",
        languages: ["Tiếng Nhật", "Tiếng Việt"],
        specializations: ["Kỹ thuật", "Giáo dục"],
        experience: "6 năm",
        rating: 4.8,
        status: "busy",
        about: "Thông dịch viên tiếng Nhật chuyên sâu về lĩnh vực kỹ thuật và giáo dục. Đã có thời gian học tập và làm việc tại Nhật Bản.",
        education: "Thạc sĩ Kỹ thuật - Đại học Tokyo",
        certifications: ["JLPT N1", "Chứng chỉ thông dịch kỹ thuật"],
        reviews: [
          { author: "Công ty công nghệ JKL", date: "14/10/2025", content: "Hiểu biết sâu về thuật ngữ kỹ thuật Nhật Bản.", rating: 5 },
          { author: "Trung tâm đào tạo MNO", date: "05/10/2025", content: "Giúp các buổi đào tạo diễn ra suôn sẻ.", rating: 5 }
        ]
      },
      {
        id: 4,
        name: "Phạm Thị D",
        languages: ["Tiếng Hàn", "Tiếng Việt"],
        specializations: ["Kinh doanh", "Y tế"],
        experience: "8 năm",
        rating: 4.9,
        status: "available",
        about: "Chuyên gia phiên dịch tiếng Hàn với kinh nghiệm trong các lĩnh vực kinh doanh và y tế. Đã phục vụ cho nhiều bệnh viện và công ty Hàn Quốc tại Việt Nam.",
        education: "Cử nhân Y khoa - Đại học Y Hà Nội",
        certifications: ["TOPIK Level 6", "Chứng chỉ thông dịch y tế"],
        reviews: [
          { author: "Bệnh viện PQR", date: "13/10/2025", content: "Chuyên nghiệp và hiểu biết về thuật ngữ y tế.", rating: 5 },
          { author: "Công ty STU", date: "09/10/2025", content: "Giúp chúng tôi làm việc hiệu quả với đối tác Hàn Quốc.", rating: 5 }
        ]
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        languages: ["Tiếng Pháp", "Tiếng Việt"],
        specializations: ["Pháp lý", "Giáo dục"],
        experience: "4 năm",
        rating: 4.6,
        status: "available",
        about: "Thông dịch viên tiếng Pháp chuyên sâu về lĩnh vực pháp lý và giáo dục. Có kinh nghiệm làm việc với các tổ chức quốc tế.",
        education: "Cử nhân Luật - Đại học Luật Hà Nội",
        certifications: ["DALF C2", "Chứng chỉ thông dịch pháp lý"],
        reviews: [
          { author: "Luật sư VWX", date: "11/10/2025", content: "Chính xác trong việc dịch thuật các tài liệu pháp lý.", rating: 5 },
          { author: "Trường học YZA", date: "07/10/2025", content: "Giúp các buổi đào tạo quốc tế thành công.", rating: 4 }
        ]
      },
      {
        id: 6,
        name: "Vũ Thị F",
        languages: ["Tiếng Đức", "Tiếng Việt"],
        specializations: ["Kỹ thuật", "Y tế"],
        experience: "2 năm",
        rating: 4.5,
        status: "available",
        about: "Thông dịch viên tiếng Đức trẻ nhưng đầy nhiệt huyết, chuyên về lĩnh vực kỹ thuật và y tế. Có khả năng học hỏi nhanh và thích ứng tốt.",
        education: "Cử nhân Kỹ thuật Y sinh - Đại học Bách khoa",
        certifications: ["TestDaF C1", "Chứng chỉ thông dịch kỹ thuật cơ bản"],
        reviews: [
          { author: "Công ty BCD", date: "06/10/2025", content: "Năng lực tốt và có tinh thần học hỏi cao.", rating: 4 },
          { author: "Bệnh viện EFG", date: "04/10/2025", content: "Tiềm năng phát triển lớn trong tương lai.", rating: 5 }
        ]
      }
    ];

    this.filteredInterpreters = [...this.interpreters];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderInterpreters();
  }

  setupEventListeners() {
    // Filter listeners
    document.getElementById('languageFilter').addEventListener('change', () => this.applyFilters());
    document.getElementById('specializationFilter').addEventListener('change', () => this.applyFilters());
    document.getElementById('experienceFilter').addEventListener('change', () => this.applyFilters());

    // Modal listeners
    document.querySelectorAll('.view-profile').forEach(button => {
      button.addEventListener('click', (e) => {
        const interpreterId = parseInt(e.target.dataset.interpreterId);
        this.showInterpreterProfile(interpreterId);
      });
    });

    document.querySelectorAll('.book-interpreter').forEach(button => {
      button.addEventListener('click', (e) => {
        const interpreterId = parseInt(e.target.dataset.interpreterId);
        this.showBookingForm(interpreterId);
      });
    });

    // Modal close listeners
    document.querySelectorAll('.modal__close').forEach(button => {
      button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        this.closeModal(modal);
      });
    });

    document.querySelectorAll('.modal__overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        this.closeModal(modal);
      });
    });

    // Booking form listeners
    document.getElementById('closeProfileBtn').addEventListener('click', () => {
      this.closeModal(document.getElementById('interpreterModal'));
    });

    document.getElementById('bookInterpreterBtn').addEventListener('click', () => {
      const profileModal = document.getElementById('interpreterModal');
      const interpreterId = profileModal.dataset.interpreterId;
      this.closeModal(profileModal);
      this.showBookingForm(interpreterId);
    });

    document.getElementById('cancelBookingBtn').addEventListener('click', () => {
      this.closeModal(document.getElementById('bookingModal'));
    });

    document.getElementById('submitBookingBtn').addEventListener('click', () => {
      this.submitBooking();
    });

    // Load more button
    document.getElementById('loadMoreInterpreters').addEventListener('click', () => {
      this.loadMoreInterpreters();
    });
  }

  applyFilters() {
    const languageFilter = document.getElementById('languageFilter').value;
    const specializationFilter = document.getElementById('specializationFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;

    this.filteredInterpreters = this.interpreters.filter(interpreter => {
      // Language filter
      if (languageFilter !== 'all') {
        const languageMap = {
          'english': 'Tiếng Anh',
          'chinese': 'Tiếng Trung',
          'japanese': 'Tiếng Nhật',
          'korean': 'Tiếng Hàn',
          'french': 'Tiếng Pháp',
          'german': 'Tiếng Đức'
        };
        
        if (!interpreter.languages.includes(languageMap[languageFilter])) {
          return false;
        }
      }

      // Specialization filter
      if (specializationFilter !== 'all') {
        const specializationMap = {
          'conference': 'Hội nghị',
          'business': 'Kinh doanh',
          'technical': 'Kỹ thuật',
          'medical': 'Y tế',
          'legal': 'Pháp lý',
          'education': 'Giáo dục'
        };
        
        if (!interpreter.specializations.includes(specializationMap[specializationFilter])) {
          return false;
        }
      }

      // Experience filter
      if (experienceFilter !== 'all') {
        const expYears = parseInt(interpreter.experience);
        
        switch (experienceFilter) {
          case 'junior':
            if (expYears < 1 || expYears > 3) return false;
            break;
          case 'senior':
            if (expYears < 3 || expYears > 7) return false;
            break;
          case 'expert':
            if (expYears <= 7) return false;
            break;
        }
      }

      return true;
    });

    this.renderInterpreters();
  }

  renderInterpreters() {
    const grid = document.getElementById('interpretersGrid');
    grid.innerHTML = '';

    if (this.filteredInterpreters.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <h3>Không tìm thấy phiên dịch viên phù hợp</h3>
          <p>Vui lòng thử lại với bộ lọc khác</p>
        </div>
      `;
      return;
    }

    this.filteredInterpreters.forEach(interpreter => {
      const card = this.createInterpreterCard(interpreter);
      grid.appendChild(card);
    });
    
    // Refresh scroll animations for newly added elements
    if (window.scrollEffects) {
      window.scrollEffects.refreshScrollElements();
    }
  }

  createInterpreterCard(interpreter) {
    const card = document.createElement('div');
    card.className = 'interpreter-card fade-in-up';
    card.dataset.language = this.getLanguageCode(interpreter.languages);
    card.dataset.specialization = this.getSpecializationCode(interpreter.specializations);
    card.dataset.experience = this.getExperienceCode(interpreter.experience);

    const statusClass = interpreter.status === 'available' ? 'available' : 'busy';
    const statusText = interpreter.status === 'available' ? 'Sẵn sàng' : 'Bận';
    const bookDisabled = interpreter.status === 'busy' ? 'disabled' : '';

    card.innerHTML = `
      <div class="interpreter-avatar">
        <img src="images/interpreters/interpreter${interpreter.id}.jpg" alt="${interpreter.name}">
        <div class="interpreter-status ${statusClass}">${statusText}</div>
      </div>
      <div class="interpreter-info">
        <h3 class="interpreter-name">${interpreter.name}</h3>
        <div class="interpreter-languages">
          ${interpreter.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
        </div>
        <div class="interpreter-specialization">
          ${interpreter.specializations.map(spec => `<span class="specialization-tag">${spec}</span>`).join('')}
        </div>
        <div class="interpreter-experience">
          <span>Kinh nghiệm:</span>
          <span>${interpreter.experience}</span>
        </div>
        <div class="interpreter-rating">
          <div class="stars">
            ${this.generateStars(interpreter.rating)}
          </div>
          <span class="rating-text">(${interpreter.rating}/5.0)</span>
        </div>
        <div class="interpreter-actions">
          <button class="btn btn--primary btn--small view-profile" data-interpreter-id="${interpreter.id}">Xem hồ sơ</button>
          <button class="btn btn--ghost btn--small book-interpreter" data-interpreter-id="${interpreter.id}" ${bookDisabled}>Đặt lịch</button>
        </div>
      </div>
    `;

    // Add event listeners to the new buttons
    card.querySelector('.view-profile').addEventListener('click', () => {
      this.showInterpreterProfile(interpreter.id);
    });

    card.querySelector('.book-interpreter').addEventListener('click', () => {
      if (interpreter.status === 'available') {
        this.showBookingForm(interpreter.id);
      }
    });

    return card;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<span class="star">★</span>';
    }

    if (hasHalfStar) {
      stars += '<span class="star">☆</span>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<span class="star">☆</span>';
    }

    return stars;
  }

  getLanguageCode(languages) {
    const languageMap = {
      'Tiếng Anh': 'english',
      'Tiếng Trung': 'chinese',
      'Tiếng Nhật': 'japanese',
      'Tiếng Hàn': 'korean',
      'Tiếng Pháp': 'french',
      'Tiếng Đức': 'german'
    };

    for (const lang of languages) {
      if (languageMap[lang]) {
        return languageMap[lang];
      }
    }
    return 'other';
  }

  getSpecializationCode(specializations) {
    const specMap = {
      'Hội nghị': 'conference',
      'Kinh doanh': 'business',
      'Kỹ thuật': 'technical',
      'Y tế': 'medical',
      'Pháp lý': 'legal',
      'Giáo dục': 'education'
    };

    return specializations.map(spec => specMap[spec] || 'other').join(',');
  }

  getExperienceCode(experience) {
    const expYears = parseInt(experience);
    
    if (expYears < 3) return 'junior';
    if (expYears <= 7) return 'senior';
    return 'expert';
  }

  showInterpreterProfile(interpreterId) {
    const interpreter = this.interpreters.find(i => i.id === interpreterId);
    if (!interpreter) return;

    const modal = document.getElementById('interpreterModal');
    modal.dataset.interpreterId = interpreterId;

    // Update profile content
    document.getElementById('profileImage').src = `images/interpreters/interpreter${interpreter.id}.jpg`;
    document.getElementById('profileImage').alt = interpreter.name;
    
    const statusElement = document.getElementById('profileStatus');
    statusElement.className = `interpreter-status ${interpreter.status}`;
    statusElement.textContent = interpreter.status === 'available' ? 'Sẵn sàng' : 'Bận';
    
    document.getElementById('profileName').textContent = interpreter.name;
    
    // Languages
    const languagesContainer = document.getElementById('profileLanguages');
    languagesContainer.innerHTML = interpreter.languages.map(lang => 
      `<span class="language-tag">${lang}</span>`
    ).join('');
    
    // Rating
    const ratingContainer = document.getElementById('profileRating');
    ratingContainer.innerHTML = `
      <div class="stars">${this.generateStars(interpreter.rating)}</div>
      <span class="rating-text">(${interpreter.rating}/5.0)</span>
    `;
    
    // About
    document.getElementById('profileAbout').textContent = interpreter.about;
    
    // Specializations
    const specContainer = document.getElementById('profileSpecialization');
    specContainer.innerHTML = interpreter.specializations.map(spec => 
      `<span class="specialization-tag">${spec}</span>`
    ).join('');
    
    // Experience
    document.getElementById('profileExperience').textContent = interpreter.experience;
    
    // Education
    document.getElementById('profileEducation').textContent = interpreter.education;
    
    // Certifications
    const certContainer = document.getElementById('profileCertifications');
    certContainer.innerHTML = interpreter.certifications.map(cert => 
      `<div class="certification-item">${cert}</div>`
    ).join('');
    
    // Reviews
    const reviewsContainer = document.getElementById('profileReviews');
    reviewsContainer.innerHTML = interpreter.reviews.map(review => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-author">${review.author}</span>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="review-content">${review.content}</div>
        <div class="review-rating">
          <div class="stars">${this.generateStars(review.rating)}</div>
        </div>
      </div>
    `).join('');

    this.openModal(modal);
  }

  showBookingForm(interpreterId) {
    const interpreter = this.interpreters.find(i => i.id === interpreterId);
    if (!interpreter || interpreter.status !== 'available') return;

    const modal = document.getElementById('bookingModal');
    document.getElementById('bookingInterpreter').value = interpreter.name;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingInterpreter').value = interpreter.name;

    this.openModal(modal);
  }

  submitBooking() {
    const form = document.getElementById('bookingForm');
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const bookingData = {
      interpreter: formData.get('interpreter'),
      date: formData.get('date'),
      time: formData.get('time'),
      duration: formData.get('duration'),
      eventType: formData.get('eventType'),
      location: formData.get('location'),
      notes: formData.get('notes'),
      contact: formData.get('contact'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    // Here you would normally send the data to a server
    console.log('Booking data:', bookingData);
    
    // Show success notification
    this.showNotification('Yêu cầu đặt lịch đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
    
    // Close modal
    this.closeModal(document.getElementById('bookingModal'));
  }

  loadMoreInterpreters() {
    // In a real application, this would load more interpreters from a server
    // For now, we'll just show a notification
    this.showNotification('Đã tải tất cả phiên dịch viên có sẵn!', 'info');
  }

  openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// Initialize the phiendichvien manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the phiendichvien page
  if (document.getElementById('phiendichvien')) {
    window.phiendichvienManager = new PhiendichvienManager();
  }
});