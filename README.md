# Vercel Nano Banana

A modern Next.js 14 application that integrates with the Nano Banana API for AI-powered image generation and editing. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **Text-to-Image Generation**: Create stunning images from text prompts using AI
- **Image-to-Image Editing**: Transform existing images with AI-powered editing
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui components
- **Type Safety**: Full TypeScript support with proper type definitions
- **File Upload**: Support for multiple image formats (JPEG, PNG, WebP, GIF)
- **Error Handling**: Comprehensive error handling and validation
- **Animated Background**: Dithering shader effects for visual appeal

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Nano Banana API key (get one at [nano-banana.com](https://nano-banana.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vercel-nano-banana.git
   cd vercel-nano-banana
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```env
   NANO_BANANA_API_KEY=your-actual-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
├── app/
│   ├── api/generate-image/    # API endpoint for image generation
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── image-combiner.tsx   # Main application component
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🎨 Usage Examples

### Text-to-Image Generation

1. Select "Text to Image" mode
2. Enter a descriptive prompt like:
   - "A cyberpunk cityscape with neon lights at midnight"
   - "A magical forest with glowing mushrooms"
   - "A vintage diner on Route 66 with classic cars"
3. Click "Generate Image"

### Image-to-Image Editing

1. Select "Image Editing" mode  
2. Upload two images (drag & drop or click to browse)
3. Enter editing instructions like:
   - "Make it look like a painting"
   - "Add sunset lighting"
   - "Convert to black and white with red accents"
4. Click "Edit Images"

## 🔧 API Reference

### POST `/api/generate-image`

**Parameters:**
- `mode`: "text-to-image" | "image-editing"
- `prompt`: Text description (max 1000 characters)
- `image1`: File (for image editing mode, max 10MB)
- `image2`: File (for image editing mode, max 10MB)

**Response:**
```json
{
  "url": "https://generated-image-url.jpg",
  "prompt": "your prompt",
  "description": "AI-generated description"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## 🎯 Features in Detail

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp) 
- GIF (.gif)

### File Size Limits
- Maximum file size: 10MB per image
- Automatic validation and user-friendly error messages

### AI Capabilities
- Advanced text-to-image generation
- Intelligent image editing and transformation
- Style transfer and artistic effects
- Object manipulation and scene composition

## 🔒 Security

- Input validation for all file uploads
- File type and size restrictions
- Secure API key handling
- Protection against malicious file uploads

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your GitHub repository to Vercel
   - Add your `NANO_BANANA_API_KEY` in environment variables
   - Deploy automatically

3. **Set Environment Variables**
   In your Vercel dashboard:
   ```
   NANO_BANANA_API_KEY=your-actual-api-key-here
   ```

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS
- Google Cloud Platform

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nano Banana API](https://nano-banana.com) for AI image generation
- [Vercel](https://vercel.com) for hosting and blob storage
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling