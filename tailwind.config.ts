import type {Config} from 'tailwindcss';
export default {
  content:['./src/**/*.{js,ts,jsx,tsx}'],
  theme:{
    extend:{
      colors:{
        ink:'#202a30',
        muted:'#52616a',
        border:'#d9e0e3',
        canvas:'#f3f5f6',
        pine:'#245a46',
        forest:'#193f32',
        ocean:'#1b5b79',
        gold:'#c5913d'
      },
      boxShadow:{
        soft:'0 1px 2px rgba(20,30,35,.035)'
      },
      fontFamily:{
        sans:['Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins:[]
} satisfies Config;
