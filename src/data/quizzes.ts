export interface QuizQuestion {
  id: string;
  moduleId: string;
  type: 'choice' | 'judgment' | 'fill';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  reward: number;
}

export const quizQuestions: QuizQuestion[] = [
  // 汉字乐园 - 形近字
  {
    id: 'q-xj-1',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"清"和"请"有什么相同的地方？',
    options: ['都有三点水', '都有言字旁', '都读qing', '意思一样'],
    correctAnswer: 2,
    explanation: '"清"和"请"都读qing，但是"清"是三点水，和水有关；"请"是言字旁，和说话有关。',
    reward: 10
  },
  {
    id: 'q-xj-2',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"清"字是什么偏旁？',
    options: ['言字旁', '三点水', '日字旁', '口字旁'],
    correctAnswer: 1,
    explanation: '"清"是三点水旁，和水有关，比如清水、清河。',
    reward: 10
  },
  {
    id: 'q-xj-3',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"请"字是什么偏旁？',
    options: ['言字旁', '三点水', '日字旁', '口字旁'],
    correctAnswer: 0,
    explanation: '"请"是言字旁，和说话有关，比如请坐、请问。',
    reward: 10
  },
  {
    id: 'q-xj-4',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"晴"天和什么有关？',
    options: ['水', '太阳', '说话', '月亮'],
    correctAnswer: 1,
    explanation: '"晴"是日字旁，和太阳有关，表示天气好、有太阳。',
    reward: 10
  },
  {
    id: 'q-xj-5',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"睛"睛和什么有关？',
    options: ['水', '太阳', '说话', '眼睛'],
    correctAnswer: 3,
    explanation: '"睛"是目字旁，和眼睛有关，比如眼睛、目不转睛。',
    reward: 10
  },

  // 汉字乐园 - 同音字
  {
    id: 'q-ty-1',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"在"和"再"的意思一样吗？',
    options: ['一样', '不一样', '有时候一样', '不知道'],
    correctAnswer: 1,
    explanation: '"在"表示在哪里（我在学校），"再"表示又一次（再见、再来）。',
    reward: 10
  },
  {
    id: 'q-ty-2',
    moduleId: 'hanzi',
    type: 'fill',
    question: '请填空（用"在"或"再"）：\n"我___学校学习。"',
    correctAnswer: '在学校学习',
    explanation: '"在学校"表示在学校这个地点学习。整句是"我在学校学习"。',
    reward: 10
  },
  {
    id: 'q-ty-3',
    moduleId: 'hanzi',
    type: 'fill',
    question: '请填空（用"在"或"再"）：\n"明天___见！"',
    correctAnswer: '明天再见',
    explanation: '"再见"表示下次再见面，是一个告别用语。整句是"明天再见"。',
    reward: 10
  },
  {
    id: 'q-ty-4',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"朋友"的"友"和什么有关？',
    options: ['左边', '右边', '友谊', '有'],
    correctAnswer: 2,
    explanation: '"友"表示朋友的意思，朋友的"友"和友谊的"友"是一样的。',
    reward: 10
  },
  {
    id: 'q-ty-5',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"明"天和什么有关？',
    options: ['月亮', '太阳和月亮', '星星', '天空'],
    correctAnswer: 1,
    explanation: '"明"是日字旁加月字旁，表示明亮，也表示明天。',
    reward: 10
  },

  // 汉字乐园 - 易错笔顺
  {
    id: 'q-bs-1',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"火"字的第二笔是什么？',
    options: ['长撇', '短撇', '点', '捺'],
    correctAnswer: 1,
    explanation: '"火"的笔顺是：点、短撇、长撇、捺。第二笔是短撇。',
    reward: 10
  },
  {
    id: 'q-bs-2',
    moduleId: 'hanzi',
    type: 'choice',
    question: '"为"字有几笔？',
    options: ['3笔', '4笔', '5笔', '6笔'],
    correctAnswer: 1,
    explanation: '"为"的笔顺是：撇、点、撇、点，一共4笔。',
    reward: 10
  },
  {
    id: 'q-bs-3',
    moduleId: 'hanzi',
    type: 'judgment',
    question: '"北"字的笔顺是：竖、横、提、竖弯钩，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"北"字的笔顺是：竖、横、提、竖弯钩，共4笔。',
    reward: 10
  },

  // 词语花园 - ABB式
  {
    id: 'q-cf-abb-1',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"静悄悄"是什么结构的词语？',
    options: ['AAB式', 'ABB式', 'AABB式', 'ABAB式'],
    correctAnswer: 1,
    explanation: 'ABB式词语：后两个字相同，如静悄悄、绿油油。',
    reward: 10
  },
  {
    id: 'q-cf-abb-2',
    moduleId: 'ciyu',
    type: 'choice',
    question: '哪个是ABB式的词语？',
    options: ['平平安安', '静悄悄', '雪白雪白', '学习学习'],
    correctAnswer: 1,
    explanation: '"静悄悄"是ABB式，前一个字不同，后两个字相同。',
    reward: 10
  },
  {
    id: 'q-cf-abb-3',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"亮晶晶"是什么结构的词语？',
    options: ['AAB式', 'ABB式', 'AABB式', 'ABAB式'],
    correctAnswer: 1,
    explanation: '"亮晶晶"是ABB式，后两个字相同"晶晶"。',
    reward: 10
  },

  // 词语花园 - AABB式
  {
    id: 'q-cf-aabb-1',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"平平安安"是什么结构的词语？',
    options: ['AAB式', 'ABB式', 'AABB式', 'ABAB式'],
    correctAnswer: 2,
    explanation: 'AABB式词语：两个字重复两次，如平平安安、干干净净。',
    reward: 10
  },
  {
    id: 'q-cf-aabb-2',
    moduleId: 'ciyu',
    type: 'choice',
    question: '哪个不是AABB式的词语？',
    options: ['干干净净', '蹦蹦跳跳', '绿油油', '安安静静'],
    correctAnswer: 2,
    explanation: '"绿油油"是ABB式，不是AABB式。AABB是重复两次，如干干净净。',
    reward: 10
  },
  {
    id: 'q-cf-aabb-3',
    moduleId: 'ciyu',
    type: 'judgment',
    question: '"认认真真"是AABB式的词语吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"认认真真"是AABB式，"认真"重复了两次。',
    reward: 10
  },

  // 词语花园 - ABAB式
  {
    id: 'q-cf-abab-1',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"雪白雪白"是什么结构的词语？',
    options: ['AAB式', 'ABB式', 'AABB式', 'ABAB式'],
    correctAnswer: 3,
    explanation: 'ABAB式词语：两个词组重复一次，如雪白雪白、碧绿碧绿。',
    reward: 10
  },
  {
    id: 'q-cf-abab-2',
    moduleId: 'ciyu',
    type: 'choice',
    question: '哪个是ABAB式的词语？',
    options: ['安安静静', '静悄悄', '火红火红', '干干净净'],
    correctAnswer: 2,
    explanation: '"火红火红"是ABAB式，前面的词组重复了一次。',
    reward: 10
  },
  {
    id: 'q-cf-abab-3',
    moduleId: 'ciyu',
    type: 'judgment',
    question: '"学习学习"是ABAB式的词语吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"学习学习"是ABAB式，"学习"这个词组重复了一次。',
    reward: 10
  },

  // 词语花园 - 特殊词语
  {
    id: 'q-cf-other-1',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"又黏又甜"是什么结构的词语？',
    options: ['ABB式', 'AABB式', '又×又×式', '×来×去式'],
    correctAnswer: 2,
    explanation: '"又×又×"式表示两个特点同时存在，如又大又圆、又香又甜。',
    reward: 10
  },
  {
    id: 'q-cf-other-2',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"游来游去"是什么结构的词语？',
    options: ['ABB式', 'AABB式', '又×又×式', '×来×去式'],
    correctAnswer: 3,
    explanation: '"×来×去"式表示动作反复，如飞来飞去、跑来跑去。',
    reward: 10
  },
  {
    id: 'q-cf-other-3',
    moduleId: 'ciyu',
    type: 'choice',
    question: '"西瓜___"用哪个词最合适？',
    options: ['又黏又甜', '又大又圆', '静悄悄', '干干净净'],
    correctAnswer: 1,
    explanation: '"又大又圆"形容西瓜的特点，又大又圆。',
    reward: 10
  },

  // 古诗背诵 - 赠汪伦
  {
    id: 'q-gs-1',
    moduleId: 'gushi',
    type: 'choice',
    question: '《赠汪伦》是谁写的？',
    options: ['孟浩然', '李白', '贾岛', '杜甫'],
    correctAnswer: 1,
    explanation: '《赠汪伦》是唐代诗人李白的作品。',
    reward: 10
  },
  {
    id: 'q-gs-fill-1',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把后半句补充完整：\n桃花潭水深千尺，___？',
    correctAnswer: '不及汪伦送我情',
    explanation: '"桃花潭水深千尺，不及汪伦送我情"的意思是：桃花潭的水虽然很深，但还比不上汪伦送我的情谊。',
    reward: 10
  },
  {
    id: 'q-gs-2',
    moduleId: 'gushi',
    type: 'choice',
    question: '《赠汪伦》中"汪伦"是什么人？',
    options: ['诗人', '李白的朋友', '皇帝', '老师'],
    correctAnswer: 1,
    explanation: '汪伦是李白的好朋友，这首诗是李白送给汪伦的。',
    reward: 10
  },
  {
    id: 'q-gs-fill-2',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把前半句补充完整：\n___，忽闻岸上踏歌声。',
    correctAnswer: '李白乘舟将欲行',
    explanation: '诗句"李白乘舟将欲行，忽闻岸上踏歌声"描写了李白正要乘船离开时，听到朋友踏歌送行的场景。',
    reward: 10
  },
  {
    id: 'q-gs-3',
    moduleId: 'gushi',
    type: 'judgment',
    question: '"桃花潭水深千尺，不及汪伦送我情"的意思是：桃花潭的水很深，但没有朋友的情谊深。对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '这句诗的意思是：桃花潭的水虽然有千尺深，但还比不上汪伦送我的情谊深。',
    reward: 10
  },

  // 古诗背诵 - 春晓
  {
    id: 'q-gs-4',
    moduleId: 'gushi',
    type: 'choice',
    question: '《春晓》的作者是谁？',
    options: ['李白', '孟浩然', '贾岛', '王维'],
    correctAnswer: 1,
    explanation: '《春晓》是唐代诗人孟浩然的作品。',
    reward: 10
  },
  {
    id: 'q-gs-fill-3',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把后半句补充完整：\n春眠不觉晓，___？',
    correctAnswer: '处处闻啼鸟',
    explanation: '这是《春晓》的前两句："春眠不觉晓，处处闻啼鸟"。意思是春天睡得很香，不知不觉天就亮了，到处都能听到鸟叫声。',
    reward: 10
  },
  {
    id: 'q-gs-5',
    moduleId: 'gushi',
    type: 'choice',
    question: '《春晓》中"春眠不觉晓"是什么意思？',
    options: ['春天很冷睡不着', '春天睡得很香不知道天亮了', '春天起得很早', '春天很热'],
    correctAnswer: 1,
    explanation: '"春眠不觉晓"的意思是：春天睡得很香甜，不知不觉天就亮了。',
    reward: 10
  },
  {
    id: 'q-gs-fill-4',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把后半句补充完整：\n___，花落知多少。',
    correctAnswer: '夜来风雨声',
    explanation: '这是《春晓》的第三四句："夜来风雨声，花落知多少"。意思是昨晚刮风下雨了，不知道有多少花瓣被打落了。',
    reward: 10
  },
  {
    id: 'q-gs-6',
    moduleId: 'gushi',
    type: 'judgment',
    question: '《春晓》中"夜来风雨声"说明昨晚下雨了，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"夜来风雨声"的意思是：昨晚刮风下雨了。',
    reward: 10
  },

  // 古诗背诵 - 寻隐者不遇
  {
    id: 'q-gs-7',
    moduleId: 'gushi',
    type: 'choice',
    question: '《寻隐者不遇》写了诗人去哪里找谁？',
    options: ['去学校找老师', '去山里找隐士', '去河边钓鱼', '去城里找朋友'],
    correctAnswer: 1,
    explanation: '《寻隐者不遇》写了诗人去山里找隐士，但是没有遇到。',
    reward: 10
  },
  {
    id: 'q-gs-fill-5',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把后半句补充完整：\n只在此山中，___？',
    correctAnswer: '云深不知处',
    explanation: '这是《寻隐者不遇》的三四句："只在此山中，云深不知处"。意思是师傅就在这座山里，但山很高云很浓，不知道具体在哪里。',
    reward: 10
  },
  {
    id: 'q-gs-8',
    moduleId: 'gushi',
    type: 'choice',
    question: '诗人问童子，师傅去哪了？童子怎么回答的？',
    options: ['去学校了', '去采药了', '去旅游了', '去买东西了'],
    correctAnswer: 1,
    explanation: '童子说："言师采药去"，意思是师傅去山里采药了。',
    reward: 10
  },
  {
    id: 'q-gs-fill-6',
    moduleId: 'gushi',
    type: 'fill',
    question: '古诗填空：\n请把前三字补充完整：\n___，言师采药去。',
    correctAnswer: '松下问童子',
    explanation: '这是《寻隐者不遇》的前两句："松下问童子，言师采药去"。意思是诗人在松树下问小童子，童子说师傅去采药了。',
    reward: 10
  },
  {
    id: 'q-gs-9',
    moduleId: 'gushi',
    type: 'judgment',
    question: '《寻隐者不遇》的题目意思是：寻找隐士的人没有遇到隐士，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"不遇"就是没有遇到，题目意思是诗人去找隐士但没遇到。',
    reward: 10
  },

  // 句子魔方 - 姓氏句式
  {
    id: 'q-jf-xing-1',
    moduleId: 'jufang',
    type: 'choice',
    question: '"你姓什么？我姓李。什么李？木子李。"这里的"李"是什么结构？',
    options: ['上下结构', '左右结构', '木字旁加子', '大口框'],
    correctAnswer: 2,
    explanation: '"李"字是"木"字旁加"子"字组成的，所以叫"木子李"。',
    reward: 10
  },
  {
    id: 'q-jf-xing-2',
    moduleId: 'jufang',
    type: 'choice',
    question: '复姓"欧阳"是怎么组成的？',
    options: ['欧+阳', '东+方', '欧+方', '东+阳'],
    correctAnswer: 1,
    explanation: '"欧阳"是复姓，由"东"和"方"组成，"欧"是"欧阳"的简称。',
    reward: 10
  },
  {
    id: 'q-jf-xing-3',
    moduleId: 'jufang',
    type: 'fill',
    question: '请填空：\n"你姓什么？我姓张。什么张？___张。"',
    correctAnswer: '弓长',
    explanation: '"张"是"弓"字旁加"长"字组成的，所以叫"弓长张"。',
    reward: 10
  },

  // 句子魔方 - 在...句式
  {
    id: 'q-jf-zai-1',
    moduleId: 'jufang',
    type: 'choice',
    question: '"小鸟在树枝上唱歌。"这句话的"在"表示什么？',
    options: ['时间', '位置', '原因', '结果'],
    correctAnswer: 1,
    explanation: '"在...上"表示事物所在的位置，"在树枝上"表示小鸟的位置。',
    reward: 10
  },
  {
    id: 'q-jf-zai-2',
    moduleId: 'jufang',
    type: 'fill',
    question: '请填空（用"在"或"游"）：\n"小鱼___水里___来___去。"',
    correctAnswer: '小鱼在水里游来游去',
    explanation: '"小鱼在水里游来游去"表示小鱼在水里游泳的样子。',
    reward: 10
  },
  {
    id: 'q-jf-zai-3',
    moduleId: 'jufang',
    type: 'judgment',
    question: '"星星在夜空中闪烁。"是表示星星在哪里的句子，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"在夜空中"表示星星的位置，这是在...句式。',
    reward: 10
  },

  // 句子魔方 - ...也...句式
  {
    id: 'q-jf-ye-1',
    moduleId: 'jufang',
    type: 'choice',
    question: '"我很喜欢唱歌，___很喜欢跳舞。"用什么词连接？',
    options: ['在', '和', '也', '又'],
    correctAnswer: 2,
    explanation: '"...也..."句式表示前后两个事物有相同的特点，这里应该是"我也很喜欢跳舞"。',
    reward: 10
  },
  {
    id: 'q-jf-ye-2',
    moduleId: 'jufang',
    type: 'choice',
    question: '"树很孤单，___鹊也很孤单。"这句话的意思是？',
    options: ['只有树孤单', '只有喜鹊孤单', '树和喜鹊都孤单', '都不孤单'],
    correctAnswer: 2,
    explanation: '"...也..."表示"和...一样"，树孤单，喜鹊也一样孤单。',
    reward: 10
  },
  {
    id: 'q-jf-ye-3',
    moduleId: 'jufang',
    type: 'judgment',
    question: '"...也..."句式可以表示两个事物有相同的特点，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"...也..."句式表示前后两个事物有相同的特点或状态。',
    reward: 10
  },

  // 句子魔方 - 一...就...句式
  {
    id: 'q-jf-yi-1',
    moduleId: 'jufang',
    type: 'choice',
    question: '"一...就..."句式表示什么？',
    options: ['两个动作同时发生', '两个动作紧接着发生', '两个动作相反', '两个动作无关'],
    correctAnswer: 1,
    explanation: '"一...就..."表示一个动作发生后，另一个动作紧接着就发生了。',
    reward: 10
  },
  {
    id: 'q-jf-yi-2',
    moduleId: 'jufang',
    type: 'fill',
    question: '请填空（用"一...就..."的结构）：\n"___听到铃声，___进教室。"',
    correctAnswer: '一听到铃声就进教室',
    explanation: '"一听到铃声就进教室"表示听到铃声后紧接着就进教室。',
    reward: 10
  },
  {
    id: 'q-jf-yi-3',
    moduleId: 'jufang',
    type: 'choice',
    question: '"妈妈一叫我，我就回家。"这句话中两个动作的顺序是？',
    options: ['先回家再叫', '先叫再回家', '同时发生', '无关'],
    correctAnswer: 1,
    explanation: '"一...就..."表示先发生第一个动作（叫），然后紧接着发生第二个动作（回家）。',
    reward: 10
  },

  // 句子魔方 - 拟人句
  {
    id: 'q-jf-niren-1',
    moduleId: 'jufang',
    type: 'choice',
    question: '什么是拟人句？',
    options: ['把人比作东西', '把事物当作人来写', '把人写成东西', '描写人的句子'],
    correctAnswer: 1,
    explanation: '拟人句是把事物当作人来写，让它们有人的动作和感情。',
    reward: 10
  },
  {
    id: 'q-jf-niren-2',
    moduleId: 'jufang',
    type: 'choice',
    question: '"星星在夜空中快活地眨眼睛。"这是什么句？',
    options: ['比喻句', '拟人句', '夸张句', '陈述句'],
    correctAnswer: 1,
    explanation: '"星星眨眼睛"是把星星当作人来写，是拟人句。',
    reward: 10
  },
  {
    id: 'q-jf-niren-3',
    moduleId: 'jufang',
    type: 'judgment',
    question: '"花儿在风中笑弯了腰。"是拟人句吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"花儿笑弯了腰"是把花儿当作人来写，是拟人句。',
    reward: 10
  },

  // 句子魔方 - 仿写句子
  {
    id: 'q-jf-fang-1',
    moduleId: 'jufang',
    type: 'fill',
    question: '仿写句子：\n例句：小鸟在树枝上唱歌。\n请用"在...上..."的结构写一个句子。',
    correctAnswer: '小鱼在水里游泳',
    explanation: '按照例句"在...上..."的结构，可以写"小鱼在水里游泳"、"蝴蝶在花丛中跳舞"等。',
    reward: 10
  },
  {
    id: 'q-jf-fang-2',
    moduleId: 'jufang',
    type: 'fill',
    question: '仿写句子：\n例句：树很孤单，喜鹊也很孤单。\n请用"很...，...也很..."的结构写一个句子。',
    correctAnswer: '我很开心，弟弟也很开心',
    explanation: '按照例句"很...，...也很..."的结构，可以写"我很开心，弟弟也很开心"、"花儿很美，草儿也很美"等。',
    reward: 10
  },
  {
    id: 'q-jf-fang-3',
    moduleId: 'jufang',
    type: 'fill',
    question: '仿写句子：\n例句：我一听到铃声就进教室。\n请用"一...就..."的结构写一个句子。',
    correctAnswer: '妈妈一回家就开始做饭',
    explanation: '按照例句"一...就..."的结构，可以写"妈妈一回家就开始做饭"、"我一看到书就想读"等。',
    reward: 10
  },
  {
    id: 'q-jf-fang-4',
    moduleId: 'jufang',
    type: 'fill',
    question: '仿写句子：\n例句：小鸟在树枝上唱歌。\n请用"在...中..."的结构写一个句子。',
    correctAnswer: '小鸟在天空中飞翔',
    explanation: '按照例句"在...中..."的结构，可以写"小鸟在天空中飞翔"、"鱼儿在水中游玩"等。',
    reward: 10
  },
  {
    id: 'q-jf-fang-5',
    moduleId: 'jufang',
    type: 'fill',
    question: '仿写句子：\n例句：月亮弯弯的，像小船。\n请用"像"字写一个比喻句。',
    correctAnswer: '太阳圆圆的，像火球',
    explanation: '按照例句用"像"字写比喻句，可以写"太阳圆圆的，像火球"、"星星闪闪的，像眼睛"等。',
    reward: 10
  },

  // 课文背诵 - 春夏秋冬
  {
    id: 'q-kw-chun-1',
    moduleId: 'kewen',
    type: 'choice',
    question: '春天会吹什么风？',
    options: ['秋风', '夏风', '春风', '北风'],
    correctAnswer: 2,
    explanation: '春天吹的是春风，"春风"这个词出自《春夏秋冬》。',
    reward: 10
  },
  {
    id: 'q-kw-chun-2',
    moduleId: 'kewen',
    type: 'choice',
    question: '秋天会降什么？',
    options: ['夏雨', '春雨', '秋霜', '冬雪'],
    correctAnswer: 2,
    explanation: '秋天会降秋霜，"秋霜降"出自《春夏秋冬》。',
    reward: 10
  },
  {
    id: 'q-kw-chun-3',
    moduleId: 'kewen',
    type: 'judgment',
    question: '"冬雪飘"描写的是冬天的景象，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '冬天会下雪，雪花飘落就是"冬雪飘"。',
    reward: 10
  },

  // 课文背诵 - 姓氏歌
  {
    id: 'q-kw-xing-1',
    moduleId: 'kewen',
    type: 'choice',
    question: '"木子李"是说"李"字由哪两部分组成？',
    options: ['木+子', '木+日', '木+月', '木+目'],
    correctAnswer: 0,
    explanation: '"李"字是上下结构，上面是"木"，下面是"子"。',
    reward: 10
  },
  {
    id: 'q-kw-xing-2',
    moduleId: 'kewen',
    type: 'choice',
    question: '下面哪个是复姓？',
    options: ['李', '王', '张', '欧阳'],
    correctAnswer: 3,
    explanation: '"欧阳"是复姓，由两个字组成。',
    reward: 10
  },
  {
    id: 'q-kw-xing-3',
    moduleId: 'kewen',
    type: 'judgment',
    question: '中国的姓氏有很多，只有单姓没有复姓，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 1,
    explanation: '中国有单姓也有复姓，如欧阳、诸葛、东方等都是复姓。',
    reward: 10
  },

  // 课文背诵 - 课文主题
  {
    id: 'q-kw-zhong-1',
    moduleId: 'kewen',
    type: 'choice',
    question: '《静夜思》的作者是谁？',
    options: ['孟浩然', '贾岛', '李白', '王维'],
    correctAnswer: 2,
    explanation: '《静夜思》是唐代诗人李白的作品，表达了诗人思念家乡的感情。',
    reward: 10
  },
  {
    id: 'q-kw-zhong-2',
    moduleId: 'kewen',
    type: 'choice',
    question: '端午节吃粽子是为了纪念谁？',
    options: ['李白', '屈原', '杜甫', '孔子'],
    correctAnswer: 1,
    explanation: '端午节吃粽子是为了纪念爱国诗人屈原。',
    reward: 10
  },
  {
    id: 'q-kw-zhong-3',
    moduleId: 'kewen',
    type: 'choice',
    question: '《树和喜鹊》告诉我们什么道理？',
    options: ['要爱护树木', '朋友很重要', '要保护动物', '要努力学习'],
    correctAnswer: 1,
    explanation: '《树和喜鹊》的故事告诉我们：有了朋友才不会孤单，朋友很重要。',
    reward: 10
  },

  // 语文小百科 - 26个字母
  {
    id: 'q-zi-1',
    moduleId: 'xiaoke',
    type: 'choice',
    question: '英语字母表一共有多少个字母？',
    options: ['24个', '25个', '26个', '27个'],
    correctAnswer: 2,
    explanation: '英语字母表一共有26个字母，从A到Z。',
    reward: 10
  },
  {
    id: 'q-zi-2',
    moduleId: 'xiaoke',
    type: 'choice',
    question: '字母表第一个字母是什么？',
    options: ['a', 'A', 'B', 'Z'],
    correctAnswer: 1,
    explanation: '字母表的第一个字母是A（大写）。',
    reward: 10
  },
  {
    id: 'q-zi-3',
    moduleId: 'xiaoke',
    type: 'choice',
    question: '字母表最后一个字母是什么？',
    options: ['A', 'B', 'X', 'Z'],
    correctAnswer: 3,
    explanation: '字母表的最后一个字母是Z（大写）。',
    reward: 10
  },

  // 语文小百科 - 音序查字典
  {
    id: 'q-zi-chazi-1',
    moduleId: 'xiaoke',
    type: 'choice',
    question: '查"花"字应该先找哪个字母？',
    options: ['H', 'A', 'F', 'G'],
    correctAnswer: 0,
    explanation: '"花"的音序是H（大写），所以查"花"要先找字母H。',
    reward: 10
  },
  {
    id: 'q-zi-chazi-2',
    moduleId: 'xiaoke',
    type: 'choice',
    question: '音序查字法的第一步是什么？',
    options: ['数笔画', '找偏旁', '找字母', '数页码'],
    correctAnswer: 2,
    explanation: '音序查字法第一步是先找到字的第一个字母的大写。',
    reward: 10
  },
  {
    id: 'q-zi-chazi-3',
    moduleId: 'xiaoke',
    type: 'judgment',
    question: '查"讲"字，先找字母J，对吗？',
    options: ['正确', '错误'],
    correctAnswer: 0,
    explanation: '"讲"的音节是jiang，音序是J，所以要先找字母J。',
    reward: 10
  }
];

export const getQuizById = (id: string): QuizQuestion | undefined => {
  return quizQuestions.find(q => q.id === id);
};

export const getQuizzesByModule = (moduleId: string): QuizQuestion[] => {
  return quizQuestions.filter(q => q.moduleId === moduleId);
};
