interface Entry {
  id: string;
  title: string;
  date: string;
  mood: string;
  bookId: string;
  content: string;
  imageUrl?: string;
}

interface EntriesData {
  [key: string]: Entry;
}

export const entriesData: EntriesData = {
  '1': { 
    id: '1', 
    title: 'يوم جميل في الحديقة', 
    date: '2025-06-25', 
    mood: 'happy', 
    bookId: '1',
    content: 'كان يوماً رائعاً قضيته مع العائلة في الحديقة. استمتعنا بالطقس الجميل وتناولنا الغداء في الهواء الطلق. لعبنا الكثير من الألعاب وقضينا وقتاً ممتعاً معاً.',
    imageUrl: 'https://api.a0.dev/assets/image?text=يوم جميل في الحديقة&aspect=1:1'
  },
  '2': { 
    id: '2', 
    title: 'تأملات مسائية', 
    date: '2025-06-22', 
    mood: 'calm', 
    bookId: '1',
    content: 'جلست على الشرفة أتأمل النجوم وأفكر في الحياة. كان المساء هادئاً والسماء صافية. شعرت بالسلام والهدوء. أحب هذه اللحظات التي أقضيها مع نفسي في التأمل والتفكير.',
    imageUrl: 'https://api.a0.dev/assets/image?text=تأملات مسائية&aspect=1:1'
  },
  '3': { 
    id: '3', 
    title: 'لقاء مع صديق قديم', 
    date: '2025-06-20', 
    mood: 'nostalgic', 
    bookId: '1',
    content: 'التقيت اليوم بصديق لم أره منذ سنوات. تحدثنا عن الذكريات القديمة وضحكنا كثيراً. كم هو جميل أن نلتقي بأصدقاء الطفولة ونستعيد معهم الذكريات الجميلة.',
    imageUrl: 'https://api.a0.dev/assets/image?text=لقاء مع صديق قديم&aspect=1:1'
  },
  '4': { 
    id: '4', 
    title: 'ذكرى من الطفولة', 
    date: '2025-06-24', 
    mood: 'nostalgic', 
    bookId: '2',
    content: 'تذكرت اليوم عندما كنت صغيراً وكنت ألعب في حديقة المنزل. كانت أيام جميلة وبسيطة. كنت أقضي ساعات في اللعب مع أصدقائي دون أي هموم.',
    imageUrl: 'https://api.a0.dev/assets/image?text=ذكرى من الطفولة&aspect=1:1'
  },
  '5': { 
    id: '5', 
    title: 'رحلتي إلى الجبال', 
    date: '2025-06-23', 
    mood: 'excited', 
    bookId: '3',
    content: 'قمت برحلة استكشافية رائعة إلى الجبال. كان المنظر خلاباً والهواء منعشاً. تسلقت إلى القمة واستمتعت بالمنظر الرائع من الأعلى. كانت تجربة لا تنسى.',
    imageUrl: 'https://api.a0.dev/assets/image?text=رحلتي إلى الجبال&aspect=1:1'
  },
}; 