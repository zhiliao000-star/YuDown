import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, MessageSquareText, Search } from 'lucide-react';
import { cn } from '../lib/utils';

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

const ADDITIONAL_MESSAGES: Message[] = [
  {
    scenario: 'Confirm pickup pin',
    scenarioChinese: '确认上车定位点',
    english: 'Can you confirm the pickup pin in the app? I want to make sure I go to the exact spot.',
    chinese: '你能确认一下 app 里的上车定位点吗？我想确保到准确位置。',
  },
  {
    scenario: 'Ask passenger to walk to safe pickup',
    scenarioChinese: '请乘客走到安全上车点',
    english: 'For safety, please walk to the safe pickup area nearby. I cannot stop in the traffic lane.',
    chinese: '为了安全，请走到附近安全的上车区。我不能停在行车道上。',
  },
  {
    scenario: 'No stopping zone',
    scenarioChinese: '这里不能停车',
    english: 'This is a no-stopping zone. I will pull over at the nearest safe place.',
    chinese: '这里不能停车。我会停到最近的安全位置。',
  },
  {
    scenario: 'Blocked entrance',
    scenarioChinese: '入口被挡住',
    english: 'The entrance is blocked right now. I will meet you on the side street instead.',
    chinese: '入口现在被挡住了。我改在旁边的小路接你。',
  },
  {
    scenario: 'Gate code needed',
    scenarioChinese: '需要门禁密码',
    english: 'I am at the gate. Could you please send the gate code or meet me outside?',
    chinese: '我到门口了。请发门禁密码，或者出来接我。',
  },
  {
    scenario: 'Apartment building number',
    scenarioChinese: '询问公寓楼号',
    english: 'Which building number are you in? The apartment complex has several buildings.',
    chinese: '你在哪栋楼？这个公寓区有好几栋楼。',
  },
  {
    scenario: 'Hotel pickup lobby',
    scenarioChinese: '酒店大厅接客',
    english: 'I am waiting near the hotel lobby entrance. Please come out when you are ready.',
    chinese: '我在酒店大厅入口附近等你。准备好了请出来。',
  },
  {
    scenario: 'Hospital pickup entrance',
    scenarioChinese: '医院入口接客',
    english: 'I am near the main hospital entrance. Please let me know if you are at a different door.',
    chinese: '我在医院主入口附近。如果你在其他门，请告诉我。',
  },
  {
    scenario: 'School pickup line',
    scenarioChinese: '学校接送队伍',
    english: 'I am in the pickup line near the school. Please look for my license plate.',
    chinese: '我在学校接送队伍里。请找我的车牌。',
  },
  {
    scenario: 'Event pickup crowd',
    scenarioChinese: '活动散场人多',
    english: 'It is very crowded here. Please share a clear landmark so I can find you faster.',
    chinese: '这里人很多。请发一个明显地标，我能更快找到你。',
  },
  {
    scenario: 'Stadium pickup',
    scenarioChinese: '体育场接客',
    english: 'I am near the rideshare pickup area by the stadium. Please follow the signs if you can.',
    chinese: '我在体育场网约车接客区附近。可以的话请跟着指示牌走。',
  },
  {
    scenario: 'Mall pickup entrance',
    scenarioChinese: '商场入口接客',
    english: 'Which mall entrance are you near? Please tell me the store or door name.',
    chinese: '你在商场哪个入口？请告诉我店名或门名。',
  },
  {
    scenario: 'Grocery pickup',
    scenarioChinese: '超市接客',
    english: 'I am near the grocery store entrance. Please let me know if you have a lot of bags.',
    chinese: '我在超市入口附近。如果你有很多购物袋，请告诉我。',
  },
  {
    scenario: 'Airport terminal question',
    scenarioChinese: '询问机场航站楼',
    english: 'Which terminal are you at? Please send the terminal and door number.',
    chinese: '你在哪个航站楼？请发航站楼和门号。',
  },
  {
    scenario: 'Airport departures pickup',
    scenarioChinese: '机场出发层接客',
    english: 'I am on the departures level. Please confirm if you are upstairs or downstairs.',
    chinese: '我在出发层。请确认你在楼上还是楼下。',
  },
  {
    scenario: 'Airport rideshare zone',
    scenarioChinese: '机场网约车区域',
    english: 'Please go to the rideshare pickup zone. Regular curbside pickup is not allowed here.',
    chinese: '请去网约车接客区。这里不允许普通路边接客。',
  },
  {
    scenario: 'Flight delay',
    scenarioChinese: '航班延误',
    english: 'No problem. Please message me when you are outside and ready for pickup.',
    chinese: '没关系。你出来并准备好上车时请发消息给我。',
  },
  {
    scenario: 'Baggage claim wait',
    scenarioChinese: '等取行李',
    english: 'Take your time at baggage claim. Please let me know when you are walking outside.',
    chinese: '你慢慢取行李。出来时请告诉我。',
  },
  {
    scenario: 'International arrivals',
    scenarioChinese: '国际到达',
    english: 'International arrivals may take longer. Please message me after customs when you are ready.',
    chinese: '国际到达可能需要更久。过海关后准备好了请发消息给我。',
  },
  {
    scenario: 'Wrong airport terminal',
    scenarioChinese: '航站楼不对',
    english: 'I think I may be at the wrong terminal. Please confirm your terminal number.',
    chinese: '我可能在错误的航站楼。请确认你的航站楼号码。',
  },
  {
    scenario: 'Airport police moving cars',
    scenarioChinese: '机场警察要求移动车辆',
    english: 'Airport staff are asking cars to move. I will circle around and come back to the pickup area.',
    chinese: '机场工作人员要求车辆移动。我会绕一圈再回接客区。',
  },
  {
    scenario: 'Ask for flight number',
    scenarioChinese: '询问航班号',
    english: 'Could you send your flight number? It may help me find the correct arrivals area.',
    chinese: '可以发一下航班号吗？这样我更容易找到正确到达区。',
  },
  {
    scenario: 'Passenger at rental car center',
    scenarioChinese: '乘客在租车中心',
    english: 'Are you at the rental car center or the terminal? Please confirm the pickup location.',
    chinese: '你是在租车中心还是航站楼？请确认上车位置。',
  },
  {
    scenario: 'Too many bags for trunk',
    scenarioChinese: '后备箱放不下',
    english: 'My trunk may not fit all the bags safely. We should not block the seats or windows.',
    chinese: '我的后备箱可能无法安全放下所有行李。不能挡住座位或车窗。',
  },
  {
    scenario: 'Fragile luggage',
    scenarioChinese: '易碎行李',
    english: 'Please let me know if anything is fragile, and I will place it carefully.',
    chinese: '如果有易碎物品请告诉我，我会小心放置。',
  },
  {
    scenario: 'Dirty luggage',
    scenarioChinese: '行李很脏',
    english: 'The luggage looks wet or dirty. Could you please cover it before placing it in the car?',
    chinese: '行李看起来湿了或比较脏。放进车前能盖一下吗？',
  },
  {
    scenario: 'Bike or scooter',
    scenarioChinese: '自行车或滑板车',
    english: 'I am sorry, but a bike or scooter may not fit safely in this vehicle.',
    chinese: '不好意思，自行车或滑板车可能无法安全放进这辆车。',
  },
  {
    scenario: 'Wheelchair folding',
    scenarioChinese: '轮椅是否可折叠',
    english: 'Is the wheelchair foldable? I can help place it in the trunk if it fits.',
    chinese: '轮椅可以折叠吗？如果能放下，我可以帮你放进后备箱。',
  },
  {
    scenario: 'Service animal confirmation',
    scenarioChinese: '确认服务动物',
    english: 'Is this a service animal? Please keep it close to you during the ride.',
    chinese: '这是服务动物吗？行程中请让它待在你身边。',
  },
  {
    scenario: 'Pet carrier request',
    scenarioChinese: '宠物需要笼子',
    english: 'Please keep your pet in a carrier or on a leash during the ride.',
    chinese: '行程中请把宠物放在笼子里或系好牵引绳。',
  },
  {
    scenario: 'Wet passenger',
    scenarioChinese: '乘客衣服湿了',
    english: 'You look wet from the rain. Please use a towel or cover so the seat stays dry.',
    chinese: '你看起来被雨淋湿了。请用毛巾或垫一下，避免座椅弄湿。',
  },
  {
    scenario: 'Food delivery smell',
    scenarioChinese: '外卖气味很重',
    english: 'Please keep the food bag closed during the ride so the smell does not stay in the car.',
    chinese: '行程中请把食物袋封好，避免味道留在车里。',
  },
  {
    scenario: 'Open alcohol container',
    scenarioChinese: '开封酒精饮料',
    english: 'Open alcohol containers are not allowed in the car. Please keep it sealed or dispose of it.',
    chinese: '车内不允许开封酒精饮料。请封好或处理掉。',
  },
  {
    scenario: 'Passenger appears intoxicated',
    scenarioChinese: '乘客像喝醉了',
    english: 'For safety, I need everyone to be able to ride calmly. Do you need a moment before we start?',
    chinese: '为了安全，大家需要能平静乘车。出发前你需要缓一下吗？',
  },
  {
    scenario: 'Aggressive passenger',
    scenarioChinese: '乘客情绪激动',
    english: 'I want to keep this ride safe and respectful. If there is a problem, we can contact support.',
    chinese: '我希望这趟行程安全、互相尊重。如果有问题，我们可以联系平台客服。',
  },
  {
    scenario: 'Passenger refuses seatbelt',
    scenarioChinese: '乘客不系安全带',
    english: 'I cannot start the trip until everyone is wearing a seatbelt. Thank you for understanding.',
    chinese: '所有人系好安全带后我才能开始行程。谢谢理解。',
  },
  {
    scenario: 'Too many passengers for seats',
    scenarioChinese: '人数超过座位',
    english: 'I cannot take more passengers than there are seatbelts. You may need a larger vehicle.',
    chinese: '乘客人数不能超过安全带数量。你可能需要更大的车。',
  },
  {
    scenario: 'Unaccompanied minor',
    scenarioChinese: '未成年人单独乘车',
    english: 'I am sorry, but I cannot take an unaccompanied minor. Please contact the app for help.',
    chinese: '不好意思，我不能接单独乘车的未成年人。请联系平台处理。',
  },
  {
    scenario: 'Child without car seat',
    scenarioChinese: '儿童没有安全座椅',
    english: 'For safety and legal reasons, I cannot start the trip without the required child car seat.',
    chinese: '出于安全和法律原因，没有儿童安全座椅我不能开始行程。',
  },
  {
    scenario: 'Passenger wants front seat',
    scenarioChinese: '乘客想坐前排',
    english: 'You may sit in the back seat, please. I keep the front seat clear for safety and space.',
    chinese: '请坐后排。我为了安全和空间会保持前排空着。',
  },
  {
    scenario: 'Mask or illness concern',
    scenarioChinese: '乘客生病咳嗽',
    english: 'If you are feeling sick, please cover your cough and keep the windows slightly open if possible.',
    chinese: '如果你身体不舒服，请遮挡咳嗽；可以的话我们稍微开窗。',
  },
  {
    scenario: 'Need to sanitize seat',
    scenarioChinese: '需要清洁座位',
    english: 'I need a moment to clean the seat before you get in. Thank you for waiting.',
    chinese: '上车前我需要一点时间清洁座位。谢谢等待。',
  },
  {
    scenario: 'Route has closed road',
    scenarioChinese: '道路关闭',
    english: 'This road is closed, so I need to follow a different route. The app should update the ETA.',
    chinese: '这条路封了，所以我要走另一条路。app 应该会更新到达时间。',
  },
  {
    scenario: 'Passenger requests unsafe stop',
    scenarioChinese: '乘客要求危险停车',
    english: 'I cannot stop there safely. I will stop at the nearest legal and safe place.',
    chinese: '那里不能安全停车。我会停在最近合法安全的位置。',
  },
  {
    scenario: 'Passenger requests cash route',
    scenarioChinese: '乘客想私下改路线',
    english: 'Please keep all route changes in the app so the trip and fare are recorded correctly.',
    chinese: '请在 app 里完成所有路线变更，这样行程和费用才有正确记录。',
  },
  {
    scenario: 'Ask before highway',
    scenarioChinese: '上高速前确认',
    english: 'The highway is faster but may include tolls. Is that okay?',
    chinese: '高速更快，但可能有过路费。可以吗？',
  },
  {
    scenario: 'Avoid tolls request',
    scenarioChinese: '乘客要求避开收费',
    english: 'I can avoid tolls if the app route allows it, but it may take longer.',
    chinese: '如果 app 路线允许，我可以避开收费路，但可能会更久。',
  },
  {
    scenario: 'Need passenger to update stop',
    scenarioChinese: '需要乘客添加停靠点',
    english: 'Please add the stop in the app before we go there, so the route is correct.',
    chinese: '去那里之前请在 app 里添加停靠点，这样路线才正确。',
  },
  {
    scenario: 'Stop taking too long',
    scenarioChinese: '中途停靠太久',
    english: 'This stop is taking longer than expected. Please let me know if you still need more time.',
    chinese: '这个停靠比预期久。请告诉我你是否还需要更多时间。',
  },
  {
    scenario: 'Drive-through request',
    scenarioChinese: '乘客要求开车买餐',
    english: 'I am sorry, but I cannot go through a drive-through unless it is added as a stop in the app.',
    chinese: '不好意思，除非在 app 里添加为停靠点，否则我不能去 drive-through。',
  },
  {
    scenario: 'Gas station stop',
    scenarioChinese: '加油站停靠',
    english: 'Please add the gas station as a stop in the app if you need to go there.',
    chinese: '如果你需要去加油站，请在 app 里添加为停靠点。',
  },
  {
    scenario: 'Passenger wants different drop-off side',
    scenarioChinese: '乘客想换下车侧',
    english: 'I will try to drop you off on the safest side of the street.',
    chinese: '我会尽量把你送到街道更安全的一侧下车。',
  },
  {
    scenario: 'Drop-off at busy street',
    scenarioChinese: '繁忙道路下车',
    english: 'This street is very busy. I will pull over just past the corner where it is safer.',
    chinese: '这条路很忙。我会过了路口找更安全的位置靠边。',
  },
  {
    scenario: 'Gated drop-off',
    scenarioChinese: '下车地点有门禁',
    english: 'I am at the gate for the destination. Do you have a code, or should I drop you here?',
    chinese: '我到目的地门口了。你有门禁码吗？还是在这里下车？',
  },
  {
    scenario: 'Exact door drop-off',
    scenarioChinese: '送到具体门口',
    english: 'Please tell me the door or entrance you want, and I will get as close as safely possible.',
    chinese: '请告诉我你要哪个门或入口，我会尽量安全靠近。',
  },
  {
    scenario: 'Passenger left phone',
    scenarioChinese: '乘客落下手机',
    english: 'I found a phone in the car. Please contact me through the app so we can arrange a return.',
    chinese: '我在车里发现一部手机。请通过 app 联系我安排归还。',
  },
  {
    scenario: 'Passenger left keys',
    scenarioChinese: '乘客落下钥匙',
    english: 'I found keys in the car. Please describe them and we can arrange a return.',
    chinese: '我在车里发现钥匙。请描述一下，我们可以安排归还。',
  },
  {
    scenario: 'Lost item return fee',
    scenarioChinese: '遗失物归还费用',
    english: 'The app may apply a lost item return fee. Please check the app for details.',
    chinese: '平台可能会收取遗失物归还费用。请在 app 里查看详情。',
  },
  {
    scenario: 'Cannot return item immediately',
    scenarioChinese: '不能马上归还物品',
    english: 'I have another trip right now, so I cannot return the item immediately. I will message you when I am available.',
    chinese: '我现在有下一单，不能立刻归还物品。有空后我会发消息给你。',
  },
  {
    scenario: 'Passenger damaged car',
    scenarioChinese: '乘客弄脏或损坏车辆',
    english: 'I need to report the vehicle condition through the app. Please contact support if you have questions.',
    chinese: '我需要通过 app 上报车辆情况。如有问题请联系平台客服。',
  },
  {
    scenario: 'Vomit or spill',
    scenarioChinese: '呕吐或洒东西',
    english: 'I need to stop the trip and clean the vehicle. Please contact support for the next steps.',
    chinese: '我需要结束行程并清洁车辆。请联系平台了解后续处理。',
  },
  {
    scenario: 'Payment handled by app',
    scenarioChinese: '付款由平台处理',
    english: 'Payment is handled through the app. I cannot take payment directly outside the app.',
    chinese: '付款由 app 处理。我不能在 app 外直接收款。',
  },
  {
    scenario: 'Cash tip thanks',
    scenarioChinese: '感谢现金小费',
    english: 'Thank you, I appreciate the tip. Have a great day.',
    chinese: '谢谢你的小费。祝你今天愉快。',
  },
  {
    scenario: 'Fare question',
    scenarioChinese: '乘客询问车费',
    english: 'The fare is calculated by the app. Please check your app for the final price.',
    chinese: '车费由 app 计算。请在你的 app 里查看最终价格。',
  },
  {
    scenario: 'Cancellation fee question',
    scenarioChinese: '取消费问题',
    english: 'Cancellation fees are handled by the app. Please contact support if you believe there is a mistake.',
    chinese: '取消费由 app 处理。如果你认为有错误，请联系平台客服。',
  },
  {
    scenario: 'App navigation wrong',
    scenarioChinese: '导航不准确',
    english: 'The app navigation seems incorrect here. I will follow the safe legal route.',
    chinese: '这里 app 导航似乎不准确。我会走安全合法的路线。',
  },
  {
    scenario: 'GPS signal weak',
    scenarioChinese: 'GPS 信号弱',
    english: 'My GPS signal is weak in this area. Please send a landmark if you can.',
    chinese: '这个区域 GPS 信号弱。可以的话请发一个地标。',
  },
  {
    scenario: 'App froze',
    scenarioChinese: 'App 卡住',
    english: 'My app is temporarily frozen. Please give me a moment to refresh it safely.',
    chinese: '我的 app 暂时卡住了。请给我一点时间安全刷新。',
  },
  {
    scenario: 'Wrong passenger in car',
    scenarioChinese: '可能接错乘客',
    english: 'I need to confirm the passenger name and destination before we continue.',
    chinese: '继续前我需要确认乘客姓名和目的地。',
  },
  {
    scenario: 'Passenger asks to pick up friend',
    scenarioChinese: '乘客要接朋友',
    english: 'Please add the pickup for your friend as a stop in the app before we go there.',
    chinese: '去接朋友前，请在 app 里把那里添加为停靠点。',
  },
  {
    scenario: 'Extra stop not allowed now',
    scenarioChinese: '现在不能临时停靠',
    english: 'I am sorry, but I cannot make an extra stop unless it is added in the app.',
    chinese: '不好意思，除非在 app 里添加，否则我不能临时停靠。',
  },
  {
    scenario: 'Passenger wants driver to wait unpaid',
    scenarioChinese: '乘客要求免费等待',
    english: 'I can wait briefly, but longer waiting time needs to be handled through the app.',
    chinese: '我可以短时间等待，但更长等待需要通过 app 处理。',
  },
  {
    scenario: 'Need to end trip at destination',
    scenarioChinese: '需要在目的地结束行程',
    english: 'I need to end the trip at the destination shown in the app unless you update it.',
    chinese: '除非你修改目的地，否则我需要在 app 显示的目的地结束行程。',
  },
  {
    scenario: 'Passenger wants off-app trip',
    scenarioChinese: '乘客要求私下接单',
    english: 'I cannot do trips outside the app. Please request the ride through the app for safety.',
    chinese: '我不能做 app 外的行程。为了安全，请通过 app 叫车。',
  },
  {
    scenario: 'Driver needs restroom',
    scenarioChinese: '司机需要短暂停靠',
    english: 'I need a quick restroom stop before we continue. I will be as fast as possible.',
    chinese: '继续前我需要快速去一下洗手间。我会尽快。',
  },
  {
    scenario: 'Driver needs fuel',
    scenarioChinese: '司机需要加油',
    english: 'I need to stop for fuel briefly to complete the trip safely.',
    chinese: '为了安全完成行程，我需要短暂停靠加油。',
  },
  {
    scenario: 'Car issue before pickup',
    scenarioChinese: '接客前车辆问题',
    english: 'I am having a vehicle issue and may need to cancel for safety. I apologize for the inconvenience.',
    chinese: '我的车辆出现问题，为了安全可能需要取消。抱歉带来不便。',
  },
  {
    scenario: 'Flat tire',
    scenarioChinese: '轮胎问题',
    english: 'I have a tire issue and cannot continue safely. Please request another ride or contact support.',
    chinese: '我的轮胎有问题，不能安全继续。请重新叫车或联系平台客服。',
  },
  {
    scenario: 'Car temperature request',
    scenarioChinese: '询问空调温度',
    english: 'Would you like the car warmer or cooler? I can adjust the temperature.',
    chinese: '你想车内暖一点还是凉一点？我可以调节温度。',
  },
  {
    scenario: 'Window request',
    scenarioChinese: '询问是否开窗',
    english: 'Would you like the window open a little, or should I keep it closed?',
    chinese: '你想稍微开窗，还是保持关闭？',
  },
  {
    scenario: 'Music off request',
    scenarioChinese: '是否关闭音乐',
    english: 'I can turn the music off if you prefer a quiet ride.',
    chinese: '如果你想安静乘车，我可以关掉音乐。',
  },
  {
    scenario: 'Phone charging',
    scenarioChinese: '手机充电',
    english: 'I have a charger available. Please tell me what type of cable you need.',
    chinese: '我这里有充电器。请告诉我你需要哪种线。',
  },
  {
    scenario: 'Need silence for call',
    scenarioChinese: '乘客需要打电话',
    english: 'No problem, I will keep the ride quiet while you are on the phone.',
    chinese: '没问题，你打电话时我会保持安静。',
  },
  {
    scenario: 'Passenger asks personal question',
    scenarioChinese: '乘客问私人问题',
    english: 'I prefer to keep the ride professional, but I am happy to help with the trip.',
    chinese: '我更希望保持专业服务，但很乐意帮助你完成行程。',
  },
  {
    scenario: 'Language barrier',
    scenarioChinese: '语言沟通困难',
    english: 'My English is limited, but I will do my best. Please message me in the app if needed.',
    chinese: '我的英语有限，但我会尽力。如有需要请在 app 里发消息。',
  },
  {
    scenario: 'Ask passenger to type',
    scenarioChinese: '请乘客打字沟通',
    english: 'Could you please type that in the app? It will help me understand clearly.',
    chinese: '你可以在 app 里打字发给我吗？这样我更容易理解。',
  },
  {
    scenario: 'Need exact address typed',
    scenarioChinese: '需要输入准确地址',
    english: 'Please type the exact address in the app so I can follow the correct route.',
    chinese: '请在 app 里输入准确地址，这样我能走正确路线。',
  },
  {
    scenario: 'Passenger wants faster driving',
    scenarioChinese: '乘客催快点开',
    english: 'I understand, but I need to drive safely and follow the speed limit.',
    chinese: '我理解，但我需要安全驾驶并遵守限速。',
  },
  {
    scenario: 'Passenger asks to break rule',
    scenarioChinese: '乘客要求违规',
    english: 'I am sorry, but I cannot break traffic rules. Safety comes first.',
    chinese: '不好意思，我不能违反交通规则。安全第一。',
  },
  {
    scenario: 'Police checkpoint',
    scenarioChinese: '遇到检查点',
    english: 'There is a police checkpoint ahead. We may be delayed for a few minutes.',
    chinese: '前方有警方检查点。我们可能会延误几分钟。',
  },
  {
    scenario: 'Severe weather',
    scenarioChinese: '恶劣天气',
    english: 'The weather is bad, so I will drive more carefully. The trip may take a little longer.',
    chinese: '天气不好，所以我会更小心驾驶。行程可能会稍久一点。',
  },
  {
    scenario: 'Snow or icy road',
    scenarioChinese: '雪天或结冰路面',
    english: 'The road is icy, so I need to drive slowly for everyone\'s safety.',
    chinese: '路面结冰，所以为了大家安全我需要慢点开。',
  },
  {
    scenario: 'Heavy rain pickup',
    scenarioChinese: '大雨接客',
    english: 'It is raining heavily. I will pull as close as safely possible so you can get in quickly.',
    chinese: '雨很大。我会尽量安全靠近，方便你快速上车。',
  },
  {
    scenario: 'Low visibility',
    scenarioChinese: '能见度低',
    english: 'Visibility is low, so please look carefully for my car and license plate.',
    chinese: '能见度低，请仔细找我的车和车牌。',
  },
  {
    scenario: 'Road flooded',
    scenarioChinese: '道路积水',
    english: 'This road is flooded. I need to take a safer route around it.',
    chinese: '这条路积水了。我需要绕到更安全的路线。',
  },
  {
    scenario: 'Passenger asks for AC stronger',
    scenarioChinese: '乘客要求空调更强',
    english: 'Sure, I will make the AC stronger. Let me know if it gets too cold.',
    chinese: '好的，我会把空调调强。如果太冷请告诉我。',
  },
  {
    scenario: 'Passenger asks for heat stronger',
    scenarioChinese: '乘客要求暖气更强',
    english: 'Sure, I will turn the heat up. Let me know when it feels comfortable.',
    chinese: '好的，我会把暖气调高。舒服了请告诉我。',
  },
  {
    scenario: 'Ask about luggage count',
    scenarioChinese: '询问行李数量',
    english: 'How many bags do you have? I want to make sure there is enough space.',
    chinese: '你有几件行李？我想确认空间是否足够。',
  },
  {
    scenario: 'Ask about passenger count',
    scenarioChinese: '询问乘客人数',
    english: 'How many passengers are riding today? I want to confirm before arrival.',
    chinese: '今天有几位乘客？到达前我想确认一下。',
  },
  {
    scenario: 'Confirm pickup side of street',
    scenarioChinese: '确认街道哪一侧',
    english: 'Which side of the street are you on? I want to avoid making you cross traffic.',
    chinese: '你在街道哪一侧？我想避免让你穿过车流。',
  },
];

const ALL_MESSAGES = [...PREVIEW_MESSAGES, ...ADDITIONAL_MESSAGES];

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

const filterMessages = (query: string) => {
  const searchTerm = query.trim().toLowerCase();
  if (searchTerm.length === 0) return ALL_MESSAGES;

  const expandedTerms = SEARCH_HINTS.flatMap((hint) =>
    hint.terms.some((term) => term.toLowerCase().includes(searchTerm) || searchTerm.includes(term.toLowerCase()))
      ? hint.matches
      : []
  );
  const terms = [searchTerm, ...expandedTerms.map((term) => term.toLowerCase())];

  return ALL_MESSAGES.filter((msg) => {
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

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[420px]">
              {PACK_NOTES.map((note) => (
                <div key={note} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700">
                  {note}
                </div>
              ))}
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
