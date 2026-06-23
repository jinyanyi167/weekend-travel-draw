(function (root) {
  "use strict";

  const departures =
    root.ChinaDepartures ||
    (typeof require !== "undefined" ? require("./data/departures.js") : []);

  const destinations = [
    city("suzhou", "苏州", "江苏", 31.2989, 120.5853, 88, 2, [42, 92, 70, 72, 90, 62], ["园林", "水巷", "咖啡"], ["拙政园或留园慢逛", "平江路夜游", "金鸡湖日落", "山塘街早餐"], "古典园林、平江路和环湖夜色兼顾，适合不想赶路的周末。"),
    city("hangzhou", "杭州", "浙江", 30.2741, 120.1551, 90, 3, [80, 78, 76, 70, 90, 58], ["西湖", "茶山", "寺院"], ["西湖骑行", "灵隐寺", "龙井村茶饭", "京杭大运河夜游"], "自然和城市气质都柔软，情侣第一次周末抽签很难翻车。"),
    city("nanjing", "南京", "江苏", 32.0603, 118.7969, 88, 3, [62, 92, 86, 52, 74, 65], ["六朝", "梧桐", "鸭血粉丝"], ["明城墙", "总统府或六朝博物馆", "秦淮河夜景", "钟山风景区"], "历史厚度足，吃喝密度高，2天也能安排得很饱满。"),
    city("ningbo", "宁波", "浙江", 29.8683, 121.544, 82, 3, [66, 78, 88, 58, 70, 70], ["港城", "海鲜", "书院"], ["天一阁", "老外滩", "东钱湖", "鼓楼小吃"], "海味、港口老街和湖景组合，适合想换口味但不折腾。"),
    city("shaoxing", "绍兴", "浙江", 30.0303, 120.5822, 85, 2, [58, 90, 82, 76, 82, 76], ["水城", "黄酒", "鲁迅"], ["鲁迅故里", "仓桥直街", "黄酒小馆", "东湖坐船"], "小城步行友好，文化感强，夜里喝一杯黄酒很有周末感。"),
    city("yangzhou", "扬州", "江苏", 32.3942, 119.4129, 84, 2, [58, 88, 92, 74, 82, 72], ["早茶", "园林", "运河"], ["趣园早茶", "个园", "瘦西湖", "东关街夜游"], "早茶和园林节奏很松，适合把周末过成慢生活。"),
    city("huzhou", "湖州", "浙江", 30.8943, 120.0868, 78, 2, [74, 70, 70, 82, 76, 74], ["太湖", "古镇", "竹海"], ["南浔古镇", "太湖古镇夜景", "衣裳街", "安吉竹海"], "湖、古镇、竹林都近，适合轻松但有层次的短途。"),
    city("huangshan", "黄山", "安徽", 29.7147, 118.3375, 86, 4, [96, 82, 72, 64, 82, 48], ["山岳", "徽派", "云海"], ["屯溪老街", "宏村或西递", "黄山北海景区", "徽菜晚餐"], "自然震撼值高，小长假尤其值得，周末则建议早出发。"),
    city("jiaxing", "嘉兴", "浙江", 30.7461, 120.7555, 76, 2, [48, 74, 78, 76, 70, 82], ["南湖", "粽子", "古镇"], ["南湖", "月河街区", "乌镇夜景", "嘉兴粽子早餐"], "低门槛、低预算、低疲劳，适合临时出发。"),
    city("jiashan", "嘉善县", "浙江嘉兴", 30.8308, 120.9272, 80, 2, [52, 82, 78, 78, 84, 82], ["西塘", "水乡", "黄桃"], ["西塘古镇夜游", "烟雨长廊", "县城小馆", "大云温泉备选"], "县城尺度小，西塘水乡辨识度强，适合上海出发的一晚轻旅行。"),
    city("tongxiang", "桐乡市", "浙江嘉兴", 30.6291, 120.5651, 84, 2, [54, 82, 80, 74, 86, 72], ["乌镇", "戏剧", "水乡"], ["乌镇西栅夜景", "木心美术馆", "濮院时尚古镇", "桐乡煲晚餐"], "乌镇和濮院让县级市也有完整度，很适合想拍照又不想远行。"),
    city("haining", "海宁市", "浙江嘉兴", 30.5255, 120.681, 76, 2, [42, 76, 74, 68, 72, 84], ["潮涌", "皮革城", "盐官"], ["盐官古城", "观潮公园", "徐志摩旧居", "海宁缸肉小馆"], "钱塘潮和盐官古城有辨识度，预算友好，适合临时抽中就走。"),
    city("pinghu", "平湖市", "浙江嘉兴", 30.677, 121.0151, 72, 2, [58, 62, 72, 76, 70, 84], ["东湖", "九龙山", "海风"], ["东湖景区", "莫氏庄园", "九龙山海边", "乍浦海鲜"], "不是拥挤热门地，但湖、老宅和海鲜能组成轻松周末。"),
    city("wuxi", "无锡", "江苏", 31.4912, 120.3119, 80, 2, [64, 74, 82, 60, 78, 76], ["太湖", "鼋头渚", "小笼"], ["鼋头渚", "惠山古镇", "南长街夜游", "太湖边散步"], "湖景和江南街区都好安排，情侣氛围稳定。"),
    city("changshu", "常熟市", "江苏苏州", 31.6538, 120.7525, 86, 2, [74, 86, 80, 78, 84, 76], ["虞山", "尚湖", "沙家浜"], ["虞山城墙线", "兴福寺面馆", "尚湖日落", "沙家浜芦苇荡"], "十里青山半入城，县级市的山水和老城完整度很高。"),
    city("kunshan", "昆山市", "江苏苏州", 31.3856, 120.9807, 78, 2, [50, 80, 78, 66, 76, 80], ["周庄", "昆曲", "水乡"], ["周庄古镇", "亭林园", "昆曲博物馆", "夜吃奥灶面"], "从上海到昆山太顺，周庄和昆曲给短途增加文化密度。"),
    city("taicang", "太仓市", "江苏苏州", 31.4577, 121.1306, 74, 2, [52, 70, 78, 70, 72, 82], ["浏河", "德式风情", "江海"], ["南园", "浏河古镇", "阿尔卑斯雪世界备选", "江边晚餐"], "离上海近但不像热门景区，适合想轻松换个城市吃一顿。"),
    city("zhangjiagang", "张家港市", "江苏苏州", 31.8755, 120.5555, 72, 2, [56, 64, 74, 72, 66, 84], ["香山", "长江", "港城"], ["香山景区", "暨阳湖", "长江边散步", "老街小馆"], "港城秩序感强，适合低疲劳、低预算的周末。"),
    city("jiangyin", "江阴市", "江苏无锡", 31.9216, 120.2849, 74, 2, [48, 76, 76, 68, 66, 82], ["长江", "鹅鼻嘴", "要塞"], ["鹅鼻嘴公园", "江阴要塞", "中山公园", "长江鲜晚餐"], "长江边的城市气质清楚，不热门但很适合散步。"),
    city("yixing", "宜兴市", "江苏无锡", 31.3404, 119.8233, 84, 2, [86, 82, 78, 80, 82, 70], ["紫砂", "竹海", "溶洞"], ["宜兴竹海", "丁蜀镇紫砂", "善卷洞", "湖㳇咖啡"], "竹海、紫砂和山水都在县级市里，很适合周末放空。"),
    city("liyang", "溧阳市", "江苏常州", 31.4169, 119.4842, 84, 2, [88, 72, 78, 82, 86, 68], ["天目湖", "南山竹海", "温泉"], ["天目湖", "南山竹海", "温泉酒店", "砂锅鱼头"], "湖、竹海、温泉和鱼头一条线，情侣周末属性很强。"),
    city("changzhou", "常州", "江苏", 31.8107, 119.9737, 72, 2, [52, 62, 72, 58, 66, 82], ["公园", "运河", "小吃"], ["青果巷", "红梅公园", "天宁寺", "运河夜色"], "不是传统旅游大城，但交通顺、消费友好，适合轻计划。"),
    city("hefei", "合肥", "安徽", 31.8206, 117.2272, 72, 2, [54, 68, 80, 55, 62, 86], ["科教", "包公", "小龙虾"], ["包公园", "罍街夜宵", "逍遥津", "巢湖半日"], "城市烟火气强，预算友好，适合想吃点不一样的。"),
    city("anji", "安吉县", "浙江湖州", 30.638, 119.6804, 88, 2, [96, 62, 72, 86, 88, 62], ["竹海", "白茶", "山野"], ["中国大竹海", "云上草原备选", "白茶小馆", "山里民宿"], "自然感很高，适合想把周末过成山里两天的人。"),
    city("deqing", "德清县", "浙江湖州", 30.5425, 119.9774, 86, 2, [90, 70, 76, 86, 88, 56], ["莫干山", "民宿", "湿地"], ["莫干山", "庾村街区", "下渚湖", "民宿晚餐"], "莫干山和庾村让它很适合情侣短住，松弛感强。"),
    city("tonglu", "桐庐县", "浙江杭州", 29.7932, 119.6915, 88, 2, [94, 70, 76, 86, 88, 66], ["富春江", "山水", "慢城"], ["富春江骑行", "严子陵钓台", "深澳古村", "县城米粿小吃"], "富春江山水和古村密度高，是县城周末游的高分模板。"),
    city("chunan", "淳安县", "浙江杭州", 29.6085, 119.0419, 86, 3, [96, 58, 76, 84, 90, 52], ["千岛湖", "骑行", "鱼头"], ["千岛湖骑行", "天屿山观景", "啤酒小镇", "鱼头汤晚餐"], "湖景和度假感强，适合2到3天把节奏放慢。"),
    city("zhuji", "诸暨市", "浙江绍兴", 29.7136, 120.2363, 78, 2, [76, 70, 76, 72, 74, 78], ["五泄", "西施", "珍珠"], ["五泄景区", "西施故里", "珍珠市场", "次坞打面"], "山水、人物故事和本地小吃都有，适合不想只逛古镇。"),
    city("xinchang", "新昌县", "浙江绍兴", 29.4998, 120.9039, 82, 2, [90, 78, 72, 78, 80, 74], ["大佛寺", "十九峰", "茶山"], ["大佛寺", "穿岩十九峰", "沃洲湖", "小京生花生"], "山水和佛寺组合清楚，县城旅行的内容很扎实。"),
    city("shengzhou", "嵊州市", "浙江绍兴", 29.5885, 120.8217, 76, 2, [68, 78, 90, 70, 70, 84], ["越剧", "小笼", "剡溪"], ["越剧小镇", "剡溪散步", "崇仁古镇", "嵊州小笼早餐"], "越剧和小笼都很有地方性，适合小众但好吃的周末。"),
    city("yiwu", "义乌市", "浙江金华", 29.3068, 120.0751, 74, 2, [32, 62, 86, 36, 58, 90], ["小商品", "夜市", "异域美食"], ["国际商贸城", "鸡鸣阁夜景", "三挺路夜市", "异国餐厅"], "县级市里的国际烟火气很强，适合反套路周末。"),
    city("dongyang", "东阳市", "浙江金华", 29.2895, 120.2419, 80, 2, [48, 82, 78, 52, 72, 76], ["横店", "木雕", "影视"], ["横店影视城", "卢宅古建筑群", "木雕城", "夜游梦外滩"], "影视城和木雕古建很有戏剧性，适合想玩得热闹。"),
    city("wuyi", "武义县", "浙江金华", 28.8926, 119.8166, 82, 2, [86, 70, 74, 82, 84, 70], ["温泉", "古村", "牛头山"], ["唐风温泉", "俞源古村", "牛头山备选", "宣平小吃"], "温泉加古村是很舒服的情侣周末组合。"),
    city("jinyun", "缙云县", "浙江丽水", 28.6593, 120.0784, 84, 2, [94, 72, 76, 82, 86, 68], ["仙都", "烧饼", "山水"], ["仙都鼎湖峰", "朱潭山", "河阳古民居", "缙云烧饼"], "仙都山水非常出片，县城食物也有记忆点。"),
    city("qingtian", "青田县", "浙江丽水", 28.1399, 120.2896, 82, 2, [78, 72, 88, 70, 78, 70], ["侨乡", "石雕", "瓯江"], ["石雕文化旅游区", "瓯江边散步", "咖啡或西餐小馆", "千峡湖备选"], "侨乡气质、石雕和瓯江山水很特别，适合想要小众但不无聊的周末。"),
    city("longquan", "龙泉市", "浙江丽水", 28.0743, 119.1417, 84, 3, [90, 88, 76, 82, 80, 68], ["青瓷", "宝剑", "山林"], ["龙泉青瓷博物馆", "宝剑厂或剑池", "西街老城", "山林民宿"], "青瓷、宝剑和山林气质叠在一起，适合文化型小长假。"),
    city("linhai", "临海市", "浙江台州", 28.8584, 121.1449, 86, 2, [64, 90, 86, 66, 82, 76], ["府城", "糯叽叽", "江南长城"], ["台州府城墙", "紫阳街", "东湖", "海苔饼和蛋清羊尾"], "古城墙和紫阳街完整度高，小吃也很有辨识度。"),
    city("xiangshan", "象山县", "浙江宁波", 29.4768, 121.8693, 84, 3, [90, 58, 90, 72, 86, 58], ["海岛", "渔港", "海鲜"], ["石浦渔港古城", "半边山海岸", "东门岛", "海鲜排档"], "海边和渔港氛围浓，适合从江浙沪出发看海。"),
    city("ninghai", "宁海县", "浙江宁波", 29.2896, 121.4295, 82, 2, [88, 66, 76, 82, 80, 68], ["前童", "温泉", "山海"], ["前童古镇", "森林温泉", "宁海湾", "麦饼早餐"], "古镇、温泉和海湾都有，周末节奏很好排。"),
    city("yuyao", "余姚市", "浙江宁波", 30.0372, 121.1546, 78, 2, [72, 82, 76, 70, 72, 78], ["河姆渡", "四明山", "杨梅"], ["河姆渡遗址", "四明湖", "阳明古镇", "梁弄大糕"], "史前文化和四明山自然线都能做，适合宁波/杭州周边。"),
    city("cixi", "慈溪市", "浙江宁波", 30.1697, 121.2665, 74, 2, [52, 68, 78, 68, 68, 82], ["杭州湾", "湿地", "年糕"], ["杭州湾湿地", "鸣鹤古镇", "达蓬山", "慈城年糕备选"], "湿地和古镇轻松，适合不想排复杂行程。"),
    city("yueqing", "乐清市", "浙江温州", 28.1125, 120.9838, 86, 3, [96, 72, 78, 72, 86, 58], ["雁荡山", "海鲜", "山海"], ["雁荡山灵峰夜景", "灵岩", "大龙湫", "乐清海鲜"], "雁荡山辨识度很强，适合3天把山海都吃下。"),
    city("wencheng", "文成县", "浙江温州", 27.7869, 120.0915, 82, 3, [96, 70, 70, 84, 82, 68], ["百丈漈", "山谷", "侨乡"], ["百丈漈", "刘伯温故里", "森林氧吧", "县城小馆"], "瀑布和山谷的自然冲击力高，小众但值得专程。"),
    city("taishun", "泰顺县", "浙江温州", 27.5568, 119.7175, 84, 3, [94, 86, 72, 86, 84, 68], ["廊桥", "温泉", "山城"], ["泗溪廊桥", "氡泉", "库村古村", "山城夜晚"], "廊桥和温泉让县城旅行有独特记忆点，适合慢一点的小长假。"),
    city("beijing", "北京", "北京", 39.9042, 116.4074, 92, 4, [56, 98, 88, 38, 78, 42], ["胡同", "博物馆", "烤鸭"], ["故宫或国博", "什刹海胡同", "亮马河夜游", "颐和园"], "文化密度极高，适合把小长假排成一条很有分量的路线。"),
    city("tianjin", "天津", "天津", 39.3434, 117.3616, 82, 2, [38, 82, 92, 58, 72, 78], ["海河", "洋楼", "早餐"], ["五大道", "海河夜景", "西北角早餐", "意式风情区"], "从北京出发尤其顺，洋楼、海河和早餐非常适合周末。"),
    city("qinhuangdao", "秦皇岛", "河北", 39.9354, 119.5996, 82, 3, [88, 58, 70, 76, 80, 64], ["海边", "日出", "长城"], ["阿那亚或北戴河", "鸽子窝日出", "山海关", "海鲜晚餐"], "海风能快速换心情，适合想离开城市屏幕的一晚。"),
    city("chengde", "承德", "河北", 40.9541, 117.9634, 78, 3, [76, 90, 66, 78, 72, 66], ["避暑山庄", "寺庙", "山色"], ["避暑山庄", "普宁寺", "磬锤峰", "老街晚餐"], "历史景观和山地气候兼具，北京周边小长假很稳。"),
    city("datong", "大同", "山西", 40.0768, 113.3001, 86, 3, [68, 96, 86, 66, 66, 78], ["云冈", "古城", "刀削面"], ["云冈石窟", "华严寺", "大同古城墙", "凤临阁或面馆"], "石窟和古城的冲击力强，吃饭也很让人满足。"),
    city("jinan", "济南", "山东", 36.6512, 117.1201, 80, 2, [52, 80, 82, 64, 68, 78], ["泉水", "老城", "鲁菜"], ["趵突泉", "黑虎泉", "大明湖", "宽厚里夜游"], "泉城辨识度很强，步行路线完整，适合短途。"),
    city("qingdao", "青岛", "山东", 36.0671, 120.3826, 90, 4, [86, 76, 88, 58, 88, 50], ["海岸", "啤酒", "红瓦"], ["栈桥到八大关", "小鱼山", "台东夜市", "崂山或海边咖啡"], "海、城、酒馆和老建筑组合，浪漫值很高。"),
    city("zhengzhou", "郑州", "河南", 34.7466, 113.6254, 74, 2, [44, 76, 82, 45, 58, 86], ["中原", "夜市", "博物馆"], ["河南博物院", "二七广场", "健康路夜市", "黄河风景区"], "高铁枢纽属性强，适合作为中原文化短途入口。"),
    city("luoyang", "洛阳", "河南", 34.6197, 112.454, 88, 2, [56, 96, 82, 58, 80, 78], ["龙门", "牡丹", "古都"], ["龙门石窟", "洛邑古城", "白马寺", "老城水席"], "古都含金量高，夜游氛围和历史景点距离都舒服。"),
    city("kaifeng", "开封", "河南", 34.7973, 114.3076, 78, 2, [38, 86, 90, 54, 68, 86], ["宋都", "夜市", "灌汤包"], ["清明上河园", "开封府", "鼓楼夜市", "铁塔公园"], "夜市和宋文化很有记忆点，预算也友好。"),
    city("wuhan", "武汉", "湖北", 30.5928, 114.3055, 86, 3, [58, 82, 96, 42, 70, 74], ["江湖", "过早", "夜游"], ["湖北省博物馆", "东湖绿道", "江汉路", "长江夜游"], "吃喝爆发力强，江湖气质明显，适合不想太安静的周末。"),
    city("yichang", "宜昌", "湖北", 30.6919, 111.2865, 82, 3, [90, 70, 76, 70, 72, 70], ["三峡", "江景", "清江"], ["三峡人家", "葛洲坝", "滨江夜景", "清江画廊"], "自然景观辨识度很高，适合想看大江大山。"),
    city("changsha", "长沙", "湖南", 28.2282, 112.9388, 88, 3, [46, 78, 98, 34, 76, 72], ["夜生活", "湘菜", "橘子洲"], ["岳麓山", "湖南博物院", "橘子洲", "五一广场夜宵"], "吃喝和夜生活强，适合精力好、想热闹的情侣。"),
    city("yueyang", "岳阳", "湖南", 29.3571, 113.1289, 74, 2, [70, 78, 82, 64, 66, 84], ["洞庭湖", "岳阳楼", "烧烤"], ["岳阳楼", "洞庭湖", "汴河街", "夜宵烧烤"], "湖景和名楼组合清楚，适合从武汉/长沙短途出发。"),
    city("nanchang", "南昌", "江西", 28.682, 115.8582, 80, 2, [42, 78, 94, 42, 66, 84], ["滕王阁", "赣菜", "夜市"], ["滕王阁", "万寿宫", "八一广场", "绳金塔夜市"], "吃辣、夜市和江景都到位，周末不空泛。"),
    city("jingdezhen", "景德镇", "江西", 29.2688, 117.1784, 86, 3, [54, 94, 78, 68, 86, 70], ["陶瓷", "市集", "美学"], ["陶溪川", "中国陶瓷博物馆", "瑶里古镇", "御窑博物院"], "审美体验很强，适合喜欢逛展、市集和拍照的情侣。"),
    city("xiamen", "厦门", "福建", 24.4798, 118.0894, 90, 4, [82, 76, 88, 54, 92, 46], ["海岛", "骑楼", "沙茶"], ["鼓浪屿", "沙坡尾", "环岛路", "八市海鲜"], "海岛氛围和街区漫游都成熟，适合小长假。"),
    city("fuzhou", "福州", "福建", 26.0745, 119.2965, 78, 3, [58, 82, 86, 58, 72, 76], ["三坊七巷", "闽菜", "温泉"], ["三坊七巷", "上下杭", "烟台山", "温泉或闽江夜游"], "闽都文化、街区和温泉有差异化，节奏不紧。"),
    city("guangzhou", "广州", "广东", 23.1291, 113.2644, 90, 3, [42, 86, 100, 32, 76, 62], ["早茶", "骑楼", "珠江"], ["永庆坊", "沙面", "北京路", "珠江夜游"], "吃是绝对主线，城市漫游也足够有层次。"),
    city("shenzhen", "深圳", "广东", 22.5431, 114.0579, 82, 4, [70, 58, 84, 38, 78, 48], ["海岸", "设计", "夜景"], ["南头古城", "海上世界", "大鹏所城", "深圳湾日落"], "现代、海岸、设计感强，适合想轻快一点的小长假。"),
    city("foshan", "佛山", "广东", 23.0215, 113.1214, 80, 2, [36, 82, 96, 55, 70, 84], ["岭南", "功夫", "顺德"], ["祖庙", "岭南天地", "顺德大良觅食", "清晖园"], "顺德美食加岭南街区，广州/深圳出发非常顺。"),
    city("zhuhai", "珠海", "广东", 22.2711, 113.5767, 82, 3, [76, 58, 82, 62, 86, 62], ["海滨", "情侣路", "海岛"], ["情侣路", "日月贝", "唐家湾", "外伶仃岛备选"], "城市名字都像在暗示情侣出行，海边路线轻松。"),
    city("chaozhou", "潮州", "广东", 23.6567, 116.622, 86, 3, [44, 88, 98, 58, 78, 76], ["古城", "潮汕", "工夫茶"], ["牌坊街", "广济桥", "韩文公祠", "牛肉火锅和茶"], "古城不大但味觉浓度极高，适合专门为吃出发。"),
    city("guilin", "桂林", "广西", 25.2736, 110.2907, 92, 4, [98, 70, 78, 72, 90, 55], ["山水", "阳朔", "骑行"], ["两江四湖", "漓江", "阳朔西街", "遇龙河骑行"], "山水辨识度几乎满分，小长假抽到会很开心。"),
    city("nanning", "南宁", "广西", 22.817, 108.3669, 74, 2, [58, 58, 92, 48, 64, 84], ["绿城", "夜市", "粉"], ["青秀山", "三街两巷", "中山路夜市", "老友粉早餐"], "绿意和夜市都好进入，预算友好。"),
    city("chengdu", "成都", "四川", 30.5728, 104.0668, 92, 3, [58, 86, 100, 46, 82, 70], ["茶馆", "火锅", "熊猫"], ["宽窄巷子", "人民公园茶馆", "东郊记忆", "熊猫基地"], "好吃、好逛、好松弛，是周末城市的高分模板。"),
    city("leshan", "乐山", "四川", 29.5521, 103.7654, 84, 2, [68, 86, 96, 58, 72, 82], ["大佛", "钵钵鸡", "江景"], ["乐山大佛", "苏稽古镇", "张公桥美食街", "江边散步"], "从成都出发太顺，美食密度和景点辨识度都高。"),
    city("dujiangyan", "都江堰", "四川", 30.9881, 103.6466, 82, 2, [82, 86, 76, 74, 80, 80], ["水利", "青城山", "古城"], ["都江堰景区", "南桥夜景", "青城山", "灌县古城"], "自然、历史和夜景距离近，非常适合成都周末。"),
    city("chongqing", "重庆", "重庆", 29.563, 106.5516, 90, 3, [62, 80, 100, 25, 84, 70], ["山城", "火锅", "夜景"], ["山城步道", "十八梯", "洪崖洞夜景", "鹅岭二厂"], "立体城市和夜景很有戏剧性，适合想拍照和吃火锅。"),
    city("guiyang", "贵阳", "贵州", 26.647, 106.6302, 78, 3, [72, 66, 92, 56, 70, 76], ["避暑", "酸汤", "夜市"], ["甲秀楼", "青云市集", "黔灵山", "酸汤鱼"], "气候和味觉都很有辨识度，适合夏天或小长假。"),
    city("kunming", "昆明", "云南", 25.0389, 102.7183, 86, 4, [82, 72, 82, 72, 86, 56], ["春城", "湖鸥", "鲜花"], ["翠湖", "云南省博物馆", "斗南花市", "滇池日落"], "天气和鲜花是天然优势，适合想换空气的小长假。"),
    city("dali", "大理", "云南", 25.6065, 100.2676, 92, 4, [96, 82, 82, 82, 96, 42], ["洱海", "古城", "苍山"], ["大理古城", "洱海骑行", "喜洲", "苍山远眺"], "浪漫值极高，但更适合3天以上，抽到就认真请假。"),
    city("xian", "西安", "陕西", 34.3416, 108.9398, 92, 3, [46, 98, 96, 36, 76, 76], ["唐风", "博物馆", "面食"], ["陕西历史博物馆", "大雁塔", "城墙", "回民街或洒金桥"], "历史和碳水都很强，路线成熟，适合文化型小长假。"),
    city("yanan", "延安", "陕西", 36.5853, 109.4898, 76, 2, [64, 86, 74, 68, 58, 84], ["黄土", "红色", "窑洞"], ["宝塔山", "杨家岭", "枣园", "二道街夜市"], "地貌和历史气质鲜明，西安出发可做有主题的短途。"),
    city("lanzhou", "兰州", "甘肃", 36.0611, 103.8343, 78, 3, [62, 72, 94, 52, 62, 82], ["黄河", "牛肉面", "夜市"], ["中山桥", "黄河母亲", "甘肃省博物馆", "正宁路夜市"], "黄河城市气质明确，吃面和博物馆都值得。"),
    city("xining", "西宁", "青海", 36.6171, 101.7782, 80, 4, [86, 78, 82, 68, 70, 68], ["高原", "湖泊", "清真美食"], ["塔尔寺", "莫家街", "青海湖一日", "博物馆"], "高原感明显，适合想把小长假过得像远行。"),
  ];

  function city(id, name, province, lat, lon, weekendScore, cost, scores, tags, route, summary) {
    return {
      id,
      name,
      province,
      lat,
      lon,
      weekendScore,
      cost,
      nature: scores[0],
      culture: scores[1],
      food: scores[2],
      quiet: scores[3],
      romance: scores[4],
      budget: scores[5],
      tags,
      route,
      summary,
    };
  }

  const railOverrides = {
    shanghai: { suzhou: 0.6, hangzhou: 0.8, nanjing: 1.2, ningbo: 1.9, shaoxing: 1.4, yangzhou: 2.1, huzhou: 1.8, huangshan: 2.7, jiaxing: 0.6, jiashan: 0.4, tongxiang: 0.8, haining: 0.9, pinghu: 0.7, wuxi: 0.9, changshu: 1.2, kunshan: 0.3, taicang: 0.8, zhangjiagang: 1.5, jiangyin: 1.6, yixing: 2.0, liyang: 2.0, changzhou: 1.1, hefei: 2.2, anji: 2.0, deqing: 1.6, tonglu: 2.2, chunan: 3.0, zhuji: 1.9, xinchang: 2.4, shengzhou: 2.2, yiwu: 1.8, dongyang: 2.3, wuyi: 2.6, jinyun: 3.0, qingtian: 3.4, linhai: 2.8, xiangshan: 3.3, ninghai: 2.8, yuyao: 1.8, cixi: 1.9, yueqing: 3.7 },
    beijing: { tianjin: 0.6, qinhuangdao: 2.2, chengde: 1.1, datong: 2.0, jinan: 1.6, zhengzhou: 2.5, luoyang: 3.6, qingdao: 3.4 },
    guangzhou: { shenzhen: 0.6, foshan: 0.3, zhuhai: 1.1, chaozhou: 2.8, guilin: 2.8, nanning: 3.3, changsha: 2.7, xiamen: 4.0 },
    shenzhen: { guangzhou: 0.6, foshan: 1.1, zhuhai: 1.8, chaozhou: 2.4, xiamen: 3.5, guilin: 3.5, nanning: 3.8 },
    chengdu: { leshan: 0.9, dujiangyan: 0.4, chongqing: 1.4, guiyang: 3.6, xian: 3.3, kunming: 5.8 },
    chongqing: { chengdu: 1.4, leshan: 2.2, dujiangyan: 2.1, guiyang: 2.2, wuhan: 5.0, xian: 5.0 },
    wuhan: { changsha: 1.4, yueyang: 0.7, nanchang: 2.0, yichang: 2.1, zhengzhou: 2.0, luoyang: 3.3, nanjing: 3.3, hefei: 2.0 },
    xian: { luoyang: 1.4, zhengzhou: 2.0, yanan: 2.2, lanzhou: 3.1, chengdu: 3.3 },
    nanjing: { suzhou: 1.0, shanghai: 1.2, hangzhou: 1.4, yangzhou: 0.8, wuxi: 0.8, changshu: 1.4, yixing: 1.3, liyang: 0.9, changzhou: 0.5, hefei: 1.0, huangshan: 2.2, shaoxing: 2.2, anji: 1.8, deqing: 1.8 },
    hangzhou: { shanghai: 0.8, suzhou: 1.3, ningbo: 1.0, shaoxing: 0.4, huzhou: 0.5, jiaxing: 0.4, jiashan: 0.7, tongxiang: 0.5, haining: 0.4, pinghu: 0.8, huangshan: 1.8, nanjing: 1.4, anji: 1.0, deqing: 0.7, tonglu: 0.6, chunan: 1.3, zhuji: 0.7, xinchang: 1.2, shengzhou: 1.0, yiwu: 0.6, dongyang: 1.0, wuyi: 1.4, jinyun: 1.6, qingtian: 2.0, linhai: 2.0, xiangshan: 2.0, ninghai: 1.7, yuyao: 0.9, cixi: 1.2, yueqing: 2.7 },
    changsha: { wuhan: 1.4, yueyang: 0.6, nanchang: 1.5, guangzhou: 2.7, guilin: 3.2 },
    zhengzhou: { luoyang: 0.6, kaifeng: 0.3, xian: 2.0, wuhan: 2.0, beijing: 2.5, jinan: 3.1 },
  };

  const railKeyByCity = {
    上海: "shanghai",
    北京: "beijing",
    广州: "guangzhou",
    深圳: "shenzhen",
    成都: "chengdu",
    重庆: "chongqing",
    武汉: "wuhan",
    西安: "xian",
    南京: "nanjing",
    杭州: "hangzhou",
    长沙: "changsha",
    郑州: "zhengzhou",
  };

  function haversineKm(a, b) {
    const radius = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLon = ((b.lon - a.lon) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const sinLat = Math.sin(dLat / 2);
    const sinLon = Math.sin(dLon / 2);
    const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
    return 2 * radius * Math.asin(Math.sqrt(h));
  }

  function estimateDriveHours(start, dest) {
    if (isSamePlace(start, dest)) return 0;
    const km = haversineKm(start, dest);
    return km * 1.23 / 82 + 0.25;
  }

  function estimateRailHours(start, dest) {
    if (isSamePlace(start, dest)) return 0;
    const startKey = railKeyByCity[start.city] || start.id;
    const override = railOverrides[startKey] && railOverrides[startKey][dest.id];
    if (override) return override;
    const km = haversineKm(start, dest);
    return km / 210 + 0.65;
  }

  function getTravelHours(start, dest, mode) {
    if (mode === "drive4") return estimateDriveHours(start, dest);
    if (mode === "rail4") return estimateRailHours(start, dest);
    if (mode === "flight") return haversineKm(start, dest) / 720 + 2.4;
    return estimateRailHours(start, dest);
  }

  function isSamePlace(start, dest) {
    return dest.name === start.city || dest.name === start.fullName || dest.name.replace(/市$/, "") === start.city;
  }

  function scoreDestination(dest, settings) {
    const start = departures.find((item) => item.id === settings.startCity) || departures[0];
    const mode = settings.travelMode || "drive4";
    const hours = getTravelHours(start, dest, mode);
    const cap = mode === "flight" ? 6.5 : mode === "any" ? 99 : 4;
    const inRange = hours <= cap || isSamePlace(start, dest);
    if (settings.strictRange && !inRange && !settings.surpriseMode) return null;

    const prefs = ["nature", "culture", "food", "quiet", "romance", "budget"];
    const preferenceScore = prefs.reduce((sum, key) => {
      const weight = (settings[key] ?? 50) / 100;
      return sum + (dest[key] / 100) * weight * 18;
    }, 0);
    const budgetFit = Math.max(0.45, 1.18 - dest.cost * 0.08 + (settings.budget || 50) / 350);
    const dayFit = Number(settings.tripDays) === 2 && dest.cost >= 4 ? 0.78 : 1;
    let score = (dest.weekendScore + preferenceScore) * budgetFit * dayFit;
    if (!inRange) score *= settings.surpriseMode ? 0.28 : 0.12;
    if ((settings.visited || []).includes(dest.id)) score *= Number(settings.visitedPenalty || 0.25);
    if (isSamePlace(start, dest)) score *= 0.28;
    return {
      dest,
      score: Math.max(0.1, score),
      hours,
      inRange,
      reasons: buildReasons(dest, settings, hours, inRange),
    };
  }

  function buildReasons(dest, settings, hours, inRange) {
    const high = ["nature", "culture", "food", "quiet", "romance", "budget"]
      .map((key) => ({ key, value: dest[key], want: settings[key] || 50 }))
      .sort((a, b) => b.value * b.want - a.value * a.want)
      .slice(0, 2);
    const label = {
      nature: "自然感",
      culture: "历史文化",
      food: "吃喝密度",
      quiet: "松弛安静",
      romance: "浪漫氛围",
      budget: "预算友好",
    };
    return [
      `${dest.province}${dest.name}：${dest.summary}`,
      `最匹配你们的偏好是${high.map((item) => label[item.key]).join("和")}，不是只靠名气入选。`,
      `${inRange ? "交通范围内" : "作为惊喜位保留"}，当前口径约 ${hours.toFixed(1)} 小时。`,
    ];
  }

  function getCandidates(settings) {
    return destinations
      .map((dest) => scoreDestination(dest, settings))
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);
  }

  function weightedPick(candidates, random = Math.random) {
    if (!candidates.length) return null;
    const total = candidates.reduce((sum, item) => sum + item.score, 0);
    let cursor = random() * total;
    for (const item of candidates) {
      cursor -= item.score;
      if (cursor <= 0) return item;
    }
    return candidates[candidates.length - 1];
  }

  function formatHours(hours, mode) {
    const prefix = mode === "drive4" ? "自驾" : mode === "flight" ? "综合交通" : "高铁/城际";
    if (hours < 0.2) return "本城轻度出逃";
    return `${prefix}约 ${hours.toFixed(1)} 小时`;
  }

  const api = {
    departures,
    destinations,
    haversineKm,
    estimateDriveHours,
    estimateRailHours,
    getTravelHours,
    scoreDestination,
    getCandidates,
    weightedPick,
    formatHours,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.WeekendDraw = api;

  if (typeof document === "undefined") return;

  const state = {
    visited: JSON.parse(localStorage.getItem("weekendDrawVisited") || "[]"),
    lastSettings: null,
    lastResult: null,
  };

  const $ = (selector) => document.querySelector(selector);
  const startSearch = $("#startSearch");
  const startCity = $("#startCity");
  const visitedSearch = $("#visitedSearch");
  const travelMode = $("#travelMode");
  const tripDays = $("#tripDays");
  const visitedPenalty = $("#visitedPenalty");
  const strictRange = $("#strictRange");
  const surpriseMode = $("#surpriseMode");
  const drawButton = $("#drawButton");
  const rerollButton = $("#rerollButton");

  function settingsFromDom() {
    return {
      startCity: startCity.value,
      travelMode: travelMode.value,
      tripDays: tripDays.value,
      visitedPenalty: visitedPenalty.value,
      strictRange: strictRange.checked,
      surpriseMode: surpriseMode.checked,
      visited: state.visited,
      nature: Number($("#nature").value),
      culture: Number($("#culture").value),
      food: Number($("#food").value),
      quiet: Number($("#quiet").value),
      romance: Number($("#romance").value),
      budget: Number($("#budget").value),
    };
  }

  function init() {
    renderDepartureOptions();
    const defaultStart = departures.find((item) => item.city === "上海") || departures[0];
    startCity.value = defaultStart.id;
    renderVisited();
    renderMap();
    renderDestinationCards();
    bindEvents();
    updateStats();
    renderCandidates(settingsFromDom());
  }

  function bindEvents() {
    startSearch.addEventListener("input", () => {
      renderDepartureOptions(startSearch.value);
      refreshAll();
    });
    visitedSearch.addEventListener("input", () => renderVisited(visitedSearch.value));
    document.querySelectorAll("select,input[type='range'],input[type='checkbox']").forEach((input) => {
      input.addEventListener("input", () => {
        updateStats();
        renderMap();
        renderDestinationCards();
        renderCandidates(settingsFromDom());
      });
    });
    $("#clearVisited").addEventListener("click", () => {
      state.visited = [];
      saveVisited();
      renderVisited(visitedSearch.value);
      refreshAll();
    });
    drawButton.addEventListener("click", () => runDraw());
    rerollButton.addEventListener("click", () => runDraw(true));
  }

  function renderDepartureOptions(keyword = "") {
    const currentValue = startCity.value;
    const normalized = keyword.trim();
    const filtered = normalized
      ? departures.filter((item) => `${item.city}${item.fullName}${item.province}`.includes(normalized))
      : departures;
    const options = filtered.length ? filtered : departures;
    startCity.innerHTML = options
      .map((item) => {
        const province = item.province && item.province !== item.fullName ? ` · ${item.province}` : "";
        return `<option value="${item.id}">${item.city}${province}</option>`;
      })
      .join("");
    if (options.some((item) => item.id === currentValue)) startCity.value = currentValue;
  }

  function refreshAll() {
    updateStats();
    renderMap();
    renderDestinationCards();
    renderCandidates(settingsFromDom());
  }

  function renderVisited(keyword = "") {
    const chips = $("#visitedChips");
    const normalized = keyword.trim();
    const filtered = normalized
      ? destinations.filter((dest) => `${dest.name}${dest.province}${dest.tags.join("")}${dest.summary}`.includes(normalized))
      : destinations;
    chips.innerHTML = filtered
      .map((dest) => {
        const active = state.visited.includes(dest.id);
        return `<button class="chip" type="button" aria-pressed="${active}" data-id="${dest.id}">${dest.name}</button>`;
      })
      .join("") || `<p class="empty-state">没有匹配的目的地，换个关键词试试。</p>`;
    chips.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        state.visited = state.visited.includes(id) ? state.visited.filter((item) => item !== id) : [...state.visited, id];
        saveVisited();
        renderVisited(visitedSearch.value);
        refreshAll();
      });
    });
  }

  function saveVisited() {
    localStorage.setItem("weekendDrawVisited", JSON.stringify(state.visited));
  }

  function updateStats() {
    const settings = settingsFromDom();
    $("#cityCount").textContent = destinations.length;
    $("#departureCount").textContent = departures.length;
    $("#nearbyCount").textContent = getCandidates(settings).filter((item) => item.inRange).length;
    $("#visitedCount").textContent = state.visited.length;
  }

  function renderMap(selectedId) {
    const settings = settingsFromDom();
    const start = departures.find((item) => item.id === settings.startCity);
    const candidates = new Set(getCandidates(settings).filter((item) => item.inRange).map((item) => item.dest.id));
    const minLon = 99;
    const maxLon = 123;
    const minLat = 21;
    const maxLat = 41.5;
    const dots = destinations
      .map((dest) => {
        const x = ((dest.lon - minLon) / (maxLon - minLon)) * 92 + 4;
        const y = (1 - (dest.lat - minLat) / (maxLat - minLat)) * 88 + 6;
        const classes = ["map-dot"];
        if (dest.id === selectedId) classes.push("is-selected");
        if (dest.id === start.id) classes.push("is-start");
        const title = `${dest.name}${candidates.has(dest.id) ? "，范围内" : "，降权或范围外"}`;
        return `<span class="${classes.join(" ")}" style="left:${x}%;top:${y}%" title="${title}"></span>`;
      })
      .join("");
    $("#miniMap").innerHTML = dots;
  }

  function renderCandidates(settings) {
    const candidates = getCandidates(settings);
    $("#candidateTotal").textContent = candidates.length;
    const max = candidates[0] ? candidates[0].score : 1;
    $("#probabilityBars").innerHTML = candidates
      .slice(0, 5)
      .map((item) => {
        const width = Math.max(6, (item.score / max) * 100);
        return `<div class="bar">
          <div class="bar-label"><span>${item.dest.name}</span><span>${formatHours(item.hours, settings.travelMode)}</span></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${width}%"></div></div>
        </div>`;
      })
      .join("");
  }

  function renderDestinationCards() {
    const settings = settingsFromDom();
    const scored = new Map(getCandidates({ ...settings, strictRange: false, surpriseMode: true }).map((item) => [item.dest.id, item]));
    $("#destinationCards").innerHTML = destinations
      .slice()
      .sort((a, b) => (scored.get(b.id)?.score || 0) - (scored.get(a.id)?.score || 0))
      .map((dest) => {
        const item = scored.get(dest.id);
        const status = item && item.inRange ? "is-good" : "is-soft";
        return `<article class="city-card">
          <div>
            <h3><i class="dot ${status}"></i>${dest.name}</h3>
            <p>${dest.summary}</p>
          </div>
          <div class="city-tags">${dest.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </article>`;
      })
      .join("");
  }

  function runDraw(isReroll) {
    const settings = settingsFromDom();
    const candidates = getCandidates(settings);
    if (!candidates.length) {
      $("#resultCity").textContent = "这组条件太严格了";
      $("#resultSummary").textContent = "打开惊喜位，或把交通范围切到全国随缘，就能继续抽。";
      return;
    }
    state.lastSettings = settings;
    drawButton.classList.add("is-spinning");
    drawButton.disabled = true;
    const reel = candidates.slice(0, 12);
    let step = 0;
    const timer = setInterval(() => {
      const item = reel[step % reel.length];
      $("#resultCity").textContent = item.dest.name;
      $("#resultSummary").textContent = item.dest.tags.join(" · ");
      step += 1;
      if (step > (isReroll ? 9 : 14)) {
        clearInterval(timer);
        const picked = weightedPick(candidates);
        state.lastResult = picked;
        drawButton.disabled = false;
        drawButton.classList.remove("is-spinning");
        renderResult(picked, settings);
      }
    }, 78);
  }

  function renderResult(item, settings) {
    const dest = item.dest;
    $("#resultCity").textContent = `${dest.name} · ${dest.province}`;
    $("#resultSummary").textContent = `${formatHours(item.hours, settings.travelMode)}。${dest.summary}`;
    $("#reasonList").innerHTML = item.reasons.map((reason) => `<li>${reason}</li>`).join("");
    $("#routeList").innerHTML = dest.route.map((stop) => `<li>${stop}</li>`).join("");
    renderCandidates(settings);
    renderMap(dest.id);
    renderDestinationCards();
  }

  init();
})(typeof window !== "undefined" ? window : globalThis);
