// js/auto-translate.js
class AutoTranslator {
  constructor() {
    this.languages = ['vi', 'en', 'zh'];
  }

  // Hàm mô phỏng dịch (sau này có thể kết nối Google API)
  async translateText(text, lang) {
    if (lang === 'vi') return text;
    if (lang === 'en') return '[EN] ' + text;
    if (lang === 'zh') return '[中文] ' + text;
  }

  // Tạo object chứa nội dung dịch 3 ngôn ngữ
  async createTranslations(entry) {
    const results = {};
    for (const lang of this.languages) {
      results[lang] = {
        id: entry.id,
        title: await this.translateText(entry.title, lang),
        content: await this.translateText(entry.content, lang),
        category: entry.category,
        author: await this.translateText(entry.author, lang),
        date: entry.date,
      };
    }
    return results;
  }

  // Ghi vào 3 file JSON
  async updateJSONFiles(entry) {
    const translations = await this.createTranslations(entry);
    for (const lang of this.languages) {
      const filePath = `../data/${lang}.json`;

      try {
        const response = await fetch(filePath);
        const jsonData = await response.json();

        if (!jsonData.newEntries) jsonData.newEntries = [];
        jsonData.newEntries.push(translations[lang]);

        await fetch(filePath, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData, null, 2),
        });
        console.log(`✅ Đã cập nhật ${lang}.json`);
      } catch (error) {
        console.error(`❌ Không thể cập nhật ${lang}.json:`, error);
      }
    }
  }
}

window.autoTranslator = new AutoTranslator();
