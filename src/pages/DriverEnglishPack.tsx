import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, MessageSquareText, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const GITHUB_URL = 'https://github.com/zhiliao000-star/YuDown';

const useDocumentMeta = () => {
  React.useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionTag?.content;

    document.title = '司机英文短句包 | YuTools';

    if (descriptionTag) {
      descriptionTag.content = '给中国网约车司机使用的英文短句包，支持中文搜索、复制英文和朗读英文。';
    }

    return () => {
      document.title = previousTitle;

      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.content = previousDescription;
      }
    };
  }, []);
};

interface Message {
  scenario: string;
  scenarioChinese?: string;
  english: string;
  chinese: string;
}

const PREVIEW_MESSAGES: Message[] = [
  {
    scenario: 'Passenger cannot find the car',
    scenarioChinese: '乘客找不到车',
    english: 'Hi, I\'m here at the pickup area. Please check the license plate and car model in the app.',
    chinese: '我已经在上车点，请在 app 里确认车牌和车型。',
  },
  {
    scenario: 'Airport pickup',
    scenarioChinese: '机场接客',
    english: 'I\'m waiting at the arrivals pickup area. Please let me know the door number when you come outside.',
    chinese: '我在到达层接客区等你。你出来后请告诉我门号。',
  },
  {
    scenario: 'Waiting politely',
    scenarioChinese: '礼貌地等待',
    english: 'No problem. I\'ll wait here for a few minutes. Please message me when you are ready.',
    chinese: '没问题。我会在这里等几分钟。你准备好后请发消息给我。',
  },
  {
    scenario: 'Too much luggage',
    scenarioChinese: '行李太多',
    english: 'I\'m sorry, but the luggage may not safely fit in the vehicle. You may need a larger car.',
    chinese: '不好意思，行李可能无法安全放进车里。你可能需要更大的车。',
  },
  {
    scenario: 'Toll road',
    scenarioChinese: '过路费',
    english: 'This route may include tolls. The app should add toll charges automatically when applicable.',
    chinese: '这条路线可能有过路费。如果适用，app 通常会自动计算。',
  },
  {
    scenario: 'Address change',
    scenarioChinese: '地址变更',
    english: 'Please update the destination in the app so the route and fare are correct.',
    chinese: '请在 app 里修改目的地，这样路线和费用才准确。',
  },
  {
    scenario: 'Child seat',
    scenarioChinese: '儿童座椅',
    english: 'For safety reasons, children who need a car seat must have one before the trip can start.',
    chinese: '为了安全，需要安全座椅的儿童必须有座椅才能开始行程。',
  },
  {
    scenario: 'Polite refusal',
    scenarioChinese: '礼貌拒绝',
    english: 'I\'m sorry, but I can\'t complete the trip under these conditions. Please contact support or request another ride.',
    chinese: '不好意思，在这种情况下我不能完成这趟行程。请联系平台客服或重新叫车。',
  },
  {
    scenario: 'I\'m on my way',
    scenarioChinese: '我在路上',
    english: 'I\'m currently driving to your location. I will arrive in about 5 minutes.',
    chinese: '我正在往你的位置开。大约5分钟后到达。',
  },
  {
    scenario: 'Heavy traffic',
    scenarioChinese: '路上很堵',
    english: 'I see there\'s heavy traffic on the route. I may be a few minutes late. Thank you for waiting.',
    chinese: '路上很堵。我可能会晚几分钟。谢谢你的等待。',
  },
  {
    scenario: 'Passenger not ready',
    scenarioChinese: '乘客还没准备好',
    english: 'I\'ve arrived at the location. Are you ready? I\'m parked nearby.',
    chinese: '我已经到达了。你准备好了吗？我停在附近。',
  },
  {
    scenario: 'Wrong location',
    scenarioChinese: '地点错误',
    english: 'I\'m at the pickup location shown in the app. If you\'re at a different location, please update the address.',
    chinese: '我在 app 显示的上车点。如果你在其他地方，请修改地址。',
  },
  {
    scenario: 'Multiple passengers',
    scenarioChinese: '多个乘客',
    english: 'I see multiple passengers. Can you confirm that everyone has the same destination?',
    chinese: '我看到有几个人。你们的目的地都一样吗？',
  },
  {
    scenario: 'Luggage assistance',
    scenarioChinese: '帮助放行李',
    english: 'I can help you with your luggage. I have space in the trunk.',
    chinese: '我可以帮你放行李。后备箱有空间。',
  },
  {
    scenario: 'Large luggage issue',
    scenarioChinese: '大行李问题',
    english: 'I notice your luggage is quite large. Let me check if it will fit safely in my vehicle.',
    chinese: '我看到你的行李很大。让我看看能不能安全地放进车里。',
  },
  {
    scenario: 'Pickup delay - driver waiting',
    scenarioChinese: '接客延迟 - 司机等待',
    english: 'I\'ve been waiting for 5 minutes. Are you running late? Please let me know.',
    chinese: '我已经等了5分钟了。你还要多久？请告诉我。',
  },
  {
    scenario: 'Route confirmation',
    scenarioChinese: '路线确认',
    english: 'Is this destination correct? I want to make sure before we start driving.',
    chinese: '这个目的地对吗？开车前我想确认一下。',
  },
  {
    scenario: 'Highway toll',
    scenarioChinese: '高速收费',
    english: 'The fastest route includes a toll road. The fee will be added to your fare by the app.',
    chinese: '最快的路线需要过收费道路。费用会由 app 自动加到车费里。',
  },
  {
    scenario: 'Accident on route',
    scenarioChinese: '路上有事故',
    english: 'There\'s been an accident ahead. I\'m taking an alternate route. It may take a few more minutes.',
    chinese: '前面有事故。我要绕路。可能要多花几分钟。',
  },
  {
    scenario: 'Construction detour',
    scenarioChinese: '施工绕路',
    english: 'There\'s construction on the main route. I\'m taking a detour that adds about 3 minutes.',
    chinese: '主干道在施工。我要绕路，大约多花3分钟。',
  },
  {
    scenario: 'Waiting for green light',
    scenarioChinese: '等红绿灯',
    english: 'We\'re at a long traffic light. We should be moving in about 2 minutes.',
    chinese: '我们在长红绿灯。大约2分钟后会动。',
  },
  {
    scenario: 'Passenger running late',
    scenarioChinese: '乘客还要等一会',
    english: 'If you need a few more minutes, that\'s fine. Just let me know.',
    chinese: '如果你还需要几分钟，没问题。请告诉我。',
  },
  {
    scenario: 'Offer to cancel',
    scenarioChinese: '提供取消选项',
    english: 'If you\'re not ready, we can always cancel this ride. No problem.',
    chinese: '如果你还没准备好，我们可以取消这次行程。没问题。',
  },
  {
    scenario: 'Car details',
    scenarioChinese: '车的详细信息',
    english: 'I drive a blue sedan with license plate ABC-1234. I\'m parked in front of the building.',
    chinese: '我开一辆蓝色轿车，车牌是 ABC-1234。我停在楼前。',
  },
  {
    scenario: 'Identifying passenger',
    scenarioChinese: '识别乘客',
    english: 'What color clothes are you wearing? I want to make sure I pick up the right person.',
    chinese: '你穿的什么颜色的衣服？我想确认一下接对人。',
  },
  {
    scenario: 'Phone conversation request',
    scenarioChinese: '要求通话',
    english: 'I\'m having trouble finding the exact location. Can you please call me so we can clarify?',
    chinese: '我找不到确切的地点。你能给我打电话吗？这样更清楚。',
  },
  {
    scenario: 'Passenger name check',
    scenarioChinese: '乘客姓名核实',
    english: 'Can you confirm your name? I want to make sure I pick up the right passenger.',
    chinese: '你能确认一下你的名字吗？我想确保接的是对的人。',
  },
  {
    scenario: 'Short ride',
    scenarioChinese: '短途行程',
    english: 'I see this is a short trip. I\'ll get you there quickly.',
    chinese: '我看这是短途。我会快速送你到达。',
  },
  {
    scenario: 'Long ride',
    scenarioChinese: '长途行程',
    english: 'I see this is a longer trip. Let me know if you need to make any stops along the way.',
    chinese: '这是长途。如果你想中途停靠，请告诉我。',
  },
  {
    scenario: 'Food smell in car',
    scenarioChinese: '车里的食物气味',
    english: 'Please make sure any food or drinks are well-contained to avoid spills in my vehicle.',
    chinese: '请确保食物或饮料不会洒在我的车里。',
  },
  {
    scenario: 'Pet in vehicle',
    scenarioChinese: '车里有宠物',
    english: 'I notice you have a pet. Please keep it under control during the ride for everyone\'s safety.',
    chinese: '我看到你带了宠物。请在行程中控制好它，为了大家的安全。',
  },
  {
    scenario: 'Smoking not allowed',
    scenarioChinese: '禁止吸烟',
    english: 'I\'m sorry, but smoking is not allowed in this vehicle.',
    chinese: '不好意思，这辆车里不能抽烟。',
  },
  {
    scenario: 'Seatbelt reminder',
    scenarioChinese: '安全带提醒',
    english: 'For your safety, please fasten your seatbelt before we start the trip.',
    chinese: '为了你的安全，请在出发前系好安全带。',
  },
  {
    scenario: 'Quiet passenger',
    scenarioChinese: '安静的乘客',
    english: 'Feel free to enjoy the ride. Let me know if you need anything.',
    chinese: '请放松享受行程。如果需要什么，请告诉我。',
  },
  {
    scenario: 'Chatty passenger',
    scenarioChinese: '爱聊天的乘客',
    english: 'How is your day going? Welcome to chat during the ride.',
    chinese: '你今天怎么样？欢迎在行程中聊天。',
  },
  {
    scenario: 'Music volume',
    scenarioChinese: '音乐音量',
    english: 'Is the music volume okay? I can adjust it if you\'d like.',
    chinese: '音乐音量可以吗？如果你想，我可以调节。',
  },
  {
    scenario: 'Temperature in car',
    scenarioChinese: '车内温度',
    english: 'Is the temperature comfortable? I can adjust the AC or heating.',
    chinese: '温度舒服吗？我可以调节空调或暖气。',
  },
  {
    scenario: 'Arriving at destination',
    scenarioChinese: '到达目的地',
    english: 'We\'ve arrived at your destination. Thank you for riding with me!',
    chinese: '我们已经到达目的地。感谢你的乘坐！',
  },
  {
    scenario: 'Wrong drop-off location',
    scenarioChinese: '下车点错误',
    english: 'I notice the destination in the app is different from where you\'re pointing. Which location is correct?',
    chinese: 'App 里的目的地和你指的地方不一样。哪个是对的？',
  },
  {
    scenario: 'Passenger needs to find address',
    scenarioChinese: '找不到地址',
    english: 'I\'m in the area, but I\'m having trouble finding the exact address. Can you look outside to help guide me?',
    chinese: '我在附近，但找不到确切的地址。你能往外看，帮我导航吗？',
  },
  {
    scenario: 'Building has multiple entrances',
    scenarioChinese: '楼有多个入口',
    english: 'This building has multiple entrances. Which one are you near?',
    chinese: '这栋楼有好几个入口。你在哪一个？',
  },
  {
    scenario: 'Paid for wrong ride',
    scenarioChinese: '支付错误',
    english: 'I think there might be an issue with the payment. Please contact support for help.',
    chinese: '我觉得付款可能有问题。请联系客服寻求帮助。',
  },
  {
    scenario: 'Driver condition - not feeling well',
    scenarioChinese: '司机身体不舒服',
    english: 'I\'m not feeling well today, so I may need to cancel this ride. I apologize for any inconvenience.',
    chinese: '我今天身体不舒服，可能需要取消这次行程。为此带来的不便我致歉。',
  },
  {
    scenario: 'Emergency situation',
    scenarioChinese: '紧急情况',
    english: 'There\'s an emergency. I need to cancel this ride immediately. Please contact support.',
    chinese: '有紧急情况。我需要立刻取消这次行程。请联系客服。',
  },
  {
    scenario: 'Passenger vehicle emergency',
    scenarioChinese: '乘客紧急情况',
    english: 'I notice you may need medical attention. Should I call 911 or take you to a hospital?',
    chinese: '我注意到你可能需要医疗帮助。我该打911还是送你去医院？',
  },
  {
    scenario: 'Thank you message',
    scenarioChinese: '感谢消息',
    english: 'Thank you for being a great passenger. I hope you had a pleasant ride. Have a great day!',
    chinese: '谢谢你是位很好的乘客。希望你有个愉快的行程。祝你今天开心！',
  },
  {
    scenario: 'Request for rating',
    scenarioChinese: '请求评分',
    english: 'Thank you for using my service. Please rate your experience when you get the chance!',
    chinese: '感谢你使用我的服务。有机会的话，请给我的服务评分！',
  },
  {
    scenario: 'Feedback request',
    scenarioChinese: '反馈请求',
    english: 'If you have any feedback about your ride, I\'d love to hear it!',
    chinese: '如果你对这次行程有任何反馈，我很想听听！',
  },
  {
    scenario: 'Passenger left item in car',
    scenarioChinese: '乘客遗失物品',
    english: 'You left something in my car. I have it safe. Let me know what it is and how to return it.',
    chinese: '你在我车里落下东西了。我保管得很好。告诉我是什么，我怎么还给你。',
  },
];

