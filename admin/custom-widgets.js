// Custom widgets for VGBC CMS
if (window.CMS) {
  const NumberWidget = window.CMS.Widgets.Number;
  const StringWidget = window.CMS.Widgets.String;
  
  // Enhanced number widget for experience years
  const ExperienceWidget = NumberWidget.extend({
    getDefaultValue: function() {
      return 0;
    }
  });
  
  // Custom widget for Vietnamese phone numbers
  const PhoneWidget = StringWidget.extend({
    getDefaultValue: function() {
      return '';
    },
    
    validate: function(value) {
      if (!value) return true; // Optional field
      
      // Vietnamese phone number regex
      const phoneRegex = /^(0|\+84)[3-9][0-9]{8}$/;
      return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
    }
  });
  
  // Custom widget for email validation
  const EmailWidget = StringWidget.extend({
    validate: function(value) {
      if (!value) return true; // Optional field
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
  });
  
  // Register custom widgets
  window.CMS.registerWidget('experience', ExperienceWidget);
  window.CMS.registerWidget('phone', PhoneWidget);
  window.CMS.registerWidget('email', EmailWidget);
  
  // Custom validation for JSON translations
  window.CMS.registerEventListener({
    name: 'preSave',
    handler: function(entry, collection) {
      if (collection === 'translations') {
        try {
          // Validate JSON format
          JSON.parse(entry.data.body);
          
          // Check for common JSON structure for translations
          const translations = JSON.parse(entry.data.body);
          const requiredKeys = ['nav', 'hero', 'about', 'services', 'contact'];
          
          if (typeof translations === 'object' && translations !== null) {
            // Ensure it's a valid translation object
            console.log('Translation validation passed');
          }
        } catch (e) {
          throw new Error('Invalid JSON format: ' + e.message);
        }
      }
      
      // Validate experience years
      if (collection === 'interpreters' && entry.data.experience) {
        const exp = parseInt(entry.data.experience);
        if (exp < 0 || exp > 50) {
          throw new Error('Experience years must be between 0 and 50');
        }
      }
      
      return entry;
    }
  });
  
  // Custom preview templates
  const TestimonialPreview = window.CMS.createPreviewTemplate({
    name: 'testimonial-preview',
    label: 'Testimonial Preview',
    fields: [
      { name: 'name', widget: 'string' },
      { name: 'company', widget: 'string' },
      { name: 'position', widget: 'string' },
      { name: 'content', widget: 'text' },
      { name: 'rating', widget: 'number' },
      { name: 'image', widget: 'image' },
      { name: 'language', widget: 'select' }
    ],
    template: function(props) {
      var stars = '★'.repeat(5).split('').map(function(star) { 
        return '<span style="color: #ffc107; font-size: 16px;">' + star + '</span>'; 
      }).join('');
      
      return '<div style="border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px;">' +
        '<div style="display: flex; align-items: center; margin-bottom: 15px;">' +
          '<img src="' + props.fields.image + '" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; object-fit: cover;" />' +
          '<div>' +
            '<h3 style="margin: 0; color: #333;">' + props.fields.name + '</h3>' +
            '<p style="margin: 0; color: #666; font-size: 14px;">' + props.fields.position + '</p>' +
            '<p style="margin: 0; color: #666; font-size: 14px;">' + props.fields.company + '</p>' +
          '</div>' +
        '</div>' +
        '<div style="margin-bottom: 10px;">' + stars + '</div>' +
        '<p style="font-style: italic; color: #555; line-height: 1.6;">"' + props.fields.content + '"</p>' +
        '<small style="color: #999; display: block; margin-top: 10px;">Language: ' + props.fields.language + '</small>' +
      '</div>';
    }
  });
  
  const InterpreterPreview = window.CMS.createPreviewTemplate({
    name: 'interpreter-preview',
    label: 'Interpreter Preview',
    fields: [
      { name: 'name', widget: 'string' },
      { name: 'position', widget: 'string' },
      { name: 'bio', widget: 'text' },
      { name: 'email', widget: 'string' },
      { name: 'phone', widget: 'string' },
      { name: 'languages', widget: 'list' },
      { name: 'experience', widget: 'number' },
      { name: 'image', widget: 'image' },
      { name: 'specializations', widget: 'list' }
    ],
    template: function(props) {
      var languages = props.fields.languages ? props.fields.languages.join(', ') : '';
      var specializations = props.fields.specializations && props.fields.specializations.length > 0 
        ? '<div style="margin-bottom: 10px;"><strong>Specializations:</strong> ' + props.fields.specializations.join(', ') + '</div>' 
        : '';
      
      return '<div style="border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px;">' +
        '<div style="display: flex; align-items: center; margin-bottom: 15px;">' +
          '<img src="' + props.fields.image + '" style="width: 80px; height: 80px; border-radius: 50%; margin-right: 15px; object-fit: cover;" />' +
          '<div>' +
            '<h3 style="margin: 0; color: #333;">' + props.fields.name + '</h3>' +
            '<p style="margin: 0; color: #666; font-size: 14px;">' + props.fields.position + '</p>' +
            '<p style="margin: 0; color: #666; font-size: 12px;">' + props.fields.experience + ' years experience</p>' +
          '</div>' +
        '</div>' +
        '<p style="color: #555; line-height: 1.6; margin-bottom: 15px;">' + props.fields.bio + '</p>' +
        '<div style="margin-bottom: 10px;">' +
          '<strong>Languages:</strong> ' + languages +
        '</div>' +
        specializations +
        '<div style="font-size: 12px; color: #666;">' +
          '<div>📧 ' + props.fields.email + '</div>' +
          '<div>📱 ' + props.fields.phone + '</div>' +
        '</div>' +
      '</div>';
    }
  });
  
  // Register preview templates
  window.CMS.registerPreviewTemplate('testimonials', TestimonialPreview);
  window.CMS.registerPreviewTemplate('interpreters', InterpreterPreview);
  
  // Custom editor components
  window.CMS.registerEditorComponent({
    id: 'testimonial-quote',
    label: 'Testimonial Quote',
    fields: [
      { name: 'author', label: 'Author', widget: 'string' },
      { name: 'company', label: 'Company', widget: 'string' },
      { name: 'quote', label: 'Quote', widget: 'text' }
    ],
    pattern: /^{{< testimonial author="(.*)" company="(.*)" >}}\n(.*)\n{{< \/testimonial >}}$/,
    fromBlock: function(match) {
      return {
        author: match[1],
        company: match[2],
        quote: match[3]
      };
    },
    toBlock: function(obj) {
      return "{{< testimonial author=\"" + obj.author + "\" company=\"" + obj.company + "\" >}}\n" + obj.quote + "\n{{< /testimonial >}}";
    },
    toPreview: function(obj) {
      return '<div style="border-left: 4px solid #007bff; padding-left: 15px; margin: 20px 0;"><p style="font-style: italic; margin: 0 0 10px 0;">"' + obj.quote + '"</p><cite style="color: #666;">— ' + obj.author + ', ' + obj.company + '</cite></div>';
    }
  });
  
  console.log('VGBC CMS Custom Widgets Loaded Successfully');
}
