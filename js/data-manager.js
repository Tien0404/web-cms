/**
 * Data Manager - Handles saving data directly to JSON files via API
 */
class DataManager {
  constructor() {
    this.apiEndpoint = 'admin/save-data.php';
    this.apiKey = 'vgbc-admin-key-2024';
  }

  /**
   * Save blog data to JSON file
   * @param {Object} data - The blog data to save
   * @returns {Promise} - Promise that resolves when data is saved
   */
  async saveBlogData(data) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          type: 'blog',
          data: data
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update cache
        window.blogDataCache = data;
        localStorage.setItem('vgbc-blog-data', JSON.stringify(data));
        
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('blogDataUpdated', { detail: data }));
        
        console.log('Blog data saved to JSON file successfully');
        return { success: true, message: result.message };
      } else {
        console.error('Failed to save blog data:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Error saving blog data:', error);
      return { success: false, message: 'Network error: ' + error.message };
    }
  }

  /**
   * Save news data to JSON file
   * @param {Object} data - The news data to save
   * @returns {Promise} - Promise that resolves when data is saved
   */
  async saveNewsData(data) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          type: 'news',
          data: data
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update cache
        window.newsDataCache = data;
        localStorage.setItem('vgbc-news-data', JSON.stringify(data));
        
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('newsDataUpdated', { detail: data }));
        
        console.log('News data saved to JSON file successfully');
        return { success: true, message: result.message };
      } else {
        console.error('Failed to save news data:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Error saving news data:', error);
      return { success: false, message: 'Network error: ' + error.message };
    }
  }

  /**
   * Save translation data to JSON file
   * @param {string} language - The language code (vi, en, zh)
   * @param {Object} data - The translation data to save
   * @returns {Promise} - Promise that resolves when data is saved
   */
  async saveTranslationData(language, data) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          type: `translations_${language}`,
          data: data
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update cache
        window[`translationDataCache_${language}`] = data;
        localStorage.setItem(`vgbc-translation-data-${language}`, JSON.stringify(data));
        
        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('translationDataUpdated', {
          detail: { language, data }
        }));
        
        console.log(`Translation data for ${language} saved to JSON file successfully`);
        return { success: true, message: result.message };
      } else {
        console.error(`Failed to save translation data for ${language}:`, result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error(`Error saving translation data for ${language}:`, error);
      return { success: false, message: 'Network error: ' + error.message };
    }
  }

  /**
   * Load translation data from JSON file
   * @param {string} language - The language code (vi, en, zh)
   * @returns {Promise} - Promise that resolves with the translation data
   */
  async loadTranslationData(language) {
    try {
      // First try to load from cache
      if (window[`translationDataCache_${language}`]) {
        return window[`translationDataCache_${language}`];
      }

      // Then try to load from localStorage
      const cachedData = localStorage.getItem(`vgbc-translation-data-${language}`);
      if (cachedData) {
        const data = JSON.parse(cachedData);
        window[`translationDataCache_${language}`] = data;
        return data;
      }

      // Finally, load from the JSON file
      const response = await fetch(`translations/${language}.json`);
      const data = await response.json();
      window[`translationDataCache_${language}`] = data;
      return data;
    } catch (error) {
      console.error(`Error loading translation data for ${language}:`, error);
      return {};
    }
  }

  /**
   * Load blog data from JSON file
   * @returns {Promise} - Promise that resolves with the blog data
   */
  async loadBlogData() {
    try {
      // First try to load from cache
      if (window.blogDataCache) {
        return window.blogDataCache;
      }

      // Then try to load from localStorage
      const cachedData = localStorage.getItem('vgbc-blog-data');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        window.blogDataCache = data;
        return data;
      }

      // Finally, load from the JSON file
      const response = await fetch('data/blog-data.json');
      const data = await response.json();
      window.blogDataCache = data;
      return data;
    } catch (error) {
      console.error('Error loading blog data:', error);
      return { blogs: [] };
    }
  }

  /**
   * Load news data from JSON file
   * @returns {Promise} - Promise that resolves with the news data
   */
  async loadNewsData() {
    try {
      // First try to load from cache
      if (window.newsDataCache) {
        return window.newsDataCache;
      }

      // Then try to load from localStorage
      const cachedData = localStorage.getItem('vgbc-news-data');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        window.newsDataCache = data;
        return data;
      }

      // Finally, load from the JSON file
      const response = await fetch('data/news-data.json');
      const data = await response.json();
      window.newsDataCache = data;
      return data;
    } catch (error) {
      console.error('Error loading news data:', error);
      return { news: [] };
    }
  }
}

// Export for use in other modules
window.DataManager = DataManager;