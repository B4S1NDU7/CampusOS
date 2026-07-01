import { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

const features = [
  { label: 'Study Assistant', endpoint: '/ai/ask' },
  { label: 'Exam Questions', endpoint: '/ai/questions' },
  { label: 'Assignment Feedback', endpoint: '/ai/assignment-feedback' },
  { label: 'GPA Prediction', endpoint: '/ai/gpa-prediction' },
  { label: 'Dropout Risk', endpoint: '/ai/dropout-risk' },
  { label: 'Course Recommendations', endpoint: '/ai/course-recommendations' }
];

export const AI = () => {
  const [active, setActive] = useState(features[0]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post(active.endpoint, { prompt });
      setResponse(res.data.text);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'AI request failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Academic Assistant</h1>
        <p className="mt-1 text-sm text-gray-500">Use the same assistant endpoint family for studying, forecasting, risk analysis, and academic recommendations.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {features.map((feature) => (
              <Button key={feature.endpoint} variant={feature.endpoint === active.endpoint ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setActive(feature)}>
                <Bot className="mr-2 h-4 w-4" />
                {feature.label}
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{active.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={submit} className="flex gap-2">
              <Input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Enter academic context or a question" required />
              <Button type="submit" disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </form>
            <div className="min-h-64 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
              {response || 'AI output will appear here.'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
