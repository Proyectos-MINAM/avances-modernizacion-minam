import type {Config} from 'tailwindcss';
export default {
  content:['./src/**/*.{js,ts,jsx,tsx}'],
  theme:{
    extend:{
      colors:{
        ink:'#213b42',
        muted:'#637983',
        border:'#e0e9e9',
        canvas:'#f5f8f8',
        pine:'#176a55',
        forest:'#125640',
        ocean:'#1b5b79',
        gold:'#c5913d'
      },
      boxShadow:{
        soft:'0 8px 30px rgba(25,58,61,.05)'
      },
      fontFamily:{
        sans:['Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins:[]
} satisfies Config;
