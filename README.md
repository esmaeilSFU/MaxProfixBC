# MaxProfix Website

A modern, responsive website for MaxProfix, a professional bathtub repair and reglazing business.

## Features

- Clean, minimalist design
- Fully responsive layout
- Smooth scroll animations
- Interactive before/after image comparison
- Contact form with validation
- Mobile-friendly navigation
- SEO optimized
- Social media integration

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Google Fonts (Inter)
- Formspree for form handling
- Google Maps integration

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/yourusername/maxprofix-website.git
```

2. Navigate to the project directory:

```bash
cd maxprofix-website
```

3. Open `index.html` in your browser or use a local development server.

## Project Structure

```
maxprofix-website/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── assets/            # Images and media files
│   ├── hero-bg.jpg
│   ├── before1.jpg
│   ├── after1.jpg
│   ├── testimonial1.jpg
│   ├── testimonial2.jpg
│   └── favicon.ico
└── README.md          # Project documentation
```

## Customization

### Colors

The color scheme can be modified by changing the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --text-color: #1f2937;
  --light-text: #6b7280;
  --background: #ffffff;
  --light-background: #f3f4f6;
  --border-color: #e5e7eb;
}
```

### Contact Form

To enable form submission:

1. Sign up for a Formspree account
2. Replace the form action URL in `index.html` with your Formspree endpoint
3. Test the form submission

### Google Maps

To update the map location:

1. Go to Google Maps
2. Search for your business location
3. Click "Share" and select "Embed a map"
4. Copy the iframe code and replace the existing map iframe in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/maxprofix-website
