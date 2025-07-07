declare module '@/components/ui/button';
declare module '@/auth/authHelper';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  type: 'short_answer' | 'dropdown';
  label: string;
  options?: Option[];
}

export interface FormSchema {
  title: string;
  description: string;
  questions: Question[];
}
