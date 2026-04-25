import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, Copy, CheckCircle2, MapPin, Clock, Luggage, AlertCircle, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const useDocumentMeta = () => {
  React.useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionTag?.content;

    document.title = 'Driver English Pack | YuTools';

    if (descriptionTag) {
      descriptionTag.content = 'Ready-to-send English messages for rideshare drivers, airport pickups, luggage, tolls, waiting time, and address changes.';
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
  english: string;
  chinese: string;
}

const PREVIEW_MESSAGES: Message[] = [
  {
    scenario: 'Passenger cannot find the car',
    english: 'Hi, I\'m here at the pickup area. Please check the license plate and car model in the app.',
    chinese: '我已经在上车点，请在 app 里确认车牌和车型。',
  },
  {
    scenario: 'Airport pickup',
    english: 'I\'m waiting at the arrivals pickup area. Please let me know the door number when you come outside.',
    chinese: '我在到达层接客区等你。你出来后请告诉我门号。',
  },
  {
    scenario: 'Waiting politely',
    english: 'No problem. I\'ll wait here for a few minutes. Please message me when you are ready.',
    chinese: '没问题。我会在这里等几分钟。你准备好后请发消息给我。',
  },
  {
    scenario: 'Too much luggage',
    english: 'I\'m sorry, but the luggage may not safely fit in the vehicle. You may need a larger car.',
    chinese: '不好意思，行李可能无法安全放进车里。你可能需要更大的车。',
  },
  {
    scenario: 'Toll road',
    english: 'This route may include tolls. The app should add toll charges automatically when applicable.',
    chinese: '这条路线可能有过路费。如果适用，app 通常会自动计算。',
  },
  {
    scenario: 'Address change',
    english: 'Please update the destination in the app so the route and fare are correct.',
    chinese: '请在 app 里修改目的地，这样路线和费用才准确。',
  },
  {
    scenario: 'Child seat',
    english: 'For safety reasons, children who need a car seat must have one before the trip can start.',
    chinese: '为了安全，需要安全座椅的儿童必须有座椅才能开始行程。',
  },
  {
    scenario: 'Polite refusal',
    english: 'I\'m sorry, but I can\'t complete the trip under these conditions. Please contact support or request another ride.',
    chinese: '不好意思，在这种情况下我不能完成这趟行程。请联系平台客服或重新叫车。',
  },
  {
    scenario: 'I\'m on my way',
    english: 'I\'m currently driving to your location. I will arrive in about 5 minutes.',
    chinese: '我正在往你的位置开。大约5分钟后到达。',
  },
  {
    scenario: 'Heavy traffic',
    english: 'I see there\'s heavy traffic on the route. I may be a few minutes late. Thank you for waiting.',
    chinese: '路上很堵。我可能会晚几分钟。谢谢你的等待。',
  },
  {
    scenario: 'Passenger not ready',
    english: 'I\'ve arrived at the location. Are you ready? I\'m parked nearby.',
    chinese: '我已经到达了。你准备好了吗？我停在附近。',
  },
  {
    scenario: 'Wrong location',
    english: 'I\'m at the pickup location shown in the app. If you\'re at a different location, please update the address.',
    chinese: '我在 app 显示的上车点。如果你在其他地方，请修改地址。',
  },
  {
    scenario: 'Multiple passengers',
    english: 'I see multiple passengers. Can you confirm that everyone has the same destination?',
    chinese: '我看到有几个人。你们的目的地都一样吗？',
  },
  {
    scenario: 'Luggage assistance',
    english: 'I can help you with your luggage. I have space in the trunk.',
    chinese: '我可以帮你放行李。后备箱有空间。',
  },
  {
    scenario: 'Large luggage issue',
    english: 'I notice your luggage is quite large. Let me check if it will fit safely in my vehicle.',
    chinese: '我看到你的行李很大。让我看看能不能安全地放进车里。',
  },
  {
    scenario: 'Pickup delay - driver waiting',
    english: 'I\'ve been waiting for 5 minutes. Are you running late? Please let me know.',
    chinese: '我已经等了5分钟了。你还要多久？请告诉我。',
  },
  {
    scenario: 'Route confirmation',
    english: 'Is this destination correct? I want to make sure before we start driving.',
    chinese: '这个目的地对吗？开车前我想确认一下。',
  },
  {
    scenario: 'Highway toll',
    english: 'The fastest route includes a toll road. The fee will be added to your fare by the app.',
    chinese: '最快的路线需要过收费道路。费用会由 app 自动加到车费里。',
  },
  {
    scenario: 'Accident on route',
    english: 'There\'s been an accident ahead. I\'m taking an alternate route. It may take a few more minutes.',
    chinese: '前面有事故。我要绕路。可能要多花几分钟。',
  },
  {
    scenario: 'Construction detour',
    english: 'There\'s construction on the main route. I\'m taking a detour that adds about 3 minutes.',
    chinese: '主干道在施工。我要绕路，大约多花3分钟。',
  },
  {
    scenario: 'Waiting for green light',
    english: 'We\'re at a long traffic light. We should be moving in about 2 minutes.',
    chinese: '我们在长红绿灯。大约2分钟后会动。',
  },
  {
    scenario: 'Passenger running late',
    english: 'If you need a few more minutes, that\'s fine. Just let me know.',
    chinese: '如果你还需要几分钟，没问题。请告诉我。',
  },
  {
    scenario: 'Offer to cancel',
    english: 'If you\'re not ready, we can always cancel this ride. No problem.',
    chinese: '如果你还没准备好，我们可以取消这次行程。没问题。',
  },
  {
    scenario: 'Car details',
    english: 'I drive a blue sedan with license plate ABC-1234. I\'m parked in front of the building.',
    chinese: '我开一辆蓝色轿车，车牌是 ABC-1234。我停在楼前。',
  },
  {
    scenario: 'Identifying passenger',
    english: 'What color clothes are you wearing? I want to make sure I pick up the right person.',
    chinese: '你穿的什么颜色的衣服？我想确认一下接对人。',
  },
  {
    scenario: 'Phone conversation request',
    english: 'I\'m having trouble finding the exact location. Can you please call me so we can clarify?',
    chinese: '我找不到确切的地点。你能给我打电话吗？这样更清楚。',
  },
  {
    scenario: 'Passenger name check',
    english: 'Can you confirm your name? I want to make sure I pick up the right passenger.',
    chinese: '你能确认一下你的名字吗？我想确保接的是对的人。',
  },
  {
    scenario: 'Short ride',
    english: 'I see this is a short trip. I\'ll get you there quickly.',
    chinese: '我看这是短途。我会快速送你到达。',
  },
  {
    scenario: 'Long ride',
    english: 'I see this is a longer trip. Let me know if you need to make any stops along the way.',
    chinese: '这是长途。如果你想中途停靠，请告诉我。',
  },
  {
    scenario: 'Food smell in car',
    english: 'Please make sure any food or drinks are well-contained to avoid spills in my vehicle.',
    chinese: '请确保食物或饮料不会洒在我的车里。',
  },
  {
    scenario: 'Pet in vehicle',
    english: 'I notice you have a pet. Please keep it under control during the ride for everyone\'s safety.',
    chinese: '我看到你带了宠物。请在行程中控制好它，为了大家的安全。',
  },
  {
    scenario: 'Smoking not allowed',
    english: 'I\'m sorry, but smoking is not allowed in this vehicle.',
    chinese: '不好意思，这辆车里不能抽烟。',
  },
  {
    scenario: 'Seatbelt reminder',
    english: 'For your safety, please fasten your seatbelt before we start the trip.',
    chinese: '为了你的安全，请在出发前系好安全带。',
  },
  {
    scenario: 'Quiet passenger',
    english: 'Feel free to enjoy the ride. Let me know if you need anything.',
    chinese: '请放松享受行程。如果需要什么，请告诉我。',
  },
  {
    scenario: 'Chatty passenger',
    english: 'How is your day going? Welcome to chat during the ride.',
    chinese: '你今天怎么样？欢迎在行程中聊天。',
  },
  {
    scenario: 'Music volume',
    english: 'Is the music volume okay? I can adjust it if you\'d like.',
    chinese: '音乐音量可以吗？如果你想，我可以调节。',
  },
  {
    scenario: 'Temperature in car',
    english: 'Is the temperature comfortable? I can adjust the AC or heating.',
    chinese: '温度舒服吗？我可以调节空调或暖气。',
  },
  {
    scenario: 'Arriving at destination',
    english: 'We\'ve arrived at your destination. Thank you for riding with me!',
    chinese: '我们已经到达目的地。感谢你的乘坐！',
  },
  {
    scenario: 'Wrong drop-off location',
    english: 'I notice the destination in the app is different from where you\'re pointing. Which location is correct?',
    chinese: 'App 里的目的地和你指的地方不一样。哪个是对的？',
  },
  {
    scenario: 'Passenger needs to find address',
    english: 'I\'m in the area, but I\'m having trouble finding the exact address. Can you look outside to help guide me?',
    chinese: '我在附近，但找不到确切的地址。你能往外看，帮我导航吗？',
  },
  {
    scenario: 'Building has multiple entrances',
    english: 'This building has multiple entrances. Which one are you near?',
    chinese: '这栋楼有好几个入口。你在哪一个？',
  },
  {
    scenario: 'Paid for wrong ride',
    english: 'I think there might be an issue with the payment. Please contact support for help.',
    chinese: '我觉得付款可能有问题。请联系客服寻求帮助。',
  },
  {
    scenario: 'Driver condition - not feeling well',
    english: 'I\'m not feeling well today, so I may need to cancel this ride. I apologize for any inconvenience.',
    chinese: '我今天身体不舒服，可能需要取消这次行程。为此带来的不便我致歉。',
  },
  {
    scenario: 'Emergency situation',
    english: 'There\'s an emergency. I need to cancel this ride immediately. Please contact support.',
    chinese: '有紧急情况。我需要立刻取消这次行程。请联系客服。',
  },
  {
    scenario: 'Passenger vehicle emergency',
    english: 'I notice you may need medical attention. Should I call 911 or take you to a hospital?',
    chinese: '我注意到你可能需要医疗帮助。我该打911还是送你去医院？',
  },
  {
    scenario: 'Thank you message',
    english: 'Thank you for being a great passenger. I hope you had a pleasant ride. Have a great day!',
    chinese: '谢谢你是位很好的乘客。希望你有个愉快的行程。祝你今天开心！',
  },
  {
    scenario: 'Request for rating',
    english: 'Thank you for using my service. Please rate your experience when you get the chance!',
    chinese: '感谢你使用我的服务。有机会的话，请给我的服务评分！',
  },
  {
    scenario: 'Feedback request',
    english: 'If you have any feedback about your ride, I\'d love to hear it!',
    chinese: '如果你对这次行程有任何反馈，我很想听听！',
  },
  {
    scenario: 'Passenger left item in car',
    english: 'You left something in my car. I have it safe. Let me know what it is and how to return it.',
    chinese: '你在我车里落下东西了。我保管得很好。告诉我是什么，我怎么还给你。',
  },
];

const FEATURES = [
  'Airport pickup messages',
  'Waiting and delay messages',
  'Luggage and large item messages',
  'Toll and route messages',
  'Address change messages',
  'Polite refusal messages',
  'Screenshot-friendly phone cards',
  'Chinese explanations for each message',
];

const AUDIENCE = [
  {
    title: 'New rideshare drivers',
    description: 'Professional communication templates for your first months on the platform.',
  },
  {
    title: 'Chinese-speaking drivers in the U.S.',
    description: 'Pre-written English messages with side-by-side Chinese explanations.',
  },
  {
    title: 'Airport pickup and professional drivers',
    description: 'Ready-to-use responses for high-volume, time-sensitive rides.',
  },
];

const MessagePreviewCard = ({ message, index }: { message: Message; index: number }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.english);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl border border-gray-200 bg-white p-6 transition-all animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
    >
      <h4 className="text-sm font-bold uppercase tracking-wide text-[#e5322d]">{message.scenario}</h4>

      <div className="mt-4 rounded-lg bg-gray-50 p-4">
        <p className="text-sm leading-relaxed text-gray-900 font-medium">{message.english}</p>
      </div>

      <div className="mt-3 rounded-lg bg-[#f0f8ff] p-4">
        <p className="text-sm leading-relaxed text-gray-700">{message.chinese}</p>
      </div>

      <button
        onClick={handleCopy}
        className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-50 active:bg-gray-100"
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy message
          </>
        )}
      </button>
    </div>
  );
};

