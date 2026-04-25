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
              Coming Soon
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
          <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">What's inside</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">Everything you need for professional communication</h2>
          <p className="mt-4 text-lg text-gray-600">
            This pack includes pre-written messages for the most common driver situations.
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
          <p className="text-sm font-bold uppercase tracking-wider text-[#e5322d]">Free preview</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">8 ready-to-use messages</h2>
          <p className="mt-4 text-lg text-gray-600">
            Copy and paste these messages directly into your chat. Each includes English and side-by-side Chinese.
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
          <h2 className="text-4xl font-black text-gray-900">Full pack coming soon</h2>

          <p className="mt-6 mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            The full pack will include 50+ driver messages, Chinese explanations, phone screenshot cards, and printable
            quick-reference pages.
          </p>

          <button
            disabled
            className="mt-10 rounded-lg bg-[#e5322d] px-8 py-3 font-bold text-white opacity-75 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />
    </main>
  );
};
