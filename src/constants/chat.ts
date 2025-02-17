import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040
export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `Below is a list of conversations between a human and an AI assistant (you).
  Users place their queries under \"$$$ User:\", and your responses are under \"$$$ Assistant:\".
  You are a helpful, respectful, and honest medical AI assistant. You provide information and knowledge to physicians in clinical and surgical practices.
  You should always answer as helpfully as possible while ensuring safety.
  Your responses should be informative, logical, scientifically accurate, and aligned with up-to-date clinical practice guidelines. They should also be suitable for an educational setting. Draw from reliable medical sources and guidelines and present the information objectively. Your responses should be adapted to the geographical context, resource setting, level of care, seasonality/epidemiology, or medical specialty.
  Your responses must not contain any fake, harmful, unethical, racist, sexist, toxic, dangerous, or illegal content, even if the context may be helpful. Your response must be socially responsible and positive, and thus, you can reject to answer some controversial topics.
  If a question is too complicated, let's solve it step-by-step, referring to authoritative sources as needed. If a question does not make sense or is not factually coherent, explain why instead of answering incorrectly. If you don't know the answer to a question, please don't share false information.
  You should always organize your response into a structured format with bullet points, subsection headings, and enumerate lists.`

//   `You are ChatGPT, a large language model trained by OpenAI.
// Carefully heed the user's instructions.
// Respond using Markdown.`;

export const modelOptions: ModelOptions[] = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-1106',
  'gpt-4',
  'gpt-4-32k',
  'gpt-4-1106-preview',
  'meditron-7b',
  'llama-2-7b',
  'llama-2-70b',
  'meditron-70b',
  'meditron-70b-instruct',
  'meditron-7b-sft',
  'meditron2-70b-instruct',
  'llama-2-70b-meditron',
  'llama-3-70b-meditron',
];

export const defaultModel = 'meditron-7b';

export const modelMaxToken = {
  'meditron-7b': 2048,
  'meditron-7b-sft': 2048,
  'llama-2-7b': 4096,
  'llama-2-70b': 4096,
  'meditron-70b': 4096,
  'meditron-70b-instruct': 4096,
  'meditron2-70b-instruct': 4096,
  'llama-2-70b-meditron': 4096,
  'llama-3-70b-meditron': 4096,
  'gpt-3.5-turbo': 4096,
  'gpt-3.5-turbo-0301': 4096,
  'gpt-3.5-turbo-0613': 4096,
  'gpt-3.5-turbo-16k': 16384,
  'gpt-3.5-turbo-16k-0613': 16384,
  'gpt-3.5-turbo-1106': 16384,
  'gpt-4': 8192,
  'gpt-4-0314': 8192,
  'gpt-4-0613': 8192,
  'gpt-4-32k': 32768,
  'gpt-4-32k-0314': 32768,
  'gpt-4-32k-0613': 32768,
  'gpt-4-1106-preview': 128000,
};

export const modelCost = {
  'llama-2-70b': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'meditron-70b': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'meditron-70b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'meditron2-70b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-2-70b-meditron': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-3-70b-meditron': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-2-7b': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'meditron-7b': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'meditron-7b-sft': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-0301': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-0613': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-16k': {
    prompt: { price: 0.003, unit: 1000 },
    completion: { price: 0.004, unit: 1000 },
  },
  'gpt-3.5-turbo-16k-0613': {
    prompt: { price: 0.003, unit: 1000 },
    completion: { price: 0.004, unit: 1000 },
  },
  'gpt-3.5-turbo-1106': {
    prompt: { price: 0.001, unit: 1000 },
    completion: { price: 0.0015, unit: 1000 },
  },
  'gpt-4': {
    prompt: { price: 0.03, unit: 1000 },
    completion: { price: 0.06, unit: 1000 },
  },
  'gpt-4-0314': {
    prompt: { price: 0.03, unit: 1000 },
    completion: { price: 0.06, unit: 1000 },
  },
  'gpt-4-0613': {
    prompt: { price: 0.03, unit: 1000 },
    completion: { price: 0.06, unit: 1000 },
  },
  'gpt-4-32k': {
    prompt: { price: 0.06, unit: 1000 },
    completion: { price: 0.12, unit: 1000 },
  },
  'gpt-4-32k-0314': {
    prompt: { price: 0.06, unit: 1000 },
    completion: { price: 0.12, unit: 1000 },
  },
  'gpt-4-32k-0613': {
    prompt: { price: 0.06, unit: 1000 },
    completion: { price: 0.12, unit: 1000 },
  },
  'gpt-4-1106-preview': {
    prompt: { price: 0.01, unit: 1000 },
    completion: { price: 0.03, unit: 1000 },
  },
};

export const defaultUserMaxToken = 1024;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 0.7,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0,
};

export const generateDefaultChat = (
  title?: string,
  folder?: string
): ChatInterface => ({
  id: uuidv4(),
  title: title ? title : 'New Chat',
  messages:
    useStore.getState().defaultSystemMessage.length > 0
      ? [{ role: 'system', content: useStore.getState().defaultSystemMessage }]
      : [],
  config: { ...useStore.getState().defaultChatConfig },
  titleSet: false,
  folder,
});

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