const QUICK_FILTERS = [
  { label: '全部', query: '' },
  { label: '接客', query: '接客' },
  { label: '机场', query: '机场' },
  { label: '等待', query: '等待' },
  { label: '行李', query: '行李' },
  { label: '路线', query: '路线' },
  { label: '取消', query: '取消' },
  { label: '安全', query: '安全' },
];

const PACK_NOTES = [
  '中文找场景',
  '英文给乘客',
  '一键复制',
  '可直接朗读',
];

const SEARCH_HINTS = [
  {
    terms: ['接客', '上车', '找人', '找不到车'],
    matches: ['pickup', 'arrived', 'location', 'car', 'passenger', '接客', '上车', '找不到车', '乘客'],
  },
  {
    terms: ['机场', '航站楼', '门号'],
    matches: ['airport', 'arrivals', 'door number', '机场', '到达层', '门号'],
  },
  {
    terms: ['等待', '迟到', '晚点', '等人'],
    matches: ['wait', 'waiting', 'late', 'delay', '等待', '晚', '迟到'],
  },
  {
    terms: ['行李', '箱子', '后备箱'],
    matches: ['luggage', 'trunk', 'large', '行李', '后备箱'],
  },
  {
    terms: ['路线', '绕路', '高速', '过路费', '收费'],
    matches: ['route', 'toll', 'traffic', 'detour', 'construction', '路线', '绕路', '过路费', '收费'],
  },
  {
    terms: ['取消', '拒绝', '不能接'],
    matches: ['cancel', 'refusal', 'support', 'complete the trip', '取消', '拒绝', '不能'],
  },
  {
    terms: ['安全', '儿童', '安全带', '抽烟', '宠物', '紧急'],
    matches: ['safety', 'seatbelt', 'smoking', 'pet', 'emergency', 'car seat', '安全', '儿童', '抽烟', '宠物', '紧急'],
  },
];

const SpeakerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 9.5v5h3.2L12 18.2V5.8L7.2 9.5H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M15.5 8.5c1 .9 1.5 2.1 1.5 3.5s-.5 2.6-1.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18.4 5.8A8.3 8.3 0 0 1 21 12a8.3 8.3 0 0 1-2.6 6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1A9.4 9.4 0 0 1 12 7.2c.8 0 1.6.1 2.4.3 1.9-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.5c0 .3.2.6.7.5A10.1 10.1 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z" />
  </svg>
);

const filterMessages = (query: string) => {
  const searchTerm = query.trim().toLowerCase();
  if (searchTerm.length === 0) return PREVIEW_MESSAGES;

  const expandedTerms = SEARCH_HINTS.flatMap((hint) =>
    hint.terms.some((term) => term.toLowerCase().includes(searchTerm) || searchTerm.includes(term.toLowerCase()))
      ? hint.matches
      : []
  );
  const terms = [searchTerm, ...expandedTerms.map((term) => term.toLowerCase())];

  return PREVIEW_MESSAGES.filter((msg) => {
    const searchableText = [msg.scenario, msg.scenarioChinese, msg.english, msg.chinese].filter(Boolean).join(' ').toLowerCase();
    return terms.some((term) => searchableText.includes(term));
  });
};

