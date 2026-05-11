export interface KnowledgeModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  children: KnowledgeNode[];
}

export interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  examples: string[];
  quizzes: string[];
}

export const knowledgeModules: KnowledgeModule[] = [
  {
    id: 'hanzi',
    title: '汉字乐园',
    icon: '🔤',
    color: 'from-green-400 to-emerald-500',
    children: [
      {
        id: 'hanzi-xingjin',
        title: '形近字辨析',
        content: '形近字是长得像但意思不同的字。\n清(清水) 情(心情) 请(请坐) 晴(晴天) 睛(眼睛)\n入(入口) 人(人们) 么(什么) 公(公共)\n春(春天) 看(看见) 王(王子) 土(土地)\n认(认真) 队(队员) 听(听说) 所(所以)',
        examples: ['"清"是三点水，和水有关。', '"请"是言字旁，和说话有关。'],
        quizzes: ['q-xj-1', 'q-xj-2', 'q-xj-3', 'q-xj-4', 'q-xj-5']
      },
      {
        id: 'hanzi-tongyin',
        title: '同音字辨析',
        content: '同音字是读音相同但字形和意思不同的字。\n在(在家) 再(再见)\n有(没有) 友(朋友) 右(右边)\n长(长短) 常(常常)\n明(明天) 名(名字)\n香(香水) 乡(家乡)\n时(时间) 石(石头)',
        examples: ['我在学校学习，明天再见。', '我有许多好朋友，大家都向右看。'],
        quizzes: ['q-ty-1', 'q-ty-2', 'q-ty-3', 'q-ty-4', 'q-ty-5']
      },
      {
        id: 'hanzi-bishun',
        title: '易错笔顺',
        content: '有些字的笔顺很容易写错，要特别注意！\n火：点、短撇、长撇、捺\n方：点、横、横钩、撇\n巴：横折、竖、横、竖弯钩\n北：竖、横、提、竖弯钩\n走：横、竖、横、竖、横\n为：撇、点、撇、点',
        examples: ['"火"字第二笔是短撇，不是长撇。', '"为"字要笔笔分明。'],
        quizzes: ['q-bs-1', 'q-bs-2', 'q-bs-3']
      }
    ]
  },
  {
    id: 'ciyu',
    title: '词语花园',
    icon: '🌸',
    color: 'from-pink-400 to-rose-500',
    children: [
      {
        id: 'ciyu-abb',
        title: 'ABB式词语',
        content: 'ABB式词语：由两个相同的字加一个不同的字组成。\n静悄悄 胖乎乎 绿油油 亮晶晶\n气冲冲 红扑扑 金灿灿 兴冲冲\n笑哈哈 毛茸茸 甜滋滋 香喷喷',
        examples: ['教室里安安静静的。', '他的脸气得气冲冲的。', '稻田里金灿灿的。'],
        quizzes: ['q-cf-abb-1', 'q-cf-abb-2', 'q-cf-abb-3']
      },
      {
        id: 'ciyu-aabb',
        title: 'AABB式词语',
        content: 'AABB式词语：由两个字重复组成的词语。\n平平安安 蹦蹦跳跳 叽叽喳喳\n安安静静 干干净净 快快乐乐\n开开心心 大大小小 红红火火\n认认真真 许许多多',
        examples: ['小朋友们蹦蹦跳跳地玩游戏。', '教室里安安静静的。'],
        quizzes: ['q-cf-aabb-1', 'q-cf-aabb-2', 'q-cf-aabb-3']
      },
      {
        id: 'ciyu-abab',
        title: 'ABAB式词语',
        content: 'ABAB式词语：两个词组重复一次。\n雪白雪白 碧绿碧绿 金黄金黄\n乌黑乌黑 火红火红 通红通红\n学习学习 暖和暖和 休息休息',
        examples: ['棉花雪白雪白的。', '树叶碧绿碧绿的。', '我学习学习怎么做。'],
        quizzes: ['q-cf-abab-1', 'q-cf-abab-2', 'q-cf-abab-3']
      },
      {
        id: 'ciyu-other',
        title: '特殊词语',
        content: '又×又×式：表示两个特点同时存在。\n又黏又甜 又大又圆 又香又脆\n又高又壮 又红又大 又白又胖\n\n×来×去式：表示动作反复。\n飞来飞去 跑来跑去 游来游去\n跳来跳去 飘来飘去 荡来荡去',
        examples: ['西瓜又大又圆。', '小鸟飞来飞去。', '小鱼游来游去真快乐。'],
        quizzes: ['q-cf-other-1', 'q-cf-other-2', 'q-cf-other-3']
      }
    ]
  },
  {
    id: 'gushi',
    title: '古诗背诵',
    icon: '📜',
    color: 'from-amber-400 to-yellow-500',
    children: [
      {
        id: 'gushi-zeng',
        title: '赠汪伦',
        content: '【唐】李白\n\n李白乘舟将欲行，\n忽闻岸上踏歌声。\n桃花潭水深千尺，\n不及汪伦送我情。',
        examples: ['李白是诗人。', '汪伦是李白的的朋友。', '桃花潭的水很深，但朋友的感情更深。'],
        quizzes: ['q-gs-1', 'q-gs-2', 'q-gs-3']
      },
      {
        id: 'gushi-chunxiao',
        title: '春晓',
        content: '【唐】孟浩然\n\n春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。',
        examples: ['春天来了，诗人睡得很香。', '昨晚下雨了，花落了很多。', '春天可以听到鸟叫声。'],
        quizzes: ['q-gs-4', 'q-gs-5', 'q-gs-6']
      },
      {
        id: 'gushi-yinxzhe',
        title: '寻隐者不遇',
        content: '【唐】贾岛\n\n松下问童子，\n言师采药去。\n只在此山中，\n云深不知处。',
        examples: ['诗人在山里找隐士。', '隐士去采药了。', '山很高，云很多，不知道在哪里。'],
        quizzes: ['q-gs-7', 'q-gs-8', 'q-gs-9']
      }
    ]
  },
  {
    id: 'jufang',
    title: '句子魔方',
    icon: '✍️',
    color: 'from-blue-400 to-indigo-500',
    children: [
      {
        id: 'jufang-xingshi',
        title: '姓氏句式',
        content: '你姓什么？我姓李。\n什么李？木子李。\n\n他姓什么？他姓张。\n什么张？弓长张。\n\n古月胡，口天吴，\n双人徐，言午许。',
        examples: ['你姓什么？我姓王。什么王？大王王。', '你姓什么？我姓陈。什么陈？耳东陈。'],
        quizzes: ['q-jf-xing-1', 'q-jf-xing-2', 'q-jf-xing-3']
      },
      {
        id: 'jufang-zai',
        title: '在...句式',
        content: '表示人或事物在哪里做什么。\n\n小鸟在树枝上唱歌。\n小鱼在水里游来游去。\n星星在夜空中闪烁。\n蜜蜂在花丛中采蜜。',
        examples: ['小船在河面上漂流。', '小朋友在操场上跑步。'],
        quizzes: ['q-jf-zai-1', 'q-jf-zai-2', 'q-jf-zai-3']
      },
      {
        id: 'jufang-ye',
        title: '...也...句式',
        content: '表示两种事物有相同的特点。\n\n树很孤单，喜鹊也很孤单。\n草很柔弱，小花也很柔弱。\n爸爸爱看书，我也爱看书。',
        examples: ['我很开心，妹妹也很开心。', '哥哥很努力，姐姐也很努力。'],
        quizzes: ['q-jf-ye-1', 'q-jf-ye-2', 'q-jf-ye-3']
      },
      {
        id: 'jufang-yi',
        title: '一...就...句式',
        content: '表示两个动作紧接着发生。\n\n我一听到铃声就进教室。\n弟弟一看到冰淇淋就开心。\n我一回家就写作业。',
        examples: ['妈妈一叫我，我就回家。', '我一想玩游戏，就忘记时间。'],
        quizzes: ['q-jf-yi-1', 'q-jf-yi-2', 'q-jf-yi-3']
      },
      {
        id: 'jufang-niren',
        title: '拟人句',
        content: '拟人句：把事物当作人来写，让它们有人的动作和感情。\n\n星星在夜空中快活地眨眼睛。\n花儿在风中笑弯了腰。\n月亮害羞地躲在云的身后。\n小鸟在枝头唱着歌。',
        examples: ['"星星眨眼睛"是拟人句。', '"花儿笑"是拟人句。'],
        quizzes: ['q-jf-niren-1', 'q-jf-niren-2', 'q-jf-niren-3']
      },
      {
        id: 'jufang-fangxie',
        title: '仿写句子',
        content: '仿写句子：按照例句的结构和特点，写出类似的句子。\n\n例句1：小鸟在树枝上唱歌。\n→ 小鱼在水里游泳。\n\n例句2：树很孤单，喜鹊也很孤单。\n→ 我很快乐，小明也很快乐。\n\n例句3：我一回家就写作业。\n→ 妈妈一进门就开始做饭。',
        examples: ['仿写：在树枝上 → 在天空中', '仿写：唱歌 → 飞翔', '仿写：孤单 → 开心'],
        quizzes: ['q-jf-fang-1', 'q-jf-fang-2', 'q-jf-fang-3', 'q-jf-fang-4', 'q-jf-fang-5']
      }
    ]
  },
  {
    id: 'kewen',
    title: '课文背诵',
    icon: '📖',
    color: 'from-purple-400 to-violet-500',
    children: [
      {
        id: 'kewen-chunxia',
        title: '春夏秋冬',
        content: '春风 夏雨 秋霜 冬雪\n春风 夏雨落 秋霜降 冬雪飘\n\n青草 红花 游鱼 飞鸟\n池草青 山花红 鱼出水 鸟入林',
        examples: ['春天有春风。', '夏天会下夏雨。', '秋天有秋霜。', '冬天会下冬雪。'],
        quizzes: ['q-kw-chun-1', 'q-kw-chun-2', 'q-kw-chun-3']
      },
      {
        id: 'kewen-xingshi',
        title: '姓氏歌',
        content: '你姓什么？我姓李。\n什么李？木子李。\n\n他姓什么？他姓张。\n什么张？弓长张。\n\n古月胡，口天吴，\n双人徐，言午许。\n\n赵钱孙李，周吴郑王，\n诸葛、东方、上官、欧阳……',
        examples: ['李是木子李。', '张是弓长张。', '中国有很多姓氏。'],
        quizzes: ['q-kw-xing-1', 'q-kw-xing-2', 'q-kw-xing-3']
      },
      {
        id: 'kewen-zhongxin',
        title: '课文主题',
        content: '《吃水不忘挖井人》：要懂得感恩\n《我多想去看看》：对祖国的热爱\n《小公鸡和小鸭子》：要互相帮助\n《树和喜鹊》：朋友很重要\n《静夜思》：思念家乡\n《夜色》：要勇敢\n《端午粽》：纪念屈原',
        examples: ['《静夜思》是李白写的。', '端午节吃粽子是为了纪念屈原。', '朋友对我们很重要。'],
        quizzes: ['q-kw-zhong-1', 'q-kw-zhong-2', 'q-kw-zhong-3']
      }
    ]
  },
  {
    id: 'xiaoke',
    title: '语文小百科',
    icon: '🔡',
    color: 'from-cyan-400 to-teal-500',
    children: [
      {
        id: 'xiaoke-zimu',
        title: '26个字母',
        content: '字母表：\nAa Bb Cc Dd Ee Ff Gg Hh\nIi Jj Kk Ll Mm Nn Oo Pp\nQq Rr Ss Tt Uu Vv Ww\nXx Yy Zz',
        examples: ['A是第一个字母。', 'Z是最后一个字母。', '一共有26个字母。'],
        quizzes: ['q-zi-1', 'q-zi-2', 'q-zi-3']
      },
      {
        id: 'xiaoke-chazi',
        title: '音序查字典',
        content: '音序查字法口诀：\n\n音序查字要记牢，\n先把首个字母找。\n字母下面找音节，\n看看它在第几页。\n\n例如：查"讲"字\n1. 先找字母J\n2. 再找音节jiang\n3. 看页码翻到那一页',
        examples: ['查"花"字，先找字母H。', '音节是hua。'],
        quizzes: ['q-zi-chazi-1', 'q-zi-chazi-2', 'q-zi-chazi-3']
      }
    ]
  }
];

export const getModuleById = (id: string): KnowledgeModule | undefined => {
  return knowledgeModules.find(m => m.id === id);
};

export const getNodeById = (moduleId: string, nodeId: string): KnowledgeNode | undefined => {
  const module = getModuleById(moduleId);
  return module?.children.find(n => n.id === nodeId);
};