const FeatureTag = ({ feature }: { feature: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1f0] px-4 py-2">
    <Check className="h-4 w-4 text-[#e5322d]" strokeWidth={2.5} />
    <span className="text-sm font-semibold text-gray-900">{feature}</span>
  </div>
);

const AudienceCard = ({ audience }: { audience: (typeof AUDIENCE)[number] }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6">
    <h3 className="text-lg font-bold text-gray-900">{audience.title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-gray-600">{audience.description}</p>
  </div>
);

export const DriverEnglishPackPage: React.FC = () => {
  useDocumentMeta();

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1f0] px-4 py-1.5">
            <MessageSquareText className="h-4 w-4 text-[#e5322d]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#e5322d]">Driver Toolkit</span>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900 sm:text-6xl lg:text-[64px]">
            Driver English Pack
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Ready-to-send English messages for rideshare drivers, airport pickups, luggage questions, tolls, waiting time,
            and address changes.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              disabled
              className="rounded-lg bg-[#e5322d] px-8 py-3 text-center font-bold text-white opacity-75 cursor-not-allowed"
            >
              Download Coming Soon
            </button>

            <Link
              to="/toolkits"
              className="rounded-lg border border-gray-200 bg-white px-8 py-3 text-center font-bold text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-300"
            >
              Back to Toolkits
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            <span className="font-semibold">Independent driver resource.</span> Not affiliated with Uber, Lyft, or any airport authority.
          </p>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">What you get</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">Professional driver messages</h2>
          <p className="mt-4 text-lg text-gray-600">
            Complete toolkit with all the messages you need for professional communication with passengers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureTag key={index} feature={feature} />
          ))}
        </div>
      </section>

      {/* Free Preview Section */}
      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">Complete message library</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">48 ready-to-use messages</h2>
          <p className="mt-4 text-lg text-gray-600">
            Every message is in English with side-by-side Chinese. Copy and paste directly into your chat.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PREVIEW_MESSAGES.map((message, index) => (
            <MessagePreviewCard key={index} message={message} index={index} />
          ))}
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">Who it's for</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">Three types of drivers</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AUDIENCE.map((item, index) => (
            <AudienceCard key={index} audience={item} />
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-5 sm:py-24">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#fff1f0] to-white p-10 text-center md:p-16">
          <h2 className="text-4xl font-black text-gray-900">You now have the full pack</h2>

          <p className="mt-6 mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            All 48 messages are ready to use. Download as PDF, get printable phone screenshot cards, or access the quick-reference guide coming soon.
          </p>

          <button
            disabled
            className="mt-10 rounded-lg bg-[#e5322d] px-8 py-3 font-bold text-white opacity-75 cursor-not-allowed"
          >
            Download Coming Soon
          </button>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />
    </main>
  );
};