const AUDIENCE = [
  {
    title: '新手司机',
    description: '刚开始跑单时，不用临时组织英文，先把常见情况稳住。',
  },
  {
    title: '在美国跑车的中文用户',
    description: '用中文找场景，看懂意思后直接复制英文或播放给乘客。',
  },
  {
    title: '机场和高频接单司机',
    description: '接客、等待、行李、路线、安全这些高频场景可以更快处理。',
  },
];

const MessagePreviewCard = ({ message, index }: { message: Message; index: number }) => {
  const [copied, setCopied] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.english);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 transition-all animate-in fade-in slide-in-from-bottom-4 hover:border-gray-300 hover:shadow-sm"
      style={{ animationDelay: `${Math.min(index, 12) * 20}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-bold text-gray-900">{message.scenarioChinese ?? message.chinese}</h4>
          <p className="mt-0.5 text-xs font-medium text-gray-500">{message.scenario}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleSpeak}
            className={cn(
              'inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-bold transition-all active:bg-gray-100',
              speaking
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            )}
            aria-label={`朗读 ${message.scenarioChinese ?? message.scenario}`}
          >
            <SpeakerIcon className="h-4 w-4" />
            {speaking ? '停止' : '朗读'}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-bold transition-all active:bg-gray-100',
              copied
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-[#e5322d] hover:bg-[#fff1f0]'
            )}
            aria-label={`复制 ${message.scenarioChinese ?? message.scenario}`}
          >
            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[15px] font-semibold leading-relaxed text-gray-900">{message.english}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{message.chinese}</p>
    </div>
  );
};

const AudienceCard = ({ audience }: { audience: (typeof AUDIENCE)[number] }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <h3 className="text-base font-bold text-gray-900">{audience.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-gray-600">{audience.description}</p>
  </div>
);

export const DriverEnglishPackPage: React.FC = () => {
  useDocumentMeta();
  const [searchQuery, setSearchQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const deferredQuery = React.useDeferredValue(searchQuery);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredMessages = filterMessages(deferredQuery);

  return (
    <main className="w-full bg-[var(--bg)]">
      <section className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-5 sm:py-8">
        <Link
          to="/toolkits"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          返回工具库
        </Link>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md bg-[#fff1f0] px-3 py-1.5">
                <MessageSquareText className="h-4 w-4 text-[#e5322d]" />
                <span className="text-xs font-bold uppercase tracking-wide text-[#e5322d]">司机工具</span>
              </div>

              <h1 className="mt-4 text-[32px] font-black leading-tight text-gray-900 sm:text-[42px]">
                司机英文短句包
              </h1>

              <p className="mt-3 text-[15px] leading-relaxed text-gray-600 sm:text-base">
                中国司机用中文找场景，把英文短句复制或直接朗读给乘客。适合 Uber/Lyft 接客、机场、等待、行李、路线和安全沟通。
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[420px]">
                {PACK_NOTES.map((note) => (
                  <div key={note} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="输入中文关键词：机场、行李、等待、取消、收费..."
                className="search-bar"
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-[430px] lg:justify-end">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setSearchQuery(filter.query)}
                  className={cn(
                    'rounded-md border px-3 py-2 text-sm font-bold transition-all',
                    searchQuery.trim().toLowerCase() === filter.query
                      ? 'border-[#e5322d] bg-[#fff1f0] text-[#c82b27]'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-4 pb-8 sm:px-5">
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">短句库</p>
            <h2 className="mt-1 text-2xl font-black text-gray-900">找到 {filteredMessages.length} 条可用短句</h2>
          </div>
          <p className="text-sm text-gray-500">中文负责理解场景，英文负责复制或朗读给乘客。</p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredMessages.map((message, index) => (
            <MessagePreviewCard key={`${message.scenario}-${index}`} message={message} index={index} />
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-base font-medium text-gray-600">
              没找到“{searchQuery}”相关短句。换个中文关键词试试，比如“机场”“行李”“等待”。
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">适合谁用</p>
            <h2 className="mt-1 text-2xl font-black text-gray-900">不是学英语，是现场能用</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-500">
            独立司机工具。与 Uber、Lyft 或任何机场机构无关联。
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {AUDIENCE.map((item, index) => (
            <AudienceCard key={index} audience={item} />
          ))}
        </div>
      </section>
    </main>
  );
};
